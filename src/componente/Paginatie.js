import React from 'react';
import './Paginatie.css';
const Paginatie = ({ postariPePagina, postariTotale, paginare, paginaPrec, paginaCurenta, paginaUrm }) => {
   // const pageNumbers = [];
   // for (let i = 1; i <= Math.ceil(postariTotale / postariPePagina); i++) {
   //    pageNumbers.push(i);
   // }
   // console.log("pagenumbers.....",pageNumbers);
   // useEffect(() => {
   //    // Efectuează acțiuni după fiecare re-renderizare
   //    console.log('Componenta paginatie s-a re-renderizat!');
   //  }, [postariPePagina, postariTotale, paginare, paginaPrec, paginaCurenta, paginaUrm]);
   return (
      <div className="paginare_container">
         <ul className="lista_paginare">
            <li onClick={paginaPrec} className="page-number">
               Prev
            </li>
            {paginaCurenta !== 1 ? (<li onClick={paginaPrec} >{paginaCurenta - 1}</li>): null}
            
            <li className='active'>{paginaCurenta}</li>
            {paginaCurenta + 1 <= Math.ceil(postariTotale/postariPePagina) ? (<li onClick={paginaUrm}>{paginaCurenta + 1}</li>):null}
            {paginaCurenta + 2 <= Math.ceil(postariTotale/postariPePagina) ? (<li onClick={paginare}>{paginaCurenta + 2}</li>):null}
            <li onClick={paginaUrm} className="page-number">
               Next
            </li>
         </ul>
      </div>
   );
};
 
export default Paginatie;