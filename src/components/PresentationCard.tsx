import React from 'react';
import './PresentationCard.css';

import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonButton} from '@ionic/react';


 export const PresentationCard: React.FC = () => {
  return (
    <IonCard>
        <img src="assets/fancyview.svg" />
        <IonCardHeader>
        <IonCardSubtitle>¡Organizate!</IonCardSubtitle>
        <IonCardTitle>¿Qué esperas para empezar a anotar cosas?</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
            <IonButton color="primary">Crea o Edita</IonButton>
            <IonButton color="secondary">Ver</IonButton>
        </IonCardContent>
    </IonCard>
  );
};