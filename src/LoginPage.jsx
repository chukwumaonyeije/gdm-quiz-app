import React, { useState } from 'react';
import { auth } from './firebase';
import { 
  GithubAuthProvider, 
  GoogleAuthProvider, 
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword 
} from "firebase/auth";
import { GoogleIcon, GithubIcon } from '@/components/icons';

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