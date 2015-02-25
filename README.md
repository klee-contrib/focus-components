focus-components
========================

Components for focus application.

## Components

### spec

Component example structure, with all the directories.

### form

All the components dealing with forms:
- Inputs
- select
- rich text

All  the block component to structure the

### search

All the component which deals with the search:
- Facet (live-filter)
- Quick search
- Selectable results

### list

All the components for the list


## Build

In order to build and test each component alone, there is a build task called `componentify` which performs a build for each component describe under the `components` flag in the `package.json` file.

```javascript
"components": [
    {
      "name": "componentName",
      "path": "componentPath"
    }
  ]
```
