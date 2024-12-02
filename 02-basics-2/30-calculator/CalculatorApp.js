import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'CalculatorApp',

  setup() {
    const plusHandler = () => {
      result.value = 0;
      result.value = firstNumber.value + secondNumber.value;
    };
    const minusHandler = () => {
      result.value = 0;
      result.value = firstNumber.value - secondNumber.value;
    };
    const multiplyHandler = () => {
      result.value = 0;
      result.value = firstNumber.value * secondNumber.value;
    };
    const divideHandler = () => {
      result.value = 0;
      result.value = firstNumber.value / secondNumber.value;
    };
    const firstNumber = ref(0);
    const secondNumber = ref(0);
    const result = ref(0);
    return {
      result,
      firstNumber,
      secondNumber,
      plusHandler,
      minusHandler,
      multiplyHandler,
      divideHandler
    }
  },

  template: `
    <div class="calculator">
      <input type="number" aria-label="First operand" v-model="firstNumber"/>

      <div class="calculator__operators">
        <label @click="plusHandler"><input type="radio" name="operator" value="sum"/>➕</label>
        <label @click="minusHandler"><input type="radio" name="operator" value="subtract"/>➖</label>
        <label @click="multiplyHandler"><input type="radio" name="operator" value="multiply"/>✖</label>
        <label @click="divideHandler"><input type="radio" name="operator" value="divide"/>➗</label>
      </div>

      <input type="number" aria-label="Second operand" v-model="secondNumber"/>

      <div>=</div>

      <output>{{result}}</output>
    </div>
  `,
})
