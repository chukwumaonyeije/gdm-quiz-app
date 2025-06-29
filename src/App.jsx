import React, { useState, useEffect, useRef } from 'react';

// --- Firebase Imports ---
import { initializeApp } from "firebase/app";
import { 
  getAuth,
  onAuthStateChanged,
  signOut,
  GithubAuthProvider, 
  GoogleAuthProvider, 
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword 
} from "firebase/auth";

// --- Firebase Initialization ---
// NOTE: The Firebase configuration has been moved back into this single file.
// This resolves the file import error by making the component self-contained.
//
const firebaseConfig = {
  apiKey: "AIzaSyC50NmIJECWpNlHsvfaWK3K_wFfL--9b-I",
  authDomain: "gdm-quiz-app.firebaseapp.com",
  projectId: "gdm-quiz-app",
  storageBucket: "gdm-quiz-app.firebasestorage.app",
  messagingSenderId: "1087857340628",
  appId: "1:1087857340628:web:20319727d4e4ff5ca34b41"
};

// Initialize Firebase App and get the Auth service instance.
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


// --- LoginPage Component ---

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

function LoginPage() {
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
            createUserWithEmailAndPassword(auth, email, password)
                .catch((err) => setError(err.message));
        } else {
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
        </div>
    );
}


// --- GdmQuiz Component (Your original App.jsx) ---
const BotIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-600">
        <path d="M12 8V4H8" /><rect x="4" y="12" width="16" height="8" rx="2" /><path d="M2 14h2" /><path d="M20 14h2" /><path d="M15 12v-2a3 3 0 0 0-3-3H9" />
    </svg>
);

const UserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
    </svg>
);

