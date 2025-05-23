// Get API key from environment variable
const API_KEY = process.env.WEATHERSTACK_API_KEY || ""
const BASE_URL = "https://api.weatherstack.com"

export interface WeatherData {
  name: string
  country: string
  temperature: number
  description: string
  icon: string
  humidity: number
  windSpeed: number
  pressure: number
  feelsLike: number
  visibility: number
}

export interface ForecastData {
  date: string
  temperature: {
    min: number
    max: number
  }
  description: string
  icon: string
  humidity: number
}

// Comprehensive mock weather data for different cities
const MOCK_WEATHER_DATA: Record<string, Partial<WeatherData>> = {
  "san francisco": {
    temperature: 18,
    description: "partly cloudy",
    humidity: 72,
    windSpeed: 12,
    pressure: 1012,
    feelsLike: 17,
    visibility: 16,
  },
  london: {
    temperature: 12,
    description: "overcast",
    humidity: 85,
    windSpeed: 8,
    pressure: 1008,
    feelsLike: 10,
    visibility: 10,
  },
  "new york": {
    temperature: 22,
    description: "clear sky",
    humidity: 65,
    windSpeed: 15,
    pressure: 1015,
    feelsLike: 24,
    visibility: 20,
  },
  tokyo: {
    temperature: 25,
    description: "light rain",
    humidity: 78,
    windSpeed: 6,
    pressure: 1010,
    feelsLike: 27,
    visibility: 8,
  },
  paris: {
    temperature: 16,
    description: "cloudy",
    humidity: 70,
    windSpeed: 10,
    pressure: 1013,
    feelsLike: 15,
    visibility: 12,
  },
  sydney: {
    temperature: 28,
    description: "sunny",
    humidity: 60,
    windSpeed: 18,
    pressure: 1018,
    feelsLike: 30,
    visibility: 25,
  },
  mumbai: {
    temperature: 32,
    description: "humid",
    humidity: 88,
    windSpeed: 5,
    pressure: 1005,
    feelsLike: 38,
    visibility: 6,
  },
  berlin: {
    temperature: 14,
    description: "light clouds",
    humidity: 68,
    windSpeed: 12,
    pressure: 1014,
    feelsLike: 13,
    visibility: 15,
  },
}

// Weather descriptions with corresponding emoji icons
const WEATHER_ICONS: Record<string, string> = {
  "clear sky": "☀️",
  sunny: "☀️",
  "partly cloudy": "⛅",
  cloudy: "☁️",
  overcast: "☁️",
  "light clouds": "🌤️",
  "light rain": "🌦️",
  rain: "🌧️",
  "heavy rain": "⛈️",
  snow: "❄️",
  fog: "🌫️",
  humid: "🌡️",
  windy: "💨",
}

function generateMockWeatherData(city: string): WeatherData {
  const cityKey = city.toLowerCase()
  const mockData = MOCK_WEATHER_DATA[cityKey]

  // If we have specific data for this city, use it
  if (mockData) {
    return {
      name: city,
      country: getCountryForCity(city),
      temperature: mockData.temperature!,
      description: mockData.description!,
      icon: WEATHER_ICONS[mockData.description!] || "🌤️",
      humidity: mockData.humidity!,
      windSpeed: mockData.windSpeed!,
      pressure: mockData.pressure!,
      feelsLike: mockData.feelsLike!,
      visibility: mockData.visibility!,
    }
  }

  // Generate pseudo-random but consistent data based on city name
  const seed = city.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
  const random = (min: number, max: number) => min + (((seed * 9301 + 49297) % 233280) / 233280) * (max - min)

  const descriptions = Object.keys(WEATHER_ICONS)
  const description = descriptions[Math.floor(random(0, descriptions.length))]

  return {
    name: city,
    country: getCountryForCity(city),
    temperature: Math.round(random(5, 35)),
    description,
    icon: WEATHER_ICONS[description],
    humidity: Math.round(random(40, 90)),
    windSpeed: Math.round(random(3, 20)),
    pressure: Math.round(random(995, 1025)),
    feelsLike: Math.round(random(3, 38)),
    visibility: Math.round(random(5, 25)),
  }
}

