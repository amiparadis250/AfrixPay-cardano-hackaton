'use client'

import { useRouter } from 'next/navigation'
import { Send, Zap, Shield, Smartphone, CheckCircle2, ArrowRight } from 'lucide-react';


export function LandingPage() {
  const router = useRouter();

  const features = [
    {
      icon: Zap,
      title: 'Instant Transfers',
      description: 'Send money across Africa in seconds, not days. Real-time blockchain settlements.',
    },
    {
      icon: Shield,
      title: 'Low Fees',
      description: 'Pay only 0.5%-1% in fees. Save up to 90% compared to traditional services.',
    },
    {
      icon: CheckCircle2,
      title: 'Stablecoins',
      description: 'Protected from volatility with USD-pegged stablecoins for reliable transfers.',
    },
    {
      icon: Smartphone,
      title: 'Mobile Money Integration',
      description: 'Direct integration with M-Pesa, MTN, and Airtel Money networks.',
    },
  ];

  const partners = [
    'AirteL Money',
    'Orange Telecom',
    'M-Pesa',
    'MTN Mobile Money',
    'Airtel Money',
    
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100">
        <div className="flex items-center justify-between px-8 py-6 mx-auto max-w-7xl">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-[#0052FF] to-[#0036C8] rounded-lg flex items-center justify-center">
              <Send className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl text-gray-900">AfriXPay</span>
          </div>
          <nav className="flex items-center gap-8">
            <a href="#features" className="text-gray-600 transition-colors hover:text-gray-900">
              Features
            </a>
            <a href="#partners" className="text-gray-600 transition-colors hover:text-gray-900">
              Partners
            </a>
            <button
              onClick={() => router.push('/auth')}
              className="text-gray-600 transition-colors hover:text-gray-900"
            >
              Sign In
            </button>
            <button
              onClick={() => router.push('/auth')}
              className="px-6 py-2.5 bg-[#0052FF] text-white rounded-lg hover:bg-[#0036C8] transition-colors"
            >
              Get Started
            </button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0052FF] via-[#0036C8] to-[#002380]" />
        <div className="relative px-8 py-32 mx-auto max-w-7xl">
          <div className="grid items-center grid-cols-2 gap-16">
            <div>
              <h1 className="mb-6 text-6xl text-white">
                Borderless Payments for Africa
              </h1>
              <p className="mb-10 text-xl text-blue-100">
                Send money instantly across Africa at ultra-low fees
              </p>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => router.push('/auth')}
                  className="px-8 py-4 bg-white text-[#0052FF] rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                >
                  Get Started
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() => router.push('/dashboard')}
                  className="px-8 py-4 text-white transition-colors bg-transparent border-2 border-white rounded-lg hover:bg-white/10"
                >
                  Try Demo
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="relative overflow-hidden shadow-2xl rounded-2xl">
                <div className="w-full h-[400px] bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="mb-4 text-6xl">🌍</div>
                    <div className="text-xl">Africa Connected</div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0052FF]/80 to-transparent" />
              </div>
              {/* Floating currency indicators */}
              <div className="absolute flex items-center gap-2 px-4 py-3 bg-white shadow-lg -top-4 -right-4 rounded-xl">
                <div className="flex items-center justify-center w-8 h-8 text-white bg-green-500 rounded-full">
                  ✓
                </div>
                <div>
                  <div className="text-xs text-gray-500">KES → RWF</div>
                  <div className="text-gray-900">Instant</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-gray-50">
        <div className="px-8 mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl text-gray-900">Why Choose AfriXPay</h2>
            <p className="text-xl text-gray-600">
              The fastest, most affordable way to send money across Africa
            </p>
          </div>
          <div className="grid grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="p-8 transition-shadow bg-white border border-gray-100 shadow-sm rounded-xl hover:shadow-md"
                >
                  <div className="flex items-center justify-center w-12 h-12 mb-6 rounded-lg bg-blue-50">
                    <Icon className="w-6 h-6 text-[#0052FF]" />
                  </div>
                  <h3 className="mb-3 text-xl text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section id="partners" className="py-24 bg-white">
        <div className="px-8 mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <p className="mb-8 text-gray-500">Trusted by leading financial partners</p>
          </div>
          <div className="grid items-center grid-cols-6 gap-8">
            {partners.map((partner, index) => (
              <div
                key={index}
                className="flex items-center justify-center p-6 border border-gray-100 rounded-lg bg-gray-50"
              >
                <span className="text-gray-400">{partner}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 text-white bg-gray-900">
        <div className="px-8 mx-auto max-w-7xl">
          <div className="grid grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-[#0052FF] to-[#0036C8] rounded-lg flex items-center justify-center">
                  <Send className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl">AfriXPay</span>
              </div>
              <p className="text-sm text-gray-400">
                Borderless payments for Africa
              </p>
            </div>
            <div>
              <h4 className="mb-4 text-sm">Product</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="transition-colors hover:text-white">Features</a></li>
                <li><a href="#" className="transition-colors hover:text-white">Pricing</a></li>
                <li><a href="#" className="transition-colors hover:text-white">API</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-sm">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="transition-colors hover:text-white">About</a></li>
                <li><a href="#" className="transition-colors hover:text-white">Careers</a></li>
                <li><a href="#" className="transition-colors hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-sm">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="transition-colors hover:text-white">Privacy</a></li>
                <li><a href="#" className="transition-colors hover:text-white">Terms</a></li>
                <li><a href="#" className="transition-colors hover:text-white">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 text-sm text-center text-gray-400 border-t border-gray-800">
            © 2025 AfriXPay. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
