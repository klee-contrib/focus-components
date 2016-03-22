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
`validate()`   | None.        | *boolean*    | Valide le contenu de l'input de texte en fonction de ses métadonnées.
`getValue()`   | None.        | *object*     | Fournie la valeur de l'input.

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
<input type='text'/>
```


## Test

## Demo
![Input](http://images.ientrymail.com/webpronews/article_pics/html-speech-input.jpg)
