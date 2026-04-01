import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const calculators = [
    {
      id: 'basic',
      title: 'Basic Calculator',
      description: 'Perform basic arithmetic operations',
      icon: '🧮',
      color: 'from-blue-500 to-blue-600',
      route: '/basic-calculator'
    },
    {
      id: 'age',
      title: 'Age Calculator',
      description: 'Calculate your exact age in years, months, and days',
      icon: '📅',
      color: 'from-purple-500 to-purple-600',
      route: '/age-calculator'
    },
    {
      id: 'interest',
      title: 'Interest Calculator',
      description: 'Calculate simple interest for loans and investments',
      icon: '💰',
      color: 'from-green-500 to-green-600',
      route: '/interest-calculator'
    },
    {
      id: 'simple-interest',
      title: 'Compound Interest Calculator',
      description: 'Calculate compound interest with date-based duration',
      icon: '📊',
      color: 'from-orange-500 to-orange-600',
      route: '/simple-interest-calculator'
    },
    {
      id: 'discount',
      title: 'Discount Calculator',
      description: 'Calculate discounts and savings on purchases',
      icon: '🏷️',
      color: 'from-pink-500 to-pink-600',
      route: '/discount-calculator'
    },
    {
      id: 'pdf-converter',
      title: 'I Love PDF',
      description: 'Convert PDF to Word and Word to PDF',
      icon: '📄',
      color: 'from-red-500 to-rose-600',
      route: '/pdf-converter'
    },
    {
      id: 'text-diagrams',
      title: 'Text to Diagrams',
      description: 'Convert text to block diagrams, flowcharts, and visual diagrams',
      icon: '📊',
      color: 'from-indigo-500 to-purple-600',
      route: '/text-diagrams'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            Gopi's Calculator Hub
          </h1>
          <p className="text-xl text-gray-300">
            Professional calculators for all your needs
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {calculators.map((calc) => (
            <div
              key={calc.id}
              onClick={() => navigate(calc.route)}
              className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
            >
              <div className={`bg-gradient-to-br ${calc.color} rounded-2xl p-6 h-full shadow-xl hover:shadow-2xl transition-all duration-300`}>
                <div className="text-5xl mb-4 text-center">
                  {calc.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2 text-center">
                  {calc.title}
                </h3>
                <p className="text-white/80 text-sm text-center">
                  {calc.description}
                </p>
                <div className="mt-4 text-center">
                  <span className="inline-block bg-white/20 rounded-full px-3 py-1 text-xs text-white">
                    Click to open →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <footer className="text-center mt-16 text-gray-400">
          <p>© 2024 Gopi's Calculator Hub. Professional calculation tools.</p>
        </footer>
      </div>
    </div>
  );
};

export default Dashboard;
