'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Send, Globe, Shield, Zap } from 'lucide-react';
import { useRegisterMutation, useLoginMutation } from '@/lib/api/apiSlice';

export function AuthPage() {
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(true);
  const [register, { isLoading: isRegistering }] = useRegisterMutation();
  const [login, { isLoading: isLoggingIn }] = useLoginMutation();
  const [error, setError] = useState('');
  const loading = isRegistering || isLoggingIn;
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
    country: '',
  });

  const countryCurrencyMap: { [key: string]: string } = {
    'Algeria': 'DZD', 'Angola': 'AOA', 'Benin': 'XOF', 'Botswana': 'BWP', 'Burkina Faso': 'XOF',
    'Burundi': 'BIF', 'Cabo Verde': 'CVE', 'Cameroon': 'XAF', 'Central African Republic': 'XAF',
    'Chad': 'XAF', 'Comoros': 'KMF', 'Congo': 'XAF', 'Democratic Republic of the Congo': 'CDF',
    'Djibouti': 'DJF', 'Egypt': 'EGP', 'Equatorial Guinea': 'XAF', 'Eritrea': 'ERN', 'Eswatini': 'SZL',
    'Ethiopia': 'ETB', 'Gabon': 'XAF', 'Gambia': 'GMD', 'Ghana': 'GHS', 'Guinea': 'GNF',
    'Guinea-Bissau': 'XOF', 'Ivory Coast': 'XOF', 'Kenya': 'KES', 'Lesotho': 'LSL', 'Liberia': 'LRD',
    'Libya': 'LYD', 'Madagascar': 'MGA', 'Malawi': 'MWK', 'Mali': 'XOF', 'Mauritania': 'MRU',
    'Mauritius': 'MUR', 'Morocco': 'MAD', 'Mozambique': 'MZN', 'Namibia': 'NAD', 'Niger': 'XOF',
    'Nigeria': 'NGN', 'Rwanda': 'RWF', 'Sao Tome and Principe': 'STN', 'Senegal': 'XOF',
    'Seychelles': 'SCR', 'Sierra Leone': 'SLL', 'Somalia': 'SOS', 'South Africa': 'ZAR',
    'South Sudan': 'SSP', 'Sudan': 'SDG', 'Tanzania': 'TZS', 'Togo': 'XOF', 'Tunisia': 'TND',
    'Uganda': 'UGX', 'Zambia': 'ZMW', 'Zimbabwe': 'ZWL'
  };

  const countries = Object.keys(countryCurrencyMap);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      let result;
      
      if (isSignUp) {
        const payload = {
          ...formData,
          currency: formData.country ? countryCurrencyMap[formData.country] : 'USD'
        };
        result = await register(payload).unwrap();
      } else {
        result = await login({ email: formData.email, password: formData.password }).unwrap();
      }

      // Handle both old and new API response formats
      if (result.success !== false) {
        if (typeof window !== 'undefined') {
          localStorage.setItem('token', result.token);
          localStorage.setItem('user', JSON.stringify(result.user));
        }
        router.push('/dashboard');
      } else {
        setError(result.error || 'Authentication failed');
      }
    } catch (err: any) {
      // Handle RTK Query errors and direct API errors
      const errorMessage = err.data?.error || err.data?.message || err.message || 'Authentication failed';
      setError(errorMessage);
    }
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

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm text-gray-700 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0052FF] focus:border-transparent"
                required
              />
            </div>

            {isSignUp && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm text-gray-700 mb-2">
                      First Name
                    </label>
                    <input
                      id="firstName"
                      type="text"
                      placeholder="John"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0052FF] focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm text-gray-700 mb-2">
                      Last Name
                    </label>
                    <input
                      id="lastName"
                      type="text"
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0052FF] focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="+250 700 000 000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0052FF] focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="country" className="block text-sm text-gray-700 mb-2">
                    Country
                  </label>
                  <select
                    id="country"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0052FF] focus:border-transparent"
                  >
                    <option value="">Select your country</option>
                    {countries.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                </div>
              </>
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
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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
              disabled={loading}
              className="w-full py-3.5 bg-[#0052FF] text-white rounded-lg hover:bg-[#0036C8] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading && (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              )}
              {loading ? '' : (isSignUp ? 'Create Account' : 'Sign In')}
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
