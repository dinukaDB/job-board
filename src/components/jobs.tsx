'use client'

import { useEffect, useRef, useState } from "react"
import { Briefcase, MapPin, Clock, ArrowRight } from "lucide-react"

type Job = {
  id: number
  title: string
  company: string
  location: string
  type: string
  description: string
}

export default function Jobs() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const observerRef = useRef<HTMLDivElement | null>(null)

  const fetchJobs = async () => {
    if (isLoading || !hasMore) return
    setIsLoading(true)

    try {
      const res = await fetch(`/api/jobs?page=${page}&limit=5`)
      const data = await res.json()

      if (data.length === 0) {
        setHasMore(false)
      } else {
        setJobs((prev) => {
          const existingIds = new Set(prev.map(job => job.id))
          const newJobs = data.filter((job: Job) => !existingIds.has(job.id))
          return [...prev, ...newJobs]
        })
        setPage((prev) => prev + 1)
      }
    } catch (error) {
      console.error("Error fetching jobs:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchJobs()
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore && !isLoading) {
        fetchJobs()
      }
    })

    if (observerRef.current) {
      observer.observe(observerRef.current)
    }

    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current)
    }
  }, [hasMore, isLoading])

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      'Full-time': 'bg-emerald-100 text-emerald-700 border-emerald-200',
      'Part-time': 'bg-amber-100 text-amber-700 border-amber-200',
      'Contract': 'bg-purple-100 text-purple-700 border-purple-200',
      'Remote': 'bg-blue-100 text-blue-700 border-blue-200',
    }
    return colors[type] || 'bg-gray-100 text-gray-700 border-gray-200'
  }

  return (
    <>
      {jobs.map((job, index) => (
        <div
          key={job.id}
          className="group relative bg-white rounded-2xl border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-blue-100 hover:-translate-y-1"
          style={{
            animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`
          }}
        >
          {/* Gradient accent */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          <div className="p-8">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
              <div className="flex-1">
                <div className="flex items-start gap-3 mb-3">
                  <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg shadow-blue-200 group-hover:scale-110 transition-transform duration-300">
                    <Briefcase className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {job.title}
                    </h2>
                    <p className="text-lg font-semibold text-gray-700 mt-1">
                      {job.company}
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-3 mt-4">
                  <span className="inline-flex items-center gap-1.5 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    {job.location}
                  </span>
                  <span className={`inline-flex items-center gap-1.5 text-sm font-medium px-3 py-1 rounded-full border ${getTypeColor(job.type)}`}>
                    <Clock className="w-3.5 h-3.5" />
                    {job.type}
                  </span>
                </div>
              </div>
              
              <button className="shrink-0 inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg shadow-blue-200 hover:shadow-xl hover:shadow-blue-300 group-hover:scale-105">
                Apply Now
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            
            <p className="text-gray-600 leading-relaxed mt-4 line-clamp-3">
              {job.description}
            </p>
          </div>
        </div>
      ))}

      <div ref={observerRef} className="text-center py-8">
        {isLoading && hasMore && (
          <div className="flex flex-col items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            </div>
            <span className="text-gray-600 font-medium">Loading more opportunities...</span>
          </div>
        )}
        {!hasMore && jobs.length > 0 && (
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-600 rounded-full font-medium">
            <span>✨</span>
            You've viewed all available positions
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  )
}