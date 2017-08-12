<template>
    <div v-if="showContract && hasAnsweredQuestions">
        
        <div class="missionStatement">
            <h3 class="missionStatement__header">Mission Statement</h3>
        </div>
        <div class="missionStatement">
            <p class="mionStatement__description">7 Habits of Effective People Life Mission</p>
        </div>
        <div class="missionStatement" style="background: rgba(255, 255, 255, 0.5);">
            <vue-form-generator :schema="contractMissionStatementSchema" :model="contractMissionStatementModel"></vue-form-generator>
        </div>
        <button class="btn btn-success" @click="submitMission">Submit</button>
        {{mission}}
    </div>
</template>

<script>
import mixSchemaForms from '../../mixins/mixSchemaForms';
import mixAuth from '../../auth/mixAuth';
import mixPersistence from '../../mixins/mixPersistence';
export default {
    computed: {
        contentScrollStatus() {
            return this.$store.getters.scrollStatus('content')
        },
        mission(){
            return this.$store.getters.getMission;
        }
    },
    data: function () {
        return {
            showContract: false
        }
    },
    methods: {
        submitMission(){
            this.persistencePost('services/mission/add', this.contractMissionStatementModel)
                .then(response =>  this.$store.getters.getMission);
                
        }
    },
    mixins: [mixSchemaForms,mixAuth,mixPersistence],
    name: 'casMission',
    props: ['hasAnsweredQuestions'],
    watch: {
        contentScrollStatus: function (newvalue) {
            console.log("Cas Hpme page Y Offset", newvalue.pageYOffset);
            newvalue.pageYOffset >= 420 ? this.showContract = true : ''

        }
    }
}
</script>

<style>
    .missionStatement {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .missionStatement__header {
        font-family: 'Josefin Sans', sans-serif;
        font-weight: 500;
        font-size: 45px;
        text-transform: uppercase;
    }

    .missionStatement__description {
        margin-top: 20px;
        line-height: 25px;
        color: #8e8e8e;
        margin-bottom: 50px;
    }
</style>
