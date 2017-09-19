import Vue from 'vue';
import traverseBf from '../../utilities/traverseBf';
import Queue from "../../utilities/queue";
const state = {
    statusTree: {},
    dashboard: {
        koans: {},
        courses: {},
        focusareas: {}
    },
    questions: []
};

const mutations = {

    INITIALIZE(state) {
        state.statusTree = new tree('scoreDashboard');
        state.questions.forEach(question => {
            state.statusTree.add(question.koan,'scoreDashboard',state.statusTree.traverseBf);
            state.statusTree.add(question.coursetype,question.koan,state.statusTree.traverseBf);
            state.statusTree.add(question.modtype, question.coursetype,state.statusTree.traverseBf);

        });
        console.log("Finished building tree structure...", state.statusTree);

    },
    ADD_QUESTIONS(state, questions) {
        console.log("dingo running payload", questions);
        if (!Array.isArray(questions)) {
            return undefined
        } else {

            state.questions = questions.map(question => {
                let returnQuestion = Object.assign(question, {});
                return returnQuestion;
            });
        }

    },
    GRADE(state,gradeSubmission){
        let gradeObject = {
            coursetype: gradeSubmission.coursetype,
            koan: gradeSubmission.koan,
            focusarea: gradeSubmission.modtype
        };
        const percent = gradeSubmission.correct ? 100 : 0;
        for(var i in gradeObject){
            let gradeNode = {};
            state.statusTree.contains(state.statusTree.traverseBf,(node)=>{
                 if(node.data == gradeObject[i]){
                     console.log("dingo")
                     console.log("dingo")
                     
                     console.log("dingo")
                     
                    gradeNode = _.assign(node,{});
                 }  
            });

            gradeNode.metadata.count =  gradeNode.metadata.count ? gradeNode.metadata.count++ : 1;
            gradeNode.metadata.sum = gradeNode.metadata.sum ? gradeNode.metadata.sum + percent : percent;
           

            gradeNode.metadata.percent = Math.floor( gradeNode.metadata.sum / gradeNode.metadata.count );
            Vue.set(gradeNode.metadata,'count',gradeNode.metadata.count);
            Vue.set(gradeNode.metadata,'sum',gradeNode.metadata.sum);            
            Vue.set(gradeNode.metadata,'percent',gradeNode.metadata.percent);
            Vue.set(state.dashboard[i], gradeObject[i],gradeNode.metadata.percent);
        }

        console.log("digo grade gradeNode + ",gradeObject);        

    }

};

const actions = {
    initDashboardQuestions: ({ commit }, questions) => commit('ADD_QUESTIONS', questions),
    initDashboard: ({ commit }) => commit('INITIALIZE'),
    grade: ({commit},gradeSubmission) => commit('GRADE',gradeSubmission)
};

const getters = {
    tree: (state, getters) => state.statusTree
};

export default {
    state,
    mutations,
    actions,
    getters
}


class tree {
    constructor(data) {
        Vue.set(this,'_root',{})
        let node = this.node(data);
        Vue.set(this, '_root', node);
        
        console.log("dingo debugging")
        console.log("dingo debugging")
        console.log("dingo debugging")
        
    }

    node(data) {
        return {
            data: data,
            parent: null,
            children: [],
            metadata: {
                grade : 0
            }
        }
    }

    traverseBf(node,callback) {
        //this._root
        let q = [node];
        while(q.length > 0){
            node = q.shift();
            if(callback){
                callback(node);
            }
            node.children.forEach(child => {
                q.push(child);
            })
        }
    }

    add(data, toData, traverse) {
        let child = this.node(data),
            parent = null,
            exists,
            callback = function (node) {
                if (node.data == toData) {
                    exists = node.data == child.data || node.children.some(n => n.data === child.data);
                    parent = node;
                }
            };
        
        this.contains(traverse,callback);

        if (parent) {
            if(!exists){
                parent.children.push(child);
            }
            
            Vue.set(child, 'parent', parent.data);
        } else {
            throw Error('cannot add node to a non-existent parent.');
        }

    }


    contains(traverse, callback) {
        traverse.apply(this, [this._root,callback]);
    }

}