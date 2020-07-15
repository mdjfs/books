import React from 'react';
import './PresentationCard.css';

import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonButton} from '@ionic/react';


 export const PresentationCard: React.FC = () => {
  return (
    <IonCard>
        <img src="assets/fancyview.svg" alt="hello" />
        <IonCardHeader>
        <IonCardSubtitle>¡Organizate!</IonCardSubtitle>
        <IonCardTitle>¿Qué esperas para empezar a anotar cosas?</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
            <IonButton color="primary" expand="block" >Notas</IonButton>
        </IonCardContent>
    </IonCard>
  );
};