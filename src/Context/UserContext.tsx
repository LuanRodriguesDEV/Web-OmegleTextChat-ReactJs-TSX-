import React, { createContext } from 'react'

import { IUserContext } from '../Interfaces/Interfaces';
import { Notification } from '../Toastfy/Notification';

export const UserContext = createContext<IUserContext>({} as IUserContext);

export default function UserProvider({ children }: { children: React.ReactNode }) {
  const [userName,setUserName] = React.useState("");
  const ChangeUserName = (name: string) => {
    setUserName(name);
  }
  return (
    <UserContext.Provider value={{userName,ChangeUserName}}>
      {children}
    </UserContext.Provider>
  )
}
