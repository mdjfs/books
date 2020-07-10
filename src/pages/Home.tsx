import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon } from '@ionic/react';
import React from 'react';
import {PresentationCard} from '../components/PresentationCard';
import './Home.css';
import { logIn, fingerPrint} from 'ionicons/icons';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
        <IonButtons slot="start">
              <IonButton>
                <IonIcon color="dark" slot="icon-only" icon={logIn} ></IonIcon>
              </IonButton>
            </IonButtons>
            <IonButtons slot="primary">
              <IonButton>
                <IonIcon color="secondary" slot="icon-only" icon={fingerPrint}></IonIcon>
              </IonButton>
            </IonButtons>
          <IonTitle>AudioBook's</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle>AudioBook's</IonTitle>
          </IonToolbar>
        </IonHeader>
        <PresentationCard />
      </IonContent>
    </IonPage>
  );
};

export default Home;
