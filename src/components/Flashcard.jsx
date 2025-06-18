import { useState } from 'react';
import './Flashcard.css';

function Flashcard({ question, answer, category, difficulty, image }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };
  return (
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
  );
}

export default Flashcard;
