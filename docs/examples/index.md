# Examples

To setup FinalMask, call it's `setup` method, providing it with a mask and the selector os instance of the input to be masked.

```js
import { FinalMask } from "final-mask";

FinalMask.setup("###.###.###.###", "#input-id");
```

## Demos

::: info Which mask do you need?

  <p v-for="(input, index) in inputs" :key="index">
    <label :for="input.id">{{ input.label }}: </label>
    <input :id="input.id" :placeholder="input.placeholder" />
  </p>
:::

::: details Need another example?

  <form @submit.prevent="addInput">
    <label :for="maskId">Mask: </label>
    <input v-model="mask" :id="maskId" placeholder="#### #### #### ####" required />
    <label :for="labelId">Label: </label>
    <input v-model="label" :id="labelId" placeholder="Credit Card" required />
    <button type="submit">Add</button>
  </form>
:::

<script setup>
  import { useId, onMounted, ref, nextTick } from "vue"
  import { FinalMask } from "../../dist/"

  const inputs = ref([{
    id: useId(),
    label: 'Phone',
    placeholder: '+0 000 000-0000',
    mask: '+# ### ###-####'
  },{
    id: useId(),
    label: 'IPv4',
    placeholder: '000.000.000.000',
    mask: '###.###.###.###'
  },{
    id: useId(),
    label: 'ZIP Code',
    placeholder: '00000-0000',
    mask: '#####-####'
  },{
    id: useId(),
    label: 'Date',
    placeholder: '00/00/0000',
    mask: '##/##/####'
  },{
    id: useId(),
    label: 'Time',
    placeholder: '00:00',
    mask: '##:##'
  }]);

  onMounted(() => {
    inputs.value.forEach(input => FinalMask.setup(input.mask, `#${input.id}`));
  });
  
  const maskId = useId();
  const labelId = useId();
  const mask = ref("##/##/#### ##:##");
  const label = ref("Date Time");
  const newInputs = ref(0)

  function addInput() {
    const placeholder = mask.value.replaceAll('#', '0');
    const id = `final-mask-id-${newInputs.value++}`

    const newInput = { id, placeholder, mask: mask.value, label: label.value };
    inputs.value.push(newInput)

    mask.value = "";
    label.value = "";

    nextTick(() => FinalMask.setup(newInput.mask, `#${newInput.id}`))
  }
</script>
