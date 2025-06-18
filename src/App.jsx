import { useState } from 'react'
import './App.css'
import Flashcard from './components/Flashcard'
import cardData from './lib/cardData.json'

function App() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const getRandomCard = () => {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * cardData.length);
    } while (newIndex === currentCardIndex && cardData.length > 1);
    setCurrentCardIndex(newIndex);
  };

  return (
    <div className="app">
      <div className="header">
        <h1 className="title">Computer Science Trivia</h1>
        <p className="description">
          Test your knowledge of computer science fundamentals
        </p>
        <p className="card-count">Total Cards: {cardData.length}</p>
      </div>
      
      <div className="flashcard-container">
        <Flashcard
          question={cardData[currentCardIndex].question}
          answer={cardData[currentCardIndex].answer}
          category={cardData[currentCardIndex].category}
          difficulty={cardData[currentCardIndex].difficulty}
          image={cardData[currentCardIndex].image}
        />
        
        <button className="next-button" onClick={getRandomCard}>
          Next Card →
        </button>
      </div>
    </div>
  )
}

export default App
