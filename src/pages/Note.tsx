import { IonFabButton, IonFab, IonIcon, IonText, IonTextarea, IonItem, IonContent, IonHeader, IonPage, IonTitle, IonToolbar} from '@ionic/react';
import React from 'react';
import {Toolbar} from '../components/Toolbar';
import {Tab} from '../components/Tab';
import './Note.css';
import * as Config from '../config/config';
import { save, close } from 'ionicons/icons';


const Note: React.FC = () => {
  var auth = false;
  var id = 0;
  var user_data = null;

  var title = "";
  var description = "";
  if(window.localStorage.getItem("data") != null){
    auth = true;
    user_data = JSON.parse(window.localStorage.getItem("data") as string);
    var url_data = window.location.href.split("/");
    var last_data = url_data[url_data.length - 1];
    if(last_data.includes("?")){
        var keys_and_pars = last_data.split("?")[1].split("&&");
        for(var key_and_par of keys_and_pars){
            var key = key_and_par.split("=")[0] as string;
            var value = key_and_par.split("=")[1] as string;
            if(key === "id")
                id = parseInt(value);
        }
    }
  }
  if(auth && id !== 0){
    if(window.localStorage.getItem("note-"+id) == null){
        var form = new FormData();
        form.append("id",id.toString());
        var myheaders = new Headers();
        myheaders.append("access-token", user_data.token);
        fetch(Config.API_ENDPOINT+"notes/get",{
            headers: myheaders,
            method:"POST",
            body: form
        }).then(response => response.json())
        .catch(error => console.log(error))
        .then(response => {
            console.log(response);
            if(response.message === "success"){
                window.localStorage.setItem("note-"+id, JSON.stringify({
                    "title":response.result.title,
                    "description":response.result.description
                }));
                window.location.reload();
            }
        })
    }
    else{
        var data = JSON.parse(window.localStorage.getItem("note-"+id) as string);
        title = data.title;
        description = data.description;
    }
    let changeText = function(event: CustomEvent){
        var save = document.getElementById("save") as HTMLDivElement;
        save.hidden = false;
    }
    let updateText = function(event: React.MouseEvent){
        user_data = JSON.parse(window.localStorage.getItem("data") as string);
        var title = document.getElementById("title") as HTMLIonTextareaElement;
        var description = document.getElementById("description") as HTMLIonTextareaElement;
        var myheaders = new Headers();
        myheaders.append("access-token", user_data.token);
        var form = new FormData();
        form.append("title", title.value as string);
        form.append("description", description.value as string);
        form.append("id", id.toString());
        fetch(Config.API_ENDPOINT+"notes/update",{
            headers: myheaders,
            method:"POST",
            body: form
        }).then(response => response.json())
        .catch(error => console.log(error))
        .then(response => {
            console.log(response);
            if(response.message === "success"){
                window.localStorage.setItem("note-"+id, JSON.stringify({
                    "title":title.value,
                    "description":description.value
                }));
                window.location.reload();
            }
        })
    }
    let deleteText = function(event: React.MouseEvent){
        user_data = JSON.parse(window.localStorage.getItem("data") as string);
        var myheaders = new Headers();
        myheaders.append("access-token", user_data.token);
        var form = new FormData();
        form.append("id", id.toString());
        fetch(Config.API_ENDPOINT+"notes/remove",{
            headers: myheaders,
            method:"POST",
            body: form
        }).then(response => response.json())
        .catch(error => console.log(error))
        .then(response => {
            console.log(response);
            if(response.message === "success"){
                window.localStorage.removeItem("note-"+id);
                window.location.href = "notes";
            }
        })

    }
    return (<IonPage>
            <IonHeader>
                <Toolbar title={title} mode="logout"/>
            </IonHeader>
            <IonContent>
            <IonHeader collapse="condense">
                <IonToolbar >
                <IonTitle >Mis Notas</IonTitle>
                </IonToolbar>
            </IonHeader>
                <IonItem color="primary"><IonText><b>Titulo:</b></IonText></IonItem>
                <IonItem ><IonTextarea id="title" value={title} onIonChange={changeText}></IonTextarea></IonItem>
                <IonItem color="primary"><IonText><b>Descripcion:</b></IonText></IonItem>
                <IonItem ><IonTextarea id="description" value={description} onIonChange={changeText}></IonTextarea></IonItem>
                <div id="save" hidden>
                    <IonFab vertical="bottom" horizontal="end" slot="fixed">
                        <IonFabButton onClick={updateText}>
                            <IonIcon icon={save} />
                        </IonFabButton>
                    </IonFab>
                </div>
                <IonFab vertical="bottom" horizontal="start" slot="fixed">
                        <IonFabButton onClick={deleteText} color="secondary">
                            <IonIcon icon={close} />
                        </IonFabButton>
                </IonFab>
            </IonContent>
            <Tab/>
        </IonPage>);
  }
  else{
    return null;
  }
};

export default Note;