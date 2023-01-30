import React ,{useState} from "react";



const List = () => {
    const [inputValue, setInputValue ] =useState('');
    const [itemsLista , setItemLista] = useState(["cosa #1" , "cosa #2", "cosa #3" ]);
    
    const addItemToList = (e) => {
        let keyPressed = e.key;       
            if(((inputValue !== "") && (keyPressed == "Enter") || (e.target.id ==="button" && inputValue !== "") ))
            {            
                setItemLista((prev)=>{
                    return [...prev,inputValue];
                });     
                setInputValue("");             
            };  
        
    };

    const deleteListElement = (e)=>{
        let idAEliminar = e.target.parentElement.id;
        setItemLista( itemsLista.filter((item,index)=>{
            if (index != idAEliminar){            
                return item
            }
        }));
    }



    return (
        <div className="">            
            <input className="entrada-list bordeesp paddinglista" type="text" onChange={e => setInputValue(e.target.value)} value={inputValue} onKeyDown={addItemToList} placeholder="What needs to be done?"/>
            <button className="boton bordeesp2 paddinglista" id="button" onClick={addItemToList}>Add a new item.</button>
            <ul >{itemsLista.map((item,index) => <li className="bordeinf paddinglista d-flex justify-content-between " key={index} id={index}>{item} 
            <span onClick={(e)=>{
                deleteListElement(e);  
            }}><i className="fa-solid fa-xmark"></i></span></li>)}
            </ul>
            <div className="bordeinf notif"  >{itemsLista.length == 0 ? "Lista vacia" : `Lista con ${itemsLista.length} items` }</div>
            <div className="tab-inf bordeinf"></div>
            <div className="tab-inf2 bordeinf"></div>
        </div>
    );
}



export default List;