const state = {
  proSrc:'',

}

const mutations = {
  setProSrc(state , param){
      state.proSrc = param.src
  },
  setLoadingDom(state , context){
      state.loadingDom = context.$loading({
          lock: true,
          text: '正在努力启动服务中，请稍后...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
      });
  },
    closeLoading(state , context){
        state.loadingDom.close();
    }
}

const actions = {
    addProSrcMethods({ state, commit }, param){
        commit('setProSrc' , param)
    },
    showLoading({ state, commit }, param){
      commit('setLoadingDom' , param)
    },
    hideLoading({ state, commit }, param){
      commit('closeLoading' , param)
    }
}

export default {
  state,
  mutations,
  actions
}
