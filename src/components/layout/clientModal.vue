

<template>
    
    <clienthack-Modal size="lg" @ok="submit" @close="close" ref="modal" :noAutoFocus=true>
        <div class="panel panel-default">
            <div class="panel panel-header">{{modalid}}</div>
            <div class="panel panel-body">
                <vue-form-generator :schema="modalSchema" :model="modalModel"></vue-form-generator>
            </div>
            <div class="panel panel-footer">
                <slot name="footer"></slot>
            </div>
        </div>
        
        
    </clienthack-Modal>

</template>

<script>
import clienthackModal from './clienthackModal.vue';
export default {
    components: {clienthackModal},
    props: ['modalSchema', 'modalModel','open','modalid'],
    methods: {
        submit(){
            this.$emit('modalSubmitted',this.modalModel)
        },
        close(){
            this.open = false;
        },
        openModal(){

            this.$refs.modal.show();
        }
    }
}
</script>

<style>
    
</style>
