import React from 'react';
import SignalRContext from './SignalR/SignalRProvider';
import { ToastContainer } from 'react-toastify';
import Home from './Pages/Home/Home';
import UserProvider from './Context/UserContext';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import TextChat from './Pages/TextChat/TextChat';
import SignalRProvider from './SignalR/SignalRProvider';


function App() {
  return (
    <>
    <UserProvider>
      <BrowserRouter>
       <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/TextChat' element={<SignalRProvider><TextChat/></SignalRProvider>}/>
       </Routes>
      </BrowserRouter>
    </UserProvider>
    
    <ToastContainer/>
    </>
    
  );
}

export default App;
