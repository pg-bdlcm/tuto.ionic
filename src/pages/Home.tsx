import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonText,
  IonAvatar,
  IonLabel,
  IonItemOptions,
  IonItemSliding,
  IonItemOption,
  IonButton,
  IonIcon,
  IonInput
} from "@ionic/react";
import React from "react";
import ExploreContainer from "../components/ExploreContainer";
import "./Home.css";

import { star } from "ionicons/icons";
import { useState, useEffect } from "react";

const Home: React.FC = () => {
  const [value, setValue] = useState<string>("");

  useEffect(() => {
    console.log(value);
  }, [value]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Hello World</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {/* <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader> */}
        <h1>Input :</h1>
        <IonInput value={value} onIonChange={(e: any) => setValue(e.target.value)}></IonInput>

        <h1>Button :</h1>
        <IonButton routerDirection="back" routerLink="login" expand="full" color="primary">
          <IonIcon slot="start" icon={star}></IonIcon>
          Login
        </IonButton>
        <IonButton routerDirection="back" routerLink="register" expand="full" color="secondary">
          <IonIcon slot="start" icon={star}></IonIcon>
          Register
        </IonButton>

        <h1>List :</h1>
        <IonList>
          {Array(10)
            .fill(0)
            .map((_, i) => (
              <IonItemSliding key={i}>
                <IonItem>
                  <IonAvatar>
                    <img src={`https://ionicframework.com/docs/demos/api/list/avatar-han.png`} />
                  </IonAvatar>

                  <IonLabel className="ion-padding">
                    <h2>Title</h2>
                    <p>Item number {i}</p>
                  </IonLabel>
                </IonItem>

                <IonItemOptions side="end">
                  <IonItemOption onClick={() => alert("Hello !")}>Hello</IonItemOption>
                </IonItemOptions>
              </IonItemSliding>
            ))}
        </IonList>
        {/* <ExploreContainer /> */}
      </IonContent>
    </IonPage>
  );
};

export default Home;
