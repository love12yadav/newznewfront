import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';

const CATEGORIES = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
const COUNTRIES = [
  { code: 'in', name: 'India' },
  { code: 'us', name: 'United States' },
  { code: 'au', name: 'Australia' },
  { code: 'ru', name: 'Russia' },
  { code: 'fr', name: 'France' },
  { code: 'gb', name: 'United Kingdom' },
];

function HeadlinesPage() {
  const [headlines, setHeadlines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [category, setCategory] = useState('general');
  const [country, setCountry] = useState('in');
  const [isNoteBoxOpen, setIsNoteBoxOpen] = useState(false);
  const [noteContent, setNoteContent] = useState('');
  const [notes, setNotes] = useState([]);

  const token = localStorage.getItem('jwt');

  const fetchHeadlines = async (chosenCategory = category, chosenCountry = country) => {
    if (!token) {
      setErrorMessage('You must be logged in to view headlines.');
      setLoading(false);
      return;
    }

    setLoading(true);
    setErrorMessage('');

    try {
      const url = `https://newzback-2.onrender.com/api/headlines?category=${chosenCategory}&country=${chosenCountry}`;
      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error('Failed to fetch headlines');

      const data = await response.json();
      if (Array.isArray(data.articles) && data.articles.length) {
        setHeadlines(data.articles);
      } else {
        setHeadlines([]);
        setErrorMessage('No headlines available.');
      }
    } catch (err) {
      console.error(err);
      setErrorMessage('Error occurred while fetching headlines');
    } finally {
      setLoading(false);
    }
  };

  const fetchNotes = async () => {
    if (!token) return;
    try {
      const res = await fetch('https://newzback-2.onrender.com/api/notes', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Failed to fetch notes');
      const data = await res.json();
      setNotes(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchHeadlines();
    fetchNotes();
  }, []);

  const toggleNoteBox = () => setIsNoteBoxOpen(!isNoteBoxOpen);

  const saveNote = async () => {
    if (!noteContent.trim()) return;

    try {
      const res = await fetch('https://newzback-2.onrender.com/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content: noteContent }),
      });
      if (!res.ok) throw new Error('Failed to save note');
      const saved = await res.json();
      setNotes([...notes, saved]);
      setNoteContent('');
      setIsNoteBoxOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="text-white text-xl p-10">Loading…</div>;
  if (errorMessage) return <div className="text-red-400 text-xl p-10">{errorMessage}</div>;

  return (
    <div
      className="min-h-screen bg-fixed bg-cover bg-center relative text-white p-4 md:p-10"
      style={{ backgroundImage: "url('/headline.jpg')" }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f1a]/80 via-black/50 to-black/80 z-0 backdrop-blur-md" />
      <div className="relative z-10 mt-28">
        <Navbar />

        {/* Main Grid */}
        {/* Control Row - Top Search and Add Note */}
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
  {/* Search Filters */}
  <section className="flex flex-wrap gap-4 items-center justify-start p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl">
    <select
      value={category}
      onChange={e => setCategory(e.target.value)}
      className="bg-white/10 text-white px-4 py-2 rounded-xl outline-none focus:ring-2 ring-cyan-400 hover:bg-white/20 transition"
    >
      {CATEGORIES.map(cat => (
        <option key={cat} value={cat} className="text-black">
          {cat}
        </option>
      ))}
    </select>

    <select
      value={country}
      onChange={e => setCountry(e.target.value)}
      className="bg-white/10 text-white px-4 py-2 rounded-xl outline-none focus:ring-2 ring-cyan-400 hover:bg-white/20 transition"
    >
      {COUNTRIES.map(c => (
        <option key={c.code} value={c.code} className="text-black">
          {c.name}
        </option>
      ))}
    </select>

    <button
      onClick={() => fetchHeadlines(category, country)}
      className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-indigo-500 hover:to-blue-600 text-white px-5 py-2 rounded-full shadow-xl transition-all duration-300 active:scale-95 focus:ring-2 focus:ring-blue-300"
    >
      🔍 Search
    </button>
  </section>

  {/* Add Note Button */}
  
    <button
      onClick={toggleNoteBox}
      className="w-full lg:w-auto bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-white px-5 py-2 rounded-full shadow-lg transition-all duration-300 active:scale-95 focus:ring-2 focus:ring-yellow-300"
    >
      📝 Add Note
    </button>
  
</div>

{/* Content Row - Headlines and Notes */}
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
  {/* Headlines */}
  <div className="bg-white/5 p-6 rounded-2xl backdrop-blur-md shadow-2xl border border-cyan-300/20 hover:border-cyan-400/50 transition-transform hover:scale-[1.01] duration-300">
    <h2 className="text-2xl font-semibold mb-4 text-cyan-200">Top Headlines</h2>
    {headlines.length > 0 ? (
      <ul className="space-y-3">
        {headlines.map((h, idx) => (
          <li key={idx}>
            <a
              href={h.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-4 rounded-xl bg-gradient-to-br from-white/10 to-white/5 hover:from-cyan-500 hover:to-blue-500 hover:text-white transition-all duration-300 border border-white/10 shadow-lg hover:shadow-2xl"
            >
              <span className="flex items-center gap-2">
                <span>📰</span>
                <span>{h.title}</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    ) : (
      <p>No headlines available.</p>
    )}
  </div>

  {/* Notes */}
  <div className="bg-white/5 p-6 rounded-2xl backdrop-blur-md shadow-2xl border border-yellow-300/20 hover:border-yellow-400/50 transition-transform hover:scale-[1.01] duration-300">
    <h2 className="text-2xl font-semibold mb-4 text-yellow-200">Your Notes</h2>

    {isNoteBoxOpen && (
      <div className="mb-4 animate-fade-in">
        <textarea
          className="w-full p-3 bg-white/10 border border-white/30 rounded-xl text-white resize-none outline-none focus:ring-2 focus:ring-yellow-300 placeholder:text-white/70"
          rows={4}
          placeholder="Write your note here…"
          value={noteContent}
          onChange={e => setNoteContent(e.target.value)}
        />
        <div className="flex justify-end gap-2 mt-3">
          <button
            onClick={saveNote}
            className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-md"
          >
            Save
          </button>
          <button
            onClick={toggleNoteBox}
            className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-md"
          >
            Cancel
          </button>
        </div>
      </div>
    )}

    {notes.length > 0 && (
      <ul className="space-y-2 mt-4 max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-white/30 scrollbar-track-transparent">
        {notes.map(n => (
          <li key={n.id} className="bg-white/20 p-3 rounded-lg hover:bg-yellow-600/60 transition">
            📝 {n.content}
          </li>
        ))}
      </ul>
    )}
  </div>
</div>

      </div>
    </div>
  );
}

export default HeadlinesPage;
