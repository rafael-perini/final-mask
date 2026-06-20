# Markdown Extension Examples

<script setup>
import { FinalMask } from "../dist/index.mjs"
import {onMounted} from "vue"
onMounted(() => {
  FinalMask.setup('#.###.###-##','input')
})
</script>

<input type="text" placeholder="X.XXX.XXX-XX">
