# adapt-contrib-data

This plugin loads all of the json files listed in the ``adapt/data/manifest.js`` file, all of the json files in the [``course/``](https://github.com/adaptlearning/adapt_framework/tree/prototype4/src/course) folder.  
Once all of the json files from the [``course/``](https://github.com/adaptlearning/adapt_framework/tree/prototype4/src/course) folder are loaded, this plugin creates an array of all of the objects returned in all of the json files.  
A json file containing a single object is concatenated to the array.  
A json file containing an array of objects is concatenated item by item to the array.  
The result is that [``config.json``](https://github.com/adaptlearning/adapt_framework/blob/prototype4/src/course/config.json) and [``alllanguages/course.json``](https://github.com/adaptlearning/adapt_framework/blob/prototype4/src/course/en/course.json) are added as single objects into the array, and the objects from [``aticles.json``](https://github.com/adaptlearning/adapt_framework/blob/prototype4/src/course/en/articles.json), [``blocks.json``](https://github.com/adaptlearning/adapt_framework/blob/prototype4/src/course/en/blocks.json) and [``components.json``](https://github.com/adaptlearning/adapt_framework/blob/prototype4/src/course/en/components.json) are subsequently  concatenated to it.  
One single array containing all of the objects from all of the json files is assembled and can be queried using the API below.  

## API
```js
Adapt.dataLayer.findByFile(fileName);
Adapt.dataLayer.findByType(objectType);
```

#### findByFile(fileName)
Fetches an array of objects listed as originating from the specified file.
```js
var yields = Adapt.dataLayer.findByFile('course/en/course.json');
yields == [{
  "_id": "course",
  "_type": "course",
  //...
}];
```

#### findByType(type)
Fetches an array of objects with the specified ``_type`` attribute.
```js
var yields = Adapt.dataLayer.findByType('article');
yields == [{
  "_id": "a-05",
  "_type": "article",
  //...
},{
  "_id": "a-10",
  "_type": "article",
  //...
},{
  //...
}];
```
