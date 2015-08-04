focus-components
========================

[![NPM](https://nodei.co/npm/focusjs-components.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/focusjs-components/)

[![Join the chat at https://gitter.im/KleeGroup/focus-components](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/KleeGroup/focus-components?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

![Build Status](https://travis-ci.org/KleeGroup/focus-components.svg)

Components for focus application.

## Components

### spec

Component example structure, with all the directories ans sub directories. 
- `index.js` : the component entry point.
- `style`: the style of the component should be written in **sass**.
- `assets`: all the components assets
- `example`: a example directory for your component, should have an `index.html` file. (see build section for more informations).
- `__tests__` : components unit tests

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

```json
"components": [
    {
      "name": "componentName",
      "path": "componentPath"
    }
  ]
```

When your component has been added to this list, it will automatically be deployed as a single component and testable through the url: [http://localhost:3000](http://localhost:3000) using the `static-server.js` file. You can launch the examples with the command `npm run example`.

## Unit test

In order to launch unit test: `npm run test`

## Dependencies

In order to install all your dependencies: `npm install --no-optional`

### CSS

[FlexBox](https://css-tricks.com/snippets/css/a-guide-to-flexbox)/

## Lint
`gulp eslint` in order to see your errors.
