
import { useEffect, useState} from "react";
import Card from "./Card.tsx";
import flipSound from "./assets/sounds/card_flip.mp3"
import pairMatchSound from "./assets/sounds/pair_match.mp3"

interface CardContainerProps{
    pokeArray: {pokeName: string, pokeSprite: string}[],
    onScore: Function,
    boardReset: Function,
    resetArray: number,
    gameStart: boolean
    
}

function CardContainer({pokeArray, onScore, boardReset, resetArray, gameStart}: CardContainerProps){
    
    const [flipArray, setFlipArray] = useState< {name:string, id:number}[]>([]);
    const [matchedArray, setMatchedArray] = useState<number []>([])
    

    


    useEffect(() => {
       
            setMatchedArray([])
            setFlipArray([])
        
    },[resetArray])

    useEffect(() => {
        if(flipArray.length === 2){
                checkMatch();
                
                setTimeout(() => {
                    setFlipArray([])
                }, 1000);
                
            }
    },[flipArray]);

    useEffect(() => {
        if(matchedArray.length === 16){
            
            boardReset()
            
            setMatchedArray([])
                
            
        }
    },[matchedArray.length])

   

    
   

    function handleFlip(name:string, id:number){
        if(flipArray.length < 2){
            setFlipArray((prev) => [...prev, {name: name, id: id}]);

            playAudio(flipSound)

        }


    }

    function checkMatch(){
        if(flipArray[0].name === flipArray[1].name){
            setTimeout(() => {
                successfulMatch()
            }, 1000);
            
        };
    }
    
    function successfulMatch(){
        setMatchedArray((prev) => [...prev, flipArray[0].id])
        setMatchedArray((prev) => [...prev, flipArray[1].id])

        playAudio(pairMatchSound);


        onScore();
        
    }

    function playAudio(soundEffect: string){
        const audioBtn = document.querySelector(".audio-btn");
            if(!(audioBtn?.classList.contains("mute"))){
                const audio = new Audio(soundEffect);
                audio.play();
            }
    }
    
    

    return(
        <div className="card-container">
            {gameStart ? null : <div className="game-overlay"><p className="tag">Start Game!</p></div>}
            {pokeArray.map((pokemon, index: number) => (
                <Card id={index} pokemon={pokemon} hidden={matchedArray.includes(index)} flipped={flipArray.some((card) => card.id === index)} 
                key={index} onCardClick={() => handleFlip(pokemon.pokeName, index)} />
            ))}
        </div>
    )
}

export default CardContainer;