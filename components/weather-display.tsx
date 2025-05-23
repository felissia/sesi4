"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Droplets, Wind, Eye, Gauge, MapPin, AlertCircle, Info, Wifi, WifiOff } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import type { WeatherData, ForecastData } from "@/lib/weather"

interface WeatherDisplayProps {
  currentWeather: WeatherData
  forecast: ForecastData[]
}

export default function WeatherDisplay({ currentWeather, forecast }: WeatherDisplayProps) {
  const [selectedDay, setSelectedDay] = useState(0)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    })
  }

  // Determine if this is mock data (emoji icons indicate mock data)
  const isMockData = currentWeather.icon && currentWeather.icon.length <= 2

  return (
    <div className="space-y-8">
      {/* Header with back button */}
      <Card className="gradient-card">
        <CardContent className="p-6 sm:p-8">
          <div className="flex items-center justify-between mb-4">
            <Button variant="outline" size="sm" asChild>
              <Link href="/weather">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Link>
            </Button>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-white">
                <MapPin className="h-3 w-3 mr-1" />
                {currentWeather.name}, {currentWeather.country}
              </Badge>
              <Badge variant={isMockData ? "secondary" : "default"} className="bg-white">
                {isMockData ? <WifiOff className="h-3 w-3 mr-1" /> : <Wifi className="h-3 w-3 mr-1" />}
                {isMockData ? "Demo" : "Live"}
              </Badge>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Weather in {currentWeather.name}</h1>
          <p className="text-gray-600">{isMockData ? "Demo weather data" : "Current conditions and forecast"}</p>
        </CardContent>
      </Card>

      {/* API Status Notice */}
      {isMockData && (
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            <strong>Demo Mode:</strong> The weather API has reached its rate limit. Showing realistic demo data for{" "}
            {currentWeather.name}. This demonstrates the app's functionality with fallback data.
          </AlertDescription>
        </Alert>
      )}

      {/* Current Weather */}
      <Card>
        <CardHeader>
          <CardTitle className="section-title">
            <span className="section-icon">🌤️</span>
            Current Weather
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Main weather info */}
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-4 mb-4">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden">
                  {currentWeather.icon && currentWeather.icon.length > 2 ? (
                    <img
                      src={currentWeather.icon || "/placeholder.svg"}
                      alt={currentWeather.description}
                      className="w-16 h-16 object-contain"
                      onError={(e) => {
                        // Fallback to emoji if image fails to load
                        e.currentTarget.style.display = "none"
                        e.currentTarget.nextElementSibling.style.display = "block"
                      }}
                    />
                  ) : (
                    <span className="text-4xl">{currentWeather.icon || "🌤️"}</span>
                  )}
                  <span className="text-4xl hidden">
                    {currentWeather.icon && currentWeather.icon.length <= 2 ? currentWeather.icon : "🌤️"}
                  </span>
                </div>
                <div>
                  <div className="text-4xl font-bold text-gray-800">{currentWeather.temperature}°C</div>
                  <div className="text-gray-600 capitalize">{currentWeather.description}</div>
                  <div className="text-sm text-gray-500">Feels like {currentWeather.feelsLike}°C</div>
                </div>
              </div>
            </div>

            {/* Weather details */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <Droplets className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium text-gray-600">Humidity</span>
                </div>
                <div className="text-xl font-bold text-gray-800">{currentWeather.humidity}%</div>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <Wind className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium text-gray-600">Wind Speed</span>
                </div>
                <div className="text-xl font-bold text-gray-800">{currentWeather.windSpeed} km/h</div>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <Gauge className="h-4 w-4 text-purple-600" />
                  <span className="text-sm font-medium text-gray-600">Pressure</span>
                </div>
                <div className="text-xl font-bold text-gray-800">{currentWeather.pressure} mb</div>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <Eye className="h-4 w-4 text-orange-600" />
                  <span className="text-sm font-medium text-gray-600">Visibility</span>
                </div>
                <div className="text-xl font-bold text-gray-800">{currentWeather.visibility} km</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Forecast */}
      {forecast.length > 0 ? (
        <Card>
          <CardHeader>
            <CardTitle className="section-title">
              <span className="section-icon">📅</span>
              5-Day Forecast
              {isMockData && <span className="ml-2 text-xs font-normal text-gray-500">(Demo Data)</span>}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
              {forecast.map((day, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    selectedDay === index ? "border-gray-800 bg-gray-50" : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setSelectedDay(index)}
                >
                  <div className="text-center">
                    <div className="text-sm font-medium text-gray-600 mb-2">
                      {index === 0 ? "Today" : formatDate(day.date)}
                    </div>
                    <div className="w-12 h-12 bg-gray-100 rounded-full mx-auto mb-2 flex items-center justify-center overflow-hidden">
                      {day.icon && day.icon.length > 2 ? (
                        <img
                          src={day.icon || "/placeholder.svg"}
                          alt={day.description}
                          className="w-10 h-10 object-contain"
                          onError={(e) => {
                            e.currentTarget.style.display = "none"
                            e.currentTarget.nextElementSibling.style.display = "block"
                          }}
                        />
                      ) : (
                        <span className="text-2xl">{day.icon || "🌤️"}</span>
                      )}
                      <span className="text-2xl hidden">{day.icon && day.icon.length <= 2 ? day.icon : "🌤️"}</span>
                    </div>
                    <div className="text-lg font-bold text-gray-800">{day.temperature.max}°</div>
                    <div className="text-sm text-gray-500">{day.temperature.min}°</div>
                    <div className="text-xs text-gray-500 mt-1 capitalize">{day.description}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Selected day details */}
            {forecast[selectedDay] && (
              <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                <h3 className="font-semibold text-gray-800 mb-2">
                  {selectedDay === 0 ? "Today's" : formatDate(forecast[selectedDay].date)} Details
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-gray-600">High/Low:</span>
                    <span className="ml-2 font-medium">
                      {forecast[selectedDay].temperature.max}° / {forecast[selectedDay].temperature.min}°
                    </span>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Humidity:</span>
                    <span className="ml-2 font-medium">{forecast[selectedDay].humidity}%</span>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ) : (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>Forecast data is unavailable. Only current weather conditions are shown.</AlertDescription>
        </Alert>
      )}
    </div>
  )
}
