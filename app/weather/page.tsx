"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search, MapPin, Thermometer, Eye, Wind, AlertCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function WeatherPage() {
  const [searchCity, setSearchCity] = useState("")
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchCity.trim()) {
      router.push(`/weather/${encodeURIComponent(searchCity.trim())}`)
    }
  }

  const popularCities = ["San Francisco", "New York", "London", "Tokyo", "Paris", "Sydney", "Mumbai", "Berlin"]

  return (
    <div className="space-y-8">
      {/* Header */}
      <Card className="gradient-card">
        <CardContent className="p-6 sm:p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Weather App</h1>
          <p className="text-gray-600">Get current weather and forecast for any city worldwide.</p>
        </CardContent>
      </Card>

      {/* Search */}
      <Card>
        <CardHeader>
          <CardTitle className="section-title">
            <span className="section-icon">🔍</span>
            Search Weather
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="flex gap-4">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter city name..."
                value={searchCity}
                onChange={(e) => setSearchCity(e.target.value)}
                className="w-full"
              />
            </div>
            <Button type="submit" disabled={!searchCity.trim()}>
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Popular Cities */}
      <Card>
        <CardHeader>
          <CardTitle className="section-title">
            <span className="section-icon">🌍</span>
            Popular Cities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {popularCities.map((city) => (
              <Button
                key={city}
                variant="outline"
                className="justify-start"
                onClick={() => router.push(`/weather/${encodeURIComponent(city)}`)}
              >
                <MapPin className="h-4 w-4 mr-2" />
                {city}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Features */}
      <Card>
        <CardHeader>
          <CardTitle className="section-title">
            <span className="section-icon">⭐</span>
            Features
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4">
              <div className="bg-blue-100 p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                <Thermometer className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Current Weather</h3>
              <p className="text-gray-600 text-sm">
                Get real-time weather conditions including temperature, humidity, and wind speed.
              </p>
            </div>
            <div className="text-center p-4">
              <div className="bg-green-100 p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                <Eye className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">5-Day Forecast</h3>
              <p className="text-gray-600 text-sm">Plan ahead with detailed weather forecasts for the next 5 days.</p>
            </div>
            <div className="text-center p-4">
              <div className="bg-purple-100 p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                <Wind className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Detailed Metrics</h3>
              <p className="text-gray-600 text-sm">
                Access comprehensive weather data including pressure, visibility, and more.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Environment Variables Guide */}
      <Card>
        <CardHeader>
          <CardTitle className="section-title">
            <span className="section-icon">🔒</span>
            Environment Variables Guide
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600">
            This app uses environment variables to securely store API keys. Here's how it's implemented:
          </p>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-2">1. Create a .env.local file</h3>
            <pre className="bg-gray-800 text-white p-3 rounded-md text-sm overflow-x-auto">
              <code>{`# .env.local
WEATHERSTACK_API_KEY=your_api_key_here`}</code>
            </pre>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-2">2. Access the API key in your code</h3>
            <pre className="bg-gray-800 text-white p-3 rounded-md text-sm overflow-x-auto">
              <code>{`// In your server component or API route
const API_KEY = process.env.WEATHERSTACK_API_KEY || ""`}</code>
            </pre>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-2">3. For client components (if needed)</h3>
            <pre className="bg-gray-800 text-white p-3 rounded-md text-sm overflow-x-auto">
              <code>{`// For client-side access, prefix with NEXT_PUBLIC_
// .env.local
NEXT_PUBLIC_SOME_CLIENT_VARIABLE=client_value

// In client component
const clientValue = process.env.NEXT_PUBLIC_SOME_CLIENT_VARIABLE`}</code>
            </pre>
          </div>

          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>Important:</strong> Never commit your .env.local file to version control. Add it to .gitignore to
              keep your API keys secure.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  )
}
