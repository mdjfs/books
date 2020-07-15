import { IonSpinner, IonItem, IonLabel, IonText, IonButton, IonInput, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import './Login.css';
import {Toolbar} from '../components/Toolbar';
import {Tab} from '../components/Tab';
import * as Config from '../config/config';

const Login: React.FC = () => {
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
        var response = await fetch(Config.API_ENDPOINT+"login", options);
        var json  = await response.json();
        if(json.message === "error"){
          load.hidden = true;
          formelement.hidden = false;
          displayError(json.error);
        }
        else{
            window.localStorage.setItem("data",JSON.stringify(json.result));
            window.location.href = "home";
        }
      }
      catch(error){
        displayError(error);
      }
  }
  return (
    <IonPage>
      <IonHeader>
        <Toolbar title="Book's Login" mode="register"/>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle>Login</IonTitle>
          </IonToolbar>
        </IonHeader>
        <form onSubmit={sendForm}>
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
                    <IonButton expand="block" color="primary" type="submit"> Login </IonButton>
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

export default Login;