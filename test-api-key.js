// Test the OpenWeatherMap API key directly
const API_KEY = "e50b66e86d26d93bb8eb9a69805a5266"
const city = "London" // Using a well-known city for testing

async function testApiKey() {
  console.log("Testing OpenWeatherMap API key...")

  try {
    // Test current weather endpoint
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    console.log(`Fetching from: ${weatherUrl}`)

    const weatherResponse = await fetch(weatherUrl)
    const weatherStatus = weatherResponse.status
    console.log(`Current weather API status code: ${weatherStatus}`)

    if (weatherResponse.ok) {
      const weatherData = await weatherResponse.json()
      console.log("✅ Current weather API working!")
      console.log(`City: ${weatherData.name}`)
      console.log(`Temperature: ${weatherData.main.temp}°C`)
      console.log(`Weather: ${weatherData.weather[0].description}`)
    } else {
      const errorText = await weatherResponse.text()
      console.error(`❌ Current weather API error: ${weatherStatus}`)
      console.error(`Error details: ${errorText}`)
    }

    // Test forecast endpoint
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
    console.log(`\nFetching from: ${forecastUrl}`)

    const forecastResponse = await fetch(forecastUrl)
    const forecastStatus = forecastResponse.status
    console.log(`Forecast API status code: ${forecastStatus}`)

    if (forecastResponse.ok) {
      const forecastData = await forecastResponse.json()
      console.log("✅ Forecast API working!")
      console.log(`City: ${forecastData.city.name}`)
      console.log(`Number of forecast items: ${forecastData.list.length}`)

      // Check first forecast item
      if (forecastData.list && forecastData.list.length > 0) {
        const firstItem = forecastData.list[0]
        console.log(`First forecast: ${new Date(firstItem.dt * 1000).toLocaleString()}`)
        console.log(`Temperature: ${firstItem.main.temp}°C`)
        console.log(`Weather: ${firstItem.weather[0].description}`)
      }
    } else {
      const errorText = await forecastResponse.text()
      console.error(`❌ Forecast API error: ${forecastStatus}`)
      console.error(`Error details: ${errorText}`)
    }
  } catch (error) {
    console.error("❌ Error testing API key:", error.message)
  }
}

testApiKey()
