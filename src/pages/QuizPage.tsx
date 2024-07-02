import React, { useEffect, useState } from "react";
import { useParams /*, useNavigate*/ } from "react-router-dom";
import axios from "axios";
import uri from "../constants";
import Navigator from "../components/Navigator";
import "./QuizPage.css";

interface Question {
  _id: string;
  questionText: string;
  options: string[];
  correctAnswer: string;
  category: string;
}

const QuizPage: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState<number>(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [userScores, setUserScores] = useState<
    { username: string; score: number }[]
  >([]);
  const [correctCount, setCorrectCount] = useState(0); // Contador de respostas corretas
  const [wrongCount, setWrongCount] = useState(0); // Contador de respostas erradas
  //const navigate = useNavigate();
  const { category } = useParams<{ category: string }>();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          `${uri}/quiz/categories/${category}/questions`
        );
        if (response.data.length > 0) {
          setQuestions(response.data);
        } else {
          console.error("Nenhuma pergunta encontrada.");
        }
      } catch (error) {
        console.error("Erro ao buscar perguntas:", error);
      }
    };

    fetchQuestions();
  }, [category]);

  const handleAnswer = (selectedOption: string) => {
    setSelectedOption(selectedOption);
    setShowFeedback(true);

    const correct =
      selectedOption === questions[currentQuestionIndex].correctAnswer;
    if (correct) {
      setScore(score + 1);
      setCorrectCount(correctCount + 1); // Incrementa o contador de acertos
    } else {
      setWrongCount(wrongCount + 1); // Incrementa o contador de erros
    }

    setTimeout(() => {
      setShowFeedback(false);
      if (currentQuestionIndex + 1 < questions.length) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedOption(null);
      } else {
        handleFinishQuiz();
      }
    }, 2000);
  };

  const handleFinishQuiz = () => {
    const username = prompt("Por favor, digite seu nome para o ranking:");
    if (username) {
      const newUserScore = { username, score };
      setUserScores([...userScores, newUserScore]);
    }
    setQuizCompleted(true);
    //navigate("/resultados");
  };

  return (
    <>
      <Navigator />
      <div className="quiz-container">
        {!quizCompleted && questions.length > 0 ? (
          <div className="quiz-card">
            <div className="quiz-card-header">
              <span className="quiz-card-category">
                {questions[currentQuestionIndex].category}
              </span>
            </div>
            <div className="quiz-card-body">
              <p className="quiz-card-question">
                {questions[currentQuestionIndex].questionText}
              </p>
              <div className="quiz-options">
                {questions[currentQuestionIndex].options.map(
                  (option, index) => (
                    <button
                      key={index}
                      className={
                        showFeedback
                          ? option ===
                            questions[currentQuestionIndex].correctAnswer
                            ? "quiz-option-button correct"
                            : selectedOption === option
                            ? "quiz-option-button incorrect"
                            : "quiz-option-button"
                          : "quiz-option-button"
                      }
                      onClick={() => handleAnswer(option)}
                      disabled={showFeedback || selectedOption !== null}
                    >
                      {option}
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="quiz-results">
            <h2>Resultado do Quiz</h2>
            <p>Sua pontuação: {score}</p>
            <p>Respostas corretas: {correctCount}</p>
            <p>Respostas erradas: {wrongCount}</p>
            <button onClick={handleFinishQuiz}>Salvar Pontuação</button>
          </div>
        )}
      </div>
      {quizCompleted && (
        <div className="ranking-container">
          <h2>Ranking de Pontuações</h2>
          <ul className="ranking-list">
            {userScores.map((userScore, index) => (
              <li key={index}>
                <span className="ranking-username">{userScore.username}</span>
                <span className="ranking-score">{userScore.score}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default QuizPage;
