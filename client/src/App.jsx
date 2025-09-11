import React, { useState, useEffect, useCallback } from 'react';

function App() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [language, setLanguage] = useState('javascript');

  const fetchIssues = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/issues?language=${language}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.msg || 'Failed to fetch issues');
      }
      const data = await response.json();
      setIssues(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [language]);

  useEffect(() => {
    fetchIssues();
  }, [fetchIssues]);

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen font-sans">
      <nav className="bg-gray-900/80 backdrop-blur-sm p-4 sticky top-0 z-10 border-b border-gray-800">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">GitRepos.Online</h1>
          <a href="#find-issue" className="text-gray-300 hover:text-white transition-colors">Find an Issue</a>
        </div>
      </nav>

      <main className="container mx-auto p-4 md:p-8 text-center">
        {/* --- Hero Section Restored --- */}
        <section className="py-20">
          <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-4">Stop Searching. Start Contributing.</h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-8">
            We find the best beginner-friendly issues so you can focus on making meaningful contributions to open source this Hacktoberfest.
          </p>
          <a href="#find-issue" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-transform transform hover:scale-105 inline-block shadow-lg">
            Hunt for an Issue Now
          </a>
        </section>

        {/* --- Issue Finder Section Restyled --- */}
        <section id="find-issue" className="bg-gray-800 rounded-lg p-6 md:p-8 shadow-2xl text-left">
          <h3 className="text-3xl font-bold text-center mb-2">Curated Issues for Hacktoberfest</h3>
          <p className="text-gray-400 text-center mb-8">Select a language to begin your hunt.</p>
          
          <div className="mb-8 max-w-sm mx-auto">
            <label htmlFor="language-select" className="sr-only">Language:</label>
            <select
              id="language-select"
              value={language}
              onChange={handleLanguageChange}
              className="bg-gray-700 border border-gray-600 rounded-md w-full p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
            >
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
              <option value="typescript">TypeScript</option>
              <option value="go">Go</option>
              <option value="rust">Rust</option>
              <option value="php">PHP</option>
            </select>
          </div>

          <div>
            {loading && <p className="text-center text-gray-400 py-8">Loading issues...</p>}
            {error && <p className="text-center text-red-500 bg-red-900/30 p-4 rounded-lg">Error: {error}</p>}
            {!loading && !error && (
              <ul className="space-y-4">
                {issues.map((issue) => (
                  <li key={issue.id} className="bg-gray-900/50 border border-gray-700 p-4 hover:bg-gray-700/50 transition-colors duration-200 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex-grow">
                        <a href={issue.url} target="_blank" rel="noopener noreferrer" className="text-lg font-semibold text-blue-400 hover:underline">
                          {issue.title}
                        </a>
                         {issue.repo && issue.repo !== 'N/A' ? (
                           <p className="text-sm text-gray-400 mt-1">
                             <span className="font-medium text-gray-300">{issue.repo.split('/')[0]}</span> / {issue.repo.split('/')[1]}
                           </p>
                        ) : (
                           <p className="text-sm text-gray-400 mt-1">Repository info not available</p>
                        )}
                      </div>
                      <div className="flex-shrink-0 ml-4">
                         <img src={issue.user.avatar_url} alt={`${issue.user.login}'s avatar`} className="w-12 h-12 rounded-full border-2 border-gray-600" />
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;

