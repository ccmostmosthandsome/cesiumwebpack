<template>
    <div v-if="displayProgram" id="program">

        <div class="row">
            <div class="header-section text-center">
                <p>Program dingo: {{program}} </p>
                <h2>Koans{{hasProgram}}</h2>
                <p>A kōan (公案) (/ˈkoʊ.ɑːn/; Chinese: 公案; pinyin: gōng'àn, [kʊ́ŋ ân]; Korean: 공안 kong'an; Vietnamese: công án) is a story, dialogue, question, or statement, which is used in Zen practice to provoke the "great doubt" and test a student's progress.
                    <br> Develop and map your life with the following koans.</p>
                <hr class="bottom-line">
                <div class="container">
                    <div class="row">
                        <div class="col-md-4 col-sm-6 padleft-right" v-for="(koan, key) in koans" :key="key">  
                            <span v-if="hasProgram">
                                <!-- Check vuex state map for program name-->
                                <span v-if="program[Object.keys(koan)[0]]">
                                    <client-flip-image :image="val" v-for="(val, key) in koan" :key="key" :disabled="false">
                                        <h3>{{key}}</h3>
                                        <p>{{val.description}}</p>
                                        <button class="btn btn-default btn-xs" @click="subscribe(val,key)">Unsubscribe {{key}}</button>
                                    </client-flip-image>
                                </span>
                                <span v-else>
                                    <client-flip-image :image="val" v-for="(val, key) in koan" :key="key" :disabled="true">
                                        <h3>{{key}}</h3>
                                        <p>{{val.description}}</p>
                                    </client-flip-image>
                                </span>
                            </span>
                            <span v-else>
                                    <client-flip-image :image="val" v-for="(val, key) in koan" :key="key" :disabled="false">
                                        <h3>{{key}}</h3>
                                        <p>{{val.description}}</p>
                                        <button class="btn btn-default btn-xs" @click="subscribe(val,key)" >Subscribe {{key}}</button>
                                    </client-flip-image>
                            </span>

                        </div>

                    </div>
                </div>

            </div>
        </div>

    </div>
</template>

<script>
import clientFlipImage from '../images/clientFlipImage.vue';
import mixRulesEngine from '../../mixins/mixRulesEngine';
import mixPersistence from '../../mixins/mixPersistence';
import mixAuth from '../../auth/mixAuth';

export default {
    components: { clientFlipImage },
    computed: {
        active() {

        },
        contentScrollStatus() {
            return this.$store.getters.scrollStatus('content')
        },
        displayProgram() {
            return this.programScrolled && this.$store.getters.hasMissionStatement
        },
        answeredQuestions() {
            return this.$store.getters.getAnsweredQuestions;
        },
        koans() {
            let conditions = this.ruleConditions()
            console.log("conditions dingo? ", conditions);
            let actions = this.ruleActions(conditions)
            return actions;

        },
        hasProgram() {
            return this.$store.getters.hasProgram;

        },
        program() {
            return this.$store.getters.program;
        }
    },
    data: function() {
        return {
            programScrolled: { isScrolled: false }
        }
    },
    methods: {
        subscribe(selected, name) {
            selected.name = name;
            Promise.all(selected.koans.map(koan => {
                return this.persistenceGet('services/program/find/' + koan);
            }))
                .then(response => {
                    let program = {
                        userId: this.account.sub,
                        koans: response,
                        hasProgram: this.hasProgram,
                        name: selected.name
                    }
                    this.$store.dispatch('subscribeProgram', program);

                })
                .then(response => this.$store.dispatch('fetchUserProgram'))
                .then(response => {

                })

        }
    },
    mixins: [mixRulesEngine, mixPersistence, mixAuth],
    name: 'casProgram',
    watch: {
        contentScrollStatus: function(newvalue) {
            console.log("Cas Program page Y Offset", this.programScrolled);
            newvalue.pageYOffset >= 250 ? this.$set(this.programScrolled, 'isScrolled', true) : ''
            console.log("Cas Program page set", this.programScrolled);

        }
    }
}
</script>

<style>
.bottom-line {
    width: 25px;
    height: 3px;
    background-color: rgb(99, 122, 145);
}

.padleft-right {
    padding-left: 5px;
    padding-right: 0px;
}

#program {
    padding-left: 15px
}


</style>
