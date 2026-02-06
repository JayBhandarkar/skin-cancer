import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const userData = localStorage.getItem('user');
    if (userData) setUser(JSON.parse(userData));
  }, [router.pathname]);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    router.push('/');
  };

  if (!mounted) return null;

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href={user ? "/dashboard" : "/"} className="text-2xl font-bold text-blue-600">SkinAI</Link>
          <div className="flex gap-6 items-center">
            {user ? (
              <>
                <Link href="/dashboard" className="hover:text-blue-600">Dashboard</Link>
                <Link href="/detect" className="hover:text-blue-600">New Scan</Link>
                <Link href="/history" className="hover:text-blue-600">History</Link>
                <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                  Logout
                </button>
              </>
            ) : (
              <Link href="/login" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
