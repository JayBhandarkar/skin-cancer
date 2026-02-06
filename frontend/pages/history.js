import { useState, useEffect } from 'react';
import Link from 'next/link';
import API from '../utils/api';
import Navbar from '../components/Navbar';

export default function History() {
  const [detections, setDetections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const { data } = await API.get('/detect/history');
      setDetections(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteDetection = async (id) => {
    if (!confirm('Are you sure you want to delete this detection?')) return;
    
    try {
      await API.delete(`/detect/${id}`);
      fetchHistory();
    } catch (err) {
      alert('Failed to delete detection');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Detection History</h1>
          <Link href="/detect" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
            New Scan
          </Link>
        </div>
        
        {loading ? (
          <div className="text-center py-12">Loading...</div>
        ) : detections.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <p className="text-gray-600 mb-4">No detection history yet</p>
            <Link href="/detect" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 inline-block">
              Start Your First Scan
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {detections.map(detection => (
              <div key={detection._id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
                <img src={`http://localhost:5000${detection.image}`} alt="Detection" className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="font-bold text-xl mb-2">{detection.disease}</h3>
                  <p className="text-gray-600">Confidence: {detection.confidence}%</p>
                  <p className="text-gray-600 capitalize">Severity: {detection.severity}</p>
                  <p className="text-sm text-gray-500 mt-2">{new Date(detection.createdAt).toLocaleDateString()}</p>
                  <div className="flex justify-between items-center mt-3">
                    <Link 
                      href={`/recommendations/${detection.disease}`}
                      className="text-blue-600 hover:underline"
                    >
                      View Recommendations →
                    </Link>
                    <button
                      onClick={() => deleteDetection(detection._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
