import { useQuery } from '@tanstack/react-query'
import { useState, useEffect } from 'react'
import { IWeatherData } from '../../../shared/types/api'
import { mockWeatherData } from '../services/mockWeatherData'

interface Coordinates {
  lat: number
  lon: number
}

export const useWeatherData = () => {
  const [coords, setCoords] = useState<Coordinates | null>(null)
  const [locationError, setLocationError] = useState<string | null>(null)

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoords({
            lat: position.coords.latitude,
            lon: position.coords.longitude
          })
          setLocationError(null)
        },
        (error) => {
          setLocationError(error.message)
          // Fallback to default location (San Francisco)
          setCoords({ lat: 37.7749, lon: -122.4194 })
        }
      )
    } else {
      setLocationError('Geolocation is not supported by this browser')
      setCoords({ lat: 37.7749, lon: -122.4194 })
    }
  }

  useEffect(() => {
    getLocation()
  }, [])

  const { data, isLoading, error } = useQuery<IWeatherData>({
    queryKey: ['weather', coords?.lat, coords?.lon],
    queryFn: async (): Promise<IWeatherData> => {
      if (!coords) throw new Error('No coordinates available')
      
      // For now, return mock data
      // In production, this would call the backend API:
      // const response = await fetch(`/api/weather?lat=${coords.lat}&lon=${coords.lon}`)
      // return response.json()
      
      return new Promise((resolve) => {
        setTimeout(() => resolve(mockWeatherData), 1000)
      })
    },
    enabled: !!coords,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })

  return {
    data,
    isLoading,
    error,
    locationError,
    coords,
    refetch: getLocation
  }
}