import { defineComponent } from 'vue'
import { getWeatherData, WeatherConditionIcons } from './weather.service.ts'

export default defineComponent({
  name: 'WeatherApp',
  setup() {
    return {
      weatherData: getWeatherData(),
      checkAlert: (item) => {
        return Boolean(item.alert !== null);
    },
      getAlertName: (item) => {
        return item.alert?.sender_name;
      },
      getDescriptionAlert: (item) => {
        return item.alert?.description;
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
      },
      isNight: (item) => {
        return item.current.dt < item.current.sunrise || item.current.dt > item.current.sunset;
      }
    }
  },
  template: `
    <div>
      <h1 class="title">Погода в Средиземье</h1>

      <ul class="weather-list unstyled-list">
        <template v-for="(item, index) in weatherData"
        :key="index">
        <li :class="['weather-card', { 'weather-card--night': isNight(item) }]">
          <div class="weather-alert" v-if="checkAlert(item)">
            <span class="weather-alert__icon">⚠️</span>
            <span class="weather-alert__description">{{ getAlertName(item) }} :  {{ getDescriptionAlert(item) }}</span>
          </div>
          <div>
            <h2 class="weather-card__name">
              {{item.geographic_name}}
            </h2>
            <div class="weather-card__time">
              {{getTime(item)}}
            </div>
          </div>
          <div class="weather-conditions">
            <div class="weather-conditions__icon" :title="getWeatherDescription(item)">{{ getWeatherIcon(item) }}</div>
            <div class="weather-conditions__temp">{{getTemperature(item)}} °C</div>
          </div>
          <div class="weather-details">
            <div class="weather-details__item">
              <div class="weather-details__item-label">Давление, мм рт. ст.</div>
              <div class="weather-details__item-value">{{getPressure(item)}}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Влажность, %</div>
              <div class="weather-details__item-value">{{item.current.humidity}}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Облачность, %</div>
              <div class="weather-details__item-value">{{item.current.clouds}}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Ветер, м/с</div>
              <div class="weather-details__item-value">{{item.current.wind_speed}}</div>
            </div>
          </div>
        </li>
        </template>
      </ul>
    </div>
  `,


})
