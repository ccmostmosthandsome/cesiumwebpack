define(['brain/brain','eventbus/index'],function (Brain,EventBus) {
    'use strict'
    // body
    const trackTree = {
        methods: {
            growNewTree(leaf){
            	
            	leaf = leaf || {};
            	console.log("running tree",leaf); 
            	return /*this.trackData['Default'] = this.trackData['Default'].map((node)=>{
	           			if(node.id == leaf.id){
	           				node =  Object.assign({},leaf)
	        				return  node
	        			} else {
	        				return node
	        			}   

            	})*/
            	  	
            	
            },
        	processSelection(children,option,model){
                const brainAction = {
                    'Show Folder' : ()=>{
                        children.forEach((child)=>{
                        	child.isHidden = false;
                            Brain.showTrack(child.id,null);
                        });
                    },
                    'Hide Folder' : ()=>{
                        children.forEach((child)=>{
                        	child.isInView = false; 
                            Brain.hideTrack(child.id,null,true);
                        });
                    },
                    'Remove Folder' : ()=>{
                    	console.log("dingo");
                    },
                    'New Folder' : ()=>{
                    	this.showModal = true; 
                    	console.log("New Folder!!!");
                    },
                    'Remove Track' : ()=>{
                    	Brain.removeTrackById(model.id,model.attr.folder)
                    },
                    'Default'   : ()=>{
                        console.log("No valid brain action provided")
                    }
                }

                return (brainAction[option] || brainAction.Default)()


            },
            scaffoldChildren(parent,tracks){
                const children = [
                    {"id" : 'Default_v', "text" : 'Visible'},
                    {"id" : 'Default_notv', "text" : 'Not Visible'},
                    {"id" : 'Default_f', "text" : 'Filtered Out'}
                ].map((folder)=>{
                    let returnObject = {};
                    returnObject.id = folder.id;
                    returnObject.parent = parent;
                    returnObject.attr = {type : "subfolder", folder: parent}; 
                    returnObject.text = this.loadTitle(tracks,{"tree": folder.text ,"type" : 'track'}) || folder.text + ' (0)';
                    returnObject.children = this.loadChildren(tracks,{"tree" : folder.text},folder.id,parent);
                    return returnObject;
                   
                })
                return children;
            },
            updateChildren(children){
                return this.trackData['Default']
                            .reduce((acc,curr)=>{
                                acc.push(curr);
                                return acc
                            },[])
                            .map((child)=>{
                                var isSelectedChild = children.some((selectedchild)=>{
                                    return selectedchild.trackId === child.id;
                                })
                                return (isSelectedChild ? child : null)
                            })
                            .filter((child)=>{
                                return child; 
                            });
            },
            loadChildren(treedata, title,parent ,folder){
                             return treedata
                                .filter((track) =>{                                	
                                	return this.filterTracks(title,track);                      	
                                })
                                .map((currTrack,ix) => {
                                    const context = this;
                                    context.currTrack = currTrack;
                                    context.positions = currTrack.positions;
                                    //Create a closure variable with this tracks ID so that it can be passed into it's children as this.parent
                                    context.parent = currTrack.id; 
                                    //const flag = 'country' + currTrack.data.flagISO3 + 'Icon'
                                    const child = {
                                        id: currTrack.id,
                                        trackId: currTrack.id,
                                        text: currTrack.id,
                                        parent : parent,
                                        attr: {
                                            "type" : 'track',
                                            "folder" : folder
                                        },
                                        children: Object.keys(currTrack)
                                            .map(makeChildren.bind(this))
                                            .filter(noNullChild)

                                    }
                                    return child;

                                    function makeChildren(childKey) {
                                        var returnChild = this.buildTrackFolder(childKey, childKey,this.positions,this.parent);                            
                                        return returnChild;
                                    }

                                    function noNullChild(child) {
                                        return child.id
                                    }

                                })         
            },
            filterTracks(title,track,customTitle){
            	return  title.tree === 'Visible' && !track.isHidden      ? true :
        		    title.tree === 'Not Visible' && track.isHidden       ? true :
        		    title.tree === 'Filtered Out'&& track.isFiltered     ? true :
        		    title.tree === 'Default' 							 ? true : 
                    title.tree === 'Custom'                              ? true : 
        		    false;       	
            },
            loadTitle(treedata,title,customTitle){
                    this.reducer = {}; 
                    this.title = title || null; 
                    //title.tree === 'Custom' ? title.tree = customTitle : title.tree = title.tree; 
                    //First check if  using custom title. If not use the tree. 
                    this.treeTitle = customTitle || title.tree; 
                    let self = this;
                    
                    if( title.type === 'folder' ) {
                        this.titleFunction = {
                            tally: {
                                func: folderTallyFunc,
                                reducer: {totalCount: 0, countShown: 0 }
                            },
                            title: { 
                                func : folderTitleFunc,
                                reducer: { title: null, trackCount: 0, totalCount: 0, countShown: 0 }
                            }
                        }
                    } else if (title.type === 'track') {
                         this.titleFunction = {
                            tally: {
                                func: trackTallyFunc,
                                reducer: 0
                            },
                            title: {
                                func : trackTitleFunc,
                                reducer: { title: null, count: 0 }
                            }
                        }                       
                    } else {
                        console.log("no type found...");
                    }

                   
                    let treeForm = treedata
                        .filter((track)=>{
                        	return this.filterTracks(title,track,this.customTitle); 
                            //return track.data[title.tree] === true || title.tree == 'default'; 
                        })
                        .map((track) => {
                            //When creating custom folders need to  allow all tracks passed in to be shown. 
                            //''Custom' Type is checked for filter, once it's passed here type property is removed and name is reasigned to title. 
                                           
                            this.track = track.data || track
                            return Object
                                    .keys(track)
                                    .reduce(this.titleFunction.tally.func.bind(this),this.titleFunction.tally.reducer);
                        })
                        .reduce(this.titleFunction.title.func.bind(this),this.titleFunction.title.reducer).title  
                    	
                    	
                 
  
                    return treeForm;     
                    function folderTitleFunc(acc, curr){
                            
                            acc.trackCount++ ,
                                acc.totalCount = curr.totalCount,
                                acc.countShown = curr.countShown;
                                
                            acc.title = "<strong>" + this.treeTitle + "</strong> - " + acc.trackCount +
                                " Tracks (" + acc.countShown + " of " +
                                acc.totalCount + " posits drawn):"

                            return acc;

                    } 

                    function trackTitleFunc(acc,curr){
                            
                            acc.count = curr + acc.count;
                                    acc.title = this.treeTitle + ' (' + acc.count + ')';
                                    return acc;
                       }

                       function folderTallyFunc(acc, currkey){
                            
                    	   if(currkey == 'positions'){
                    		   console.log("dingo...");
                    	   } else {
                    		   
                    	   }
                    	   
                            currkey == 'positions' ? acc.countShown = acc.countShown + this.track[currkey].length :
                                currkey == 'positCount' ? acc.totalCount =  acc.totalCount + this.track[currkey] :
                                    '';
                            return acc;
                       }

                        function trackTallyFunc(acc, currkey){
                           
                            currkey == 'positions' ? acc = this.track[currkey].length : '';
                            return acc;
                        }
   
            },
            loadTreeData() {
                if (!this.trackData) {
                    //Guard against mixin used without trackdata.
                    console.log("mixin used in a component without trackData or trackData not populated")
                    return null;
                }

                let treeData = {
                		attr: {},
                        "Root": {
                            id: 'Root',
                            attr: {
                                "type" : 'tracks'
                            },
                            text: this.loadTitle(this.trackData['Default'],{"tree": 'Root',"type" : 'folder'}) ,
    
                            children: []
                        }
                };
                for(let key in this.trackData){
                	if(key === 'Default'){
                  		var defaultChildObject = {};
                		defaultChildObject.id = key;
                		defaultChildObject.attr =  {
                			"type": 'tracks',
                			"folder" : key
                		}
                		defaultChildObject.parent = 'Root';
                		defaultChildObject.text = this.loadTitle(this.trackData[key],{"tree": key,"type" : 'folder'}) || '<strong>' + key + ' </strong> - 0 Tracks (0 of 0 posits drawn):';
                		defaultChildObject.children = this.scaffoldChildren(key,this.trackData[key]);           		
                		treeData.Root.children.push(defaultChildObject);
                	} else {
                		var childObject = {};
                		childObject.id = key;
                		childObject.attr =  {
                			"type": 'tracks',
                			"folder" : key
                		}
                		//this.loadTitle(this.trackData[folder.id],{"tree": 'Custom',"type" : 'folder'},folder.id)
                		childObject.parent = 'Root';
                		console.log("children dingo =>",this.trackData[key]);
                		childObject.text = this.loadTitle(this.trackData[key],{"tree": 'Custom',"type" : 'folder'},key) || '<strong>' + key + ' </strong> - 0 Tracks (0 of 0 posits drawn):';
                		childObject.children = this.scaffoldChildren(key,this.trackData[key]);
                		treeData.Root.children.push(childObject);
                	}
                }
                //brain.folder.newFolder('Default');
                return treeData;
                
                
            },
            tempProcess(removed,idForNotRemoved){
            	
            	if(removed.id === idForNotRemoved){
            		return false;
            	}
            	return removed.id === this.updatedTrack.id ? true : false; 
            	
                     
            },
            removeTracksFromFolder(tree,func,id){
            	var context = this;
            	context.lookupId = id;
                for(var i in tree){
                	let removeEntry;
                	if(tree.children){
                		tree.children = tree.children.filter(function(leaf){
                			let removeChild = func.apply(this,[leaf,id]);
                			if(removeChild){
                				console.log("Get this",tree,context)
                			}
                			return !removeChild
                		})
                		
                	}

                    if(tree[i] !== null && typeof tree[i] == 'object'){
                        this.removeTracksFromFolder(tree[i],func,id);
                    }
                }
            },
            addTracksToFolder(model){
                let context = this;
                context.newFolderID = model.id;
               // let trackUpdates= [];
                let removeItem = 0;
                context.track = {};
                let updatedFolder = model.children.filter(child => child.children && child.children.length);
                
                //filter down trackData to the updated children tracks.  
                
                //create a map of default folder (filtered, hidden, in view) to store tracks.
                
                
                
                this.trackData[this.updatedTrack.attr.folder].forEach((track,ix)=>{
                        
                        
                        updatedFolder.forEach((rootFolder)=>{
                            let updatedTrack = {};
                            let reScaffold = [];
                            rootFolder.children = rootFolder.children.map((updated,ix)=>{

                                if(updated.id === track.id ){
                                    updatedTrack = JSON.parse(JSON.stringify(track));                               
                                    this.trackData[model.id].push(updatedTrack);
                                    this.trackData[model.id] = uniq(this.trackData[model.id]);
                                    context.tradck = track; 
                                    //Remove the tracks from the previous folders key value store:
                                    this.trackData[this.updatedTrack.attr.folder] = this.trackData[this.updatedTrack.attr.folder]
                                    	.filter(oldtrack => oldtrack.id !== track.id)
                                    
                                    //remove tracks from original GUI folder
                                    this.removeTracksFromFolder(this.tree,this.tempProcess,track.id);
                                    reScaffold.push(ix);
                                    removeItem = ix;
                                }
                                
                                return updated;

                            })
                           if(reScaffold && reScaffold.length){
                        	   console.log("dingo....");
                        	  // rootFolder.children =  this.scaffoldChildren(rootFolder.id,rootFolder.children);
                           }
                           

                        })                        
                    })
                    
                 // removeItem > 0 ? this.trackData.splice(1,removeItem) : this.trackData = this.trackData;
                    
                 //Filter out null tracks which have been moved out.   
 
                 this.tree.Root.children = this.tree.Root.children.map((folder)=>{
                	 
                     if(folder.id === model.id){
                        
                         folder.text  = this.loadTitle(this.trackData[model.id],{"tree": 'Custom',"type" : 'folder'},folder.id) || '<strong>'+ folder.id +'</strong> - 0 Tracks (0 of 0 posits drawn):'
                         folder.children = this.scaffoldChildren(folder.id,this.trackData[model.id]);
                         Brain.addTrackToFolder(context.track,folder.id);
                     } else {
                    	 console.log("dingo");
                    	 folder.children = this.scaffoldChildren(folder.id,this.trackData[folder.id]);
                    	 folder.text = this.loadTitle(this.trackData[folder.id],{"tree": 'Custom',"type" : 'folder'},folder.id) || '<strong>'+ folder.id +'</strong> - 0 Tracks (0 of 0 posits drawn):'
                    	 console.log("dingo");
                    	 
                     }
                     
                     
                    
                     return folder; 
                 });
                
                //TODO: Need to remove hardcoded data.id for a path passed in.
                function uniq(bucket,path){
                	let seen = {}
                	return bucket.filter((x)=>{
                		
                		if(seen[x.id]){
                			return false;
                		} else {
                			seen[x.id] = true;
                			return x; 
                		}
                	})
                }
            },
            addFolder(name){
            	this.trackData[name] = [];
                let folder = {
                    "id"         : name,
                    "parent"     : 'Root',
                    "attr"       : {"type": 'tracks', "folder" : name},
                    "text"       : this.loadTitle([],{"tree": name,"type" : 'folder'}) || '<strong>'+ name +'</strong> - 0 Tracks (0 of 0 posits drawn):',
                    "children"   : this.scaffoldChildren(name,[])
                };
                EventBus.$emit('newFolder',folder);
                this.tree.Root.children.push(folder);
                

            }

        }

    }
    return trackTree
});