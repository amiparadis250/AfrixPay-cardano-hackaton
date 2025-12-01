'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Send, Globe, Shield, Zap } from 'lucide-react';

export function AuthPage() {
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(true);
  const [formData, setFormData] = useState({
    phone: '',
    password: '',
    country: '',
  });

  const countries = [
    'Kenya',
    'Rwanda',
    'Uganda',
    'Tanzania',
    'Nigeria',
    'Ghana',
    'South Africa',
    'Ethiopia',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen grid grid-cols-2">
      {/* Left Side - Brand Message */}
      <div className="bg-gradient-to-br from-[#0052FF] via-[#0036C8] to-[#002380] p-16 flex flex-col justify-between text-white">
        <div>
          <div className="flex items-center gap-3 mb-16">
            <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
              <Send className="w-7 h-7 text-white" />
            </div>
            <span className="text-3xl">AfriXPay</span>
          </div>
          
          <h1 className="text-5xl mb-6 leading-tight">
            Send money across Africa in seconds
          </h1>
          <p className="text-xl text-blue-100 mb-16">
            Join thousands of users making borderless payments with blockchain technology
          </p>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-lg flex items-center justify-center flex-shrink-0">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg mb-1">Instant Transfers</h3>
                <p className="text-blue-100 text-sm">
                  Blockchain-powered settlements in real-time
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg mb-1">Ultra-Low Fees</h3>
                <p className="text-blue-100 text-sm">
                  Save up to 90% on international transfers
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-lg flex items-center justify-center flex-shrink-0">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg mb-1">Pan-African Network</h3>
                <p className="text-blue-100 text-sm">
                  Connected to mobile money across 20+ countries
                </p>
              </div>
            </div>
          </div>
        </div>

        <p className="text-sm text-blue-200">
          Trusted by 50,000+ users across Africa
        </p>
      </div>

      {/* Right Side - Form */}
      <div className="bg-white p-16 flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h2 className="text-3xl text-gray-900 mb-2">
              {isSignUp ? 'Create your account' : 'Welcome back'}
            </h2>
            <p className="text-gray-600">
              {isSignUp
                ? 'Get started with AfriXPay in minutes'
                : 'Sign in to your account'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="phone" className="block text-sm text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                placeholder="+254 700 000 000"
                value={formData.phone}
                onChange={(e: { target: { value: any; }; }) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0052FF] focus:border-transparent"
                required
              />
            </div>

            {isSignUp && (
              <div>
                <label htmlFor="country" className="block text-sm text-gray-700 mb-2">
                  Country
                </label>
                <select
                  id="country"
                  value={formData.country}
                  onChange={(e: { target: { value: any; }; }) => setFormData({ ...formData, country: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0052FF] focus:border-transparent"
                  required
                >
                  <option value="">Select your country</option>
                  {countries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label htmlFor="password" className="block text-sm text-gray-700 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e: { target: { value: any; }; }) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0052FF] focus:border-transparent"
                required
              />
            </div>

            {!isSignUp && (
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded text-[#0052FF]" />
                  <span className="text-sm text-gray-600">Remember me</span>
                </label>
                <a href="#" className="text-sm text-[#0052FF] hover:text-[#0036C8]">
                  Forgot password?
                </a>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 bg-[#0052FF] text-white rounded-lg hover:bg-[#0036C8] transition-colors"
            >
              {isSignUp ? 'Create Account' : 'Sign In'}
            </button>
          </form>

          {isSignUp && (
            <p className="mt-6 text-sm text-gray-500 text-center">
              By creating an account, you agree to our{' '}
              <a href="#" className="text-[#0052FF] hover:text-[#0036C8]">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="text-[#0052FF] hover:text-[#0036C8]">
                Privacy Policy
              </a>
            </p>
          )}

          <div className="mt-8 text-center">
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-sm text-gray-600"
            >
              {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
              <span className="text-[#0052FF] hover:text-[#0036C8]">
                {isSignUp ? 'Sign in' : 'Sign up'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
