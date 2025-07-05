import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';

function Notes() {
  const [notes, setNotes] = useState([]);
  const token = localStorage.getItem('jwt');

  const fetchNotes = async () => {
    if (!token) return;
    try {
      const res = await fetch('http://localhost:8080/api/notes', {
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
    fetchNotes();
  }, []);

  return (
    <div className="relative w-full min-h-screen text-white overflow-hidden">
      {/* Background Image */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{ backgroundImage: "url('/headline.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />

        {/* Notes Content */}
        <main className="flex flex-col items-center justify-start flex-grow px-6 mt-20 md:mt-28 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 drop-shadow-md">
            📝 Your Notes
          </h1>

          {notes.length > 0 ? (
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl mb-12">
              {notes.map(note => (
                <li
                  key={note.id}
                  className="bg-white/10 text-white p-4 rounded-xl border border-white/20 backdrop-blur hover:bg-yellow-600/50 transition"
                >
                  {note.content}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-white/70">No notes found.</p>
          )}
        </main>

        {/* Footer */}
        <footer className="py-6 text-center bg-black/60 backdrop-blur-md border-t border-white/10 text-sm">
          <p className="text-white/70">
            © {new Date().getFullYear()} NewzzBro — Built with ❤️ using React + Spring Boot
          </p>
          <div className="mt-2 flex justify-center gap-4 text-white/60">
            <a href="https://github.com/your-profile" target="_blank" rel="noreferrer" className="hover:text-white">
              GitHub
            </a>
            <a href="/about" className="hover:text-white">About</a>
            <a href="/contact" className="hover:text-white">Contact</a>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Notes;
