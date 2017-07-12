define(["vue","eventbus/index"], function(Vue,EventBus) {
    'use strict'
// body
    const clientDropdown = Vue.component('clientDropdown',{
        props: ['options','isSelected'],
        template: `
        		<span class="dropdown">
        			<button class="btn btn-default btn-xs dropdown-toggle" 
        					type="button" 
        					data-toggle="dropdown"
        					id="dropdownMenu1"
        					>
        				
        				<span class="caret"></span>
        			</button>
        			<ul class="dropdown-menu"  >
        				<li v-for="option in options.list" v-bind:value="option.id" >
        					<a @click="notify(option,$event)" href="#">{{option.text}} </a>
        				</li>
        			</ul>
        		</span>
        		
            
            
        `,
        data: function(){
            return {
                selected : null
            }
        },
        store: ['selection'],
        methods: {
            notify(selected,event){
                if(event) event.preventDefault();
                
              
                //Declaring let or const was converting the this context to the window object. 
                var selectedListItem = this.options.list.filter(function(val){ 
                    return val.id === selected.id
                }.bind(this)); 
                selectedListItem = selectedListItem[0];
                selectedListItem.selectedId =  this.isSelected; 
                selectedListItem.listId = this.options.id; 
                EventBus.$emit('dropdownSelected',selectedListItem)
            }
        }

    })


});
