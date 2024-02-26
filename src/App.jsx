import { useState, useEffect } from 'react'
import './App.css'

function Card({ number, spriteArray, randomizeCardArray, clickedCardArray, setClickedCardArray, currentScore, bestScore, setBestScore, setCurrentScore }) {

  const handleCardClick = () => {
    randomizeCardArray();
    if(clickedCardArray.includes(number)){
      setClickedCardArray([]);
      setCurrentScore(0);
    }else{
      setClickedCardArray([...clickedCardArray, number]);
      
      setCurrentScore(prevScore => {
        const newScore = prevScore + 1;
        if (bestScore < newScore){
          setBestScore(newScore);
        }
        if (newScore === 9){
          return 'You won!'
        }
        return newScore;
      })
    }

  }

  return(
    <>
    {(spriteArray.length > 0) && 
      <div onClick={handleCardClick}>
        <img src={spriteArray[number]} alt="" />
      </div>
    }
    </>
  )
}

export default function App() {

  const [copyArray, setCopyArray] = useState([]);
  const [clickedCardArray, setClickedCardArray] = useState([]);
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [spriteArray, setSpriteArray] = useState([]);

  //to run randomize once on render
  useEffect(() => {
    randomizeCardArray();
  }, [])
  
  useEffect(() => {
    const pokemonArray = ['pikachu', 'mewtwo', 'goldeen', 'diglett', 'cubone', 'charizard', 'squirtle', 'dragonite', 'bulbasaur']

    // const fetchSprite = (pokemonName) => {
    //   return fetch('https://pokeapi.co/api/v2/pokemon/${pokemonName}')
    //     .then(response => {
    //       if (!response.ok) throw new Error('Network response was not OK');
    //       return response.json();
    //     })
    //     .then(data => data.sprites.front_default)
    //     .catch(error => {
    //       console.error("There was a problem with the fetch operation: ", error);
    //       return null;
    //     })
    // }

    // const fetchAllSprites = async () => {
    //   const promises = pokemonArray.map(pokemon => fetchSprite(pokemon));
    //   const sprites = await Promise.all(promises);
    //   const filteredSprites = sprites.filter(sprite => sprite !== null)
    //   setSpriteArray(filteredSprites);
    // }

    // fetchAllSprites();


    pokemonArray.forEach((e) => {
      fetchSprite(e);
    })

  }, [])

  async function fetchSprite(pokemonName){
    try{
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)

      if(!response.ok){
        throw new Error('Could not fetch resource');
      }

      const data = await response.json();
      const pokemonSprite = data.sprites.front_default;

      setSpriteArray(currentArray => {
        return currentArray.includes(pokemonSprite) ? currentArray : [...currentArray, pokemonSprite];
      }
      )
    } 
    catch(error){
      console.log(error);
    }
  }

  const cardArray = [
    {id: crypto.randomUUID(), number: 0},
    {id: crypto.randomUUID(), number: 1},
    {id: crypto.randomUUID(), number: 2},
    {id: crypto.randomUUID(), number: 3},
    {id: crypto.randomUUID(), number: 4},
    {id: crypto.randomUUID(), number: 5},
    {id: crypto.randomUUID(), number: 6},
    {id: crypto.randomUUID(), number: 7},
    {id: crypto.randomUUID(), number: 8},
  ]

  const randomizeCardArray = () => {
    let copy = [];
    let array = Array.from(cardArray);
    let n = array.length;
    let i;

    while (n > 0){
      i = Math.floor(Math.random() * n--);
      copy.push(array.splice(i, 1)[0]);
    }

    setCopyArray(copy);
  }




  return (
    <>
    <p>Current Score: {currentScore}</p>
    <p>Best Score: {bestScore}</p>
    <div className='box'>
      {copyArray.map(card => {
        return(
          <Card key = {card.id} spriteArray ={spriteArray} number = {card.number} randomizeCardArray = {randomizeCardArray}
          clickedCardArray = {clickedCardArray} setClickedCardArray = {setClickedCardArray} currentScore={currentScore}
          bestScore={bestScore} setCurrentScore={setCurrentScore} setBestScore={setBestScore} />
        )
      })}      
    </div>
    </>
  )
}