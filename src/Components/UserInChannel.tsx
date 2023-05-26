import React from 'react'
import './style.css'

export default function UserInChannel({name}: {name: string}) {
  return (
    <div className='main-userinchannel'>
      <span>{name}</span>
    </div>
  )
}
