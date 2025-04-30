import { useEffect, useRef, useState } from "react";

import AudioBtn from "./AudioBtn.tsx";
import btnSound from "./assets/sounds/btn_click.mp3"


interface HeaderProps{
    score: number
    timeUp: Function
    startGame: Function
}


function Header({score, timeUp, startGame}:HeaderProps){

    const [start, setStart] = useState<boolean>(false);
    const [timer, setTimer] = useState(300);

    const timerRef = useRef("5:00");

    const highScoreRef = useRef(0);

    useEffect(() => {
        if(localStorage.getItem("highScoreData")){
            highScoreRef.current = JSON.parse(localStorage.getItem("highScoreData")!);
        }
    },[])

 
        if(score > highScoreRef.current){
            highScoreRef.current = score;
            localStorage.setItem("highScoreData", score.toString())
        }
   
   

    useEffect(() => {
        if(start){
        const intervalId = setInterval(() => {
            if(timer > 0){
                let seconds = timer;
                seconds--
                const minutes = Math.floor(seconds / 60);
                const displaySeconds = seconds - (60 * minutes)
                let timeDisplay
                if(minutes >= 1){
                    if(displaySeconds > 9){
                        timeDisplay = `${minutes}:${displaySeconds}`
                    }
                    else{
                        timeDisplay = `${minutes}:0${displaySeconds}`
                    }
                }
                else{
                    if(displaySeconds > 9){
                        timeDisplay = `${seconds}`
                    }
                    else{
                        timeDisplay = `0${seconds}`
                    }
                }
                timerRef.current = timeDisplay;
                setTimer(seconds);
            }
            else{
                clearInterval(intervalId);
                alert("GameOver")
                handleReset()
                
                
            }
        }, 1000);
        
        return () => {
            clearInterval(intervalId)
            
        }
    }
    

    },[start, timer])

    function handleStartBtn(){
        setStart(true);
        startGame();
        playAudio(btnSound)
    }

    function handleReset(){
        setStart(false);
        startGame();
        setTimer(300);
        timerRef.current = "5:00"
        
        timeUp()
    }

    function playAudio(soundEffect: string){
        const audioBtn = document.querySelector(".audio-btn");
            if(!(audioBtn?.classList.contains("mute"))){
                const audio = new Audio(soundEffect);
                audio.play();
            }
    }

    const startBtn = (<button onClick={handleStartBtn} className="start-btn btn">Start!</button>)
    const resetbtn = (<button onClick={handleReset} className="start-btn btn">Reset</button>)

    return(
        <>
        <span className="wrapper">High Score: <p>{highScoreRef.current}</p></span>
        <header className="header">
            <span className="wrapper">Score: <p className="score">{score}</p></span>
            <span className="wrapper">Timer: <p>{timerRef.current}</p></span>
            <AudioBtn/>
            {start ? resetbtn : startBtn}
        </header>
        </>
    )
}

export default Header;