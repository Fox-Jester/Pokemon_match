
import { FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { faVolumeHigh, faVolumeMute } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import btnSound from "./assets/sounds/btn_click.mp3"

function AudioBtn(){


    const [audio, setAudio] = useState(true);


    function audioToggle(value: boolean){
        setAudio(value);
        if(value){
            const sound = new Audio(btnSound);
            sound.play()
        }

    }

   


    const audioActive = (<button onClick={() => audioToggle(false)} className="audio-btn wrapper btn"><FontAwesomeIcon icon={faVolumeHigh}/></button>);

    const audioMute = (<button onClick={() => audioToggle(true)} className="audio-btn wrapper btn mute"><FontAwesomeIcon icon={faVolumeMute}/></button>)

    return(
        audio ? audioActive : audioMute
    )
}

export default AudioBtn;