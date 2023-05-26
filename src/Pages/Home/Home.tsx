import React, { useContext, useState } from 'react'
import './style.css'
import { IUserContext } from '../../Interfaces/Interfaces';
import { UserContext } from '../../Context/UserContext';
import {NavLink} from 'react-router-dom'
export default function Home() {
    const {ChangeUserName,userName} = useContext<IUserContext>(UserContext);
  return (
    <div className='main-home'>
      <div className="middle-form">
        <h1>TalkMe</h1>
        <div className="input-content">
            <input onChange={(e) => ChangeUserName(e.target.value)} value={userName} type="text" placeholder='Nome de Usuario' autoComplete='@220' required/>
            <div className="bottom-indicator"/>
        </div>
        
        <NavLink to='/TextChat' className="button">
            <span>Start TEXT Chat</span>
        </NavLink>
        <div className="button disabled">
            <span>Start VIDEO Chat(DISABLED)</span>
        </div>
      </div>
      
    </div>
  )
}
