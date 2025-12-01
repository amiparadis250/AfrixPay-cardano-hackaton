'use client'

import { useRouter } from 'next/navigation'
import { Send, Zap, Shield, Smartphone, CheckCircle2, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

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
    'Flutterwave',
    'Paystack',
    'M-Pesa',
    'MTN Mobile Money',
    'Airtel Money',
    'Chipper Cash',
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-[#0052FF] to-[#0036C8] rounded-lg flex items-center justify-center">
              <Send className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl text-gray-900">AfriXPay</span>
          </div>
          <nav className="flex items-center gap-8">
            <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">
              Features
            </a>
            <a href="#partners" className="text-gray-600 hover:text-gray-900 transition-colors">
              Partners
            </a>
            <button
              onClick={() => router.push('/auth')}
              className="text-gray-600 hover:text-gray-900 transition-colors"
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
        <div className="relative max-w-7xl mx-auto px-8 py-32">
          <div className="grid grid-cols-2 gap-16 items-center">
            <div>
              <h1 className="text-6xl text-white mb-6">
                Borderless Payments for Africa
              </h1>
              <p className="text-xl text-blue-100 mb-10">
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
                  className="px-8 py-4 bg-transparent text-white border-2 border-white rounded-lg hover:bg-white/10 transition-colors"
                >
                  Try Demo
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1543234723-b70b104d8e25?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2ElMjBtYXAlMjBkaWdpdGFsfGVufDF8fHx8MTc2NDU3NTA5NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Africa digital network"
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0052FF]/80 to-transparent" />
              </div>
              {/* Floating currency indicators */}
              <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg px-4 py-3 flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white">
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
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl text-gray-900 mb-4">Why Choose AfriXPay</h2>
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
                  className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                >
                  <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6 text-[#0052FF]" />
                  </div>
                  <h3 className="text-xl text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section id="partners" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-12">
            <p className="text-gray-500 mb-8">Trusted by leading financial partners</p>
          </div>
          <div className="grid grid-cols-6 gap-8 items-center">
            {partners.map((partner, index) => (
              <div
                key={index}
                className="flex items-center justify-center p-6 bg-gray-50 rounded-lg border border-gray-100"
              >
                <span className="text-gray-400">{partner}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-[#0052FF] to-[#0036C8] rounded-lg flex items-center justify-center">
                  <Send className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl">AfriXPay</span>
              </div>
              <p className="text-gray-400 text-sm">
                Borderless payments for Africa
              </p>
            </div>
            <div>
              <h4 className="mb-4 text-sm">Product</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-sm">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-sm">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-sm text-gray-400 text-center">
            © 2025 AfriXPay. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
