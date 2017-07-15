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
                    let mockColumns = response.reduce((acc,curr)=>{
                        Object.keys(curr).forEach(key=>{
                            !acc[key] ? acc.sum++ : '';
                            !acc[key] ? acc[key] = {"display" : key, "sort" : false, "order" : acc.sum} : acc[key] = acc[key];

                        });
                        
                        return acc; 
                    },{sum: 0, storeid: "adminQuestions"})
                    let mockRows = {
                       storeid: "adminQuestions",
                       rows:  response
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