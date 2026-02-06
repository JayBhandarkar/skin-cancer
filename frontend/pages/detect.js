import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import API from '../utils/api';
import Navbar from '../components/Navbar';

export default function Detect() {
  const router = useRouter();
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return alert('Please select an image');

    setLoading(true);
    const formData = new FormData();
    formData.append('image', image);

    try {
      const { data } = await API.post('/detect', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setResult(data);
    } catch (err) {
      alert(err.response?.data?.message || 'Please login first');
      if (err.response?.status === 401) router.push('/login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Skin Cancer Detection</h1>

        {!result ? (
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label className="block text-lg font-semibold mb-2">Upload Skin Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>

              {preview && (
                <div className="mb-6">
                  <img src={preview} alt="Preview" className="w-full max-h-96 object-contain rounded-lg" />
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400"
              >
                {loading ? 'Analyzing...' : 'Detect Disease'}
              </button>
            </form>
          </div>
        ) : (
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Detection Results</h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <img src={`http://localhost:5000${result.image}`} alt="Analyzed" className="w-full rounded-lg" />
              
              <div>
                <div className="mb-4">
                  <h3 className="text-xl font-semibold">Detected Condition</h3>
                  <p className="text-3xl font-bold text-blue-600">{result.disease}</p>
                </div>
                
                <div className="mb-4">
                  <h3 className="text-xl font-semibold">Confidence</h3>
                  <p className="text-2xl">{result.confidence}%</p>
                </div>
                
                <div className="mb-4">
                  <h3 className="text-xl font-semibold">Severity</h3>
                  <p className="text-2xl capitalize">{result.severity}</p>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3">Recommendations</h3>
              <ul className="list-disc list-inside space-y-2">
                {result.recommendations.map((rec, idx) => (
                  <li key={idx}>{rec}</li>
                ))}
              </ul>
            </div>

            <div className="flex gap-4">
              <Link
                href={`/recommendations/${result.disease}`}
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
              >
                View Detailed Recommendations
              </Link>
              <button
                onClick={() => { setResult(null); setPreview(null); setImage(null); }}
                className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700"
              >
                New Detection
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
