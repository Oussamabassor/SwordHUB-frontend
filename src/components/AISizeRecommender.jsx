import React, { useState } from 'react';
import { Ruler, Brain, Leaf } from 'lucide-react';

export const AISizeRecommender = () => {
  const [measurements, setMeasurements] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleScan = () => {
    setLoading(true);
    // Simulating AI size calculation
    setTimeout(() => {
      setMeasurements({
        size: 'M',
        fit: 'Athletic',
        confidence: 95
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="bg-surface/30 backdrop-blur-md rounded-2xl p-6 border border-primary/10">
      <div className="flex items-center gap-3 mb-4">
        <Brain className="text-primary" size={24} />
        <h3 className="text-lg font-semibold">AI Size Assistant</h3>
      </div>
      
      {!measurements ? (
        <button
          onClick={handleScan}
          disabled={loading}
          className="w-full py-3 px-4 rounded-lg bg-primary/20 hover:bg-primary/30 text-primary flex items-center justify-center gap-2 transition-all group"
        >
          <Ruler className="group-hover:rotate-12 transition-transform" />
          {loading ? 'Analyzing...' : 'Get Your Perfect Size'}
        </button>
      ) : (
        <div className="space-y-3">
          <div className="flex items-baseline justify-between">
            <span className="text-text-muted">Recommended Size:</span>
            <span className="text-2xl font-semibold text-primary">{measurements.size}</span>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-text-muted">Suggested Fit:</span>
            <span className="text-primary">{measurements.fit}</span>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-text-muted">AI Confidence:</span>
            <span className="text-primary">{measurements.confidence}%</span>
          </div>
          <div className="flex items-center gap-2 mt-4 text-sm text-text-muted">
            <Leaf size={16} className="text-primary" />
            <span>Based on eco-friendly body scanning technology</span>
          </div>
        </div>
      )}
    </div>
  );
};