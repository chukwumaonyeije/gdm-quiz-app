import React, { useState, useEffect, useRef } from 'react';

// --- Helper Components ---

// Icon for the chatbot avatar
const BotIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-600">
        <path d="M12 8V4H8" />
        <rect x="4" y="12" width="16" height="8" rx="2" />
        <path d="M2 14h2" />
        <path d="M20 14h2" />
        <path d="M15 12v-2a3 3 0 0 0-3-3H9" />
    </svg>
);

// Icon for the user avatar
const UserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
    </svg>
);

// --- Main App Component ---

export default function App() {
    // --- State Management ---
    const [messages, setMessages] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [quizEnded, setQuizEnded] = useState(false);
    const [shuffledQuestions, setShuffledQuestions] = useState([]);
    const chatEndRef = useRef(null);

    // --- Quiz Content ---
    const allQuizQuestions = [
        {
            question: "What is Gestational Diabetes Mellitus (GDM)?",
            options: ["A type of diabetes in children", "High blood sugar during pregnancy", "Low blood sugar after eating", "Diabetes caused by a virus"],
            answer: "High blood sugar during pregnancy",
            tip: "GDM is a type of diabetes that develops during pregnancy in women who did not already have diabetes. It affects how your cells use sugar (glucose)."
        },
        {
            question: "Which of these is a primary risk factor for developing GDM?",
            options: ["Being underweight", "A family history of Type 1 diabetes", "Being older than 25", "Excessive exercise"],
            answer: "Being older than 25",
            tip: "Risk factors for GDM include age over 25, a family or personal health history of prediabetes, and being overweight before pregnancy."
        },
        {
            question: "How is GDM typically screened for during pregnancy?",
            options: ["Blood pressure check", "Urine test for protein", "Oral Glucose Tolerance Test (OGTT)", "Ultrasound"],
            answer: "Oral Glucose Tolerance Test (OGTT)",
            tip: "The OGTT is the most common screening test. It involves drinking a sugary solution and having your blood sugar levels tested after a specific time."
        },
        {
            question: "True or False: Dietary management is a cornerstone of GDM treatment.",
            options: ["True", "False"],
            answer: "True",
            tip: "A healthy diet focusing on fruits, vegetables, whole grains, and lean proteins is crucial. It helps control blood sugar without medication."
        },
        {
            question: "If diet and exercise aren't enough, what is the most common medication prescribed for GDM?",
            options: ["Aspirin", "Ibuprofen", "Insulin", "Antibiotics"],
            answer: "Insulin",
            tip: "Insulin injections are often the next step if blood sugar levels remain too high. It's safe for the baby and very effective."
        },
        {
            question: "What is a key component of monitoring GDM at home?",
            options: ["Daily weight checks", "Regularly checking blood glucose levels", "Measuring belly circumference", "Checking blood pressure twice a day"],
            answer: "Regularly checking blood glucose levels",
            tip: "You'll likely need to test your blood sugar multiple times a day: when you wake up (fasting) and after meals, to ensure it's within the target range."
        },
        {
            question: "Which of these is a potential complication of uncontrolled GDM for the baby?",
            options: ["Low birth weight", "Higher than average birth weight (macrosomia)", "Delayed speech", "Poor eyesight"],
            answer: "Higher than average birth weight (macrosomia)",
            tip: "Uncontrolled GDM can lead to a large baby, which can complicate delivery. It also increases the baby's risk of breathing problems and jaundice at birth."
        },
        {
            question: "What happens to GDM after the baby is born?",
            options: ["It always turns into Type 2 diabetes", "It usually goes away", "It requires lifelong medication", "It has no effect on future health"],
            answer: "It usually goes away",
            tip: "For most women, blood sugar levels return to normal after delivery. However, having GDM increases your risk of developing Type 2 diabetes later in life."
        },
        {
            question: "Postpartum care after GDM involves being tested for diabetes how long after delivery?",
            options: ["Within 24 hours", "1-2 weeks", "6-12 weeks", "After 1 year"],
            answer: "6-12 weeks",
            tip: "It's important to get tested for diabetes 6-12 weeks after your baby is born to confirm your blood sugar levels have returned to normal."
        },
        {
            question: "Which of the following is a good carbohydrate choice for a GDM diet?",
            options: ["White rice", "Sugary cereal", "Whole-wheat bread", "A can of soda"],
            answer: "Whole-wheat bread",
            tip: "Complex carbohydrates, like whole-wheat bread, are digested more slowly, helping to prevent sharp spikes in blood sugar."
        },
        {
            question: "True or False: Regular, moderate exercise is generally recommended for managing GDM.",
            options: ["True", "False"],
            answer: "True",
            tip: "Activities like walking or swimming can help your body use insulin more effectively, which helps to lower blood sugar. Always consult your doctor first."
        },
        {
            question: "When is the best time to check blood sugar to see how a meal affected it?",
            options: ["30 minutes before the meal", "Immediately after the meal", "1-2 hours after the start of the meal", "Right before bed"],
            answer: "1-2 hours after the start of the meal",
            tip: "Testing 1-2 hours after you begin eating gives the most accurate picture of how your body handled the carbohydrates in that meal."
        },
        {
            question: "A baby born to a mother with poorly controlled GDM may experience what blood sugar issue shortly after birth?",
            options: ["Hyperglycemia (high blood sugar)", "Hypoglycemia (low blood sugar)", "Normal blood sugar", "No blood sugar changes"],
            answer: "Hypoglycemia (low blood sugar)",
            tip: "The baby's pancreas may produce extra insulin in response to the mother's high blood sugar. After birth, this extra insulin can cause the baby's own blood sugar to drop."
        },
        {
            question: "True or False: Breastfeeding can help lower a mother's risk of developing Type 2 diabetes after having GDM.",
            options: ["True", "False"],
            answer: "True",
            tip: "Studies show that breastfeeding can improve your body's insulin sensitivity and is associated with a lower risk of developing Type 2 diabetes later."
        },
        {
            question: "Why is it important to space meals and snacks throughout the day with GDM?",
            options: ["To make you feel full", "To keep blood sugar levels stable", "To increase your metabolism", "It is not important"],
            answer: "To keep blood sugar levels stable",
            tip: "Eating smaller, more frequent meals prevents your blood sugar from spiking too high after a large meal or dropping too low between meals."
        },
        {
            question: "Which of these is NOT a common symptom of high blood sugar in GDM?",
            options: ["Increased thirst", "Frequent urination", "Blurred vision", "Sudden energy burst"],
            answer: "Sudden energy burst",
            tip: "High blood sugar often causes fatigue, not an energy burst. Many women with GDM, however, experience no noticeable symptoms at all."
        },
        {
            question: "What does 'fasting' mean when preparing for a glucose test?",
            options: ["Eating only protein", "Drinking only juice", "Not eating or drinking anything (except water) for at least 8 hours", "Eating a light snack"],
            answer: "Not eating or drinking anything (except water) for at least 8 hours",
            tip: "Fasting gives a baseline reading of your blood glucose levels before they are influenced by food."
        },
        {
            question: "Besides insulin, what oral medication is sometimes used 'off-label' to manage GDM?",
            options: ["Tylenol", "Metformin", "Penicillin", "Benadryl"],
            answer: "Metformin",
            tip: "Metformin is an oral medication that can help lower blood sugar. While insulin is the primary choice, metformin is sometimes used in certain situations."
        },
        {
            question: "Having GDM increases a mother's risk for what condition during the pregnancy itself?",
            options: ["Anemia", "Preeclampsia (high blood pressure)", "Hair loss", "Acid reflux"],
            answer: "Preeclampsia (high blood pressure)",
            tip: "Women with GDM have a higher risk of developing preeclampsia, a serious blood pressure condition that requires careful monitoring."
        },
        {
            question: "The 'M' in GDM stands for what?",
            options: ["Maternal", "Mellitus", "Management", "Monitoring"],
            answer: "Mellitus",
            tip: "GDM stands for Gestational Diabetes Mellitus. 'Mellitus' is a historical term for diabetes that means 'honey-sweet', referring to sugar in the urine."
        }
    ];

    // --- Effects ---

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
        setShuffledQuestions(shuffled.slice(0, 10));
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
            addMessage("bot", "Welcome to the GDM Quiz! Let's test your knowledge. You'll be asked 10 random questions. Here is your first one.");
            setTimeout(() => {
                presentQuestion(0);
            }, 1500);
        }
    }, [shuffledQuestions, messages.length]);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);


    // --- Core Logic ---

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

    // --- Rendering ---

    return (
        <div className="font-sans bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex flex-col h-screen antialiased">
            <header className="bg-white/30 backdrop-blur-lg border-b border-white/50 p-4 shadow-sm sticky top-0 z-10">
                <div className="max-w-3xl mx-auto flex justify-between items-center">
                    <h1 className="text-xl font-bold text-gray-800">GDM Quiz Chatbot</h1>
                    <div className="text-lg font-semibold text-gray-700 bg-white/50 rounded-full px-4 py-1.5 shadow-sm">
                        Score: <span className="text-indigo-600 font-bold">{score} / {shuffledQuestions.length}</span>
                    </div>
                </div>
            </header>

            <main className="flex-1 p-4 overflow-y-auto">
                <div className="max-w-3xl mx-auto space-y-6">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`flex items-end gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                            {msg.sender === 'bot' && (
                                <div className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center flex-shrink-0 border-2 border-white shadow">
                                    <BotIcon />
                                </div>
                            )}
                            <div className={`max-w-lg p-4 rounded-2xl shadow-lg transition-all duration-300 ${msg.sender === 'bot' ? 'bg-white/60 backdrop-blur-lg text-gray-800 rounded-bl-none' : 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-br-none'}`}>
                                <p className="text-base">{msg.text}</p>
                                {msg.options && (
                                    <div className="mt-4 grid grid-cols-1 gap-2">
                                        {msg.options.map((option, i) => (
                                            <button
                                                key={i}
                                                onClick={() => handleAnswer(option)}
                                                className="bg-indigo-500/80 text-left text-white border border-indigo-400/50 rounded-xl py-2.5 px-4 hover:bg-indigo-500/100 hover:scale-105 transform focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-700 focus:ring-white transition-all duration-200"
                                            >
                                                {option}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                            {msg.sender === 'user' && (
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0 border-2 border-white shadow">
                                    <UserIcon />
                                </div>
                            )}
                        </div>
                    ))}
                    <div ref={chatEndRef} />

                    {quizEnded && (
                        <div className="flex justify-center py-6">
                            <button
                                onClick={startNewQuiz}
                                className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white font-bold py-3 px-8 rounded-full hover:from-purple-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-purple-100 focus:ring-indigo-500 shadow-xl transform hover:scale-105 transition-all duration-200"
                            >
                                Restart Quiz
                            </button>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
