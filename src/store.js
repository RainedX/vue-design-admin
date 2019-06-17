import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    step: {
      payAccount: '123456',
      receiverAccount: {
        type: 'aliPay',
        number: ''
      }
    }
  },

  mutations: {
    saveStepFormData (state, payload) {
      console.log(payload)
      state.step = {
        ...state.step,
        payAccount: payload.payAccount
      }
    }
  },
  actions: {
    submitStepForm ({ commit }, { payload }) {
      commit('saveStepFormData', payload)
      router.push('/form/step-form/result')
    }
  }
})
