import React, { useState } from 'react'
import { useWeatherData } from '../../hooks/useWeatherData'
import CurrentWeather from './CurrentWeather'
import WeatherForecast from './WeatherForecast'
import LocationSelector from './LocationSelector'

const WeatherWidget: React.FC = () => {
  const { data, isLoading, error, locationError, refetch } = useWeatherData()
  const [tempUnit, setTempUnit] = useState<'C' | 'F'>('C')

  const toggleTempUnit = () => {
    setTempUnit(tempUnit === 'C' ? 'F' : 'C')
  }

  if (isLoading) {
    return (
      <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-sm border border-white/20 rounded-2xl p-6 min-h-[400px] flex items-center justify-center">
        <div className="text-white/80 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white/50 mx-auto mb-2"></div>
          <p className="text-sm">Loading weather data...</p>
        </div>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="bg-gradient-to-br from-red-500/20 to-red-600/20 backdrop-blur-sm border border-white/20 rounded-2xl p-6 min-h-[400px] flex items-center justify-center">
        <div className="text-white/80 text-center">
          <p className="text-sm mb-2">Failed to load weather data</p>
          <button
            onClick={refetch}
            className="px-4 py-2 bg-white/20 hover:bg-white/30 border border-white/30 rounded text-white text-sm transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-sm border border-white/20 rounded-2xl p-6 min-h-[400px] relative">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-white/90 text-lg font-semibold">Weather</h2>
        <button
          onClick={toggleTempUnit}
          className="px-3 py-1 bg-white/20 hover:bg-white/30 border border-white/30 rounded text-white text-sm transition-colors"
        >
          °{tempUnit}
        </button>
      </div>
      
      <LocationSelector 
        onLocationUpdate={refetch}
        locationError={locationError}
        isLoading={isLoading}
      />
      
      <div className="space-y-6">
        <CurrentWeather data={data} tempUnit={tempUnit} />
        <WeatherForecast data={data} tempUnit={tempUnit} />
      </div>
    </div>
  )
}

export default WeatherWidget