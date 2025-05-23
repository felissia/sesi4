import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function WeatherSkeleton() {
  return (
    <div className="space-y-8">
      {/* Header skeleton */}
      <Card className="gradient-card">
        <CardContent className="p-6 sm:p-8">
          <div className="flex items-center justify-between mb-4">
            <div className="h-8 w-20 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="h-8 w-64 bg-gray-200 rounded animate-pulse mb-2"></div>
          <div className="h-4 w-48 bg-gray-200 rounded animate-pulse"></div>
        </CardContent>
      </Card>

      {/* Current weather skeleton */}
      <Card>
        <CardHeader>
          <div className="h-6 w-48 bg-gray-200 rounded animate-pulse"></div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-gray-200 rounded animate-pulse"></div>
              <div>
                <div className="h-12 w-24 bg-gray-200 rounded animate-pulse mb-2"></div>
                <div className="h-4 w-32 bg-gray-200 rounded animate-pulse mb-1"></div>
                <div className="h-3 w-28 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-gray-50 p-4 rounded-xl">
                  <div className="h-4 w-20 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="h-6 w-16 bg-gray-200 rounded animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Forecast skeleton */}
      <Card>
        <CardHeader>
          <div className="h-6 w-40 bg-gray-200 rounded animate-pulse"></div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="p-4 rounded-xl border-2 border-gray-200">
                <div className="text-center">
                  <div className="h-4 w-16 bg-gray-200 rounded animate-pulse mb-2 mx-auto"></div>
                  <div className="w-12 h-12 bg-gray-200 rounded animate-pulse mx-auto mb-2"></div>
                  <div className="h-5 w-8 bg-gray-200 rounded animate-pulse mb-1 mx-auto"></div>
                  <div className="h-4 w-6 bg-gray-200 rounded animate-pulse mx-auto"></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
