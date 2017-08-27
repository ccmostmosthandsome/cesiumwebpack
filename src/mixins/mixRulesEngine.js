export default {
    methods: {
        ruleConditions(){
            let result = []
            let answerMap = this.answeredQuestions.reduce((acc,curr)=>{
                acc[curr.qaQuestionId] = curr['qaQuestionAnswer']
                return acc;
            },{});

            if(answerMap['1585'] === 'Accomplished and Retired (Respect)'){
                result.push('honor')
            }
            if(answerMap['1585'] === 'Accomplished and Retired (Money)'){
                result.push('materials')
            }
            if(answerMap['1585']=== 'Modest but Rich with Gods Word'){
                result.push('soul')
            } 
            if(answerMap['1585'] === 'God, Respect, Money'){
                console.log("answerMap dingo should be adding results...");
                result.push('undefined')
                console.log("answerMap dingo should be adding results...",result);
            }
            if(answerMap['1585'] === 'Young'){
                result.push('empty')
            }
            if(answerMap['2203'] === 'Homeless'){
                result.push('fierce')
            }
            if(answerMap['2203'] === 'Incarceration'){
                result.push('fierce')
            }
            if(answerMap['2203'] === 'Alone'){
                result.push('solo')
            }
            if(answerMap['2203'] === 'Depressed'){
                result.push('sunshine')
            }

            if(answerMap['2203'] === "Nursing"){
                result.push('elderSolo')
            }

            if(answerMap['2203'] === "Retired and Terrified"){
                result.push('elderFierce')
            }
            
            if(answerMap['1501'] === 'Direct Family (Children, Spouse)'){
                result.push('spend_family')
            }
            if(answerMap['1501'] === 'Immediate Family (Parents, Sibblings)'){
                result.push('spend_family')
            }
            if(answerMap['1501'] === 'Friends'){
                result.push('spend_friends')//
            }
            if(answerMap['1501'] === 'No One'){
                result.push('spend_myself')
            }

            if(answerMap['1501'] === "Those whose lives I've had a positive impact (not family)"){
                result.push('spend_world')
            }
            if(answerMap['1501'] === "The One I Love"){
                result.push('spend_lover')
            }

            if(answerMap['1501'] === "Brothers & Sisters in Arms (Co-Workers, Allies, or those you've gone to battle with"){
                result.push('spend_warriors')
            }

            if(answerMap['1818'] === 'Professional Academic'){
                result.push('is_academic')
            }
            if(answerMap['1818'] === 'Have my Paper (Bachelors or Masters)'){
                result.push('is_white')//
            }
            if(answerMap['1818'] === 'Tech (Skilled)'){
                result.push('is_blue')
            }

            if(answerMap['1818']=== "Young and In-Progress"){
                result.push('is_green')
            }
            if(answerMap['1818'] === "HS Diploma and at a Dead-End (No Skills)"){
                result.push('is_down')
            }

            if(answerMap['1818']=== "Dropout No-Skills"){
                result.push('is_wrecked')
            }
           
            if(answerMap['1818'] === "Untouchable (Convict no Skills)"){
                result.push('is_chewedUpSpitOut')
            }

            if(answerMap['1818'] === "Fallen (Convict with Skills or a Degree)"){
                result.push('is_burned')
            }

            console.log("answerMap dingo  RETURNIN...results",result);
            return result;

        },
        ruleActions(results){
            let koans = [];
            console.log("Results?",results);
             if(results.includes('is_wrecked')){
                koans.push({
                    "Quick" : {
                        koans: ['GED'],
                        description: 'Bootstraping system meant get someone back on the field.',
                        src: 'koanFierce'
                    }
                })
             }


            if(results.includes('honor') || results.includes('fierce')){
                koans.push({
                    "Honor" : {
                        koans: ['GED','ASVAB'],
                        description: 'Bootstraping program that -- as studies have shown -- gives someone the most dependable and gauranteed path to honor and financial stability. Adding more content to check that the scroll works.',
                        src: 'koanHonor'
                    }
                })
             }

             if(results.includes('is_white')){
                 koans.push({
                     "Push Through" : {
                         koans: ['finances'],
                         description: "Program build to guide one's soul through the middle class"
                     }
                 })
             }

             return koans;
        }

        




        //1501
    }
}