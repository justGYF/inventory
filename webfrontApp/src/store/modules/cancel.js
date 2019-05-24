
const state = {
    source: {
        token: false,
        cancel: false
    }
}

const getters = {
    getSource: state => state.source
}

const mutations = {
    ['changeSource'] (state, {token, cancel}) {
        state.source.token = token
        state.source.cancel = cancel
    }
}

const actions = {
    changeSource: ({commit}, payload) => {
        commit('changeSource', payload)
    }
}


export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}