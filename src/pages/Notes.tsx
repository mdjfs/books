import { IonFab, IonFabButton, IonCard, IonItem, IonLabel, IonText, IonIcon, IonContent, IonHeader, IonPage, IonTitle, IonToolbar} from '@ionic/react';
import React from 'react';
import {Toolbar} from '../components/Toolbar';
import {Tab} from '../components/Tab';
import {help, add} from 'ionicons/icons';
import './Notes.css';
import * as Config from '../config/config';

const Notes: React.FC = () => {
  var auth = false;
  var notes = [];
  if(window.localStorage.getItem("data") !== null){
    auth = true;
    var user_data = JSON.parse(window.localStorage.getItem("data") as string);
    var myheaders = new Headers();
    myheaders.append("access-token", user_data.token);
    fetch(Config.API_ENDPOINT+"notes/getall",{
        headers: myheaders,
        method:"POST"
    }).then(response => response.json())
    .catch(error => console.log(error))
    .then(response => {
        if(response.message === "success"){
            if(window.localStorage.getItem("notes-"+user_data.id) !== JSON.stringify(response.result)){
                window.localStorage.setItem("notes-"+user_data.id, JSON.stringify(response.result));
                window.location.reload();
            }
        }
    })
    
    if(window.localStorage.getItem("notes-"+user_data.id) !== null){
        var data_notes = JSON.parse(window.localStorage.getItem("notes-"+user_data.id) as string);
        var keys = Object.keys(data_notes);
        for(var key of keys){
            var href = "note?id="+key;
            var title = data_notes[key].title;
            notes.push(<IonItem href={href}>
                            <IonLabel>{title}</IonLabel>
                       </IonItem>);
        }
    }
  }
  let addNote = function(event: React.MouseEvent){
    var user_data = JSON.parse(window.localStorage.getItem("data") as string);
    var myheaders = new Headers();
    myheaders.append("access-token", user_data.token);
    var form = new FormData();
    form.append("title","");
    form.append("description","");
    fetch(Config.API_ENDPOINT+"notes/add",{
        headers: myheaders,
        method:"POST",
        body: form
    }).then(response => response.json())
    .catch(error => console.log(error))
    .then(response => {
        if(response.message === "success"){
            var id = response.result;
            window.location.href = "note?id="+id;
        }
    })
  }
  return (
    <IonPage>
      <IonHeader>
        {auth && <Toolbar title="Mis Notas" mode="logout"/>}
        {!auth && <Toolbar title="Mis Notas" mode="full"/>}
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar >
            <IonTitle >Mis Notas</IonTitle>
          </IonToolbar>
        </IonHeader>
        {!auth && <div id="question"> 
            <IonIcon color="primary" className="help invert" icon={help}></IonIcon>
            <IonIcon color="primary" className="help" icon={help}></IonIcon><br/>
            <IonText>¿Te conozco? deberias <a className="contrast" href="register">Registrarte</a> o <a href="login">Ingresar</a> <br/>para anotar cosas</IonText>
        </div>}
        {auth && 

            <IonCard>
                {notes}
            </IonCard>
        }
        {auth && 
            <IonFab vertical="bottom" horizontal="end" slot="fixed">
                <IonFabButton onClick={addNote}>
                    <IonIcon icon={add} />
                </IonFabButton>
            </IonFab>
        }
      </IonContent>
      <Tab/>
    </IonPage>
  );
};

export default Notes;
