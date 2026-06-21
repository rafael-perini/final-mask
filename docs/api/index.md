---
outline: deep
---

# setup

```ts
FinalMask.setup("###", "#input-id");
```

Attach event listeners to manipulate the input respecting the provided mask.

## Parameters

### mask

`string`

String using `#` as numbers.

### selectorOrInputElement

`string | HTMLInputElement`

String with the selector to find the input element or the input instance itself.

### options

`{ onInput: (event: InputEvent) => void, onBeforeInput: (event: InputEvent) => void }` = {}

Option to add callbacks after some events that might happen to the input element.

## Example

```html
<label for="zip-code">ZIP Code: </label>
<input type="text" id="zip-code" placeholder="00000-0000" />
```

```ts
const options = {
  onInput: (event: InputEvent) => {
    /* Your code goes here. */
  },
  onBeforeInput: (event: InputEvent) => {
    /* Your code goes here. */
  },
};
FinalMask.setup("#####-####", "#zip-code", options);
```
