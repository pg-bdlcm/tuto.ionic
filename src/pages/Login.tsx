import { IonContent, IonPage, IonInput, IonButton, IonLoading } from "@ionic/react";
import React from "react";
import "./Login.css";

import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

import { loginUser } from "../firebaseConfig";
import { toast } from "../toats";

import { useDispatch } from "react-redux";
import { setUserState } from "../redux/action";

const Login: React.FC = () => {
  const [busy, setbusy] = useState<boolean>(false);

  const history = useHistory();

  const [username, setusername] = useState<string>("");
  const [password, setpassword] = useState<string>("");

  const dispatch = useDispatch();

  async function login() {
    setbusy(true);
    const result = await loginUser(username, password);

    if (result) {
      toast("You have logged in successfully");
      history.replace("/home");
      dispatch(setUserState(result.user.email));
    }

    setbusy(false);
  }

  return (
    <IonPage>
      <IonLoading message="Please wait..." duration={0} isOpen={busy} />
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
