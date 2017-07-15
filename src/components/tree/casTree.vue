<template>
    <div>
        <!-- 
            			Recursive component used to create tree. 
            			Context menu displayed via "showMenu" computed value which checks that attribute is defined in the context menu's schema.
            			iconCollection css class used to display block level elements in-line
            			:key's are used for elements so that eventual Vue-CSS transitions can be used			
            		-->
        <li v-bind:key="model.id" style="display:block">
    
            <div :class="{bold: hasChildren}" style="display:inline-block" v-if="!hidingRoot">
    
                <div class="treeCharacters icons">
                    <div class="iconCollection" style="cursor: pointer;">
                        <span v-if="showMenu">
                            
                                <span v-if="hasChildren">
                                    <client-toggle :status="treeExpanded" v-on:flip="treeExpanded = !treeExpanded" />&nbsp;&nbsp;</span>
                                <span v-else>
                                    <i class="listItemPointer glyphicon glyphicon-minus"></i> &nbsp;&nbsp; </span>
    
                                <!-- <span v-bind:class="iconValue" style="cursor: none;"></span  v-for="option in options.list" v-bind:value="option.id"> -->
                                <span v-html="model.text"></span> 
                                <b-dropdown size="sm"  class="m-md-1">
                                    <b-dropdown-item href="#" v-for="option in menuList.list" v-bind:key="option.id" v-bind:value="option.id">{{option.text}}</b-dropdown-item>
                                </b-dropdown>
                                
                            
                        </span>
                        <span v-else>
                            <client-toggle :status="treeExpanded" v-on:flip="treeExpanded = !treeExpanded" :show="hasChildren" /> &nbsp;&nbsp;
                            <!-- <span v-bind:class="iconValue" style="cursor: none;"></span> -->
    
                            <span v-html="model.text"></span>
                        </span>
                    </div>
                </div>
    
            </div>
            <div>
                <ul v-show="treeExpanded" :key="model.id" style="padding: 3px;">
                    <cas-tree v-for="model in model.children" :model="model" :key="model.id" :menuSchema="menuSchema">
                    </cas-tree>
                </ul>
            </div>
        </li>
    </div>
</template>
<script>
import clientToggle from '../buttons/clientToggle.vue';
import clientContextmenu from '../buttons/clientContextmenu.vue';
import { EventBus } from '../../eventbus/index';
export default {
    components: { clientToggle, clientContextmenu },
    computed: {
        hasChildren: function () {
            return this.model.children && this.model.children.length ? true : false
        },
        plusDisplay() {
            if (this.hasChildren) {
                return this.treeExpanded ? 'glyphicon glyphicon-minus' : 'glyphicon glyphicon-plus'
            } else {
                return ''
            }
        },
        menuList() {
            console.log("menu list? =?", this.menuContext[this.model.attr.type]);
            return this.menuContext[this.model.attr.type];
        },
        showMenu() {
            //return false;

            console.log("this menu context =>", this.menuContext);
            return this.menuContext[this.model.attr.type].list && this.menuContext[this.model.attr.type].list.length ?
                true : false;
        },
        hidingRoot() {
            return !this.showRoot && this.model.id === 'Root';
        },
        treeExpanded: {
            get: function () {
                this.openList;

                if (this.hidingRoot) {
                    this.openList = true;
                    return this.openList
                } else {
                    return this.openList
                }

            },
            set: function (value) {
                this.openList = value;
            }
        }
    },
    name: 'casTree',
    props: {
        model: Object,
        menuSchema: Object,
        showRoot: Boolean
    },
    data: function () {
        return {
            menuContext: this.menuSchema,
            openList: false
        }
    },
    methods: {
        notifyRoot(data) {
            this.$emit('notifyRoot', data);
        },
        updateTree(data) {
            this.model.children = this.model.children.map((child) => {
                if (child.id === data.parent) {
                    child.children.push(data);
                }
                return child;
            });
            EventBus.$emit('moveFolder', data, this.model);
        }
    },
    mounted() {
        console.log("dingo in tree =>>", this);
        EventBus.$on('dropdownSelected', (selected) => {

            this.model.selection = selected;
            if (selected.selectedId === this.model.id) {
                EventBus.$emit('modelSelected', this.model);
            }


        });
    }

}
</script>
<style>
.treeCharacters {
    font-size: small;
}
</style>