<template>
    <client-modal :showModal="showModal" :onClose="closeModal">
        <slot name="form"></slot>
        <div slot="footer" class="pull-left">
            <button @click="closeModal" class="btn btn-primary"><i class="fa fa-save fa-fw"></i>Submit Modal Form</button>
            <button @click="hideModal" class="btn btn-warning"><i class="fa fa-times fa-fw"></i> Cancel</button>
    
        </div>
    </client-modal>
</template>

<script>
import clientModal from '../layout/clientModal.vue'
export default {
    name: 'casVideoModal',
    computed: {
        get(){
            return this.open;
        },
        set(isOpen){
            this.open = isOpen
        },
        showModal(){
            return this.open;
        }
    },
    components: {clientModal},
    methods: {
        closeModal() {
            //Handle form cleanup stuff here... No form yet
            this.$emit('closeVideo');
            
        },
        hideModal() {
            this.$emit('closeVideo');
        }
    },
    props: {
        open: Boolean
    }
}
</script>

<style>

</style>
