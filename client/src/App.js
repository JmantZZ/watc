import './App.css';
import React, { useState, useEffect } from "react";
import ReactPlayer from 'react-player'

import io from 'socket.io-client'
import video from './meow.mp4'



const socket = io.connect("http://79.76.113.107:3001")

function App() {
  const [isPlaying, changePlaying] = useState(false);
  const sendMessage = () =>{
    socket.emit('play_state', {playing: isPlaying})
  }

  useEffect(()=>{
    socket.on("change_state", (data)=>{
      changePlaying(data.playing)
      console.log(data)
    })
  }, [socket])

  const readyfr = () =>{
    console.log('ready')
  }

  const togglePlaying = () =>{
    changePlaying(!isPlaying)
  }

  return (
    <div className="App">
      <input placeholder='input'></input>
      <ReactPlayer playing={isPlaying} url={video} onPlay={sendMessage} onPause={sendMessage} onReady={readyfr}></ReactPlayer>
      <button onClick={togglePlaying}>Play Video</button>
    </div>
  );
}

export default App;
