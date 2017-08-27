<template>
              <div class="row">
    
                <div class="col-md-4">
                    <div class="pull-left imageIcon">
                        <i class="fa fa-heartbeat fa-3x"></i>
                    </div>
                    <div class="pull-right heading">
                        <h4>Motivations </h4>
                        <div v-html="mission.state.motivations">
                        </div>
                    </div>
    
                </div>
                <div class="col-md-4">
                    <div class="pull-left imageIcon">
    
                        <i class="fa fa-arrows fa-3x"></i>
    
                    </div>
                    <div class="pull-right heading">
                        <h4>Purpose</h4>
                        <div v-html="mission.state.purpose">
                        </div>
                    </div>
    
                </div>
    
                <div class="col-md-4">
                    <div class="pull-left imageIcon">
    
                        <i class="fa fa-fire fa-3x"></i>
    
                    </div>
                    <div class="pull-right heading">
                        <h4>Values</h4>
                        <div v-html="mission.state.values">
                        </div>
                    </div>
    
                </div>
            </div>
</template>

<script>
export default {
    computed: {
        mission(){
            return this.$store.getters.getMission;
        }
    },
    name: 'casMissionRead'
}
</script>

<style>
  
.pull-right {
    float: right!important;
}

.imageIcon {
    width: 20%;
}

.heading {
    width: 80%;
}

</style>
