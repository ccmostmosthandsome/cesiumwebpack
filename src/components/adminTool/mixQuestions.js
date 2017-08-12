import _ from 'lodash';

export default {
    methods: {
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