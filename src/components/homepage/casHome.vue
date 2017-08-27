<style>
.casHome {
    padding-bottom: 50px;
}

</style>
<script>
import casContract from './casContract.vue';
import casKoanTree from '../questions/casKoanTree.vue'
import casDisplay from './casDisplay.vue';
import casMission from './casMission.vue';
import casProgram from './casProgram.vue';
import mapImage from '../../images/metroMap.jpg';
import mixAuth from '../../auth/mixAuth';
import store from '../../store/index.js';
export default {
    beforeRouteEnter: function (to, from, next) {
        store.dispatch('fetchContractAnswers')
            .then(response => store.dispatch('fetchContractQuestions'))
            .then(response => store.dispatch('questionsMerge'))
            .then(response => store.dispatch('fetchMissionStatement'))
            .then(response => store.dispatch('fetchUserProgram'))
            .then(response => next());
    },
    components: { casContract, casDisplay, casMission, casProgram, casKoanTree },
    name: 'nrlHome',
    computed: {
        hasAnsweredQuestions: {
            get: function() {
                this.isAnswered = this.$store.getters.isContractRegistered;
                return this.isAnswered;
            },
            set: function(isAnswered) {
                console.log("setting is asnwered",this,isAnswered);
                this.isAnswered = isAnswered
            }

        }
    },
    data: function () {
        return {
            showContract: false,
            isAnswered: false
        }
    },
    methods: {
        answer(val){
            console.log("Picked up event");
            store.dispatch('fetchContractAnswers')
                .then(response=> this.hasAnsweredQuestions = this.$store.getters.isContractRegistered);
        }
    },
    mixins: [mixAuth],
    watch: {
        contentScrollStatus: function (newvalue) {
            console.log("Cas Hpme page Y Offset", newvalue.pageYOffset);
            newvalue.pageYOffset >= 420 ? this.showContract = true : ''

        }
    }
}
</script>
<template>
    <div class="casHome">
        <p>dingo koan tree: <cas-koan-tree/></p>
        <cas-display></cas-display>
        <cas-contract @questionAnswered="answer" :hasAnsweredQuestions="hasAnsweredQuestions"></cas-contract>
        <cas-mission :hasAnsweredQuestions="hasAnsweredQuestions"></cas-mission>
        <cas-program></cas-program>
    </div>
</template>