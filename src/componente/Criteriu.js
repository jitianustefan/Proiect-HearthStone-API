import { useState } from 'react';
import './Criteriu.css';


const Criteriu = () =>
{  
    const [newValue,setNewValue] = useState("");
    function potiCauta(e)
    {
        console.log("Valoare tip_cautare:", e.target.value)
        //verific sa nu aleaga varianta 'Alege o optiune'
        if (e.target.value !== 'null')
        {
            window.location.href=`/cautare/${e.target.value}`;
        }
        setNewValue("");
    }
    return (
        <div className='app_criteriu'>
        <h3>Alege criteriu de cautare!</h3>
        <br/>
        <form>
        <select className='select_criteriu' id="bomba" name="bomba" value={newValue} onChange={potiCauta}>
            <option value="null">-- Alege o optiune --</option>
            <option value="nume">Nume</option>
            <option value="clasa">Clasa</option>
            <option value="rasa">Rasa</option>
        </select>
        </form>
        </div>
    );
}

export default Criteriu;