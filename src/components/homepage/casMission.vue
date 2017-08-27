<template>
    <div v-if="showContract" id="mission">
    
        <div class="missionStatement">
            <h3 class="missionStatement__header">Mission Statement</h3>
            <span v-if="showMissionStatementContent || updateMissionStatementContent">
                &nbsp; &nbsp;
                <button class="btn btn-default" @click="flipMissionStatus">
                    <i class="fa fa-pencil fa-2x"></i>
                </button>
            </span>
        </div>
        <div class="missionStatement">
            <p class="mionStatement__description">7 Habits of Effective People Life Mission</p>
    
        </div>
        <hr class="bottom-line">
        <div v-if="createMissionStatementContent">
            <cas-mission-create @missionCreate="createMission"></cas-mission-create>
        </div>
        <div v-if="showMissionStatementContent">
            <cas-mission-read></cas-mission-read>
        </div>
        <div v-if="updateMissionStatementContent">
            <cas-mission-update @missionUpdate="updateMission"></cas-mission-update>
        </div>
    
    </div>
</template>

<script>
import mixSchemaForms from '../../mixins/mixSchemaForms';
import mixAuth from '../../auth/mixAuth';
import mixPersistence from '../../mixins/mixPersistence';
import casMissionCreate from './casMissionCreate.vue';
import casMissionUpdate from './casMissionUpdate.vue';
import casMissionRead from './casMissionRead.vue';
export default {
    components: {
        casMissionCreate,
        casMissionUpdate,
        casMissionRead
    },
    computed: {
        contentScrollStatus() {
            return this.$store.getters.scrollStatus('content')
        },
        mission() {
            return this.$store.getters.getMission;
        },
        createMissionStatementContent() {
            return this.showContract && !this.$store.getters.hasMissionStatement && !this.updateMissionContent
        },
        showMissionStatementContent() {
            return this.showContract && this.$store.getters.hasMissionStatement && !this.updateMissionContent
        },
        updateMissionStatementContent() {
            return this.showContract && this.$store.getters.hasMissionStatement && this.updateMissionContent
        }
    },
    data: function () {
        return {
            showContract: false,
            updateMissionContent: false
        }
    },
    methods: {
        createMission(contractMissionStatementModel) {
            this.persistencePost('services/mission/add', contractMissionStatementModel)
                .then(response => this.$store.dispatch('fetchMissionStatement'))
        },
        updateMission(contractMissionStatementModel) {
            this.persistencePut('services/mission/update', contractMissionStatementModel)
                .then(response => this.$store.dispatch('fetchMissionStatement'))
                .then(response => this.updateMissionContent = false);
        },
        flipMissionStatus() {
            this.updateMissionContent = !this.updateMissionContent;

        }
    },
    mixins: [mixSchemaForms, mixAuth, mixPersistence],
    name: 'casMission',
    props: ['hasAnsweredQuestions'],
    watch: {
        contentScrollStatus: function (newvalue) {
            console.log("Cas Hpme page Y Offset", newvalue.pageYOffset);
            newvalue.pageYOffset >= 200 ? this.showContract = true : ''

        }
    }
}
</script>

<style>
#mission {

    background-color: rgb(247, 247, 247);
    padding-left: 15px;
    padding-bottom: 15px;
}

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

.bottom-line {
    width: 25px;
    height: 3px;
    background-color: rgb(99, 122, 145);
}
</style>
