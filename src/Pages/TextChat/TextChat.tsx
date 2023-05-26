import React, { useContext,useRef,useState ,useEffect} from 'react'
import './style.css'
import { IMessageINVOKE, IMessageImageINVOKE, ISignalRContext, IUserContext } from '../../Interfaces/Interfaces'
import { SignalRContext } from '../../SignalR/SignalRProvider'
import {FiUsers} from 'react-icons/fi'
import {BsPlayFill,BsFillStopFill ,BsFillPauseFill} from 'react-icons/bs'
import {AiFillFileImage} from 'react-icons/ai'
import {IoSend} from 'react-icons/io5'
import UserInChannel from '../../Components/UserInChannel';
import { UserContext } from '../../Context/UserContext'
import Message from '../../Components/Message/Message'
import { Notification } from '../../Toastfy/Notification'

export default function TextChat() {
  const {inChanel,StartSearchINVOKE,StopChatINVOKE,StopSearchINVOKE,SendMessageINVOKE,SendMessageImageINVOKE,connectionId,searchChat} = useContext<ISignalRContext>(SignalRContext);
  const {userName} = useContext<IUserContext>(UserContext);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const [messageInput,setMessageInput] = useState("");
  const [isScrollAtBottom, setIsScrollAtBottom] = useState(true);

  const HandleChangeStatus = () =>{
    if(searchChat === false && inChanel === undefined){
      StartSearchINVOKE()
    }else if(inChanel !== undefined){
      StopChatINVOKE()
    }else {
      StopSearchINVOKE()
    }
  }
  const handleDivClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  useEffect(() => {
    const scrollToBottom = () => {
      if (chatRef.current && isScrollAtBottom) {
        chatRef.current.scrollTop = chatRef.current.scrollHeight;
      }
    };
    scrollToBottom();
  }, [inChanel?.messages, isScrollAtBottom]);

  const handleScroll = () => {
    if (chatRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = chatRef.current;
      setIsScrollAtBottom(scrollTop + clientHeight === scrollHeight);
    }
  };
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
  
    if (file) {
      const allowedExtensions = ['image/jpeg', 'image/png', 'image/gif'];
      const { type } = file;
  
      if (allowedExtensions.includes(type)) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result as string;
          HandleSendImage(base64String);
        };
  
        reader.readAsDataURL(file);
      } else {
        Notification.error('Selecione um arquivo JPEG, PNG ou GIF válido.');
      }
    }
  };
  const HandleSendMessage = () =>{
    const messageToSend: IMessageINVOKE = {
      ChatID: inChanel?.chatID,
      connectionId: connectionId,
      userName: userName,
      description: messageInput
    };
    SendMessageINVOKE(messageToSend);
    setMessageInput("")
  }
  const HandleSendImage = (image: string) =>{
    
    const messageToSend: IMessageImageINVOKE = {
      ChatID: inChanel?.chatID,
      connectionId: connectionId,
      userName: userName,
      imageData: image,
    };
    SendMessageImageINVOKE(messageToSend);
    setMessageInput("")
  }
  const InputDisabled = (): boolean => {
    return inChanel === undefined || inChanel === null ? true : false;
  }
  const SendButtonDisabled = (): string => {
    const regex = /[^\s]/;
    if(!InputDisabled() && regex.test(messageInput))
        return ""
    else 
        return "disabled"
  }
  const SendImageDisabled = (): string => {
    const regex = /[^\s]/;
    if(!InputDisabled())
        return ""
    else 
        return "disabled"
  }
  return (
    <div className='main-textchat'>
      <div className="header">
      </div>
      <div className="middle">
          <div className="users-channel">
            <div className="left">
              <div className="icon-content">
                <FiUsers className='icon'/>
              </div>
              {inChanel === undefined && <span>Em Nenhum Chat</span>}
              {inChanel?.users.map(e => (
                <UserInChannel name={e.userName} key={e.connectionId}/>
              ))}
            </div>
            <div className="button" onClick={() => HandleChangeStatus()}>
              {inChanel ? <BsFillStopFill className='icon'/> : searchChat ? <BsFillPauseFill className='icon'/> : <BsPlayFill className='icon'/>}   
              </div>
          </div>
          <div className="chat" ref={chatRef} onScroll={handleScroll}>
            {inChanel?.messages?.map((e, index) => (
              <Message me={e.chatID === connectionId ? true : false} key={index} item={e} />
            ))}
          </div>
          <div className="input-button">
            <div className={"button "+ (SendImageDisabled())} onClick={handleDivClick}>
                <AiFillFileImage className='icon'/>
            </div>
            <input onChange={(e) => setMessageInput(e.target.value)} value={messageInput} type="text" placeholder='Escreva Sua Mensagem...' disabled={InputDisabled()}/>
            <input 
              type="file" 
              onChange={handleImageUpload} 
              accept="image/jpeg, image/png"
              capture={false}
              id="fileInput"
              ref={fileInputRef} 
              style={{display:"none" }}
            />
            <div className={"button "+ (SendButtonDisabled())} onClick={() => HandleSendMessage()}>
              <IoSend className='icon'/>
            </div>
          </div>
        </div>
      </div>
    
  )
}
