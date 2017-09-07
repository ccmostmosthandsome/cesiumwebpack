<template>
    <div>
        
        <vue-form-generator :schema="koanInFactory.schema" :model="koanInFactory.model"></vue-form-generator>
        <button class="btn btn-sm btn-primary" @click="addFocusArea">Add Focus Area</button>
        <button class="btn btn-sm btn-success" @click="submitKoan()">Submit Focus Area</button>
        
        <hr/>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import VueFormGenerator from "../vue-form-generator";
import mixQuestions from "./mixQuestions";
import mixPersistence from '../../mixins/mixPersistence';


export default {
    data: function() {
        return {
            koanId: Math.floor(Math.random() * 3377),
            computedKoanForm: {},
            koanInFactory: {},
            koanListModel: {
                selectvalue_1: null,
                selectvalue_2: null
            },
            koanListSchema: {
                fields: [
                    {
                        type: "input",
                        label: "Course",
                        model: "selectvalue_1"
                    }, {
                        type: "input",
                        label: "Focus Area",
                        model: "selectvalue_2",

                    }
                ]
            }
        }
    },
    methods: {
        addFocusArea() {
            //this.addSelectionValue('koanList', 'Focus Area');
            console.log("adding focus area..");
            let koanPayload = {
                id: this.koanId,
                title : 'Focus Area'
            }
            this.$store.dispatch('addCourseFocusArea',koanPayload);
                        
        }

    },
    mixins: [mixQuestions,mixPersistence],
    mounted(){
        let koan = {
            id: this.koanId,
            model: this.koanListModel,
            schema: this.koanListSchema
        };
        this.$store.dispatch('buildKoan',koan);
        let form = this.$store.getters.koanInProgress(this.koanId)
        this.$set(this.koanInFactory,'model',form.model);
        this.$set(this.koanInFactory,'schema',form.schema);


    },
    name: 'casNewKoan'


}
</script>

<style>

</style>
