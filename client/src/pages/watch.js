

import { useLocation} from "react-router-dom";
import { useState, useEffect} from 'react'
import videojs from "video.js";
import React from "react";
import axios from 'axios';
import VideoJS from "./video.js";
import './watch.css';

const Watch= () => {
    const playerRef = React.useRef(null);
    const [state, setState] = useState(false)
    const [videos, setVideos] = useState(Array)
    const location = useLocation();

    const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [{
      src: "/videos/"+location.state+"/"+location.state+".mp4",
      type: "video/mp4"
    }]
  };

    const handlePlayerReady = (player) => {
        playerRef.current = player;

        // You can handle player events here, for example:
        player.on('waiting', () => {
        videojs.log('player is waiting');
        });

        player.on('dispose', () => {
        videojs.log('player will dispose');
        });
    };

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
            <div id='bodydivwatch'>
                <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
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
  
  export default Watch;