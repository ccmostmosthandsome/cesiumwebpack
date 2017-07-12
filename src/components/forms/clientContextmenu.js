define(
    [
        "vue",
        "forms/clientDropdown"
    ], function(Vue,clientDropdown) {
    'use strict'
// body    
     const clientContextmenu =  Vue.component('clientContextmenu',({
            props: [
                'menuoptions',
                'isSelected'
            ],
            mixins: [],
            store: ['clientSchema'],
            data: function(){
                return {
                    active: false,
                    menuOpen: false
                    
                }
            },
            methods: {
                mouseOver(){
                   
                    this.active = true;
                    
                },
                mouseOut(){
                   
                    
                    this.active = false; 
                    
                },
                openMenu(event){
                    console.log("menuoptions",this.menuoptions,event);
                    if(event) event.preventDefault();
                    this.active ? this.menuOpen = !this.menuOpen : '';
                   
                    
                },
                closeMenu(data){
                    console.log("notifying parent...",data);
                    this.$emit('notifyRoot',data); 
                    this.menuOpen = false;
                    this.active = false;
                }
            },
            components: {},
            template: `

                <div  id="contextMenu" style="cursor:pointer" @mouseout="mouseOut()">
                    <div  v-on:mouseover="mouseOver()" >
                        <slot></slot>                     
                                                                  
                            <span class="glyphicon glyphicon-option-horizontal" v-show="active" v-on:click.stop="openMenu()" style="cursor: pointer;">
                            </span>
                            <span v-show="menuOpen">
                                <client-dropdown :options="menuoptions" v-on:clientSelected="closeMenu" :isSelected="isSelected"> </client-dropdown>
                            </span>              
                    </div> 

                </div>     
            `
        }))

        return clientContextmenu;
   
});