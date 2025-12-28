import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Copy, ArrowLeft, Flame } from 'lucide-react';
import { createPageUrl } from '../utils';
import { SCRIPTS } from './Home';

export default function ScriptDetails() {
  const [copied, setCopied] = useState(false);
  
  // Get script ID from URL
  const urlParams = new URLSearchParams(window.location.search);
  const scriptId = parseInt(urlParams.get('id'));
  
  // Find the script
  const script = SCRIPTS.find(s => s.id === scriptId);

  // Get recommended scripts (other scripts excluding current one)
  const recommendedScripts = SCRIPTS.filter(s => s.id !== scriptId).slice(0, 4);

  const copyToClipboard = () => {
    if (script) {
      navigator.clipboard.writeText(script.script);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Script not found
  if (!script) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center px-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Script Not Found</h1>
          <p className="text-gray-500 mb-6">The script you're looking for doesn't exist.</p>
          <Link
            to={createPageUrl('Home')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to={createPageUrl('Home')} className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">📜</span>
            </div>
            <span className="text-xl font-bold text-gray-900">ScriptBlox</span>
          </Link>
          
          <nav className="flex items-center gap-6">
            <Link to={createPageUrl('Home')} className="flex items-center gap-2 text-gray-700 hover:text-gray-900 text-sm font-medium">
              <span>🏠</span>
              <span>Home</span>
            </Link>
            <Link to={createPageUrl('Home')} className="flex items-center gap-2 text-indigo-600 text-sm font-medium">
              <Flame className="w-4 h-4" />
              <span>Trending</span>
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900">
              Login
            </button>
            <button className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700">
              Sign Up
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* Back Button */}
        <Link
          to={createPageUrl('Home')}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Back</span>
        </Link>

        {/* Script Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Image */}
          <div className="relative h-64 bg-gray-100">
            <img 
              src={script.image} 
              alt={script.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Title and stats */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{script.title}</h1>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span>👁 {script.views} views</span>
              </div>
            </div>

            {/* Description Section */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Description</h2>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700 text-sm">{script.description}</p>
              </div>
            </div>

            {/* Download Button */}
            <div className="flex items-center justify-center mb-8">
              <button
                onClick={copyToClipboard}
                className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg text-lg transition-colors flex items-center gap-2"
              >
                {copied ? '✓ Copied!' : 'Download'}
              </button>
            </div>

            {/* Code Section */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-700">View Raw</span>
                <button
                  onClick={copyToClipboard}
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700"
                >
                  <Copy className="w-4 h-4" />
                  Copy Script
                </button>
              </div>
              
              <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
                <pre className="text-sm leading-relaxed">
                  <code className="text-green-400 font-mono">
                    {script.script}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Scripts Section */}
        {recommendedScripts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              More scripts you might like <Flame className="w-6 h-6 text-orange-500" />
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {recommendedScripts.map((recScript) => (
                <Link 
                  key={recScript.id}
                  to={createPageUrl(`ScriptDetails?id=${recScript.id}`)}
                  className="group relative bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300"
                >
                  {/* Image */}
                  <div className="relative h-32 overflow-hidden bg-gray-100">
                    <img 
                      src={recScript.image} 
                      alt={recScript.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {/* Views badge */}
                    <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/60 backdrop-blur-sm rounded-md">
                      <span className="text-xs font-medium text-white">👁 {recScript.views}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-3">
                    <h3 className="text-sm font-semibold text-gray-900 line-clamp-2">
                      {recScript.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
