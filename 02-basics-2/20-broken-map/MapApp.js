import { defineComponent, ref, computed } from 'vue'

export default defineComponent({
  name: 'MapApp',

  setup() {
    // Реактивные переменные для хранения координат метки
    const x = ref(0)
    const y = ref(0)

    /**
     * Обработчик клика по карте для установки координат метки
     * @param {MouseEvent} event
     */
    const handleClick = (event) => {
      x.value = event.offsetX
      y.value = event.offsetY
    }

    const pinPositionStyle = computed(() => ({
      left: `${x.value}px`,
      top: `${y.value}px`,
    }))


    return {
      handleClick,
      pinPositionStyle,
      x,
      y
    }
  },

  template: `
    <div class="map" @click="handleClick">
      <img class="map-image" src="./map.png" alt="Map" draggable="false" />
      <span class="pin" :style="pinPositionStyle">📍</span>
    </div>
  `,
})