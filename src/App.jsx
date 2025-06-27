import { useState } from 'react'
import './App.css'
import Flashcard from './components/Flashcard'
import cardData from './lib/cardData.json'

function App() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [userGuess, setUserGuess] = useState('');
  const [feedback, setFeedback] = useState('');
  const [shuffledCards, setShuffledCards] = useState([...cardData]);
  const [isShuffled, setIsShuffled] = useState(false);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [masteredCards, setMasteredCards] = useState([]);

  const shuffleCards = () => {
    const shuffled = [...cardData].sort(() => Math.random() - 0.5);
    setShuffledCards(shuffled);
    setCurrentCardIndex(0);
    setUserGuess('');
    setFeedback('');
    setIsShuffled(true);
  };

  const markAsMastered = () => {
    const currentCard = shuffledCards[currentCardIndex];
    setMasteredCards(prev => [...prev, currentCard]);
    
    const updatedCards = shuffledCards.filter((_, index) => index !== currentCardIndex);
    setShuffledCards(updatedCards);
    
    if (updatedCards.length === 0) {
      setCurrentCardIndex(0);
    } else if (currentCardIndex >= updatedCards.length) {
      setCurrentCardIndex(updatedCards.length - 1);
    }
    
    setUserGuess('');
    setFeedback('');
  };

  const goToNextCard = () => {
    if (currentCardIndex < shuffledCards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setUserGuess('');
      setFeedback('');
    }
  };

  const goToPreviousCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
      setUserGuess('');
      setFeedback('');
    }
  };

  const handleSubmitGuess = () => {
    const currentAnswer = shuffledCards[currentCardIndex].answer;
    const guess = userGuess.trim();
    
    const normalizedAnswer = normalizeAnswer(currentAnswer);
    const normalizedGuess = normalizeAnswer(guess);
    
    if (normalizedGuess === normalizedAnswer) {
      const newStreak = currentStreak + 1;
      setCurrentStreak(newStreak);
      setFeedback('Correct!');
      
      if (newStreak > longestStreak) {
        setLongestStreak(newStreak);
      }
      return;
    }
    
    if (isPartialMatch(normalizedGuess, normalizedAnswer)) {
      const newStreak = currentStreak + 1;
      setCurrentStreak(newStreak);
      setFeedback('Correct! (Partial match)');
      
      if (newStreak > longestStreak) {
        setLongestStreak(newStreak);
      }
      return;
    }
    
    setCurrentStreak(0);
    setFeedback('Incorrect. Try again!');
  };

  const normalizeAnswer = (answer) => {
    return answer
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  };

  const isPartialMatch = (guess, answer) => {
    const guessWords = guess.split(' ').filter(word => word.length > 0);
    const answerWords = answer.split(' ').filter(word => word.length > 0);
    
    if (guessWords.length === 0) return false;
    
    const matchingWords = answerWords.filter(word => 
      guessWords.some(guessWord => 
        guessWord.includes(word) || word.includes(guessWord)
      )
    );
    
    const matchPercentage = matchingWords.length / answerWords.length;
    
    const guessContainsAnswer = answerWords.some(word => 
      guess.includes(word)
    );
    
    return matchPercentage >= 0.7 || guessContainsAnswer;
  };

  return (
    <div className="app">
      <div className="header">
        <h1 className="title">Computer Science Trivia</h1>
        <p className="description">
          Test your knowledge of computer science fundamentals
        </p>
        <p className="card-count">Card {currentCardIndex + 1} of {shuffledCards.length}</p>
        {isShuffled && <p className="shuffle-indicator">🔀 Cards are shuffled</p>}
        <p className="mastered-count">Mastered: {masteredCards.length} cards</p>
      </div>

      <div className="streak-container">
        <div className="streak-counter">
          <span className="streak-label">Current Streak:</span>
          <span className="streak-value current">{currentStreak}</span>
        </div>
        <div className="streak-counter">
          <span className="streak-label">Longest Streak:</span>
          <span className="streak-value longest">{longestStreak}</span>
        </div>
      </div>
      
      <div className="flashcard-container">
        <Flashcard
          question={shuffledCards[currentCardIndex].question}
          answer={shuffledCards[currentCardIndex].answer}
          category={shuffledCards[currentCardIndex].category}
          difficulty={shuffledCards[currentCardIndex].difficulty}
          image={shuffledCards[currentCardIndex].image}
          userGuess={userGuess}
          setUserGuess={setUserGuess}
          onSubmitGuess={handleSubmitGuess}
          feedback={feedback}
          onMarkAsMastered={markAsMastered}
        />
        
        <div className="button-container">
          <div className="navigation-buttons">
            <button 
              className={`nav-button ${currentCardIndex === 0 ? 'disabled' : ''}`}
              onClick={goToPreviousCard}
              disabled={currentCardIndex === 0}
            >
              ← Previous
            </button>
            <button 
              className={`nav-button ${currentCardIndex === shuffledCards.length - 1 ? 'disabled' : ''}`}
              onClick={goToNextCard}
              disabled={currentCardIndex === shuffledCards.length - 1}
            >
              Next →
            </button>
          </div>
          
          <button className="shuffle-button" onClick={shuffleCards}>
            🔀 Shuffle Cards
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
