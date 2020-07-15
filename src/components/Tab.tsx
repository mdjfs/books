import React from 'react';
import './Tab.css';

import { IonTabBar, IonTabButton, IonLabel, IonIcon} from '@ionic/react';

import {home} from 'ionicons/icons';


export const Tab: React.FC = () => {
    function gohome(event: React.MouseEvent){
        event.preventDefault();
        window.location.href = "home";
     }
    return (<IonTabBar slot="bottom">
                <IonTabButton onClick={gohome}>
                <IonIcon icon={home} />
                <IonLabel>Home</IonLabel>
                </IonTabButton>
            </IonTabBar>);
};