import React, { useEffect, useState } from "react";

interface Question {
    question: string;
    options: string[];
    answer: string;
}

const QuizPage: React.FC = () => {
    const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswer, setUserAnswer] = useState<string>("");
    const [quizFinished, setQuizFinished] = useState(false);
    const [userAnswers, setUserAnswers] = useState<string[]>([]);
    const [correctAnswers, setCorrectAnswers] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const shuffleArray = (array: Question[]): Question[] => {
        let shuffledArray = [...array]; // Create a copy of the array
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]; // Swap elements
        }
        return shuffledArray;
    };

    // Fetch quiz questions from the backend
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/quiz");
                if (!response.ok) throw new Error("Failed to fetch quiz questions");
       
                const data = await response.json();
                const shuffled = shuffleArray(data)
                const limitedQuestions = data.slice(0, 5);
                console.log("Before Shuffle:", limitedQuestions); // Log before shuffle
                // const shuffled = shuffleArray(limitedQuestions);
                console.log("After Shuffle:", shuffled); // Log after shuffle
                setShuffledQuestions(limitedQuestions);
            } catch (err) {
                setError("There was an error fetching the quiz questions.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
       

        fetchQuestions();
    }, []);

    const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserAnswer(e.target.value);
    };

    const handleSubmitAnswer = (selectedAnswer: string) => {
        const currentQuestion = shuffledQuestions[currentQuestionIndex];

        setUserAnswers((prevAnswers) => [...prevAnswers, selectedAnswer]);

        if (currentQuestionIndex < shuffledQuestions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setQuizFinished(true);
        }

        setUserAnswer(""); // Clear the user answer
    };

    useEffect(() => {
        if (quizFinished) {
            let correct = 0;
            shuffledQuestions.forEach((question, index) => {
                if (userAnswers[index] === question.answer) {
                    correct++;
                }
            });
            setCorrectAnswers(correct);
        }
    }, [quizFinished, shuffledQuestions, userAnswers]);

    if (loading) return <p>Loading questions...</p>;
    if (error) return <p>{error}</p>;

    if (quizFinished) {
        return (
            <div className="quiz-page" style={{paddingTop:'300px', fontSize: '40px'}}>
                <h2>Quiz Over!</h2>
                <p>You scored {correctAnswers} out of {shuffledQuestions.length}.</p>
                <button onClick={() => window.location.reload()}>Restart Quiz</button>
            </div>
        );
    }

    const currentQuestion = shuffledQuestions[currentQuestionIndex];

    if (!currentQuestion) return <p>There was an error loading the question.</p>;

    return (
        <div className="quiz-page" style={{paddingTop:'200px', fontSize: '40px'}}>
            <div className="quiz-question">
                <h3>{currentQuestion.question}</h3>
                <div className="options" >
                    {currentQuestion.options.map((option, index) => (
                        <button
                            key={index}
                            onClick={() => handleSubmitAnswer(option)}
                            style={{ fontSize: "36px", margin: "30px", padding: "20px", display:'flex', flexDirection:'column'}}
                        >
                            {option}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default QuizPage;
