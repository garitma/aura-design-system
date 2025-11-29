export default function Home() {
    return (
      <div className="min-h-screen bg-gray-1 text-gray-12 font-sans selection:bg-accent-5 selection:text-accent-12">
        {/* Navigation */}
        <nav className="fixed top-0 w-full z-50 border-b border-gray-6 bg-gray-1/80 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-2 h-[52px] flex items-center justify-between">
            <div className="flex items-center gap-1">
              <div className="size-2 bg-accent-9 rounded-full"></div>
              <span className="font-semibold text-sm tracking-tight">Aura</span>
            </div>
            <div className="flex items-center gap-2">
  
            </div>
          </div>
        </nav>
  
        <main className="pt-4 pb-4 px-2 max-w-7xl mx-auto flex flex-col gap-4">
          {/* Hero Section */}
          <section className="relative rounded-xl bg-gray-2 border border-gray-6 overflow-hidden p-4 sm:p-6 flex flex-col items-center text-center gap-2 mt-4">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,var(--accent-a3),transparent_70%)]"></div>
  
            <div className="relative z-10 flex flex-col items-center gap-1.5 max-w-2xl">
              <div className="inline-flex items-center gap-0.5 px-1 py-0.5 rounded-full bg-accent-2 border border-accent-6 text-accent-11 text-xs font-medium mb-1">
                <span className="relative flex h-1 w-1">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-9 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1 w-1 bg-accent-9"></span>
                </span>
                v2.0 is now available
              </div>
  
              <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-gray-12 text-balance">
                Design with <span className="text-accent-9">Precision</span>
              </h1>
  
              <p className="text-lg text-gray-11 text-balance max-w-lg">
                A premium design system built on a 13px scale. Crafted for modern applications that demand pixel-perfect aesthetics.
              </p>
  
  
            </div>
          </section>
  
          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <div className="p-3 rounded-lg bg-gray-2 border border-gray-6 hover:border-accent-8 transition-colors group">
              <div className="size-3 rounded-md bg-accent-3 flex items-center justify-center mb-2 group-hover:bg-accent-4 transition-colors">
                <div className="size-1.5 bg-accent-9 rounded-sm"></div>
              </div>
              <h3 className="font-semibold text-gray-12 mb-0.5">13px Scale</h3>
              <p className="text-sm text-gray-11">
                Everything is a multiple of 13px. Spacing, typography, and layout align perfectly.
              </p>
            </div>
  
            <div className="p-3 rounded-lg bg-gray-2 border border-gray-6 hover:border-accent-8 transition-colors group">
              <div className="size-3 rounded-md bg-accent-3 flex items-center justify-center mb-2 group-hover:bg-accent-4 transition-colors">
                <div className="size-1.5 bg-accent-9 rounded-full"></div>
              </div>
              <h3 className="font-semibold text-gray-12 mb-0.5">Radix Colors</h3>
              <p className="text-sm text-gray-11">
                12-step color scales for accessible, consistent theming in light and dark modes.
              </p>
            </div>
  
            <div className="p-3 rounded-lg bg-gray-2 border border-gray-6 hover:border-accent-8 transition-colors group">
              <div className="size-3 rounded-md bg-accent-3 flex items-center justify-center mb-2 group-hover:bg-accent-4 transition-colors">
                <div className="w-1.5 h-0.5 bg-accent-9 rounded-full"></div>
              </div>
              <h3 className="font-semibold text-gray-12 mb-0.5">Premium Taste</h3>
              <p className="text-sm text-gray-11">
                We've compiled the high-quality basic ingredients for your product; by adding just a few of taste—your final signature touch—we believe you can achieve something truly great
              </p>
            </div>
          </div>
  
          {/* Interactive Demo Section */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-2">
            <div className="p-4 rounded-xl bg-gray-12 text-gray-1 flex flex-col justify-center gap-2">
              <h2 className="text-2xl font-bold">Dark Mode Native</h2>
              <p className="text-gray-8">
                The system automatically adapts to dark mode with carefully tuned contrast ratios.
              </p>
              <div className="mt-2 flex gap-1">
                <div className="h-4 w-4 rounded-md bg-gray-11/20 animate-pulse"></div>
                <div className="h-4 w-8 rounded-md bg-gray-11/20 animate-pulse"></div>
              </div>
            </div>
  
            <div className="p-4 rounded-xl bg-accent-3 border border-accent-6 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%,100%_100%] bg-[position:-100%_0,0_0] bg-no-repeat transition-[background-position_0s_ease] hover:bg-[position:200%_0,0_0] duration-[1500ms]"></div>
              <div className="bg-gray-1 p-3 rounded-lg shadow-xl border border-gray-4 max-w-xs w-full">
                <div className="flex items-center gap-1 mb-2">
                  <div className="size-2 rounded-full bg-gray-3"></div>
                  <div className="h-1 w-10 bg-gray-3 rounded-sm"></div>
                </div>
                <div className="space-y-1">
                  <div className="h-1 w-full bg-gray-3 rounded-sm"></div>
                  <div className="h-1 w-2/3 bg-gray-3 rounded-sm"></div>
                </div>
                <div className="mt-3 flex justify-end">
                  <div className="h-2 w-6 bg-accent-9 rounded-sm"></div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    );
  }
  