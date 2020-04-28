import axios from 'axios'
import * as _ from 'lodash'

/* 

export default async function ({ store }) {
  let projects = await axios.get('/myCSV.csv')
  //let projects = await axios.get('/baseURL/myCSV.csv')
    .then(response => {
      var allProjets = []
      var tmpArray = csvToArray(response.data)
      _.each(tmpArray, function (row, index) {
        allProjets.push(row)
      })
      store.commit('data/populateData', allProjets)
      
  })
  return true
}

*/

export default async function ({ store }) {
  let projects = await axios.get("https://spreadsheets.google.com/feeds/list/1e1P7-Ge4GQHtm4oTnja7hQsOUA2DX9RGtG4nCQHhBGA/1/public/values?alt=json")
    .then(response => {
      var allProjets = []
      _.each(response.data.feed.entry, function(item, index){
          var textObj = {
            itemId:item.gsx$itemid.$t,
          }
          allProjets.push(textObj)
      })
      store.commit('data/populateData', allProjets)
      
  })
  return true
} 

function csvToArray (csvString) {
  // The array we're going to build
  var csvArray = []
  // Break it into rows to start
  var csvRows = csvString.split(/\n/)
  // Take off the first line to get the headers, then split that into an array
  var csvHeaders = csvRows.shift().split(';')

  // Loop through remaining rows
  for (var rowIndex = 0; rowIndex < csvRows.length; ++rowIndex) {
    var rowArray = csvRows[rowIndex].split(';')

    // Create a new row object to store our data.
    var rowObject = csvArray[rowIndex] = {}
    
    // Then iterate through the remaining properties and use the headers as keys
    for (var propIndex = 0; propIndex < rowArray.length; ++propIndex) {
      // Grab the value from the row array we're looping through...
      var propValue = rowArray[propIndex].replace(/^"|"$/g, '')
      // ...also grab the relevant header (the RegExp in both of these removes quotes)
      var propLabel = csvHeaders[propIndex].replace(/^"|"$/g, '')

      rowObject[propLabel] = propValue
    }
  }

  return csvArray
}