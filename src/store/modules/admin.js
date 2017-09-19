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

    koanModel: {
        id: 1,
        question: null,
        coursetype: null,
        modtype: null,
        koan: null,
        answerId: null,
        explanation: null,
        questionValue_1: null,
    },
    koanSchema: {
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
    },
    questionModel: {
        koan: null,
        coursetype: null,
        // modtype: null,
        id: null,
        question: null,
        answerId: null,
        explanation: null,
        questionValue_1: null,


    },
    questionSchema: {
        id: null,
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
                values: [],
                disabled: true
            },
            {
                type: "select",
                label: "modtype",
                model: "modtype",
                disabled: true,
                values: []
            },
        
            {
                type: "editor",
                label: "Create Question,",
                model: "question",
                height: 200,
                content: "<h3>Question Editor</h3>"

            },

            //  values: this.getFocusAreas({"course": this.questionFormModel.coursetype, "koan": this.questionFormModel.koan})

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
    UPDATE_QUESTION_SCHEMA(state,schema) {
        console.log("updating schema dingo");
        Vue.set(state,'questionSchema',schema)
    },
    UPDATE_QUESTION_MODEL(state,model) {
        Vue.set(state,'questionModel',model)
    },
    SUBMIT_SELECTION_FIELD(state, questionPostStatus) {
        state.questionPostStatus = questionPostStatus;
    },
    BUILD_NEW_QUESTION_AS_SELECTION_FIELD(state, model) {
        console.log("Running mutation...",state.questionModel);
        state.questionModel.values = state.questionSchema.fields.reduce(function (acc, curr) {

            //Check if an additional value
            let value = +curr.model.split('_')[1];
            //Grab the value's 

            if (!isNaN(value)) {
                let questionIndexNumber = parseInt(curr.label.split(' ')[1]);
                let questionId = Math.floor(Math.random() * 9999);
                acc.push({
                    name: state["questionModel"][curr.model],
                    valueId: questionId
                });
                //If the question index matches the user's correct answer# than replace the answerId with the question-value's questionId. 
                questionIndexNumber === parseInt(state.questionModel.answerId) ? state.questionModel.answerId = questionId : '';

                console.log("WTF??", state.questionModel);
            }
            return acc;
        }.bind(this), []);
    },
    HASH_PROGRAM(state, programs) {
        console.log("hashing programs dingo...", programs);

        programs.forEach(program => {
            console.log("hashing programs koan dingo...", programs);
            if (!state.koans[program.koan]) {
                if (program.koan == 'GED') {
                    console.log("GED shit logging ", program);
                }
                console.log("hashing programs koan if block pre dingo...", programs, "state ", state.koans, " koan ", program.koan);
                Vue.set(state.koans, program.koan, { courses: {} });
                console.log("hashing programs koan if block post dingo...", programs, "state ", state.koans, " koan ", program.koan);

            }
            //set courses
            console.log("hashing programs course dingo...", state.koans[program.koan]['courses'], 'course', program.courses[0].course);
            if (!state.koans[program.koan]['courses'][program.courses[0].course]) {
                console.log("hashing programs course dingo...", state.koans);
                Vue.set(state.koans[program.koan].courses, program.courses[0].course, { grade: 0, focusAreas: {} })
            }
            //set focus areas
            console.log("hashing programs focus area dingo...", state.koans[program.koan]['courses']);
            let coursePath = state.koans[program.koan]['courses'][program.courses[0].course];
            console.log("hashing programs focus area dingo...", coursePath);

            if (program.focusAreas && program.focusAreas.length) {
                console.log("hashing programs focus area dingo if path...", coursePath);
                if (program.koan == 'GED') {
                    console.log("hashing GED koans", state.koans, " focus area ", program.focusAreas);
                    console.log("hashing ", state.koans, program.focusAreas);
                    console.log("hashing ", program.focusAreas);
                }
                program.focusAreas.forEach(focusArea => {
                    console.log("hashing programs focus area dingo if path...", coursePath);
                    if (!coursePath['focusAreas'][focusArea.focusArea.trim()]) {
                        console.log("hashing ", program.focusAreas)
                        console.log("hashing ", program.focusAreas)

                        console.log("hashing ", program.focusAreas)
                        Vue.set(state.koans[program.koan]['courses'][program.courses[0].course]['focusAreas'], focusArea.focusArea.trim(), { grade: 0 })
                        console.log("hashing GED post - koan ", state.koans);
                    }
                })
            }
            console.log("hashed program dingo...", state.koans);


        })




    },
    INITIALIZE_KOAN_COURSES(state, koan) {
        state.koanSchema.fields = state.koanSchema.fields.map(question => {
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
    APPEND_QUESTION(state, question = {}) {

        let questionNumbers = Object.keys(state.questionModel)
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
            if (state.questionModel["selectvalue_" + questionIndex] === undefined) {
                Vue.set(state.koanModel, "selectvalue_" + questionIndex, null);
                console.log("koan factory line setting created model", state.koanModel, question);

                state.questionSchema.fields.push({
                    "type": 'input',
                    "model": 'selectvalue_' + questionIndex,
                    "label": question.title || 'Selection ' + questionIndex

                });

                console.log("koan factory line created fields", state.questionSchema, state.questionModel);


            }


        })

        //    this.addSelectionValue_setNewValue(questionNumbers, model, schema)







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
                Vue.set(state.koanCourseFactory[koan.id].model, "selectvalue_" + questionIndex, null);
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
    addSelection: ({commit}, state) => commit('APPEND_QUESTION',state),
    updateQuestionModel: ({commit},state) => commit('UPDATE_QUESTION_MODEL',state),
    updateQuestionSchema: ({commit},state) => commit('UPDATE_QUESTION_SCHEMA',state),
    postQuestionSelectionField: ({ commit }, state) => {
        return new Promise((resolve, reject) => {
            state.id = Math.floor(Math.random() * 30000);
            state.questionId = Math.floor(Math.random() * 33007);
            state.loading = true;
            let request = new Request('/services/questions/add', {
                method: 'POST',
                mode: 'cors',
                redirect: 'follow',
                body: JSON.stringify(state),
                headers: getAuthHeader()
            });

            fetch(request)
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                    reject(response)
                })
                .then(response => {
                    state.loading = false;
                    state.questionPostSuccess = true;
                })
                .catch(response => {
                    state.questionPostSuccess = false;
                    resolve(response);
                })
        })
    },
    buildQuestionSelectionField: ({ commit }, state) => commit('BUILD_NEW_QUESTION_AS_SELECTION_FIELD', state),
    addCourseFocusArea: ({ commit }, state, title) => commit('APPEND_KOAN_FOCUS_AREA', state),
    buildKoan: ({ commit }, state) => commit('MAKE_KOAN_COURSE', state),
    setQuestionModel: ({ commit }, state) => commit('HASH_QUESTION_MODEL', state),
    setQuestionSchema: ({ commit }, state) => commit('HASH_QUESTION_SCHEMA', state),
    setKoanSchema: ({ commit }, state) => commit('INITIALIZE_KOAN_COURSES', state),
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
    questionSchema: (state, getters) => {
        return state.questionSchema;
    },
    questionModel: (state, getters) => {
        return state.questionModel;
    },
    allKoans: (state, getters) => {
        return state.koans;
    },
    koanNames: (state, getters) => {

        return Object.keys(state.koans);
    },
    courseNames: (state, getters) => (koan) => {
        console.log("Dingo getting coputed property in store =>", koan);
        if (koan == null) {
            return []
        } else {
            return Object.keys(state.koans[koan].courses);
        }

    },
    focusAreaNames: (state, getters) => (focusObject) => {
        if (focusObject.course === null) {
            return [];
        } else {
            return Object.keys(state.koans[focusObject.koan].courses[focusObject.course].focusAreas);
        }

    },
    koanCourseFactory(state, getters) {
        return state.koanCourseFactory;
    },
    koanInProgress: (state, getters) => (id) => {
        console.log("koan factory getting", id);
        return state.koanCourseFactory[id];
    },
    koanModel(state) {
        return state.koanModel
    },
    koanSchema(state, getters) {
        return state.koanSchema
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