
import Singlepost from "../Component/Singlepost";
import Sidebar from "../Component/sidebar";
import "../StyleSheet/singlepost.css"
function Single({username}) {
    return ( 
        <>
        {console.log(username)}
        <div className="single">
        <Singlepost user={username}/>
        <Sidebar />
        </div>
        </>
        
      
     );
}

export default Single;