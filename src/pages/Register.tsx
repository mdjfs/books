import { IonSpinner, IonButton, IonItem, IonInput, IonLabel, IonText, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import './Register.css';
import {Toolbar} from '../components/Toolbar';
import {Tab} from '../components/Tab';
import * as Config from '../config/config';

const Register: React.FC = () => {
    function displayError(message: string){
        var error = document.getElementById("error") as HTMLIonTextElement;
        var label = error.parentElement as HTMLIonLabelElement;
        label.hidden = false;
        error.innerText = message;
    }

    async function sendForm(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault();
        var formelement = event.target as HTMLFormElement;
        formelement.hidden = true;
        var load = document.getElementById("load") as HTMLDivElement;
        load.hidden = false;
        const form = new FormData(formelement);
        const options = {
            method: "POST",
            body: form
        }
        try{
          var response = await fetch(Config.API_ENDPOINT+"register", options);
          var json  = await response.json();
          if(json.message === "error"){
            load.hidden = true;
            formelement.hidden = false;
            displayError(json.error);
          }
          else{
            var _response = await fetch(Config.API_ENDPOINT+"login", options);
            var _json  = await _response.json();
            if(_json.message === "error"){
              load.hidden = true;
              formelement.hidden = false;
              displayError(_json.error);
            }
            else{
              window.localStorage.setItem("data",JSON.stringify(_json.result));
              window.location.href = "home";
            }
          }
        }
        catch(error){
          load.hidden = true;
          formelement.hidden = false;
          displayError(error);
        }
    }
  return (
    <IonPage>
      <IonHeader>
        <Toolbar title="Book's Registro" mode="login"/>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle>Registro</IonTitle>
          </IonToolbar>
        </IonHeader>
        <form onSubmit={sendForm}>
                <IonItem>
                    <IonLabel position="stacked">Username <IonText color="danger">*</IonText></IonLabel>
                    <IonInput name="username" type="text" placeholder="Username" required></IonInput>
                </IonItem>
                <IonItem>
                    <IonLabel position="stacked">Email <IonText color="danger">*</IonText></IonLabel>
                    <IonInput name="email" type="email" placeholder="Email" required></IonInput>
                </IonItem>
                <IonItem>
                    <IonLabel position="stacked">Password <IonText color="danger">*</IonText></IonLabel>
                    <IonInput name="password" type="password" placeholder="Password" required></IonInput>
                </IonItem>
                <IonItem hidden>
                  <IonText id="error" color="danger"></IonText>
                </IonItem>
                <IonItem>
                    <IonButton expand="block" color="primary" type="submit"> Registrate </IonButton>
                </IonItem>
        </form>
        <div id="load" className="spinnerCenter" hidden>
          <IonSpinner name="crescent" />
        </div>
      </IonContent>
      <Tab/>
    </IonPage>
  );
};

export default Register;