"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertTriangle, ArrowLeft, RefreshCw } from "lucide-react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("Weather app error:", error)
  }, [error])

  const getErrorMessage = (error: Error) => {
    if (error.message.includes("Invalid API key")) {
      return "The weather service is temporarily unavailable. Please try again later."
    }
    if (error.message.includes("City not found")) {
      return "We couldn't find weather data for this city. Please check the spelling and try again."
    }
    if (error.message.includes("network") || error.message.includes("fetch")) {
      return "Network error. Please check your internet connection and try again."
    }
    return error.message || "An unexpected error occurred while fetching weather data."
  }

  return (
    <div className="space-y-8">
      <Card className="gradient-card">
        <CardContent className="p-6 sm:p-8 text-center">
          <div className="mb-6">
            <div className="bg-red-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Weather Data Unavailable</h1>
            <p className="text-gray-600 mb-4">{getErrorMessage(error)}</p>
            {process.env.NODE_ENV === "development" && (
              <details className="text-left bg-gray-100 p-4 rounded-lg mt-4">
                <summary className="cursor-pointer font-medium">Technical Details</summary>
                <pre className="mt-2 text-sm text-gray-700 whitespace-pre-wrap">{error.stack}</pre>
              </details>
            )}
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={reset} variant="default">
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
            <Button asChild variant="outline">
              <Link href="/weather">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Weather
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
