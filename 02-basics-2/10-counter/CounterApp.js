import { defineComponent } from 'vue'
import { ref } from 'vue';

export default defineComponent({
  name: 'CounterApp',

  setup() {
    const counter = ref(0);
    return {
        counter
    }
  },
  template: `
    <div class="counter">
      <button
        class="button button--secondary"
        type="button"
        aria-label="Decrement"
        :disabled="counter < 1"
        @click="counter--"
      >➖</button>

      <span class="count" data-testid="count">{{counter}}</span>

      <button
        class="button button--secondary"
        type="button"
        aria-label="Increment"
        :disabled="counter > 4"
        @click="counter++"
      >➕</button>
    </div>
  `
})
