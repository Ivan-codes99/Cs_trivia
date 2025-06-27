import { useState } from 'react';
import './Flashcard.css';

function Flashcard({ question, answer, category, difficulty, image, userGuess, setUserGuess, onSubmitGuess, feedback, onMarkAsMastered }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitGuess();
  };

  return (
    <div className="flashcard-container">
      <div className={`flashcard ${isFlipped ? 'flipped' : ''} difficulty-${difficulty}`} onClick={handleCardClick}>
        <div className="flashcard-inner">
          <div className="flashcard-front">
            <div className="card-header">
              <div className="card-label">Question</div>
              <div className="card-badges">
                <span className={`difficulty-badge ${difficulty}`}>{difficulty}</span>
                <span className="category-badge">{category}</span>
              </div>
            </div>
            {image && <img src={image} alt="Question visual" className="card-image" />}
            <div className="card-content">{question}</div>
            <div className="flip-hint">Click to reveal answer</div>
          </div>
          <div className="flashcard-back">
            <div className="card-header">
              <div className="card-label">Answer</div>
              <div className="card-badges">
                <span className={`difficulty-badge ${difficulty}`}>{difficulty}</span>
                <span className="category-badge">{category}</span>
              </div>
            </div>
            <div className="card-content">{answer}</div>
            <div className="flip-hint">Click to see question</div>
          </div>
        </div>
      </div>

      <div className="guess-section">
        <form onSubmit={handleSubmit} className="guess-form">
          <input
            type="text"
            value={userGuess}
            onChange={(e) => setUserGuess(e.target.value)}
            placeholder="Enter your answer..."
            className="guess-input"
          />
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
        {feedback && (
          <div className={`feedback ${feedback.includes('Correct') ? 'correct' : 'incorrect'}`}>
            {feedback}
          </div>
        )}
        <button 
          className="mastery-button" 
          onClick={onMarkAsMastered}
        >
          Mark as Mastered
        </button>
      </div>
    </div>
  );
}

export default Flashcard;
