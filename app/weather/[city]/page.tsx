import { Suspense } from "react"
import { notFound } from "next/navigation"
import { getCurrentWeather, getForecast } from "@/lib/weather"
import WeatherDisplay from "@/components/weather-display"
import WeatherSkeleton from "@/components/weather-skeleton"

interface WeatherPageProps {
  params: {
    city: string
  }
}

export async function generateMetadata({ params }: WeatherPageProps) {
  const city = decodeURIComponent(params.city)
  return {
    title: `Weather in ${city} - Alex Johnson`,
    description: `Current weather and forecast for ${city}`,
  }
}

async function WeatherContent({ city }: { city: string }) {
  try {
    console.log("Fetching weather data for city:", city)

    // Fetch current weather first
    let currentWeather
    try {
      currentWeather = await getCurrentWeather(city)
      console.log("Current weather fetched successfully")
    } catch (error) {
      console.error("Error fetching current weather:", error)

      // If city not found, show 404
      if (error instanceof Error && error.message.includes("not found")) {
        notFound()
      }

      // For other errors, rethrow to be caught by error boundary
      throw error
    }

    // Then fetch forecast
    let forecast = []
    try {
      forecast = await getForecast(city)
      console.log("Forecast fetched successfully")
    } catch (forecastError) {
      console.error("Forecast fetch failed, continuing with current weather only:", forecastError)
      // Continue with empty forecast if forecast fails
    }

    return <WeatherDisplay currentWeather={currentWeather} forecast={forecast} />
  } catch (error) {
    console.error("Error in WeatherContent:", error)

    if (error instanceof Error) {
      if (error.message.includes("not found")) {
        notFound()
      }
    }

    throw error
  }
}

export default function WeatherPage({ params }: WeatherPageProps) {
  const city = decodeURIComponent(params.city)

  return (
    <div className="space-y-8">
      <Suspense fallback={<WeatherSkeleton />}>
        <WeatherContent city={city} />
      </Suspense>
    </div>
  )
}
