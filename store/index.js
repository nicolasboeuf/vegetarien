// main store index

export const state = () => ({

  // GLOABAL APP ENV
  appTitle : process.env.appTitle,
  runMode : process.env.MODE_APP,
  log : process.env.LOG,

  // FOR TRANSLATIONS
  defaultLocale: undefined, 
  locale: undefined, 
  locales: undefined, 

  appState : "selection",
  creditPopUp : false,

  recettes : {},
  ingredients : {},

  userRecettes : [],
  userInputedIngredient : []

})

export const getters = {

  // INTERNATIONALIZATION
  getDefaultLocale : (state, getters) => {
    return process.env.CONFIG_APP.defaultLocale
  },

  getCurrentLocale : (state, getters) => {
    return state.locale ? state.locale : getters.getDefaultLocale
  },

}

export const mutations = {

  // INTERNATIONALIZATION
  initLocales(state) {
    //console.log("S-index-M-initLocales ... ")

    let localesBuild = process.env.CONFIG_APP.localesBuild
    state.locales = localesBuild

    let defaultLocale = process.env.CONFIG_APP.defaultLocale
    state.locale = defaultLocale
    state.defaultLocale = defaultLocale

  },

  switchLocale(state, localeObject) {
    //console.log("S-index-M-switchLocale / localeObject : ", localeObject)
    state.locale = localeObject.code
    // this.$i18n.locale = localeObject.code
  },

  populateData(state,recettes){
    state.recettes = recettes
  },

  changeAppState(state,newState){
    state.appState = newState
  },

  changePopUpState(state,newState){
    state.creditPopUp = newState
  },

  populateIngredients(state,ingredients){
    state.ingredients = ingredients
  },

  addUserRecette(state,id){
    state.userRecettes.push(id)
  },

  removeUserRecette(state,id){
    state.userRecettes.splice(state.userRecettes.indexOf(id),1)
  },

  inputNewIngredient(state,value){
    state.userInputedIngredient.push(value)
  }

}

export const actions = {

}