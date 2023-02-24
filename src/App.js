import './App.css';
import Die from './Die';
import React from "react";
import { nanoid } from 'nanoid';
import {useWindowSize} from 'react-use';
import Confetti from 'react-confetti';

function App() {
  const { width, height } = useWindowSize()
  const [dice, setDice] = React.useState(generateRandomDice())
  const [tenzies, setTenzies] = React.useState(false)
  const [count, setCount] = React.useState(0)

  const diceElements = dice.map(die => {
    return <Die key={die.id} value={die.value} isHeld={die.isHeld} freezeDie={()=>holdDice(die.id)}/>
  })

  React.useEffect(()=>{
    const allDiceHeld = dice.every(die => die.isHeld)
    const dieNumber = dice[0].value
    const allSameValues = dice.every(die => die.value === dieNumber)

    if(allDiceHeld && allSameValues){
      setTenzies(true)
    }
  },[dice])

  function rollDice(){
    setCount(prevState => prevState + 1)
    setDice(oldDice => oldDice.map(die => {
      const randomNumber = Math.floor(Math.random()*6)+1
      if(die.isHeld){
        return die
      }else {
        return {
          id: nanoid(),
          value:randomNumber,
          isHeld: false
        }
        }
    }))
    
  }

  function generateRandomDice(){
    const diceArray = []
    for(let i=0; i < 10; i++){
      const randomNumber = Math.floor(Math.random()*6)+1
      diceArray.push({
        id: nanoid(),
        value:randomNumber,
        isHeld: false
      })
    }
    return diceArray
  }

  function holdDice(id){
   setDice(oldDice => oldDice.map(die => {
    if(id === die.id){
      return {...die, isHeld:!die.isHeld}
    }else{
      return die
    }
   }))
  }

  function playGame(){
    if(tenzies){
      setTenzies(false)
      setDice(generateRandomDice())
      setCount(0)
    }else{
      rollDice()
    }
  }

  return (
    <div>
      {tenzies && <Confetti  width={width} height={height} />}
        <header>
          <h1>Tenzies</h1>
        </header>

      
        <div className="instructions">
          <h4>
            Roll until all dice are the same. Click each die to freeze it at it's current value between rolls.
          </h4>
        </div>

        <main>
          {tenzies? 
          <div><h1>You won with {count} rolls!</h1></div> 
          : <div><h1>Count: {count}</h1></div>}

          <div className="diceContainer">
            {diceElements}
          </div>

          <button className="rollBtn" onClick={playGame}>{tenzies?"New Game": "Roll"}</button>
        </main>
    </div>
  )
    
}

export default App;
