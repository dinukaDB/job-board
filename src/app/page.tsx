import Jobs from "@/components/jobs";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-600/10 backdrop-blur-3xl"></div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-16 pb-12">
          <div className="text-center space-y-4">
            <div className="inline-block">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-4">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                Now Hiring
              </span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 tracking-tight">
              Find Your{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Dream Job
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover exciting career opportunities and join innovative teams
            </p>
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