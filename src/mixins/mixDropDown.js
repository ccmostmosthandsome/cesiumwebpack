export default{
    methods: {
        fetchResults(payload){
           
            let fetchObject = {
                'default': function(){
                    return "No matching specification for type";
                },
                'Start Koans': function(){

                    return this.resultSpecificationQuery(payload);
                }.bind(this)
            }

            return (fetchObject[payload.text] || fetchObject.default)();
        },
        resultSpecificationQuery(payload){
            let fetchSpecificationQuery = {
                'course' : function(){
                    console.log("switching payload text dingo",payload);
                    return this.$store.dispatch("getByCourse", payload);
                }.bind(this),
                'koan' : function(){
                    console.log("Getting questions by Koan",payload);
                    return this.$store.dispatch("getQuestionsByKoan", payload);
                }.bind(this),
                'module' : function(){
                    return this.$store.dispatch("getQuestionsByFocusArea", payload);
                }.bind(this),
                'default'(){
                    console.log("switching payload text dingo",payload.id);
                    return "No matching specificaiton for query"
                }
            }

            return (fetchSpecificationQuery[payload.id] || fetchSpecificationQuery.default)()
        }

    }
}