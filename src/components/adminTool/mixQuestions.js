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
                    return response.json()
                })
                .then(response =>{
                    console.log("dingo");

                    //TODO: Use lodash utility for this.
                    let mockColumns = response.reduce((acc,curr)=>{
                        Object.keys(curr).forEach(key=>{
                            !acc[key] ? acc.sum++ : acc = acc;
                            !acc[key] ? acc[key] = {"display" : key, "sort" : false, "order" : acc.sum} : acc[key] = acc[key];

                        });
                        
                        return acc; 
                    },{sum: 0, storeid: "adminQuestions"})

                    let rows = response.map((question)=>{

                        return _.pick(question,Object.keys(mockColumns));
                        
                    });
                    let mockRows = {
                       storeid: "adminQuestions",
                       rows:  rows
                    }; 
                    console.log("dingo");
                    this.$store.dispatch('changeColumns',{name: mockColumns});
                    this.$store.dispatch('changeRows',{name: mockRows});
                    return 
                })
                .then(function(){
                    console.log("dingo ", this.$store.getters.getColState("adminQuestions"));
                }.bind(this));
        }
    }
}