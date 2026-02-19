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
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isSigningUp, setIsSigningUp] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSocialLogin = async (provider) => {
        try {
            setIsLoading(true);
            setError('');
            await signInWithPopup(auth, provider);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleEmailAuth = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        
        try {
            if (isSigningUp) {
                await createUserWithEmailAndPassword(auth, email, password);
            } else {
                await signInWithEmailAndPassword(auth, email, password);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-4">
            <Card className="w-full max-w-md bg-white/90 backdrop-blur-lg">
                <CardHeader className="text-center">
                    <CardTitle className="text-3xl">
                        {isSigningUp ? 'Create an Account' : 'Sign in to Your Account'}
                    </CardTitle>
                    <CardDescription>
                        to save your quiz progress
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                    {error && (
                        <div className="bg-destructive/10 text-destructive p-3 rounded-lg text-sm" role="alert">
                            {error}
                        </div>
                    )}

                    <div className="space-y-3">
                        <Button
                            onClick={() => handleSocialLogin(new GoogleAuthProvider())}
                            variant="outline"
                            size="touch"
                            className="w-full"
                            disabled={isLoading}
                        >
                            <GoogleIcon />
                            Sign in with Google
                        </Button>
                        <Button
                            onClick={() => handleSocialLogin(new GithubAuthProvider())}
                            variant="outline"
                            size="touch"
                            className="w-full bg-gray-900 text-white hover:bg-gray-800"
                            disabled={isLoading}
                        >
                            <GithubIcon />
                            Sign in with GitHub
                        </Button>
                    </div>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                        </div>
                    </div>

                    <form className="space-y-4" onSubmit={handleEmailAuth}>
                        <Input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email address"
                            required
                            disabled={isLoading}
                            aria-label="Email address"
                        />
                        <Input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            required
                            disabled={isLoading}
                            aria-label="Password"
                        />
                        <Button
                            type="submit"
                            size="touch"
                            className="w-full"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Loading...' : (isSigningUp ? 'Sign Up' : 'Sign In')}
                        </Button>
                    </form>

                    <p className="text-center text-sm text-muted-foreground">
                        {isSigningUp ? 'Already have an account?' : "Don't have an account?"}
                        <Button
                            variant="link"
                            onClick={() => setIsSigningUp(!isSigningUp)}
                            className="ml-1 p-0 h-auto font-medium"
                            disabled={isLoading}
                        >
                            {isSigningUp ? 'Sign In' : 'Sign Up'}
                        </Button>
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
