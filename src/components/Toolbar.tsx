import React from 'react';
import './Toolbar.css';

import { IonTitle, IonToolbar, IonButtons, IonIcon, IonButton} from '@ionic/react';

import { logIn, fingerPrint, logOut} from 'ionicons/icons';

interface Props {
    title: string;
    mode: string;
}

 export const Toolbar: React.FC<Props> = (props:Props) => {
    function logout(){
         window.localStorage.removeItem("data");
         window.location.href = "home";
     }
    const Login = (<IonButtons slot="start">
                        <IonButton href="login">
                            <IonIcon color="dark" slot="icon-only" icon={logIn} ></IonIcon>
                        </IonButton>
                    </IonButtons>);
    const Register = (<IonButtons slot="primary">
                        <IonButton href="register">
                            <IonIcon color="secondary" slot="icon-only" icon={fingerPrint} ></IonIcon>
                        </IonButton>
                    </IonButtons>);               
    const Logout = (<IonButtons slot="primary">
                        <IonButton onClick={logout}>
                            <IonIcon color="secondary" slot="icon-only" icon={logOut} ></IonIcon>
                        </IonButton>
                    </IonButtons>);
    if(props.mode === "full"){
        return (
            <IonToolbar>
                {Login}
                {Register}
                <IonTitle>{props.title}</IonTitle>
            </IonToolbar>
          );
    }
    else if(props.mode === "register"){
        return (
            <IonToolbar>
                {Register}
                <IonTitle>{props.title}</IonTitle>
            </IonToolbar>
          );
    }
    else if(props.mode === "login"){
        return (
            <IonToolbar>
                {Login}
                <IonTitle>{props.title}</IonTitle>
            </IonToolbar>
          );
    }
    else if(props.mode === "logout"){
        return (
            <IonToolbar>
                {Logout}
                <IonTitle>{props.title}</IonTitle>
            </IonToolbar>
          );
    }
    else{
        return (
            <IonToolbar>
                <IonTitle>{props.title}</IonTitle>
            </IonToolbar>
          );
    }

};