import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar} from '@ionic/react';
import React from 'react';
import {PresentationCard} from '../components/PresentationCard';
import {Toolbar} from '../components/Toolbar';
import './Home.css';

const Home: React.FC = () => {
  var toolbar = null;
  if(window.localStorage.getItem("data") != null){
    var string = window.localStorage.getItem("data") as string; 
    var cachejson = JSON.parse(string);
    var text = "Bienvenido "+cachejson.username;
    toolbar = <Toolbar title={text} mode="logout" />
  }
  else{
    toolbar = <Toolbar title="Book's Home" mode="full"/>
  }
  return (
    <IonPage>
      <IonHeader>
        {toolbar}
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar >
            <IonTitle >Book's</IonTitle>
          </IonToolbar>
        </IonHeader>
        <PresentationCard />
      </IonContent>
    </IonPage>
  );
};

export default Home;
