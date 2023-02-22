import React ,{useState, useEffect} from "react";



const List = () => {
    const [inputValue, setInputValue ] =useState('');
    const [itemsLista , setItemLista] = useState([]);
    const [botonHabilitado , setBotonHabilitado] = useState(false)

    const crearUsuario = async ()=>{
        try{
            const response = await fetch(`https://assets.breatheco.de/apis/fake/todos/user/WilAnd`,{
                method: "POST",
                headers:{
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify([])
            });            
            await addUserOfList();
        }catch(error){
        }        
    }
    
    const addUserOfList = async ()=>{
        try {
            const response = await fetch(`https://assets.breatheco.de/apis/fake/todos/user/WilAnd`);
            if (response.status != 200) {crearUsuario();return;};
            const body = await response.json();
            setItemLista(body);
        } catch(error) {            
        }
    }

    const updateUserList = async(newTask)=>{
        try{
            const response = await fetch(`https://assets.breatheco.de/apis/fake/todos/user/WilAnd`,{
                method: "PUT",
                headers:{
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify([
                    ...itemsLista , newTask
                ])
            });
            if (response.ok == true) return true;
            throw new Error ("intentalo nuevamente");
        }
        catch (error){
            console.log("error" ,error)
        }
    }


    const addItemToList = async (e) => {
        let keyPressed = e.key;
            if (inputValue.trim().length >= 1){
            if(((inputValue !== "") && (keyPressed == "Enter") || (e.target.id ==="button" && inputValue !== "") ))
            {                     
                const cargaExitosa = await updateUserList({label: inputValue, done:false});
                if (cargaExitosa){                 
                    await addUserOfList();      
                    setInputValue("");  
                    setBotonHabilitado(false);
                }                               
            } else if((inputValue == "") && (keyPressed == "Enter") || (e.target.id ==="button" && inputValue == "") )alert("Escribir item en la lista");  
}};

    const updateUserListDelete = async(idAEliminar)=>{
        
        if ((itemsLista.length > 1) &&(idAEliminar >=0) ){
            try{
                const response = await fetch(`https://assets.breatheco.de/apis/fake/todos/user/WilAnd`,{
                    method: "PUT",
                    headers:{
                        'Content-Type': 'application/json'
                    },
                    body:JSON.stringify([
                        ...itemsLista.filter((item,index)=>{
                            if (index != idAEliminar){            
                                return item
                            }
                        })
                    ])
                });            
                if (response.ok == true) return true;
                throw new Error ("intentalo nuevamente");
            }
            catch (error){
                console.log("error" ,error)
            }
        } else {
            try{
                const responseGet = await fetch(`https://assets.breatheco.de/apis/fake/todos/user/WilAnd`);
                if (responseGet.status == 200){
                    const response = await fetch(`https://assets.breatheco.de/apis/fake/todos/user/WilAnd`,{
                    method: "DELETE",
                    headers:{
                        'Content-Type': 'application/json'
                    },
                    body:JSON.stringify([])
                    })
                    setItemLista([]);
                    setBotonHabilitado(true);            
                }
            await crearUsuario();
            setItemLista([]);
            }
            catch(error){
                console.log("error" ,error)
            }
        }
        
    }   

    const deleteListElement = async (e)=>{
        let idAEliminar = e.target.parentElement.parentElement.id;
        const cargaExitosa =  await updateUserListDelete(idAEliminar);
        if (cargaExitosa){
            await addUserOfList();      
            setInputValue("");  
        }   
    }
    const deleteAllItems= (e)=>{
        updateUserListDelete();   
        setBotonHabilitado(true);
        
    }


    useEffect(()=>{
        addUserOfList();
    },[])

    return (
        <div className=""> 
            <div className="d-flex">
                <input className="entrada-list bordeesp paddinglista w-50" type="text" onChange={e => setInputValue(e.target.value)} value={inputValue} onKeyDown={addItemToList} placeholder="What needs to be done?"/>
                <button className="boton bordeesp  w-25 " id="button" onClick={addItemToList}>Add a new item.</button>
                <button disabled = {botonHabilitado} className="boton bordeesp2  w-25 " id="button" onClick={deleteAllItems}> Delete all items.</button>
            </div>            
            <ul >{itemsLista.map((item,index) => <li className="bordeinf paddinglista d-flex justify-content-between " key={index} id={index}>{item.label} 
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