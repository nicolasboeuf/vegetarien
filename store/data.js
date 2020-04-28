export const state = () => ({

  myVar : false,
  data : {}

})

export const getters = {

  getSomething : (state, getters) => {

    var smth = state.myVar
    return myVar
  },


}

export const mutations = {

  changeSomething(state,newThing){
    state.myVar = newThing
  },

  populateData(state,datas){
    state.data = datas
  },

}

export const actions = {

  // GSHEET DATA OPERATIONS

  /*

  applyDataTypesToDatasets({state, commit, getters}){

    console.log("S-data-A-applyDataTypesToDatasets ... ")

    // get dataTypes 
    let currentDataTypes = getters['getDatasets']('dataTypes')
    console.log("S-data-A-applyDataTypesToDatasets / currentDataTypes : ", currentDataTypes)

    // TO DO 


    commit('setIsTypesApplied', true)


  },




  // reloadDatasets({state, commit, getters}){

  // },

  */

}