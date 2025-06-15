import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect} from 'react'
import axios from 'axios';
import './movie.css';
import { v4 as uuidv4 } from 'uuid';

const Movie= () => {
    const [text, setText] = useState(String)
    const [state, setState] = useState(false)
    const location = useLocation();
    let navigate = useNavigate()
    async function descriptionread(file){
            fetch(file)
            .then(function(response){
                setText(response.text())
            }).then(function (data) {
                console.log(data);
            })
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
        descriptionread('/videos/'+location.state+'/'+'description.txt')
        console.log(location.state)
    },[])


    if(state){
        return (
        <>
        <div id='navbar'><img className="logo" src='/logo.png'></img></div>
            <div id='bodydivmovie'>
                <h1>{location.state}</h1>
                <div id="moviediv">
                <img id="movieimg" src={'/videos/'+location.state+'/'+'preview.png'}></img>
                </div>
                <div id="descriptiondiv">
                <p id="descriptionp">{text}</p>
                </div>
                <div id="buttondivmovie">
                    <button className="moviebuttons" onClick={() =>{navigate("/watch/"+location.state, {state: location.state})}}>Watch Now</button>
                    <button className="moviebuttons" onClick={() =>{navigate("/room/"+uuidv4(), {state: location.state})}}>Launch Room</button>
                        <form>
                            <input id='roomidinput'></input>
                            <button onClick={()=>{navigate("/room/"+document.getElementById('roomidinput').value+"/", {state: location.state})}}>Join Room</button>
                        </form>
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
  
  export default Movie;