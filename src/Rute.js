import { Navigate, Route, Routes } from "react-router-dom";
import Criteriu from "./componente/Criteriu";
import Cauta from "./componente/Cauta";
import NotFound from "./componente/NotFount";

function Rute () 
{
  return(
    <>
    <Routes>
      <Route path="/" element={<Navigate to="/criteriu"/>} />
      <Route path="/criteriu" element={<Criteriu />} />
      <Route path="/cautare/:tip" element={<Cauta />}/>
      <Route path="/notfound" element={<NotFound/>}/>
      <Route path="*" element={<NotFound />} />
    </Routes>
    
    </>
  );
}

export default Rute;