  
const algoliasearchHelper = require('algoliasearch-helper')
const algoliasearch = require('algoliasearch')
const APP_ID = '7TU0P6ANQY'
const API_KEY = 'a90b9a9f9adb4032864dd8dc455f76e6'
const rest_list = require('~/Desktop/project-files/resources/dataset/restaurants_list.json')
const rest_info = require('~/Desktop/project-files/resources/dataset/restaurants_info.json')
const client = algoliasearch(APP_ID, API_KEY)
const index = client.initIndex(indexName)


function combineJSONData(rest_A, rest_B) {

  const sortedRestaurant1 = rest_A.sort((a, b) => {
    return parseInt(a.objectID) - parseInt(b.objectID)
  })
  const sortedRestaurant2 = rest_B.sort((rest1, rest2) => {
    return parseInt(rest1.objectID) - parseInt(rest2.objectID)
  })
  return sortedRestaurant1.map((rest, idx) => {
    return Object.assign(rest, sortedRestaurant2[idx])
  })
}



function indexData(jsonData, appId, indexName) {
    index.addObjects(jsonData, (err, content) => {
      if (err) {
        console.log(err, "content not added")
      } else {
        console.log(content,"content added successfully!")
      }
    })
}

result = combineData(rest_list, rest_info);
indexData(result, APP_ID, 'rest_test')