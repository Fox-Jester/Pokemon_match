

import Header from "./Header.tsx";
import CardContainer from "./CardContainer.tsx";

import { useState, useEffect, useRef } from "react";
import gameOverSound from "./assets/sounds/game_over.mp3"





function App() {

 const [randomPokeArray, setRandomPokeArray] = useState<{ pokeName: string; pokeSprite: string }[]>([]);

 const [reset, setReset] = useState(0)
     
     const idArray = [] as number[];
 

    const resetArrayRef = useRef(0)

    const [startGame, setStartGame] = useState(false);
    const [score, setScore] = useState(0)
     
     useEffect(() => {
       
         const fetchData = async () => {
             const data = await fetchPokemonData();
             setRandomPokeArray(data);
         };
         fetchData();
     }, [reset]);
     
 
     while(idArray.length < 8){
         const pokeId = Math.floor(Math.random() * 649) + 1;
 
         if(!(idArray.includes(pokeId))){
             idArray.push(pokeId);
         }
     }
 
     const fetchPokemonData = async () => {
         const pokeArray = await Promise.all(
             idArray.map(async (id: number) => {
                 const URL = `https://pokeapi.co/api/v2/pokemon/${id}`;
                 try {
                     const response = await fetch(URL);
                     const data = await response.json();
                     return {
                         pokeName: data.name,
                         pokeSprite: data.sprites.front_default,
                     };
                 } catch (error) {
                     console.error(error);
                     return { pokeName: "", pokeSprite: "" };
                 }
             })
         );
 
         const doublePokeArray = [...pokeArray, ...pokeArray];
         
 
         const randomArray = shuffle(doublePokeArray);
         
         return randomArray;
     };
 
     function shuffle(array: { pokeName: string; pokeSprite: string }[]) {
         let currentIndex = array.length;
 
         while (currentIndex != 0) {
             let randomIndex = Math.floor(Math.random() * currentIndex);
             currentIndex--;
 
             [array[currentIndex], array[randomIndex]] = [
                 array[randomIndex],
                 array[currentIndex],
             ];
         }
         return array;
     }
 
    function resetboard(){
        setReset((prev) => prev + 1);
        resetArrayRef.current++
    }
        
    function resetGame(){
         setReset((prev) => prev + 1);
         setScore(0)
         resetArrayRef.current++
         playAudio(gameOverSound);
         

     }

     function playAudio(soundEffect: string){
        const audioBtn = document.querySelector(".audio-btn");
            if(!(audioBtn?.classList.contains("mute"))){
                const audio = new Audio(soundEffect);
                audio.play();
            }
    }

     function handleStartGame(){
        if(startGame){
            setStartGame(false);
        }
        else{
            setStartGame(true);
        }
     }
    

     

  return (
   <div className="page-container">
    <Header score={score} timeUp={resetGame} startGame={handleStartGame}/>
    <CardContainer resetArray={resetArrayRef.current} pokeArray={randomPokeArray} boardReset={resetboard} onScore={() => setScore(prev => prev + 1)} gameStart={startGame}/>

   </div>
  )
}

export default App
