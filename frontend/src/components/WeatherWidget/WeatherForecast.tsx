import React from 'react'
import { format } from 'date-fns'
import { IWeatherData } from '../../../../shared/types/api'
import WeatherIcon from './WeatherIcon'

interface WeatherForecastProps {
  data: IWeatherData
  tempUnit: 'C' | 'F'
}

const WeatherForecast: React.FC<WeatherForecastProps> = ({ data, tempUnit }) => {
  const convertTemp = (temp: number) => {
    if (tempUnit === 'F') {
      return Math.round((temp * 9/5) + 32)
    }
    return Math.round(temp)
  }

  return (
    <div className="space-y-3">
      <h3 className="text-white/80 text-sm font-semibold mb-3">5-Day Forecast</h3>
      
      {data.daily.map((day, index) => (
        <div key={day.dt} className="flex items-center justify-between py-2">
          <div className="flex items-center space-x-3">
            <WeatherIcon 
              iconCode={day.weather[0].icon} 
              size={32} 
              className="text-white/70"
            />
            <div>
              <div className="text-white/80 text-sm font-medium">
                {index === 0 ? 'Today' : format(new Date(day.dt * 1000), 'EEE')}
              </div>
              <div className="text-white/60 text-xs capitalize">
                {day.weather[0].main}
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-white/60 text-sm">
              {convertTemp(day.temp.min)}°
            </span>
            <span className="text-white text-sm font-medium">
              {convertTemp(day.temp.max)}°
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default WeatherForecast