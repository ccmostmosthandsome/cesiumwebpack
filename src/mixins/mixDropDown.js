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

                    return this.$store.dispatch("getByCourse", payload.item);
                }.bind(this),
                'default'(){
                    return "No matching specificaiton for query"
                }
            }

            return (fetchSpecificationQuery[payload.id] || fetchSpecificationQuery.default)()
        }

    }
}