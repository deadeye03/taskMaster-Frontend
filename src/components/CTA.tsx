
import { ArrowRight, Download, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";

export const CTA = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full mix-blend-overlay opacity-10 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full mix-blend-overlay opacity-10 translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Ready to Get
            <br />
            <span className="text-transparent bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text">
              Organized?
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl text-purple-100 mb-12 max-w-3xl mx-auto leading-relaxed">
            Join millions of users who have transformed their productivity. 
            Start your free trial today and experience the difference.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Button 
              size="lg" 
              className="px-10 py-5 text-lg font-semibold bg-white text-purple-600 hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-xl hover:shadow-2xl"
            >
              <Download className="w-5 h-5 mr-2" />
              Start Free Trial
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="px-10 py-5 text-lg font-semibold border-2 border-white text-white hover:bg-white hover:text-purple-600 transform hover:scale-105 transition-all duration-200"
            >
              <Smartphone className="w-5 h-5 mr-2" />
              Download App
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto text-purple-100">
            <div className="flex flex-col items-center">
              <div className="text-2xl font-bold mb-2">✨ Free Forever</div>
              <div className="text-sm opacity-80">Basic features always free</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-2xl font-bold mb-2">🚀 Setup in 2 minutes</div>
              <div className="text-sm opacity-80">No complex configuration</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-2xl font-bold mb-2">🔒 100% Secure</div>
              <div className="text-sm opacity-80">Your data is always protected</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
