import { defineComponent, onMounted, onUnmounted, ref } from 'vue'

export default defineComponent({
  name: 'UiClock',
  setup() {
    onMounted(() => {
      updateTime();
      timer.value = setInterval(updateTime, 1000)
    })
    onUnmounted(() => {
      clearInterval(timer.value)
    })
    const currentTime = ref('');
    const timer = ref('');
    const updateTime = () => {
      const now = new Date();
      currentTime.value = now.toLocaleTimeString(navigator.language, { timeStyle: 'medium' });
    }
    return {
      timer,
      currentTime,
      updateTime
    }
  },
  template: `<div class="clock">{{ currentTime }}</div>`,
})
