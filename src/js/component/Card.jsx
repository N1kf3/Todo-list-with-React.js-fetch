import React, {useEffect ,useState} from "react";


const Card = ()=>{


    const [character , setcharacter] = useState({});

    const [nextcharacter, setNextCharacter] = useState('');


    const getCharacter = async (id)=>{
        try{                        //exitoso
            const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`)
            if (response.status != 200) return;
            const body = await response.json();
            setcharacter(body);   
            console.log("el siguiente ",nextcharacter);
            return body;
        } catch (error){            //fallido
            console.log(error);
        }
    }

    useEffect(()=>{
        getCharacter(1);
        
    },[])


    return(
        <div>
            <div className="card" style={{width:" 18rem"}}>
            <img src={character.image} className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{character.name}</h5>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="#" className="btn btn-primary">Next</a>
            </div>
            </div>
        </div>
    )
}


export default Card;