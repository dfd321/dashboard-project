import React from 'react'
import { 
  WiDaySunny, 
  WiNightClear, 
  WiDayCloudy, 
  WiNightCloudy, 
  WiCloudy, 
  WiRain, 
  WiThunderstorm, 
  WiSnow, 
  WiWindy 
} from 'react-icons/wi'

interface WeatherIconProps {
  iconCode: string
  size?: number
  className?: string
}

const WeatherIcon: React.FC<WeatherIconProps> = ({ 
  iconCode, 
  size = 48, 
  className = '' 
}) => {
  const getIcon = () => {
    switch (iconCode) {
      case '01d':
        return <WiDaySunny size={size} className={className} />
      case '01n':
        return <WiNightClear size={size} className={className} />
      case '02d':
        return <WiDayCloudy size={size} className={className} />
      case '02n':
        return <WiNightCloudy size={size} className={className} />
      case '03d':
      case '03n':
      case '04d':
      case '04n':
        return <WiCloudy size={size} className={className} />
      case '09d':
      case '09n':
      case '10d':
      case '10n':
        return <WiRain size={size} className={className} />
      case '11d':
      case '11n':
        return <WiThunderstorm size={size} className={className} />
      case '13d':
      case '13n':
        return <WiSnow size={size} className={className} />
      case '50d':
      case '50n':
        return <WiWindy size={size} className={className} />
      default:
        return <WiDaySunny size={size} className={className} />
    }
  }

  return <>{getIcon()}</>
}

export default WeatherIcon