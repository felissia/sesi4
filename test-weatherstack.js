// Test the Weatherstack API key directly
const API_KEY = "e50b66e86d26d93bb8eb9a69805a5266"
const city = "London" // Using a well-known city for testing

async function testWeatherstackApi() {
  console.log("Testing Weatherstack API key...")

  try {
    // Test with HTTP
    const httpUrl = `http://api.weatherstack.com/current?access_key=${API_KEY}&query=${city}`
    console.log(`Fetching from HTTP URL: ${httpUrl}`)

    try {
      const httpResponse = await fetch(httpUrl)
      const httpText = await httpResponse.text()
      console.log("HTTP Response:", httpText.substring(0, 200) + "...")

      try {
        const httpData = JSON.parse(httpText)
        console.log(
          "HTTP JSON parsed successfully:",
          httpData.success === false ? "Error response" : "Success response",
        )
      } catch (parseError) {
        console.error("Failed to parse HTTP response as JSON:", parseError.message)
      }
    } catch (httpError) {
      console.error("HTTP request failed:", httpError.message)
    }

    // Test with HTTPS
    const httpsUrl = `https://api.weatherstack.com/current?access_key=${API_KEY}&query=${city}`
    console.log(`\nFetching from HTTPS URL: ${httpsUrl}`)

    try {
      const httpsResponse = await fetch(httpsUrl)
      const httpsText = await httpsResponse.text()
      console.log("HTTPS Response:", httpsText.substring(0, 200) + "...")

      try {
        const httpsData = JSON.parse(httpsText)
        console.log(
          "HTTPS JSON parsed successfully:",
          httpsData.success === false ? "Error response" : "Success response",
        )

        if (httpsData.success === false) {
          console.error("API Error:", httpsData.error.type, "-", httpsData.error.info)
        } else if (httpsData.location && httpsData.current) {
          console.log("✅ Weatherstack API working!")
          console.log(`Location: ${httpsData.location.name}, ${httpsData.location.country}`)
          console.log(`Temperature: ${httpsData.current.temperature}°C`)
          console.log(`Weather: ${httpsData.current.weather_descriptions[0]}`)
        }
      } catch (parseError) {
        console.error("Failed to parse HTTPS response as JSON:", parseError.message)
      }
    } catch (httpsError) {
      console.error("HTTPS request failed:", httpsError.message)
    }
  } catch (error) {
    console.error("❌ Error testing API:", error.message)
  }
}

testWeatherstackApi()
