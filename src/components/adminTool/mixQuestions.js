import _ from 'lodash';

export default {
    methods: {
        addSelectionValue(form,title) {
            //Mutates state
            let self = this;
            self.title = title;
            let model = form + 'Model',
                schema = form + 'Schema';
            let questionNumbers = this.addSelectionValue_getIndexes(model);
            this.addSelectionValue_setNewValue(questionNumbers, model, schema)
        },
        addSelectionValue_getIndexes(model) {
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
        },
        addSelectionValue_setNewValue(numbers, model, schema) {
            numbers.forEach((questionIndex) => {
              //  console.log("question index=>", questionIndex, !this.contractQuestionModel["qcontractValue_" + questionIndex], this.contractQuestionModel);
              console.log("this model",this[model],"title",this.title); 
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
        },
        questionsGrid() {

        },
        getQuestions() {
            let request = new Request('/services/questions/get', {
                method: 'GET',
                mode: 'cors',
                headers: this.getAuthHeader()
            });

            fetch(request)
                .then((response) => {
                    if(response.ok){
                        return response.json()
                    } else {
                        console.log("Get Questions failed for admin tool",response);
                    }
                    
                })
                .then(response =>{
                    console.log("dingo");

                    return this.makeGridDataStructure('adminQuestions',response);
                })

        }
    }
}