import axios from 'axios'
import * as _ from 'lodash'

export default async function ({ store }) {
  let recettes = await axios.get("https://spreadsheets.google.com/feeds/list/19gaUAWanATcl2jOHejnTnKGMRauVDjd-rvJiX3t3Exw/1/public/values?alt=json")
    .then(response => {
      var allRecettes = []
      _.each(response.data.feed.entry, function(item, index){
          var textObj = {
            id:item.gsx$id.$t,
            label:item.gsx$label.$t,
          }
          allRecettes.push(textObj)
      })
      store.commit('populateData', allRecettes)
      
  })

  let ingredients = await axios.get("https://spreadsheets.google.com/feeds/list/19gaUAWanATcl2jOHejnTnKGMRauVDjd-rvJiX3t3Exw/2/public/values?alt=json")
    .then(response => {
      var allIngredients = []
      _.each(response.data.feed.entry, function(item, index){
          var textObj = {
            idrecette:item.gsx$idrecette.$t,
            label:item.gsx$label.$t,
          }
          allIngredients.push(textObj)
      })
      store.commit('populateIngredients', allIngredients)
      
  })


  return true
} 