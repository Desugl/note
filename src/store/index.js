import * as Vuex from "vuex";

export default new Vuex.Store({
  state: {
    list: [],
  },
  mutations: {
    addNote(state, note) {
      state.list.unshift(note);
    },
    delNote(state, idx) {
      state.list.splice(idx, 1);
    },
    updateNote(state,data){
      state.list[data.idx].title = data.title;
      state.list[data.idx].content = data.content;
    },
    updateList(state,list){
      state.list = list
    }
  },
});
