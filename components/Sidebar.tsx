'use client'

import { useRouter, usePathname } from 'next/navigation';
import { LayoutDashboard, Send, Wallet, Receipt, User, Settings, LogOut } from 'lucide-react';

export function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Send, label: 'Send Money', path: '/send' },
    { icon: Wallet, label: 'Wallet', path: '/wallet' },
    { icon: Receipt, label: 'Transactions', path: '/transactions' },
    { icon: User, label: 'Profile', path: '/profile' },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <div className="w-64 bg-white border-r border-gray-100 h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-[#0052FF] to-[#0036C8] rounded-lg flex items-center justify-center">
            <Send className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl text-gray-900">AfriXPay</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <li key={item.path}>
                <button
                  onClick={() => router.push(item.path)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    active
                      ? 'bg-blue-50 text-[#0052FF]'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center gap-3 px-4 py-3 mb-2">
          <div className="w-10 h-10 bg-gradient-to-br from-[#0052FF] to-[#0036C8] rounded-full flex items-center justify-center text-white">
            JD
          </div>
          <div className="flex-1">
            <div className="text-sm text-gray-900">John Doe</div>
            <div className="text-xs text-gray-500">+254 700 000 000</div>
          </div>
        </div>
        <button
          onClick={() => {
            localStorage.removeItem('token')
            router.push('/')
          }}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );
}
