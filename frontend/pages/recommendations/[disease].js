import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import API from '../../utils/api';
import Navbar from '../../components/Navbar';

export default function Recommendations() {
  const router = useRouter();
  const { disease } = router.query;
  const [recommendations, setRecommendations] = useState(null);

  useEffect(() => {
    if (disease) fetchRecommendations();
  }, [disease]);

  const fetchRecommendations = async () => {
    try {
      const { data } = await API.get(`/recommendations/${disease}`);
      setRecommendations(data);
    } catch (err) {
      console.error(err);
    }
  };

  if (!recommendations) return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex items-center justify-center h-96">
        <div className="text-xl">Loading...</div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link href="/history" className="text-blue-600 hover:underline mb-4 inline-block">
          ← Back to History
        </Link>
        
        <h1 className="text-4xl font-bold mb-8">{disease} - Treatment Recommendations</h1>

        <div className="bg-white p-8 rounded-lg shadow-lg mb-6">
          <h2 className="text-2xl font-bold mb-4">Treatments</h2>
          <ul className="list-disc list-inside space-y-2">
            {recommendations.treatments.map((treatment, idx) => (
              <li key={idx} className="text-lg">{treatment}</li>
            ))}
          </ul>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-lg mb-6">
          <h2 className="text-2xl font-bold mb-4">Medications</h2>
          <ul className="list-disc list-inside space-y-2">
            {recommendations.medications.map((med, idx) => (
              <li key={idx} className="text-lg">{med}</li>
            ))}
          </ul>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-lg mb-6">
          <h2 className="text-2xl font-bold mb-4">Lifestyle Changes</h2>
          <ul className="list-disc list-inside space-y-2">
            {recommendations.lifestyle.map((item, idx) => (
              <li key={idx} className="text-lg">{item}</li>
            ))}
          </ul>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded mb-6">
          <h3 className="font-bold text-lg mb-2">Follow-up</h3>
          <p>{recommendations.followUp}</p>
        </div>

        <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded">
          <p className="font-semibold">⚠️ Disclaimer: This is an AI-generated recommendation. Please consult a qualified dermatologist for proper diagnosis and treatment.</p>
        </div>
      </div>
    </div>
  );
}
