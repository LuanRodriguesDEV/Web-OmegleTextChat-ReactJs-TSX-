import React, { useEffect, useRef, useState,createContext, useContext } from 'react'
import * as SignalR from '@microsoft/signalr'
import { Notification } from '../Toastfy/Notification';
import { IChannel, IMessage, IMessageINVOKE, IMessageImageINVOKE, ISignalRContext, IUserContext } from '../Interfaces/Interfaces';
import { UserContext } from '../Context/UserContext';

export const SignalRContext = createContext<ISignalRContext>({} as ISignalRContext);

export default function SignalRProvider({ children }: { children: React.ReactNode }) {
    const {userName} = useContext<IUserContext>(UserContext);
    const [hub,setHub] = useState<SignalR.HubConnection | null>(null);
    const [connectionId, setConnectionId] = useState<string | null>(null);
    const [inChanel,setInChanel] = useState<IChannel | undefined>(undefined);
    const [searchChat,setSearchChat] = useState(false);
  
    useEffect(() => {
        const connection = new SignalR.HubConnectionBuilder()
          .withUrl('http://localhost:5198/TextHub',{
            skipNegotiation: true,
            transport: SignalR.HttpTransportType.WebSockets,    
        })
          .build();  
        connection.start()
          .then(() => {
            connection.on('Connected', (connectionId: string) => {
              setConnectionId(connectionId);
              setHub(connection);
              Notification.success("Conectado com Sucesso");
            });
            
          })
          .catch((error) => {
            console.error('Erro ao conectar ao SignalR:', error);
          });
          connection.on('StartChat', (newGroup: IChannel) => {
            setInChanel(newGroup);
            Notification.success(`Chat Iniciado com: \n ${newGroup.users[0].userName} \n ${newGroup.users[1].userName}`)
            setSearchChat(false)
          });
          connection.on('StopChat', () => {
            setInChanel(undefined);
            setSearchChat(false)
          });
          connection.on('StopSearch', () => {
            setSearchChat(false)
          });
          connection.on('SendMessage', (message: IMessage) => {
            setInChanel(prevState => {
              if (prevState) {
                const updatedMessages = prevState.messages ? [...prevState.messages, message] : [message];
                return { ...prevState, messages: updatedMessages };
              }
              return prevState;
            });
          });
        return () => {
          connection.stop();
        };
      }, []);
      const StartSearchINVOKE = () => {
        hub?.invoke("SearchChat", userName);
        setSearchChat(true)
      }
      const StopChatINVOKE = () => {
        hub?.invoke("StopChat");
      }
      const StopSearchINVOKE = () => {
        hub?.invoke("StopSearch");
      }
      const SendMessageINVOKE = (message: IMessageINVOKE) => {
        hub?.invoke("SendMessage",message);
      }
      const SendMessageImageINVOKE = (message: IMessageImageINVOKE) => {
        hub?.invoke("SendImage",message);
      }
  return (     
     
    <SignalRContext.Provider value={{inChanel,searchChat,connectionId,StartSearchINVOKE,StopChatINVOKE,StopSearchINVOKE,SendMessageINVOKE,SendMessageImageINVOKE}}>
        {children}
    </SignalRContext.Provider>
    
  )
}