function getCountryForCity(city: string): string {
  const cityCountryMap: Record<string, string> = {
    "san francisco": "United States",
    "new york": "United States",
    london: "United Kingdom",
    paris: "France",
    tokyo: "Japan",
    sydney: "Australia",
    mumbai: "India",
    berlin: "Germany",
    madrid: "Spain",
    rome: "Italy",
    moscow: "Russia",
    beijing: "China",
    toronto: "Canada",
    "mexico city": "Mexico",
    "buenos aires": "Argentina",
    "cape town": "South Africa",
    cairo: "Egypt",
    bangkok: "Thailand",
    singapore: "Singapore",
    dubai: "United Arab Emirates",
  }

  return cityCountryMap[city.toLowerCase()] || "Unknown"
}

export async function getCurrentWeather(city: string): Promise<WeatherData> {
  try {
    // Check if API key is available
    if (!API_KEY) {
      console.log("No API key found in environment variables, using mock data")
      return generateMockWeatherData(city)
    }

    const url = `${BASE_URL}/current?access_key=${API_KEY}&query=${encodeURIComponent(city)}`
    console.log("Attempting to fetch weather from API...")

    const response = await fetch(url, {
      next: { revalidate: 3600 }, // Cache for 1 hour to reduce API calls
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }

    const text = await response.text()
    let data

    try {
      data = JSON.parse(text)
    } catch (parseError) {
      throw new Error("Invalid JSON response")
    }

    // Check for API errors
    if (data.success === false && data.error) {
      const errorType = data.error.type
      const errorCode = data.error.code

      console.log(`API Error: ${errorType} (${errorCode})`)

      // Handle specific error types
      if (errorType === "rate_limit_reached") {
        throw new Error("RATE_LIMIT")
      }
      if (errorType === "missing_access_key" || errorType === "invalid_access_key") {
        throw new Error("INVALID_KEY")
      }
      if (errorType === "invalid_query") {
        throw new Error("CITY_NOT_FOUND")
      }

      throw new Error(`API_ERROR: ${data.error.info}`)
    }

    // Validate and return real data
    if (data.location && data.current) {
      console.log("✅ Real weather data fetched successfully")
      return {
        name: data.location.name,
        country: data.location.country,
        temperature: data.current.temperature,
        description: data.current.weather_descriptions?.[0] || "Unknown",
        icon: data.current.weather_icons?.[0] || "",
        humidity: data.current.humidity || 0,
        windSpeed: data.current.wind_speed || 0,
        pressure: data.current.pressure || 0,
        feelsLike: data.current.feelslike || data.current.temperature,
        visibility: data.current.visibility || 0,
      }
    }

    throw new Error("Invalid response format")
  } catch (error) {
    console.log("API call failed, using mock data:", error instanceof Error ? error.message : "Unknown error")

    // Return mock data for any error
    return generateMockWeatherData(city)
  }
}

export async function getForecast(city: string): Promise<ForecastData[]> {
  try {
    // Get base weather data (either real or mock)
    const baseWeather = await getCurrentWeather(city)

    // Generate forecast based on current weather
    const forecast: ForecastData[] = []
    const today = new Date()

    // Use city name as seed for consistent "random" values
    const seed = city.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)

    for (let i = 0; i < 5; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)

      // Create realistic temperature variations
      const dayFactor = (seed % 10) / 10
      const baseTemp = baseWeather.temperature
      const variation = Math.sin(i + dayFactor) * 4 // -4 to +4 degrees variation
      const seasonalTrend = i * 0.3 // slight seasonal trend

      // Vary weather conditions slightly
      const descriptions = ["sunny", "partly cloudy", "cloudy", "light rain"]
      const descIndex = (seed + i) % descriptions.length
      const description = i === 0 ? baseWeather.description : descriptions[descIndex]

      forecast.push({
        date: date.toDateString(),
        temperature: {
          max: Math.round(baseTemp + variation + seasonalTrend),
          min: Math.round(baseTemp + variation - 6 + seasonalTrend),
        },
        description,
        icon: WEATHER_ICONS[description] || baseWeather.icon,
        humidity: Math.max(30, Math.min(90, baseWeather.humidity + Math.floor(Math.sin(i + dayFactor * 2) * 15))),
      })
    }

    return forecast
  } catch (error) {
    console.error("Error in getForecast:", error)
    return []
  }
}

export function getWeatherIconUrl(icon: string): string {
  // For emoji icons, return a placeholder
  if (icon && icon.length <= 2) {
    return `/placeholder.svg?height=64&width=64&text=${encodeURIComponent(icon)}`
  }
  return icon || "/placeholder.svg?height=64&width=64"
}
