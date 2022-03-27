import React from 'react'
import {useNavigate} from 'react-router-dom'


const Home = () => {

    let navigate = useNavigate();
    return (
        <div>
            Change to post page <button onClick={()=>{navigate("/post");}}>Change</button>
        </div>
    )
}

export default Home;