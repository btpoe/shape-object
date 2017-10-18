# Shape Object

Strip out unnecessary properties from a data feed.

## Usage

The first argument is the object you wish to shape, the second argument is an object that represents the desired properties.

If the data property is an array and the reference property is an object, shapeObject will map the reference object over the array of items.

For example:

```javascript
import shapeObject from 'shape-object';

const referenceObject = {
  id: null,
  type: null,
  articles: {
    id: null,
    title: null,
    author: {
      name: null
    }
  }
};
	
	
shapeObject(dataFeed, referenceObject);
```

### GraphQL Syntax

If you prefer, you can pass a GraphQL-like string as the second argument like so:

```javascript
const referenceShape = `{
  id
  type
  articles {
    id
    title
    author {
      name
    }
  }
}`;
	
return shapeObject(dataFeed, referenceShape);
``` 

## Notes

- This tool is meant to filter down a data feed. If you pass in 2 objects with cyclical references, it will get caught in an infinite loop. If either object isn't cyclical, it will break the loop, but I don't recommend it.
- The GraphQL support is very basic. It doesn't support features like arguments or fragments.