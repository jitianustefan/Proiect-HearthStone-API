import { useState } from "react";
import "./Cauta.css";
const Carte =({dateT}) => {

const [hoverImg, setHoverImg] = useState(null);

  return (
    <div className="container_afisare">
      {dateT["img"] != null ? (
        < >
        <div className='box_info'
            onMouseEnter={() => setHoverImg(true)}
            onMouseLeave={() => setHoverImg(false)}>
          {dateT["imgGold"] && hoverImg ? 
          <img 
          className="img_hover" 
          src={dateT["imgGold"]} 
          alt={dateT["cardId"]} 
          /> 
          : 
          <img  
            className="img_orig"
            src={dateT["img"]}
            alt={dateT["cardId"]}
          />}
          </div>
          <div className="info_carte">
          <p><b>Nume:</b> {dateT["name"]}</p>
          <p><b>Clasa jucator:</b> {dateT["playerClass"]}</p>
          <p><b>Tip carte:</b>{dateT["type"]}</p>
          </div>
        </>
      ) : null}
    </div>
  );

}

export default Carte;