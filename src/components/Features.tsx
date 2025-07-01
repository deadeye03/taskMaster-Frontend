
import { CheckCircle, Bell, Calendar, Users, Smartphone, Shield } from "lucide-react";

export const Features = () => {
  const features = [
    {
      icon: CheckCircle,
      title: "Smart Task Management",
      description: "Organize tasks with intelligent categorization, priority levels, and due dates that adapt to your workflow.",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: Bell,
      title: "Smart Notifications",
      description: "Never miss a deadline with AI-powered reminders that learn your habits and preferences.",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Calendar,
      title: "Calendar Integration",
      description: "Seamlessly sync with your existing calendars and schedule tasks at optimal times.",
      color: "from-indigo-500 to-indigo-600"
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Share projects, assign tasks, and collaborate with your team in real-time.",
      color: "from-teal-500 to-teal-600"
    },
    {
      icon: Smartphone,
      title: "Cross-Platform Sync",
      description: "Access your tasks anywhere, anytime. Perfect sync across all your devices.",
      color: "from-pink-500 to-pink-600"
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your data is encrypted and secure. We respect your privacy and never share your information.",
      color: "from-emerald-500 to-emerald-600"
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Everything You Need to 
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"> Stay Organized</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Powerful features designed to boost your productivity and help you achieve more with less effort.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 hover:shadow-xl hover:shadow-purple-100/50 transition-all duration-300 hover:-translate-y-2"
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${feature.color} p-3 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
