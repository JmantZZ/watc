
import { useNavigate } from "react-router-dom";
import { useState, useEffect} from 'react'
import axios from 'axios';
import './browse.css';


const Browse= () => {
    const [state, setState] = useState(false)
    const [videos, setVideos] = useState(Array)
    let navigate = useNavigate()


    async function getvideos(){
        await axios.post('http://37.59.112.35:3001/videolist', {
            auth: sessionStorage.getItem('auth'),
          })
          .then(function (response) {
            console.log(response.data)
            setVideos(response.data)
          })
          .catch(function (error) {
          });
    }

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
        getvideos()
    },[])


    if(state){
        return (
        <>
        <div id='navbar'><img className="logo" src='/logo.png'></img></div>
            <div id='bodydivbrowse'>
                {videos.map(item =>
                    <div className="imgdiv" onClick={() => {navigate("/movie/"+item,{state: item})}}><img src={"/videos/"+item+"/preview.png"} className="browseimg"></img></div>
                 )}
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
  
  export default Browse;