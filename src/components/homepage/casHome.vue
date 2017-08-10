<style>
    .casHome {
        padding-bottom: 50px;
    }
    .missionStatement{
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .missionStatement__header{
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
<script>
import casContract from './casContract.vue';
import mixSchemaForms from '../../mixins/mixSchemaForms'
export default {
    components: { casContract },
    name: 'nrlHome',
    computed: {
        contentScrollStatus() {
            return this.$store.getters.scrollStatus('content')
        }
    },
    data: function () {
        return {
            showContract: false
        }
    },
    mixins: [mixSchemaForms],
    watch: {
        contentScrollStatus: function (newvalue) {
            console.log("Cas Hpme page Y Offset", newvalue.pageYOffset);
            newvalue.pageYOffset >= 420 ? this.showContract = true : ''
            /*
            if (newvalue.pageYOffset >= 100) {
                this.fixedPosition = true;
                this.panelStyle = ['stick', 'dashPanel'];
            } else {
                this.fixedPosition = false;
            }*/

        }
    }
}
</script>
<template>
    <div class="casHome">
        <div class="jumbotron">
            <h1 class="display-3">Castello</h1>
            <p class="lead"> Mapping Your Life, Building your Defenses</p>
        </div>
    
        <cas-contract></cas-contract>
        <div  v-if="showContract" > 
            <div class="missionStatement" >
                <h3 class="missionStatement__header">Mission Statement</h3>
            </div> 
            <div class="missionStatement">
                <p class="mionStatement__description">7 Habits of Effective People Life Mission</p>
            </div>
            <div class="missionStatement" style="background: rgba(255, 255, 255, 0.5);" >
                <vue-form-generator :schema="contractMissionStatementSchema" :model="contractMissionStatementModel"></vue-form-generator>
            </div>
            
        </div>
        
    </div>
</template>