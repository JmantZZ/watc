
import { useLocation} from "react-router-dom";
import { useState, useEffect} from 'react'
import videojs from "video.js";
import React from "react";
import axios from 'axios';
import VideoJS1 from "./video1.js";
import './room.css';
import socketIO from 'socket.io-client';

const Room= () => {
    const socket = socketIO.connect('http://79.76.113.107:3001/');

    const playerRef = React.useRef(null);
    const [state, setState] = useState(false)
    const location = useLocation();

    const videoJsOptions = {
    autoplay: false,
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
        
        player.on('play', () => {
            socket.emit('play_video', [location.pathname.slice(6), player.currentTime()])
        })

        player.on('pause', () => {
            socket.emit('pause_video', [location.pathname.slice(6), player.currentTime()])
        })



    };

    async function checkvalid(){
        await axios.post('http://79.76.113.107:3001/authorize', {
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
        console.log(location.state)
        checkvalid()
        socket.emit('room_id', location.pathname.slice(6))
        socket.on('event_video_play', (currenttime) =>{
            console.log('play')
            playerRef.current.currentTime(currenttime)
            playerRef.current.play()
        })

        socket.on('event_video_pause', (currenttime) =>{
            playerRef.current.currentTime(currenttime)
            playerRef.current.pause()
        })


    },[])

    


    if(state){
        return (
        <>
        <div id='navbar'><img className="logo" src='/logo.png'></img></div>
            <div id='bodydivwatch'>
                <VideoJS1 options={videoJsOptions} onReady={handlePlayerReady} />
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
  
  export default Room;