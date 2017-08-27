<template>
    <div>
        <div class="missionStatement">
            <vue-form-generator :schema="contractMissionStatementSchema" :model="contractMissionStatementModel"></vue-form-generator>
    
        </div>
    
        <button class="btn btn-success" @click="submitMission">Submit</button>
    </div>
</template>

<script>
import mixAuth from '../../auth/mixAuth.js'
export default {
     data: function () {
        return {
            contractMissionStatementModel: {
                motivations: null,
                purpose: null,
                values: null,
                userId: this.account.sub
            },
            contractMissionStatementSchema: {
                fields: [
                    {
                        type: "editor",
                        label: "Motivations",
                        model: "motivations",
                        height: 200,
                        content: "<h3>Examples - Host a Podcast, build applications, etc.</h3>"

                    },
                    {
                        type: "editor",
                        label: "Purpose",
                        model: "purpose",
                        height: 200,
                        content: "<h3>What is your intent in this passion? I.E embrace change with technology, improve my neighborhood.</h3>"

                    },
                    {
                        type: "editor",
                        label: "Life's Values",
                        model: "values",
                        height: 200,
                        content: "<h3>Justice, Liberty, Integrity, Clear communication</h3>"

                    }
                ]
            }
        }
    },
    name: 'casMissionCreate',
    methods: {
        submitMission() {
            this.$emit('missionCreate', this.contractMissionStatementModel);
        }
    },
    mixins: [mixAuth]
}
</script>

<style>
.missionStatement {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
