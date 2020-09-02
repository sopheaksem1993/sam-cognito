import { Injectable } from '@angular/core';
import Auth  from '@aws-amplify/auth';
import { Hub } from '@aws-amplify/core';
import { Subject } from 'rxjs';
import { CognitoUser } from 'amazon-cognito-identity-js';
import {User} from "@models/user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public loggedIn: boolean;
  private _authState: Subject<CognitoUser|any> = new Subject<CognitoUser|any>();

  constructor() {
    Hub.listen('auth',(data) => {
      const { channel, payload } = data;
      if (channel === 'auth') {
        this._authState.next(payload.event);
      }
    });
  }

  signUp(user: User): Promise<CognitoUser|any> {
    return Auth.signUp({
      "username": user.email,
      "password": user.password,
      "attributes": {
        "email": user.email,
        "name": user.userName,
        "phone_number": user.phoneNumber
      }
    });
  }

  signIn (email: string, password: string){
    return new Promise((resolve,reject) => {
      Auth.signIn(email,password)
        .then((user: CognitoUser|any) => {
          this.loggedIn = true;
          resolve(user);
        }).catch((error: any) => reject(error));
    });
  }

  signOut(): Promise<any> {
    return Auth.signOut()
      .then(() => this.loggedIn = false)
  }
}
