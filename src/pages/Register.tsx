import { IonContent, IonPage, IonInput, IonButton } from "@ionic/react";
import React from "react";
import "./Login.css";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Register: React.FC = () => {
  const [username, setusername] = useState<string>("");
  const [password, setpassword] = useState<string>("");
  const [cpassword, setcpassword] = useState<string>("");

  function registerUser() {
    console.log(username, password, cpassword);
  }

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <div className="container">
          <IonInput onIonChange={(e: any) => setusername(e.target.value)} placeholder="username"></IonInput>
          <IonInput
            type="password"
            onIonChange={(e: any) => setpassword(e.target.value)}
            placeholder="password"
          ></IonInput>
          <IonInput
            type="password"
            onIonChange={(e: any) => setcpassword(e.target.value)}
            placeholder="confirm password"
          ></IonInput>
          <IonButton color="secondary" onClick={registerUser}>
            Register
          </IonButton>

          <p>
            Already have an account ? <Link to="login">login</Link>
          </p>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Register;
