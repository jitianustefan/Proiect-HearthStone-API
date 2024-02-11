import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './Cauta.css';
import Paginatie from './Paginatie';
import Carte from './Carte';


const Cauta = () =>
{
    //Definire constante 
    const[nume, setNume] = useState("");
    const[criteriu, setCriteriu] = useState("");
    const[dateComplete, setDate] = useState([]);
    const[eroare, setEroare] = useState([]);
    const[dateFiltrate, setDateFiltrate] = useState([]);
    const {tip} = useParams();
    const navigate = useNavigate();
    const [paginaCurenta, setPaginaCurenta] = useState(1);
    const [postariPePagina, setPostariPePagina] = useState("");

    //useEffect pentru a verifica dimensinea ferestrei
    const gesNrPostari = () => {
        if(window.innerWidth < 800)
        {
            //console.log("sunt in if pag@@@")
            setPostariPePagina(1);
        }
        else{
            //console.log("sun in if pt 3 img pe pagina")
            setPostariPePagina(3);
        }
    }
    useEffect(()=>{
        console.log("sunt in useEffectpt paginare afisare 1 ***")
        gesNrPostari();
        // Adăugare ascultător de evenimente la încărcarea componentei
        window.addEventListener('resize', gesNrPostari);
        // Eliminare ascultător de evenimente la demontarea componentei
        return () => {
            window.removeEventListener('resize', gesNrPostari);
        };
    },[]);


    //definesc variabilele pentru prima si ultima imagine din pagina curenta
    const indexUltimaimagine = paginaCurenta* postariPePagina;
    const indexPrimaImagine = indexUltimaimagine - postariPePagina;
    const postariCurente = dateFiltrate.slice(indexPrimaImagine,indexUltimaimagine);
    console.log("nr elemente: ", dateFiltrate.length);
    
    // functii care atunci cand sunt apelate schimba pagina 
    const paginare = () => {
        setPaginaCurenta(paginaCurenta+2);
     };
     
     const paginaPrec = () => {
        if (paginaCurenta !== 1) {
           setPaginaCurenta(paginaCurenta - 1);
        }
     };
   
     const paginaUrm = () => {
        if (paginaCurenta!== Math.ceil(dateFiltrate.length / postariPePagina)) {
           setPaginaCurenta(paginaCurenta + 1);
        }
     };
    //console.log("valoarea din use params",tip);

    // useEffect pentru a prelua intr-o alta variabila paramatrul din useParams de care am nevoie pentru a face cautarea
    // In acelasi timp verific daca valoarea din url este valida daca nu redirectionez catre pagina notfound
    useEffect(() =>{
        setCriteriu(tip);
        //console.log("Sunt in useEffect la setCriteriu pt params", criteriu);
        if(tip !== "nume" && tip !== "clasa" && tip !== "rasa"){ 
            console.log("Ai ales o ruta care nu exista");
            navigate('/notfound'); 
        }
    },[]);
    //console.log("valoarea din tip dupa use efect", criteriu);
    console.log("Date filtrate aduse din API: ",dateComplete);
    console.log("Date FILTRATE", dateFiltrate);

    // Filtrarea suplimentara pentru a reduce redundantele
    useEffect(() => {
        const cartiUnice = [];
        const cartiExistente = {};
        dateComplete.forEach((carte) => {
            const numeCarte = carte.name;
            const cardSet = carte.cardSet;
            console.log("Nume carte", numeCarte);
            //console.log("Carti de nume carte", cartiExistente['name']);
            //console.log("tip carte", tipCarte);
            console.log("sunt in harta");
            console.log("carti existente", cartiExistente);
            if(!cartiExistente[numeCarte])
            {   
                console.log("sunt in if");
                cartiUnice.push(carte); 
                cartiExistente[numeCarte] = {nume: numeCarte, cardSet: cardSet}           
            }
        });
        setDateFiltrate(cartiUnice); 
        setPaginaCurenta(1);
    },[dateComplete]);

    //Functia de cautare dupa nume
    async function cautare_nume(e){
        e.preventDefault();
        console.log("Valoare Nume:", nume);
        const options = {
            method: 'GET',
            url: `https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/search/${nume}`,
            //aici trebuie adaugate datele de conectare
          };
        try {
            const response = await axios.request(options);
            console.log("Date primite cerere: ",response.data);
            //setDate(response.data.filter(componenta=> componenta.img).slice(0,3));
            setDate(response.data.filter(componenta=> componenta.img && (componenta.type !== 'Hero') ));
            //curat_date();
            setEroare("");
            setNume("");
        } catch (error) {
            console.error(error);
            setDate([]);
            alert('Nu exista date pentru valoarea introdusa. Verifica criteriu de cautare!');
            setEroare('Nu exista date pentru valoarea introdusa. Verifica criteriu de cautare!');
            setNume("");
        }
    }

    //Functia de cautare dupa clasa

    async function cautare_clasa(e){
        e.preventDefault();
        console.log("Valoare Clasa:", nume);
        const options = {
            method: 'GET',
            url: `https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/classes/${nume}`,
            //aici trebuie adaugate datele de conectare
          };
          
          try {
              const response = await axios.request(options);
              console.log("Date primite cerere: ",response.data);
              //setDate(response.data.filter(componenta=> componenta.img).slice(0,3));
              setDate(response.data.filter(componenta=> componenta.img && (componenta.type !== 'Hero')));
              setEroare("");
              setNume("");
          } catch (error) {
              console.error(error);
              alert('Nu exista date pentru valoarea introdusa. Verifica criteriu de cautare!')
              setEroare('Nu exista date pentru valoarea introdusa. Verifica criteriu de cautare!')
              setDate([]);
              setNume("");
          }
    }

    //Functia de cautare dupa rasa

    async function cautare_rasa(e){
        e.preventDefault();
        console.log("Valoare Rasa:", nume);
        const options = {
            method: 'GET',
            url: `https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/races/${nume}`,
            //aici trebuie adaugate datele de conectare
          };
          
          try {
              const response = await axios.request(options);
              console.log("Date primite cerere_raza: ",response.data);
            //   setDate(response.data.filter(componenta=> componenta.img).slice(0,3));
              setDate(response.data.filter(componenta=> componenta.img && (componenta.type !== 'Hero')));
              setEroare("");
              setNume("");

          } catch (error) {
              console.error(error);
              alert('Nu exista date pentru valoarea introdusa. Verifica criteriu de cautare!')
              setEroare('Nu exista date pentru valoarea introdusa. Verifica criteriu de cautare!')
              setDate([]);
              setNume("");
          }
    }

    //functia care schimba url-ul si valoarea criteriului de cautare la schimbarea valorii din select
    function potiCauta(e)
    {
        setCriteriu(e.target.value);
        navigate(`/cautare/${e.target.value}`);
    }
    
    
    // afisarea in pagina si apelul de functii 
    return(
        <div className='app_container'>
            
            <div className='app_formular'>
                <h2>Aceasta este componenta de cautare {criteriu}</h2>
                <form>
                    <input className="input_cauta" type='text' id='caut' name='caut' value={nume} onChange={e => setNume(e.target.value)}/>
                    <select className='select_cauta' id="criteriu" value={criteriu} name="criteriu" onChange={potiCauta}>
                        <option value="nume">Nume</option>
                        <option value="clasa">Clasa</option>
                        <option value="rasa">Rasa</option>
                    </select>
                    {/* afisez butonul de cautare cu un nume dinamic, valoarea acestuia se schimba in functie de valoarea din select */}
                    {criteriu === 'nume' ? (<button className='buton' onClick={cautare_nume}>Cauta nume!</button>): null}
                    {criteriu === 'clasa' ? (<button className='buton' onClick={cautare_clasa}>Cauta clasa!</button>): null}
                    {criteriu === 'rasa' ? (<button className='buton' onClick={cautare_rasa}>Cauta rasa!</button>): null}
                    
                </form>
            </div>
            <div className='afisare_info'>
                {/* mapez datele din variabila in care le-am salvat si le afisez */}
                {
                    postariCurente.map((dateT, index) => {
                        return (
                            <Carte key={index} dateT={dateT} />
                            // <div className='box_info'>
                            //     {dateT["img"] !=null ? (<>
                            //     <img 
                            //     onMouseEnter={() => setHoverImg(1)}
                            //     onMouseLeave={() => setHoverImg(null)} 
                            //     src={dateT["img"]} alt={dateT["cardId"]} >
                            //     </img>
                            //     {hoverImg !=null ? (<img src={dateT["imgGold"]} alt={dateT["cardId"]}></img>):null}
                            //     <p>Nume: {dateT["name"]}</p>
                            //     <p>Clasa jucator: {dateT["playerClass"]}</p>
                            //     <p>Tip carte: {dateT["type"]}</p>
                            //     {/* <p>{dateT["text"]}</p> */}
                            //     </>
                            //     ): null}
                                
                            //</div>

                            // Am fost nevoit de creeez o componenta separata pentru afisarea cartilor pentru ca aveam nevoie sa iau 
                            //starea fiecarei imagini in parte pentru a afisa imgGold cand fac hover
                            
                        );
                    })
                }
                     
            </div>
            
            <div className='paginare_eroare'>
                {dateFiltrate.length !==  0 ? (
                <Paginatie
                  postariPePagina={postariPePagina}
                  postariTotale={dateFiltrate.length}
                  paginare= {paginare}
                  paginaPrec={paginaPrec}
                  paginaCurenta = {paginaCurenta}
                  paginaUrm={paginaUrm}
                />
                ): null}

                {/* afisez un mesaj de eroare in cazul in care nu exista valori in urma cautarii sau cautarea se face gresit */}
                <h2 style={{textAlign: "center"}}>{eroare}</h2>
            </div>
        </div>
    );
}

export default Cauta;
