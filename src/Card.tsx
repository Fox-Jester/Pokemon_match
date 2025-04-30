

import pokeBallImg from "./assets/poke_ball_icon.png"


interface CardProps{
    id:number
    pokemon: {pokeName: string, pokeSprite: string};
    flipped?: boolean;
    hidden? : boolean;
    onCardClick: Function
    
     
}


function Card({id, pokemon, flipped = false, hidden = false, onCardClick}: CardProps){


    
    function handleClick(){
        if(flipped === false){
            onCardClick(id, pokemon.pokeName);

        }
    }


 

    return(
        <div  onClick={hidden ? undefined : handleClick} className={"card" + (flipped ? " " + "flipped" : "") + (hidden ? " " + "hidden" : "")}>
            <div className="card-inner">
            <div className="card-back">
                <img src={pokeBallImg} alt="" />
            </div>

                <div className="card-front">
            <img src={pokemon.pokeSprite} alt="pokemon sprite" />
            <p>{pokemon.pokeName}</p>
            </div>
            </div>
            
        </div>
    )
}
export default Card