import React, { useState } from 'react'
import { MdLocationOn, MdRefresh } from 'react-icons/md'

interface LocationSelectorProps {
  onLocationUpdate: () => void
  locationError: string | null
  isLoading: boolean
}

const LocationSelector: React.FC<LocationSelectorProps> = ({ 
  onLocationUpdate, 
  locationError, 
  isLoading 
}) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [manualLocation, setManualLocation] = useState('')

  const handleRefresh = () => {
    onLocationUpdate()
  }

  const handleManualLocationSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement manual location search
    console.log('Manual location:', manualLocation)
    setIsExpanded(false)
  }

  return (
    <div className="flex items-center justify-between mb-4">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center space-x-1 text-white/70 hover:text-white/90 transition-colors"
      >
        <MdLocationOn size={16} />
        <span className="text-xs">Location</span>
      </button>
      
      <button
        onClick={handleRefresh}
        disabled={isLoading}
        className="flex items-center space-x-1 text-white/70 hover:text-white/90 transition-colors disabled:opacity-50"
      >
        <MdRefresh 
          size={16} 
          className={isLoading ? 'animate-spin' : ''}
        />
        <span className="text-xs">Refresh</span>
      </button>
      
      {isExpanded && (
        <div className="absolute top-full left-0 right-0 mt-2 p-4 bg-white/10 backdrop-blur rounded-lg">
          <form onSubmit={handleManualLocationSubmit} className="space-y-2">
            <input
              type="text"
              value={manualLocation}
              onChange={(e) => setManualLocation(e.target.value)}
              placeholder="Enter city name..."
              className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded text-white placeholder-white/60 text-sm focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <button
              type="submit"
              className="w-full px-3 py-2 bg-white/20 hover:bg-white/30 border border-white/30 rounded text-white text-sm transition-colors"
            >
              Search
            </button>
          </form>
          
          {locationError && (
            <p className="text-red-300 text-xs mt-2">{locationError}</p>
          )}
        </div>
      )}
    </div>
  )
}

export default LocationSelector