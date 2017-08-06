<template>
    <div class="panel-group">
        <slot></slot>
    </div>
</template>

<script>
import {coerce} from '../../utilities'
export default {
    name: "clientAccordion",
    methods: {
        coerce: {
            boolean: val => (
                typeof val === 'string' ? val === '' || val === 'true' ? true :
                    (val === 'false' || val === 'null' || val === 'undefined' ? false : val) :
                    val
            )
        }
    },
    props: {
        type: {
            type: String,
            default: null
        },
        oneAtAtime: {
            type: Boolean,
            coerce: coerce.boolean,
            default: false
        }
    },
    created() {
        this._isAccordion = true
        this.$on('isOpenEvent', (child) => {
            if (this.oneAtAtime) {
                this.$children.forEach((item) => {
                    if (child !== item) {
                        item.isOpen = false
                    }
                })
            }
        })
    }
}
</script>

<style>

</style>
