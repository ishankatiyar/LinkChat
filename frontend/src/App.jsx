import Signup from './components/Signup';
import './App.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import HomePage from './components/HomePage';
import Login from './components/Login';
import { useEffect, useState } from 'react';
import {useSelector,useDispatch} from "react-redux";
import io from "socket.io-client";
import { setSocket } from './redux/socketSlice';
import { setOnlineUsers } from './redux/userSlice';
// import { BASE_URL } from '.';

const router = createBrowserRouter([
  {
    path:"/",
    element:<HomePage/>
  },
  {
    path:"/signup",
    element:<Signup/>
  },
  {
    path:"/login",
    element:<Login/>
  },

])

function App() { 
  const {authUser} = useSelector(store=>store.user);
  const {socket} = useSelector(store=>store.socket);
  const dispatch = useDispatch();

  useEffect(()=>{
    if(authUser){
      // create a new socket connection to your backend server (localhost:8080)
//       On the server side (Node.js/Express with Socket.IO), you could access it like:
// socket.handshake.query.userId
      const socketio = io(`http://localhost:8080`, {
          query:{
            userId:authUser._id
          }
      });
      dispatch(setSocket(socketio));   // Save this socket connection into Redux

      socketio?.on('getOnlineUsers', (onlineUsers)=>{
        dispatch(setOnlineUsers(onlineUsers))
      });

      // You set up a listener on the socket for a getOnlineUsers event.
      
      // When the server emits getOnlineUsers, it sends you the list of online users.
      
      // You dispatch an action setOnlineUsers(onlineUsers) to update your Redux store with the list.
      
      // Example:
      // Server emits:

      // socket.emit('getOnlineUsers', ['user1', 'user2']);




      
      return () => socketio.close();
    }else{
      if(socket){
        socket.close();
        dispatch(setSocket(null));
      }
    }

  },[authUser]);

  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <RouterProvider router={router}/>
    </div> 

  );
}

export default App;