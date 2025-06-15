import { useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './home.css';


const Home= () => {

    const [state, setState] = useState(false)
    let navigate = useNavigate()
    async function checkvalid(){
        await axios.post('http://37.59.112.35:3001/authorize', {
            auth: sessionStorage.getItem('auth'),
          })
          .then(function (response) {
            if(response.data == 'success'){
                setState(true)
            }
            else{
                setState(false)
            }
          })
          .catch(function (error) {
          });
    }

    useEffect(() =>{
        checkvalid()
    },[])


    if(state){
        return (
        <>
        <div id='navbar'><img className="logo" src='/logo.png'></img></div>
            <div id='bodydivhome'>
                <div id="welcomediv">
                    <h1>Welcome Back User {sessionStorage.getItem('username')}</h1>
                </div>
                <div id="homelist">
                    <div id="browse" className="listo"><h1>Browse Movies</h1></div>
                    <div id="continue" className="listo"><h1>Continue</h1></div>
                    <div id="rooms" className="listo"><h1>My Rooms</h1>

                    </div>
                </div>
            </div>
        </>
    )
    } else{
        return (
        <>
        <div>
            <h1>Unauthorized Access</h1>
            </div>
        </>
    )
    }
    
  };
  
  export default Home;