## Technical Configuration

Use case.
The configuration is processed by the component reading the metadata from the data-binding and the attributes from the component.
The metadata are in the domain.


## Attributes

Attribute     | Options     | Possible               | Default       | Description
---           | ---         | ---                    | ---           | ---
`type`        | *string*    | `text`, `date`, `hour` | `text`        | Define the type of input for the rendering.

## Methods

If the component exposes methods in order to be able to interact with it.

Method         | Parameters   | Returns      | Description
---            | ---          | ---          | ---
`validate()`   | None.        | *boolean*    | Validate the input content depending on its metadata.
`getValue()`   | None.        | *object*     | get the input's depending on its metadata.

## Events

Which events are triggered by the user.

Event         | Description
---           | ---
`change`      | The input calue changed.

## Structure
- title
- block (son)
- help
- error

## Example
```html
<input type='date'/>
```


## Test

## Demo
![Input](http://images.ientrymail.com/webpronews/article_pics/html-speech-input.jpg)
