import { useState, useEffect} from 'react'
import axios from 'axios';
import './admin.css';


const Admin= () => {

    const [state, setState] = useState(false)

    async function checkvalid(){
        await axios.post('http://79.76.113.107:3001/admin_authorize', {
            auth: sessionStorage.getItem('auth'),
            id: sessionStorage.getItem('user_id')
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


    async function addmovie(){
        
    }

    useEffect(() =>{
        checkvalid()
    },[])


    if(state){
        return (
        <>
        <div id='navbar'><img className="logo" src='/logo.png'></img></div>
            <button onClick={addmovie()}>Add Movie</button>
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
  
  export default Admin;