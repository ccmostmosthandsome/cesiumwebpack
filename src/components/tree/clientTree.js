define(
    [
        "vue",
        "forms/clientToggle",
        "layout/icons",
        "forms/clientContextmenu",
        "eventbus/index",
        "html5/clientDragdrop", 
        "tree/trackTree"       
    ], function(Vue,clientToggle,getIcon,clientContextmenu,EventBus,clientDragdrop,trackTree) {
    'use strict'
// body
    const clientTree = Vue.component('clientTree', {    
        props: {
                model: Object,
                menuschema: Object,
                showRoot: Boolean
        },
        components: {clientToggle,clientContextmenu,clientDragdrop},
        data: function(){
            return {
                menuContext : this.menuschema,
                openList : false,
                dragDropTreeData : {}
            }
        },
        mounted(){
            console.log("dingo");
            EventBus.$on('dropdownSelected',(selected)=>{
            	
            	this.model.selection = selected;
                if(selected.selectedId === this.model.id) {
                	EventBus.$emit('modelSelected',this.model);    	
                }
                	
                	
                
            });

            EventBus.$on('dataDrop',(data)=>{
        	    
                Object.assign(this.dragDropTreeData,data);
                console.log("dingo",data);


            });
        },
        computed : {
                hasChildren: function () {
                    return this.model.children && this.model.children.length ? true : false
                },
                iconValue(node){
                    
                    if(!this.model.attr){
                        return null
                    }
                    this.model.attr.flg = this.model.attr.flg || null;
                    if(this.model.attr.flg){
                        return "countryIcon " + getIcon(this.model.attr.type,this.model.attr);
                                    
                    } else {

                        var icon =  getIcon(this.model.attr.type,this.treeExpanded);
                        return icon; 
                    }
                    
                },
                plusDisplay(){
                    if(this.hasChildren){
                        return this.treeExpanded ? 'glyphicon glyphicon-minus' : 'glyphicon glyphicon-plus'
                    } else {
                        return ''
                    }
                },
                menuList(){
                    
                    return this.menuContext[this.model.attr.type];
                },
                showMenu(){
                    return this.menuContext[this.model.attr.type].list && this.menuContext[this.model.attr.type].list.length ? 
                        true : false  ; 
                },
                hidingRoot(){
                	return !this.showRoot && this.model.id === 'Root';
                },
                treeExpanded : {
                	get : function(){
                		this.openList;
                	
                		if(this.hidingRoot){
                			this.openList = true;
                			return this.openList
                		} else {
                			return this.openList 
                		}
                		
                	},
                	set : function(value){
                		  this.openList = value; 
                	}
                }
                        
        },
        methods: {
            notifyRoot(data){
                this.$emit('notifyRoot',data);
            },
            updateTree(data){

                /*
                *   Disable infinite recusive drop
                *   do not allow tracks to be drug between filtered\hidden\visible folders
                */
                const catchGuard = data.id === this.model.id        ? true    :
                                   this.model.id === 'default_v'    ? true    :
                                   this.model.id === 'Default_notv' ? true    :
                                   this.model.id === 'Default_f'    ? true    :
                                   false; 
                
               if(catchGuard){
                    return false;
                }

                
                this.model.children = this.model.children.map((child)=>{
                    if(child.id === data.parent){
                        child.children.push(data); 
                    }
                    return child; 
                });
                EventBus.$emit('moveFolder',data,this.model);
               
                
                
            }
        },
        mixins: [trackTree],
        template: `
            <div >  
        		<!-- 
        			Recursive component used to create tree. 
        			Context menu displayed via "showMenu" computed value which checks that attribute is defined in the context menu's schema.
        			iconCollection css class used to display block level elements in-line
        			:key's are used for elements so that eventual Vue-CSS transitions can be used.        			
        		-->
                <li v-bind:key="model.id" style="display:block">
                    
                    <div
                    :class="{bold: hasChildren}"
                    style="display:inline-block"
                    v-if="!hidingRoot"
                    >
                        <client-dragdrop :node="model" :data="dragDropTreeData" :dropUpdate="updateTree">         
                            <div class="icons" draggable="true" >
                                <div class="iconCollection" style="cursor: pointer;" >
                                    <span v-if="showMenu">
                                        <client-contextmenu :menuoptions="menuList"  :isSelected="model.id"> 
                                            <span v-if="hasChildren"><client-toggle :status="treeExpanded" v-on:flip="treeExpanded = !treeExpanded" />&nbsp;&nbsp;</span>
                                            <span v-else> <i class="listItemPointer glyphicon glyphicon-minus"></i> &nbsp;&nbsp; </span>                       
                                             
                                            <span v-bind:class="iconValue" style="cursor: none;"></span>
                                            &nbsp;&nbsp;
                                            <span v-html="model.text"></span>
                                        </client-contextmenu>                                
                                    </span>
                                    <span v-else>
                                        <client-toggle :status="treeExpanded" v-on:flip="treeExpanded = !treeExpanded" :show="hasChildren"/> &nbsp;&nbsp;
                                        <span v-bind:class="iconValue" style="cursor: none;"></span>
                                        &nbsp;&nbsp;
                                        <span v-html="model.text"></span>                              
                                    </span>
                                </div>
                            </div>
                        </client-dragdrop>
                    </div>
                    <div>
                        <ul v-show="treeExpanded" :key="model.id" >
                  
                            <client-tree
                                v-for="model in model.children"
                                :model="model"
                                :key="model.id"
                                :menuschema="menuschema">
                            </client-tree>
                        </ul>                        
                    </div>               
                </li>               
            </div>
        `
    })

    return clientTree;
});




