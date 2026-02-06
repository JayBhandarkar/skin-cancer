import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsLoggedIn(!!localStorage.getItem('token'));
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">SkinAI</h1>
          <div className="flex gap-4">
            {isLoggedIn ? (
              <Link href="/dashboard" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                Dashboard
              </Link>
            ) : (
              <>
                <Link href="/login" className="text-gray-700 hover:text-blue-600 px-4 py-2">
                  Login
                </Link>
                <Link href="/login" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div className="bg-gradient-to-br from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-6xl font-bold mb-6">AI-Powered Skin Cancer Detection</h1>
          <p className="text-2xl mb-8">Get instant analysis and treatment recommendations using advanced AI technology</p>
          <Link href={isLoggedIn ? "/detect" : "/login"} className="bg-white text-blue-600 px-8 py-4 rounded-lg text-xl font-semibold hover:bg-gray-100 inline-block">
            Start Detection Now
          </Link>
        </div>
      </div>

      {/* Features */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">📸</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Upload Image</h3>
            <p className="text-gray-600">Take or upload a clear photo of the affected skin area</p>
          </div>
          <div className="text-center p-6">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🤖</span>
            </div>
            <h3 className="text-xl font-bold mb-2">AI Analysis</h3>
            <p className="text-gray-600">Our AI analyzes the image and detects potential conditions</p>
          </div>
          <div className="text-center p-6">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">💊</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Get Recommendations</h3>
            <p className="text-gray-600">Receive detailed treatment recommendations and advice</p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-gray-600 mb-8">Join thousands of users who trust SkinAI for skin health analysis</p>
          <Link href={isLoggedIn ? "/detect" : "/login"} className="bg-blue-600 text-white px-8 py-4 rounded-lg text-xl font-semibold hover:bg-blue-700 inline-block">
            Try It Free
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="mb-2">⚠️ Disclaimer: This tool is for informational purposes only. Always consult a healthcare professional for medical advice.</p>
          <p className="text-gray-400">© 2024 SkinAI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
