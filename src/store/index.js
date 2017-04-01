import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    tableColumns: [],
    tableRows : []
}

const mutations = {
    changeColumns(state, col) {
        state.tableColumns = col
    },
    changeRows(state, row){
        state.tableRows = row
    }
}

const actions = {
    changeColumns: ({commit}, state) => commit('changeColumns',state),
    changeRows: ({commit}, state) => commit('changeRows',state)
}

const getters = {}

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
})