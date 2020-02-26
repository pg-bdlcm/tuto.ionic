import { IonContent, IonPage, IonInput, IonButton } from "@ionic/react";
import React from "react";
import "./Login.css";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { loginUser } from "../firebaseConfig";
import { toast } from "../toats";

const Login: React.FC = () => {
  const [username, setusername] = useState<string>("");
  const [password, setpassword] = useState<string>("");

  async function login() {
    const result = await loginUser(username, password);
    // console.log(`${result ? "Login success" : "Login failed"}`);
    if (!result) toast("Error logging with your credentials");
    else toast("You have logged in!");
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
          <IonButton onClick={login}>Login</IonButton>

          <p>
            Don't have an account ? <Link to="register">register</Link>
          </p>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
