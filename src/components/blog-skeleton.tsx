import { Card, CardContent } from "@/components/ui/card"

export function BlogSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <Card key={i} className="bg-gray-900 border-gray-800">
          <CardContent className="p-6">
            <div className="flex gap-2 mb-4">
              <div className="h-5 w-16 bg-gray-800 rounded animate-pulse" />
              <div className="h-5 w-12 bg-gray-800 rounded animate-pulse" />
            </div>
            <div className="h-6 bg-gray-800 rounded mb-3 animate-pulse" />
            <div className="h-4 bg-gray-800 rounded mb-2 animate-pulse" />
            <div className="h-4 bg-gray-800 rounded mb-4 w-3/4 animate-pulse" />
            <div className="flex justify-between items-center mb-4">
              <div className="h-3 w-24 bg-gray-800 rounded animate-pulse" />
              <div className="h-3 w-16 bg-gray-800 rounded animate-pulse" />
            </div>
            <div className="h-4 w-24 bg-gray-800 rounded animate-pulse" />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
