import React from 'react'
import { IWeatherData } from '../../../../shared/types/api'
import WeatherIcon from './WeatherIcon'

interface CurrentWeatherProps {
  data: IWeatherData
  tempUnit: 'C' | 'F'
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ data, tempUnit }) => {
  const convertTemp = (temp: number) => {
    if (tempUnit === 'F') {
      return Math.round((temp * 9/5) + 32)
    }
    return Math.round(temp)
  }

  const { current, location } = data

  return (
    <div className="text-center">
      <div className="flex items-center justify-center mb-4">
        <WeatherIcon 
          iconCode={current.weather[0].icon} 
          size={80} 
          className="text-white"
        />
      </div>
      
      <div className="text-4xl font-bold text-white mb-2">
        {convertTemp(current.temp)}°{tempUnit}
      </div>
      
      <div className="text-white/80 text-lg capitalize mb-2">
        {current.weather[0].description}
      </div>
      
      <div className="text-white/60 text-sm mb-4">
        {location.name}, {location.country}
      </div>
      
      <div className="text-white/70 text-xs">
        Feels like {convertTemp(current.feels_like)}°{tempUnit}
      </div>
      
      <div className="grid grid-cols-2 gap-4 mt-4 text-xs text-white/70">
        <div>
          <div className="font-semibold">Humidity</div>
          <div>{current.humidity}%</div>
        </div>
        <div>
          <div className="font-semibold">Wind</div>
          <div>{current.wind_speed} m/s</div>
        </div>
      </div>
    </div>
  )
}

export default CurrentWeather