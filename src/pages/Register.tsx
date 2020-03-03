import { IonContent, IonPage, IonInput, IonButton, IonLoading } from "@ionic/react";
import React from "react";
import "./Login.css";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "../toats";

import { registerUser } from "../firebaseConfig";

const Register: React.FC = () => {
  const [busy, setbusy] = useState<boolean>(false);

  const [username, setusername] = useState<string>("");
  const [password, setpassword] = useState<string>("");
  const [cpassword, setcpassword] = useState<string>("");

  async function register() {
    setbusy(true);
    // validation
    let valid = true;
    if (password !== cpassword) {
      valid = false;
      toast("Password do not match");
    }
    if (username.trim() === "" || password.trim() === "") {
      valid = false;
      toast("Username and password required");
    }

    if (valid) {
      const res = await registerUser(username, password);

      if (res) toast("You have registered successfully");
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
          <IonInput
            type="password"
            onIonChange={(e: any) => setcpassword(e.target.value)}
            placeholder="confirm password"
          ></IonInput>
          <IonButton color="secondary" onClick={register}>
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
