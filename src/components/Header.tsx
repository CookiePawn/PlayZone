'use client';

import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-300 fixed top-0 left-0 right-0 z-50">
      <nav className="max-w-[1080px] mx-auto px-6">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-purple-600">
              플레이존
            </Link>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
            <Link href="/terms" className="text-gray-900 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
              이용약관
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header; 