function GdmQuiz({ handleLogout, user }) {
    const [messages, setMessages] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [quizEnded, setQuizEnded] = useState(false);
    const [shuffledQuestions, setShuffledQuestions] = useState([]);
    const chatEndRef = useRef(null);

    const allQuizQuestions = [
        { question: "What is Gestational Diabetes Mellitus (GDM)?", options: ["A type of diabetes in children", "High blood sugar during pregnancy", "Low blood sugar after eating", "Diabetes caused by a virus"], answer: "High blood sugar during pregnancy", tip: "GDM is a type of diabetes that develops during pregnancy in women who did not already have diabetes. It affects how your cells use sugar (glucose)." },
        { question: "Which of these is a primary risk factor for developing GDM?", options: ["Being underweight", "A family history of Type 1 diabetes", "Being older than 25", "Excessive exercise"], answer: "Being older than 25", tip: "Risk factors for GDM include age over 25, a family or personal health history of prediabetes, and being overweight before pregnancy." },
        { question: "How is GDM typically screened for during pregnancy?", options: ["Blood pressure check", "Urine test for protein", "Oral Glucose Tolerance Test (OGTT)", "Ultrasound"], answer: "Oral Glucose Tolerance Test (OGTT)", tip: "The OGTT is the most common screening test. It involves drinking a sugary solution and having your blood sugar levels tested after a specific time." },
        { question: "True or False: Dietary management is a cornerstone of GDM treatment.", options: ["True", "False"], answer: "True", tip: "A healthy diet focusing on fruits, vegetables, whole grains, and lean proteins is crucial. It helps control blood sugar without medication." },
        { question: "If diet and exercise aren't enough, what is the most common medication prescribed for GDM?", options: ["Aspirin", "Ibuprofen", "Insulin", "Antibiotics"], answer: "Insulin", tip: "Insulin injections are often the next step if blood sugar levels remain too high. It's safe for the baby and very effective." },
        { question: "What is a key component of monitoring GDM at home?", options: ["Daily weight checks", "Regularly checking blood glucose levels", "Measuring belly circumference", "Checking blood pressure twice a day"], answer: "Regularly checking blood glucose levels", tip: "You'll likely need to test your blood sugar multiple times a day: when you wake up (fasting) and after meals, to ensure it's within the target range." },
        { question: "Which of these is a potential complication of uncontrolled GDM for the baby?", options: ["Low birth weight", "Higher than average birth weight (macrosomia)", "Delayed speech", "Poor eyesight"], answer: "Higher than average birth weight (macrosomia)", tip: "Uncontrolled GDM can lead to a large baby, which can complicate delivery. It also increases the baby's risk of breathing problems and jaundice at birth." },
        { question: "What happens to GDM after the baby is born?", options: ["It always turns into Type 2 diabetes", "It usually goes away", "It requires lifelong medication", "It has no effect on future health"], answer: "It usually goes away", tip: "For most women, blood sugar levels return to normal after delivery. However, having GDM increases your risk of developing Type 2 diabetes later in life." },
        { question: "Postpartum care after GDM involves being tested for diabetes how long after delivery?", options: ["Within 24 hours", "1-2 weeks", "6-12 weeks", "After 1 year"], answer: "6-12 weeks", tip: "It's important to get tested for diabetes 6-12 weeks after your baby is born to confirm your blood sugar levels have returned to normal." },
        { question: "Which of the following is a good carbohydrate choice for a GDM diet?", options: ["White rice", "Sugary cereal", "Whole-wheat bread", "A can of soda"], answer: "Whole-wheat bread", tip: "Complex carbohydrates, like whole-wheat bread, are digested more slowly, helping to prevent sharp spikes in blood sugar." },
        { question: "True or False: Regular, moderate exercise is generally recommended for managing GDM.", options: ["True", "False"], answer: "True", tip: "Activities like walking or swimming can help your body use insulin more effectively, which helps to lower blood sugar. Always consult your doctor first." },
        { question: "When is the best time to check blood sugar to see how a meal affected it?", options: ["30 minutes before the meal", "Immediately after the meal", "1-2 hours after the start of the meal", "Right before bed"], answer: "1-2 hours after the start of the meal", tip: "Testing 1-2 hours after you begin eating gives the most accurate picture of how your body handled the carbohydrates in that meal." },
        { question: "A baby born to a mother with poorly controlled GDM may experience what blood sugar issue shortly after birth?", options: ["Hyperglycemia (high blood sugar)", "Hypoglycemia (low blood sugar)", "Normal blood sugar", "No blood sugar changes"], answer: "Hypoglycemia (low blood sugar)", tip: "The baby's pancreas may produce extra insulin in response to the mother's high blood sugar. After birth, this extra insulin can cause the baby's own blood sugar to drop." },
        { question: "True or False: Breastfeeding can help lower a mother's risk of developing Type 2 diabetes after having GDM.", options: ["True", "False"], answer: "True", tip: "Studies show that breastfeeding can improve your body's insulin sensitivity and is associated with a lower risk of developing Type 2 diabetes later." },
        { question: "Why is it important to space meals and snacks throughout the day with GDM?", options: ["To make you feel full", "To keep blood sugar levels stable", "To increase your metabolism", "It is not important"], answer: "To keep blood sugar levels stable", tip: "Eating smaller, more frequent meals prevents your blood sugar from spiking too high after a large meal or dropping too low between meals." },
        { question: "Which of these is NOT a common symptom of high blood sugar in GDM?", options: ["Increased thirst", "Frequent urination", "Blurred vision", "Sudden energy burst"], answer: "Sudden energy burst", tip: "High blood sugar often causes fatigue, not an energy burst. Many women with GDM, however, experience no noticeable symptoms at all." },
        { question: "What does 'fasting' mean when preparing for a glucose test?", options: ["Eating only protein", "Drinking only juice", "Not eating or drinking anything (except water) for at least 8 hours", "Eating a light snack"], answer: "Not eating or drinking anything (except water) for at least 8 hours", tip: "Fasting gives a baseline reading of your blood glucose levels before they are influenced by food." },
        { question: "Besides insulin, what oral medication is sometimes used 'off-label' to manage GDM?", options: ["Tylenol", "Metformin", "Penicillin", "Benadryl"], answer: "Metformin", tip: "Metformin is an oral medication that can help lower blood sugar. While insulin is the primary choice, metformin is sometimes used in certain situations." },
        { question: "Having GDM increases a mother's risk for what condition during the pregnancy itself?", options: ["Anemia", "Preeclampsia (high blood pressure)", "Hair loss", "Acid reflux"], answer: "Preeclampsia (high blood pressure)", tip: "Women with GDM have a higher risk of developing preeclampsia, a serious blood pressure condition that requires careful monitoring." },
        { question: "The 'M' in GDM stands for what?", options: ["Maternal", "Mellitus", "Management", "Monitoring"], answer: "Mellitus", tip: "GDM stands for Gestational Diabetes Mellitus. 'Mellitus' is a historical term for diabetes that means 'honey-sweet', referring to sugar in the urine." },
        { question: "True or False: You only need to worry about GDM in the third trimester.", options: ["True", "False"], answer: "False", tip: "GDM is typically screened for between 24 and 28 weeks of pregnancy, but it can develop earlier. Management is important as soon as it's diagnosed." },
        { question: "Which of these drinks is the best choice for someone with GDM?", options: ["Orange juice", "Diet soda", "Water", "A sports drink"], answer: "Water", tip: "Water is the best choice as it doesn't contain sugar or carbohydrates that can raise blood glucose levels. Diet sodas should be consumed in moderation." },
        { question: "True or False: All women who have GDM will need to have a C-section.", options: ["True", "False"], answer: "False", tip: "Many women with well-managed GDM can have a vaginal delivery. A C-section might be recommended if the baby is very large or other complications arise." },
        { question: "Carbohydrate counting is a useful skill for managing GDM. What is the goal?", options: ["To eat as few carbs as possible", "To eat a consistent amount of carbs at each meal and snack", "To only eat carbs at breakfast", "To avoid carbs entirely"], answer: "To eat a consistent amount of carbs at each meal and snack", tip: "The goal is to spread your carbohydrate intake throughout the day to keep blood sugar levels stable, not to eliminate carbs, which are an important source of energy." },
        { question: "True or False: If you have GDM, you should avoid all fruit.", options: ["True", "False"], answer: "False", tip: "Fruit is part of a healthy diet, but portion control is key. It's better to eat a whole piece of fruit rather than drinking fruit juice, which is more concentrated in sugar." }
    ];

    const shuffleArray = (array) => {
        let currentIndex = array.length, randomIndex;
        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }
        return array;
    };
    
    const startNewQuiz = () => {
        const shuffled = shuffleArray([...allQuizQuestions]);
        setShuffledQuestions(shuffled.slice(0, 10)); // Now selects 10 questions
        setMessages([]);
        setCurrentQuestionIndex(0);
        setScore(0);
        setQuizEnded(false);
    };

    useEffect(() => {
        startNewQuiz();
    }, []);

    useEffect(() => {
        if (shuffledQuestions.length > 0 && messages.length === 0) {
            addMessage("bot", `Welcome, ${user?.displayName || 'user'}! Let's test your GDM knowledge. You'll get 10 random questions. Here's your first one.`);
            setTimeout(() => {
                presentQuestion(0);
            }, 1500);
        }
    }, [shuffledQuestions, messages.length, user]);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const addMessage = (sender, text, options = null) => {
        setMessages(prev => [...prev, { sender, text, options, id: Date.now() }]);
    };

    const presentQuestion = (index) => {
        if (index < shuffledQuestions.length) {
            const q = shuffledQuestions[index];
            addMessage("bot", q.question, q.options);
        } else {
            endQuiz();
        }
    };

    const handleAnswer = (answer) => {
        if (quizEnded) return;
        const lastMessage = messages[messages.length - 1];
        if (lastMessage && lastMessage.options) {
            setMessages(prev => prev.map(msg => msg.id === lastMessage.id ? { ...msg, options: null } : msg));
        }
        addMessage("user", answer);
        const currentQuestion = shuffledQuestions[currentQuestionIndex];
        let isCorrect = answer === currentQuestion.answer;
        setTimeout(() => {
            if (isCorrect) {
                setScore(prev => prev + 1);
                addMessage("bot", "Correct! Great job.");
            } else {
                addMessage("bot", `Not quite. The correct answer is: "${currentQuestion.answer}"`);
            }
            setTimeout(() => {
                addMessage("bot", `Educational Tip: ${currentQuestion.tip}`);
                setTimeout(() => {
                    const nextIndex = currentQuestionIndex + 1;
                    setCurrentQuestionIndex(nextIndex);
                    if (nextIndex < shuffledQuestions.length) {
                        presentQuestion(nextIndex);
                    } else {
                        endQuiz();
                    }
                }, 3500);
            }, 1000);
        }, 1000);
    };

    const endQuiz = () => {
        setQuizEnded(true);
        const finalScore = `You scored ${score} out of ${shuffledQuestions.length}.`;
        const resultMessage = score / shuffledQuestions.length >= 0.7 ?
            "Excellent work! You have a strong understanding of GDM." :
            "Good effort! Keep learning to better understand GDM management.";
        setTimeout(() => {
             addMessage("bot", `Quiz finished! ${finalScore} ${resultMessage}`);
        }, 1000);
    };

    return (
        <div className="font-sans bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex flex-col h-screen antialiased">
            <header className="bg-white/30 backdrop-blur-lg border-b border-white/50 p-4 shadow-sm sticky top-0 z-10">
                <div className="max-w-3xl mx-auto flex justify-between items-center">
                    <h1 className="text-xl font-bold text-gray-800">GDM Quiz Chatbot</h1>
                    <div className="flex items-center gap-4">
                        <div className="text-lg font-semibold text-gray-700 bg-white/50 rounded-full px-4 py-1.5 shadow-sm">
                            Score: <span className="text-indigo-600 font-bold">{score} / {shuffledQuestions.length}</span>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-600 transition-colors duration-200 shadow-md"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </header>
            <main className="flex-1 p-4 overflow-y-auto">
                <div className="max-w-3xl mx-auto space-y-6">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`flex items-end gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                            {msg.sender === 'bot' && (<div className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center flex-shrink-0 border-2 border-white shadow"><BotIcon /></div>)}
                            <div className={`max-w-lg p-4 rounded-2xl shadow-lg transition-all duration-300 ${msg.sender === 'bot' ? 'bg-white/60 backdrop-blur-lg text-gray-800 rounded-bl-none' : 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-br-none'}`}>
                                <p className="text-base">{msg.text}</p>
                                {msg.options && (
                                    <div className="mt-4 grid grid-cols-1 gap-2">
                                        {msg.options.map((option, i) => (<button key={i} onClick={() => handleAnswer(option)} className="bg-indigo-500/80 text-left text-white border border-indigo-400/50 rounded-xl py-2.5 px-4 hover:bg-indigo-500/100 hover:scale-105 transform focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-700 focus:ring-white transition-all duration-200">{option}</button>))}
                                    </div>
                                )}
                            </div>
                            {msg.sender === 'user' && (<div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0 border-2 border-white shadow"><UserIcon /></div>)}
                        </div>
                    ))}
                    <div ref={chatEndRef} />
                    {quizEnded && (
                        <div className="flex justify-center py-6">
                            <button onClick={startNewQuiz} className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white font-bold py-3 px-8 rounded-full hover:from-purple-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-purple-100 focus:ring-indigo-500 shadow-xl transform hover:scale-105 transition-all duration-200">Restart Quiz</button>
                        </div>
                    )}
                </div>
            </main>
            <footer className="text-center p-4 text-xs text-gray-600/80">
                <p>Created by Chukwuma I. Onyeije, MD, FACOG</p>
                <p>Atlanta Perinatal Associates</p>
            </footer>
        </div>
    );
}


// --- Main App Component (Authentication Controller) ---

export default function App() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // This listener fires when the user logs in or out.
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []); // This effect should run only once on mount

    const handleLogout = () => {
        signOut(auth).catch((error) => console.error("Logout Error:", error));
    };

    // Show a loading indicator while Firebase checks the auth state
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <p className="text-xl text-gray-600">Loading...</p>
            </div>
        );
    }

    // If a user is logged in, show the quiz. Otherwise, show the login page.
    return user ? <GdmQuiz handleLogout={handleLogout} user={user} /> : <LoginPage />;
}
