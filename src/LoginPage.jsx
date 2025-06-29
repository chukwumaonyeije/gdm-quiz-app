import React, { useState } from 'react';
import { auth } from './firebase'; // Import the auth instance
import { 
  GithubAuthProvider, 
  GoogleAuthProvider, 
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword 
} from "firebase/auth";

// --- Helper Icons ---
const GoogleIcon = () => (
    <svg className="w-5 h-5 mr-2" viewBox="0 0 48 48">
        <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
        <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.42-4.55H24v8.51h12.8c-.57 3.02-2.31 5.45-4.92 7.18l7.98 6.19c4.63-4.28 7.3-10.36 7.3-17.33z"></path>
        <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
        <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.98-6.19c-2.11 1.45-4.82 2.3-7.91 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
        <path fill="none" d="M0 0h48v48H0z"></path>
    </svg>
);

const GithubIcon = () => (
    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
        <path fill="currentColor" d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.91 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
);


export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isSigningUp, setIsSigningUp] = useState(false);

    const handleSocialLogin = (provider) => {
        signInWithPopup(auth, provider).catch((err) => {
            setError(err.message);
        });
    };

    const handleEmailAuth = (e) => {
        e.preventDefault();
        setError('');
        if (isSigningUp) {
            // Sign up
            createUserWithEmailAndPassword(auth, email, password)
                .catch((err) => setError(err.message));
        } else {
            // Sign in
            signInWithEmailAndPassword(auth, email, password)
                .catch((err) => setError(err.message));
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-4">
            <div className="w-full max-w-md bg-white/50 backdrop-blur-lg rounded-2xl shadow-xl p-8 space-y-6">
                <div>
                    <h2 className="text-center text-3xl font-bold text-gray-800">
                        {isSigningUp ? 'Create an Account' : 'Sign in to Your Account'}
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        to save your quiz progress
                    </p>
                </div>

                {error && <p className="bg-red-100 text-red-700 p-3 rounded-lg text-sm">{error}</p>}

                <div className="space-y-4">
                    <button onClick={() => handleSocialLogin(new GoogleAuthProvider())} className="w-full flex items-center justify-center py-2.5 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-700 hover:bg-gray-50 transition-all duration-200">
                        <GoogleIcon />
                        Sign in with Google
                    </button>
                    <button onClick={() => handleSocialLogin(new GithubAuthProvider())} className="w-full flex items-center justify-center py-2.5 px-4 border border-gray-300 rounded-lg shadow-sm bg-gray-800 text-white hover:bg-gray-900 transition-all duration-200">
                        <GithubIcon />
                        Sign in with GitHub
                    </button>
                </div>

                <div className="relative flex py-3 items-center">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="flex-shrink mx-4 text-gray-500">Or continue with</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                </div>

                <form className="space-y-6" onSubmit={handleEmailAuth}>
                    <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email address"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <input 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <button type="submit" className="w-full py-3 px-4 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-lg transform hover:scale-105 transition-all duration-200">
                        {isSigningUp ? 'Sign Up' : 'Sign In'}
                    </button>
                </form>

                <p className="text-center text-sm text-gray-600">
                    {isSigningUp ? 'Already have an account?' : "Don't have an account?"}
                    <button onClick={() => setIsSigningUp(!isSigningUp)} className="font-medium text-indigo-600 hover:text-indigo-500 ml-1">
                        {isSigningUp ? 'Sign In' : 'Sign Up'}
                    </button>
                </p>
            </div>
        </d