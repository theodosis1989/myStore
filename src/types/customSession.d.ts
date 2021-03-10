import { IUser } from './types';

declare module 'express-session' {
  export interface SessionData {
    user: IUser
    loggedIn: boolean;
    cookieSid: string;
  }
}