<template>
    <div >
        <div class="container">
            <div class="row">
                <div class="col-md-12" style="padding-left: 0;">
                    <div :class="[panelStyle]" style="background: #ffffff ; color: #787878 ;">
                        <nav class="navbar navbar-light justify-content-between">
                            <slot></slot>
                            </hr>
                            <form class="form-inline">
                                <input class="form-control mr-sm-2" type="text" placeholder="Search">
                                <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                            </form>
                        </nav>
    
                    </div>
                </div>
            </div>
    
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        contentScrollStatus() {
            return this.$store.getters.scrollStatus('content')
        }
    },
    data: function () {
        return {
            fixedPosition: false,
            classArray: ['stick', 'dashPanel'],
            panelStyle: ['nonStick', 'dashPanel']
        }
    },
    name: 'clientDashboard',
    methods: {
        handleScroll(e) {
            console.log("Caught Scroll in dashboard", e);
        }
    },
    watch: {
        contentScrollStatus: function (newvalue) {
            if (newvalue.pageYOffset >= 50) {
                this.fixedPosition = true;
                this.panelStyle = ['stick', 'dashPanel'];
            } else {
                this.fixedPosition = false;
            }

        }
    }
}
</script>

<style>
.stick {
    position: fixed;
    top: 62px;
    display: block;
    float: left;
    width: 70%;
}

.nonStick {
    position: static;
}


.dashPanel {
    display: block;
    z-index: 100;
    width: 75%;
    /* padding: 5px;
    color: whitesmoke; */
}


</style>
