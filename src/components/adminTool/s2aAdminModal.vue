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
import clientModal from '../modal/clientModal.vue'
export default {
    components: { clientModal },
    computed: {
        showModal: {
            get() {
                return this.open;
            },
            set(isOpen) {
                this.open = isOpen;
            }

        }
    },
    mounted() {
        EventBus.$on('modalSelected', function () {
            this.showModal = true;
        }.bind(this));

        EventBus.$on('event', function (input) {
            folderInput = input;
        })

    },
    methods: {
        closeModal() {
            //Handle form cleanup stuff here... No form yet
            this.$emit('formSubmitted');
            
        },
        hideModal() {
            this.$emit('formCanceled');
        },
        modelUpdated(value, schema) {
            console("model has changed...", value, schema);

        }
    },
    props: {
        open: Boolean
    }
}
</script>

<style>

</style>
