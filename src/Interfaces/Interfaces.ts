export interface IChannel{
    chatID: string;
    users: IUser[];
    messages: IMessage[] | null;
}
export interface IUser{
    connectionId: string;
    userName: string;
}
export interface IMessage{
    chatID: string | undefined;
    userName: string;
    description: string;
    createdAt: Date;
    isImage : boolean;
    imageData: string | null;
}
export interface IMessageINVOKE{
    ChatID: string | undefined;
    connectionId: string | null;
    userName: string;
    description: string;
    imageData?: string | null;
}
export interface IMessageImageINVOKE{
    ChatID: string | undefined;
    connectionId: string | null;
    userName: string;
    imageData: string | null;
}
export interface ISignalRContext{
    inChanel?: IChannel;
    searchChat: boolean;
    connectionId: string | null;
    StartSearchINVOKE(): void;
    StopChatINVOKE(): void;
    StopSearchINVOKE(): void;
    SendMessageINVOKE(message: IMessageINVOKE): void;
    SendMessageImageINVOKE(message: IMessageImageINVOKE): void;
}
export interface IUserContext{
    userName: string;
    ChangeUserName(name: string): void;
}
