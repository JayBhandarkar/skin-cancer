import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import API from '../utils/api';
import Navbar from '../components/Navbar';

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [detections, setDetections] = useState([]);
  const [stats, setStats] = useState({ total: 0, thisMonth: 0 });

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/login');
      return;
    }
    setUser(JSON.parse(userData));
    fetchDetections();
  }, []);

  const fetchDetections = async () => {
    try {
      const { data } = await API.get('/detect/history');
      setDetections(data);
      
      const thisMonth = data.filter(d => {
        const date = new Date(d.createdAt);
        const now = new Date();
        return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
      }).length;
      
      setStats({ total: data.length, thisMonth });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Welcome back, {user?.name}!</h1>
          <p className="text-gray-600">Here's your skin cancer screening overview</p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Scans</p>
                <p className="text-3xl font-bold">{stats.total}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <span className="text-2xl">📊</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">This Month</p>
                <p className="text-3xl font-bold">{stats.thisMonth}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <span className="text-2xl">📈</span>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-6 rounded-lg shadow text-white">
            <p className="text-sm mb-2">Quick Action</p>
            <Link href="/detect" className="bg-white text-blue-600 px-4 py-2 rounded font-semibold hover:bg-gray-100 inline-block">
              New Scan
            </Link>
          </div>
        </div>

        {/* Recent Detections */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Recent Detections</h2>
            <Link href="/history" className="text-blue-600 hover:underline">
              View All
            </Link>
          </div>

          {detections.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">No detections yet</p>
              <Link href="/detect" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 inline-block">
                Start Your First Scan
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {detections.slice(0, 3).map(detection => (
                <div key={detection._id} className="border rounded-lg overflow-hidden hover:shadow-lg transition">
                  <img src={`http://localhost:5000${detection.image}`} alt="Detection" className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-1">{detection.disease}</h3>
                    <p className="text-sm text-gray-600 mb-2">Confidence: {detection.confidence}%</p>
                    <p className="text-xs text-gray-500">{new Date(detection.createdAt).toLocaleDateString()}</p>
                    <Link 
                      href={`/recommendations/${detection.disease}`}
                      className="mt-3 text-blue-600 text-sm hover:underline inline-block"
                    >
                      View Recommendations →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
