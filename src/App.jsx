import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const onReCAPTCHASuccess = async () => {
    try {
      const res = await fetch("https://script.google.com/macros/s/AKfycbyzQeRrQ1RrTZzJsPq1wkycDv2sbQZ5mfCPHJ_rZ2GcMsZYkVv9WVIB5658oVcGTn1NdQ/exec", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({ email }),
      });

      const result = await res.text();
      setMessage(result);
      setEmail('');
    } catch (error) {
      setMessage("There was an error saving your email.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setMessage("Invalid email address.");
      return;
    }

    if (window.grecaptcha) {
      window.grecaptcha.execute();
    }
  };


  useEffect(() => {
    if (window.grecaptcha) {
      window.grecaptcha.ready(() => {
        window.grecaptcha.render('recaptcha-container', {
          sitekey: '6Lc1DJUrAAAAAHIapAYSnoLe_BZD99vv7GPLDBH8',
          size: 'invisible',
          callback: onReCAPTCHASuccess,
        });
      });
    }
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white text-center px-6 flex items-center justify-center">
      <div className="max-w-md w-full flex flex-col items-center">
        <img
          src="/logo.svg"
          alt="Aesthera Logo"
          className="w-12 h-12 mx-auto mb-6 animate-pulse"
          style={{ maxWidth: '100%', height: 'auto' }}
        />
        <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight transition-all duration-700 ease-in-out hover:scale-105">
          We are building something amazing.
        </h1>
        <p className="text-xl text-gray-400">
          Soon you’ll experience Aesthera.
        </p>
        <div className="mt-24" />
        {/* Newsletter Signup Static Box */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-md p-6 mt-12 w-full max-w-md text-white shadow-xl">
          <h3 className="hey-title">
            Hey, you!
          </h3>
          <p className="text-sm text-center mb-4">Want early access? You know what to do.</p>
          <form onSubmit={handleSubmit} className="flex flex-col items-center gap-3" role="form">
            <div className="w-full mb-3">
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-label="Sign up email"
                placeholder="YOUR EMAIL, PLEASE"
                className="px-4 py-3 bg-black text-gray-300 placeholder-gray-300 border border-white rounded-md focus:outline-none w-full"
              />
            </div>
            <button
              type="submit"
              className="signup-button rounded-md px-6 py-3"
            >
              SUBMIT
            </button>
            <input type="text" name="honeypot" style={{ display: 'none' }} tabIndex="-1" autoComplete="off" />
          </form>
        </div>
        {/* End Newsletter Signup Static Box */}
        <div id="recaptcha-container" style={{ marginBottom: '32px' }}></div>
        {message && (
          <p className="mt-3 text-sm text-green-400">{message}</p>
        )}
      </div>
      <footer className="absolute bottom-4 w-full text-center text-xs text-gray-600">
        {'\u00A9'} {new Date().getFullYear()} Aesthera Technologies Group LLC. Todos los derechos reservados.
      </footer>
    </div>
  );
}

export default App;