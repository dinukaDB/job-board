import Jobs from "@/components/jobs";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-600/10 backdrop-blur-3xl"></div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-16 pb-12">
          <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
            {/* Logo - Top on mobile, Left on desktop */}
            <div className="flex-shrink-0 order-1 sm:order-1">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-3 sm:p-6 shadow-lg border border-white/20">
                <Image 
                  src="/images/JobFlow.png" 
                  alt="JobFlow Logo" 
                  width={80}  // Smaller on mobile
                  height={80} // Smaller on mobile
                  className="rounded-lg sm:w-24 sm:h-24" // Larger on desktop
                  priority
                />
              </div>
            </div>

            {/* Text content - Below logo on mobile, Right on desktop */}
            <div className="flex-grow space-y-4 text-center sm:text-left order-2 sm:order-2">
              <div className="inline-block">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                  </span>
                  Now Hiring
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight">
                Find Your{" "}
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Dream Job
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto sm:mx-0">
                Discover exciting career opportunities and join innovative teams
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Jobs Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
        <div className="space-y-6">
          <Jobs />
        </div>
      </div>
    </div>
  );
}