import Vue from 'vue'
import Vuex from 'vuex'
import { cancel } from './modules'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        cancel
    }
})

export default store
