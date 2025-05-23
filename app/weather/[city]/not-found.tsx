import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="space-y-8">
      <Card className="gradient-card">
        <CardContent className="p-6 sm:p-8 text-center">
          <div className="mb-6">
            <div className="bg-red-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <MapPin className="h-8 w-8 text-red-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">City Not Found</h1>
            <p className="text-gray-600">
              We couldn't find weather data for the city you're looking for. Please check the spelling and try again.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="outline">
              <Link href="/weather">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Weather
              </Link>
            </Button>
            <Button asChild>
              <Link href="/">Go Home</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
