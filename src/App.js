import './App.css';
import Die from './Die';
import React from "react";
import { nanoid } from 'nanoid';
// import {useWindowSize} from 'react-use';
// import Confetti from 'react-confetti';

function App() {
  // const { width, height } = useWindowSize()
  const [dice, setDice] = React.useState(generateRandomDice())

  function rollDice(){
    setDice(generateRandomDice())
  }

  const diceElements = dice.map(die => {
    return <Die key={die.id} value={die.value}/>
  })

  function generateRandomDice(){
    const diceArray = []
    for(let i=0; i < 10; i++){
      const randomNumber = Math.floor(Math.random()*6)+1
      diceArray.push({
        id: nanoid(),
        value:randomNumber,
        isHeld:false
      })
    }
    return diceArray
  }


  return (
    <div>
      {/* <Confetti  width={width} height={height} /> */}
        <header>
          <h1>Tenzies</h1>
        </header>

      <main>
        <div className="diceContainer">
          {diceElements}
        </div>

        <button className="rollBtn" onClick={rollDice}>Roll</button>
      </main>
    </div>
  )
    
}

export default App;
