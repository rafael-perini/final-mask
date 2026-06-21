# Examples

To setup FinalMask, call it's `setup` method, providing it with a mask and the selector os instance of the input to be masked.

```js
import { FinalMask } from "final-mask";

FinalMask.setup("###.###.###.###", "#input-id");
```

## Demos

<label for="first-input">Phone: </label>
<input id="first-input" placeholder="+0 000 000-0000">

<label for="second-input">IPv4: </label>
<input id="second-input" placeholder="000.000.000.000">

<label for="third-input">ZIP Code: </label>
<input id="third-input" placeholder="00000-0000">

<label for="fourt-input">Date: </label>
<input id="fourt-input" placeholder="00/00/0000">

<label for="fifth-input">Time: </label>
<input id="fifth-input" placeholder="00:00">

<script setup>
  import { onMounted } from "vue"
  import { FinalMask } from "../../dist/"

  onMounted(() => {
    FinalMask.setup("+# ### ###-####", "#first-input");
    FinalMask.setup("###.###.###.###", "#second-input");
    FinalMask.setup("#####-####", "#third-input");
    FinalMask.setup("##/##/####", "#fourt-input");
    FinalMask.setup("##:##", "#fifth-input");
  });
</script>
