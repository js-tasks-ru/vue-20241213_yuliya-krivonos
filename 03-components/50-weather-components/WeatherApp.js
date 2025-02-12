import { defineComponent } from 'vue'
import { getWeatherData, WeatherConditionIcons } from './weather.service.ts'
import './WeatherApp.css'

export default defineComponent({
  name: 'WeatherApp',
  setup() {
    return {
      weatherData: getWeatherData(),
      isNight: (item) => {
        return item.current.dt < item.current.sunrise || item.current.dt > item.current.sunset;
      },
      checkAlert: (item) => {
        return Boolean(item.alert !== null);
      },
      getTemperature: (item) => {
        return (item.current.temp - 273.15).toFixed(1);
      },
      getPressure: (item) => {
        return (item.current.pressure * 0.75).toFixed(0);
      },
      getWeatherIcon: (item) => {
        return WeatherConditionIcons[item.current.weather.id]
      },
      getWeatherDescription: (item) => {
        return item.current.weather.description;
      },
      getTime: (item) => {
        return item.current.dt;
      }
    }
  },

  template: `
    <div>
      <h1 class="title">Погода в Средиземье</h1>

      <ul class="weather-list unstyled-list">
        <li class="weather-card" :class = "{ 'weather-card--night': isNight(item) }" v-for="(item, index) in weatherData" :key="index">
          <div class="weather-alert" v-if="item.alert && item.alert.sender_name && item.alert.description">
            <span class="weather-alert__icon">⚠️</span>
            <span class="weather-alert__description">{{ item.alert.sender_name }} :  {{ item.alert.description }}</span>
          </div>
          <div>
            <h2 class="weather-card__name">
              {{ item.geographic_name }}
            </h2>
            <div class="weather-card__time">
              {{ getTime(item) }}
            </div>
          </div>
          <div class="weather-conditions">
            <div class="weather-conditions__icon" :title="getWeatherDescription(item)">{{ getWeatherIcon(item) }}</div>
            <div class="weather-conditions__temp">{{ getTemperature(item) }} °C</div>
          </div>
          <div class="weather-details">
            <div class="weather-details__item">
              <div class="weather-details__item-label">Давление, мм рт. ст.</div>
              <div class="weather-details__item-value">{{ getPressure(item) }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Влажность, %</div>
              <div class="weather-details__item-value">{{ item.current.humidity }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Облачность, %</div>
              <div class="weather-details__item-value">{{ item.current.clouds }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Ветер, м/с</div>
              <div class="weather-details__item-value">{{ item.current.wind_speed }}</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  `,
})
