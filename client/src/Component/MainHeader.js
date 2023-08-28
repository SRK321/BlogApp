import { Outlet } from "react-router-dom";
import Topbar from "./Topbar";

function MainHeader() {
    return ( 
        <>  
        <Topbar/>
        <Outlet />
        </>
     );
}

export default MainHeader;