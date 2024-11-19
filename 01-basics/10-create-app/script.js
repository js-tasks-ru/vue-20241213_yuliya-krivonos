import { defineComponent, createApp } from 'vue'

const Component = defineComponent({
  name: 'component',
  setup() {
    return {
      dateTime: new Date().toLocaleDateString(navigator.language, { dateStyle: 'long' })
    }
  },
  template: '<div>Сегодня {{dateTime}}</div>'
});
const app = createApp(Component);

app.mount('#app');
