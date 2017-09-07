import Vue from 'Vue';
import Vuex from 'vuex';
import jwtDecode from 'jwt-decode';
import { getAuthHeader } from '../../auth/modAuth';

const account = jwtDecode(localStorage.getItem('token'));

const state = {
    koans: {},
    koanNameModel: {
        name: null,
        koanId: Math.floor(Math.random() * 3307)
    },
    koanNameSchema: {
        fields: [
            {
                type: "input",
                label: "Koan Name",
                model: "name"
            }, {
                type: "input",
                label: "Koan ID",
                model: "koanId"
            }
        ]
    },
    koanCourseFactory: {},
    questionModel: {
        id: 1,
        question: null,
        coursetype: null,
        modtype: null,
        koan: null,
        answerId: null,
        explanation: null,
        questionValue_1: null,
    },
    questionSchema: {
        fields: [
            {
                type: "select",
                label: "Koan",
                model: "koan",
                values: []
            },
            {
                type: "select",
                label: "coursetype",
                model: "coursetype",
                values: []
            },
            {
                type: "editor",
                label: "Create Question,",
                model: "question",
                height: 200,
                content: "<h3>Question Editor</h3>"

            },
            {
                type: "select",
                label: "modtype",
                model: "modtype",
                values: []
            },
            {
                type: "input",
                label: "Correct Question #",
                model: "answerId",

            },
            {
                type: "editor",
                label: "Explanation",
                model: "explanation",
                height: 200,
                content: "<h3>Provide an Explanation</h3>"
            },
            {
                type: "input",
                label: "Question 1",
                model: "questionValue_1"
            }
        ]
    }
}

const mutations = {
    HASH_PROGRAM(state, programs) {
        programs.forEach((program) => {
            console.log("Dingo getting coputed property setting state ->", program);

            Vue.set(state.koans, program.koan, { id: program.id, focusAreas: [] });
            console.log("Dingo getting coputed property set state ->", state.koans);

            state.koans[program.koan].focusAreas = Object.keys(program.grades).map(key => {
                return { course: key }
            });

        })
    },
    INITIALIZE_KOAN_COURSES(state, koan) {
        state.questionSchema.fields = state.questionSchema.fields.map(question => {
            if (question.values) {
                Vue.set(question, 'values', state.koans[koan].focusAreas);
            }
            return question;
        })
    },
    MAKE_KOAN_COURSE(state, koan) {
        console.log("koan factory setting", state, koan.id);
        if (!state.koanCourseFactory[koan.id]) {
            console.log("koan factory setting", state.koanCourseFactory, koan.id);

            Vue.set(state.koanCourseFactory, koan.id, {});
            console.log("koan factory setting created id", state.koanCourseFactory, koan.id, koan);

            Vue.set(state.koanCourseFactory[koan.id], 'model', koan.model);

            console.log("koan factory setting created model", state.koanCourseFactory, koan.id);

            Vue.set(state.koanCourseFactory[koan.id], 'schema', koan.schema);
            console.log("koan factory setting created koan", state.koanCourseFactory, koan.id);

        } else {
            console.log("koan aleady exists!");
        }
    },
    APPEND_KOAN_FOCUS_AREA(state, koan) {

                    

            let questionNumbers = Object.keys(state.koanCourseFactory[koan.id].model)
                .reduce((acc, curr) => {
                    var indexNum = +curr.split('_')[1]
                    if (!isNaN(indexNum)) {
                        indexNum++
                        acc.push(indexNum);
                    }
                    return acc;
                }, []);
            
            
            questionNumbers.forEach((questionIndex) => {
                //  console.log("question index=>", questionIndex, !this.contractQuestionModel["qcontractValue_" + questionIndex], this.contractQuestionModel);
                if (state.koanCourseFactory[koan.id].model["selectvalue_" + questionIndex] === undefined) {
                    Vue.set(state.koanCourseFactory[koan.id].model,"selectvalue_" + questionIndex,null);
                    console.log("koan factory line setting created model", state.koanCourseFactory, koan);
                    
                    state.koanCourseFactory[koan.id].schema.fields.push({                       
                        "type": 'input',
                        "model": 'selectvalue_' + questionIndex,
                        "label": koan.title || 'Question ' + questionIndex

                    });
                    
                    console.log("koan factory line created fields", state.koanCourseFactory, koan.id);
                    

                }


            })
            
            //    this.addSelectionValue_setNewValue(questionNumbers, model, schema)
        

        function addSelectionValue_getIndexes(model) {
            console.log("dingo")
            return Object.keys(this[model])
                .reduce((acc, curr) => {
                    var indexNum = +curr.split('_')[1]
                    if (!isNaN(indexNum)) {
                        indexNum++
                        acc.push(indexNum);
                    }
                    return acc;
                }, []);
        }

        function addSelectionValue_setNewValue(numbers, model, schema) {
            numbers.forEach((questionIndex) => {
                //  console.log("question index=>", questionIndex, !this.contractQuestionModel["qcontractValue_" + questionIndex], this.contractQuestionModel);
                console.log("this model", this[model], "title", this.title);
                if (this[model]["selectvalue_" + questionIndex] === undefined) {
                    this[model]["selectvalue_" + questionIndex] = null;
                    this[schema].fields.push(
                        {
                            "type": 'input',
                            "model": 'selectvalue_' + questionIndex,
                            "label": this.title || 'Question ' + questionIndex

                        }
                    )

                }


            })
        }

    }

}

const actions = {
    addCourseFocusArea: ({commit},state,title) => commit('APPEND_KOAN_FOCUS_AREA',state),
    buildKoan: ({ commit }, state) => commit('MAKE_KOAN_COURSE', state),
    setQuestionSchema:  ({ commit }, state) => commit('INITIALIZE_KOAN_COURSES', state),
    setAllKoans: function ({ commit }, state) {
        return new Promise((resolve, reject) => {
            const request = new Request('services/program/koans', {
                method: 'GET',
                mode: 'cors',
                headers: getAuthHeader()
            })

            fetch(request)
                .then(response => {
                    if (!response.ok) {
                        return reject(response)
                    }

                    return response.json()
                })
                .then((response, err) => {
                    if (!err) {
                        console.log("Dingo getting coputed property in promise ->", response);
                        commit('HASH_PROGRAM', response);
                        resolve(response);
                    }
                })
                .catch(response => resolve(response))
        });


    }
}


const getters = {
    koanCourses: (state, getters) => (koan) => {
        console.log("Dingo getting coputed property in store =>", koan, state.koans);
        return state.koans[koan].focusAreas;
    },
    koanCourseFactory(state,getters){
        return state.koanCourseFactory;
    },
    koanInProgress: (state, getters) => (id) => {
        console.log("koan factory getting", id);
        return state.koanCourseFactory[id];
    },
    questionModel(state) {
        return state.questionModel
    },
    questionSchema(state, getters) {
        return state.questionSchema
    },
    koanNameModel(state, getters) {
        return state.koanNameModel;
    },
    koanNameSchema(state, getters) {
        return state.koanNameSchema;
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}