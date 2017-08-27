<template>
    <div>
        <div class="missionStatement">
           
            <vue-form-generator :schema="contractMissionStatementSchema" :model="contractMissionStatementModel.state"></vue-form-generator>
    
        </div>
    
        <button class="btn btn-success" @click="updateMission">Update\Submit</button>
    </div>
</template>

<script>
export default {
    methods: {
        updateMission(){
            console.log("dingo running update...")
            this.$emit('missionUpdate', this.contractMissionStatementModel.state);
        }
    },
    name: 'casMissionUpdate',
    computed: {
        contractMissionStatementModel() {
            return this.$store.getters.getMission;
        }
    },
    data: function () {
        return {
            contractMissionStatementSchema: {
                fields: [
                    {
                        type: "editor",
                        label: "Motivations",
                        model: "motivations",
                        height: 200,
                        content: this.$store.getters.getMission.state.motivations

                    },
                    {
                        type: "editor",
                        label: "Purpose",
                        model: "purpose",
                        height: 200,
                        content: this.$store.getters.getMission.state.purpose

                    },
                    {
                        type: "editor",
                        label: "Life's Values",
                        model: "values",
                        height: 200,
                        content: this.$store.getters.getMission.state.values

                    }
                ]
            }
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
</style>
