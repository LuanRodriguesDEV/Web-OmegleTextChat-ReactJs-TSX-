import React from 'react'
import './style.css'
import { IMessage } from '../../Interfaces/Interfaces'
export default function Message({me,item}: {me: boolean,item: IMessage}) {
    console.log(item.imageData)
    return (
      <div className={'main-message ' + (me ? 'me' : '')}>
        <div className="message-content">
            {item.isImage && 
                <img src={item.imageData ?? ''} alt="Imagem" />
            }
          <span>{item.description}</span>
          <span className="time">{item.createdAt.toString().substring(11,16)}</span>
        </div>
      </div>
    )
  }
