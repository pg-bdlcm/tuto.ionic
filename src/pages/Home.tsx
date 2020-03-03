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
  IonInput,
  IonLoading
} from "@ionic/react";
import React from "react";
import ExploreContainer from "../components/ExploreContainer";
import "./Home.css";

import { star } from "ionicons/icons";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { logoutUser } from "../firebaseConfig";
import { useHistory } from "react-router";

import words from "../wordlist";
import { useRef } from "react";

type WordType = {
  word: string;
  done: boolean;
  correct: boolean;
};

const Home: React.FC = () => {
  const [busy, setbusy] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const [activeIndex, setactiveIndex] = useState<number>(0);
  const [removeIndex, setremoveIndex] = useState<number>(0);
  const [activeWordList, setactiveWordList] = useState<(WordType | null)[]>(
    words.slice(0, 1).map(word => ({ word, done: false, correct: false }))
  );

  const history = useHistory();

  const inputRef = useRef<HTMLIonInputElement>(null);

  const username = useSelector((state: any) => state.user.username);

  useEffect(() => {
    console.log(value);
  }, [value]);

  async function logout() {
    setbusy(true);
    await logoutUser();
    history.replace("/");

    setbusy(false);
  }

  function setInputRef(value: string) {
    if (inputRef.current) inputRef.current.value = value;
  }

  function setInput(value: string) {
    if (value.trim() === "") setInputRef("");
    else if (value[value.length - 1] === " ") {
      setactiveWordList(list => {
        let wordBlocks: any = [...list];

        wordBlocks[activeIndex] = {
          ...wordBlocks[activeIndex],
          correct: wordBlocks[activeIndex].word === value.trim(),
          done: true
        };

        if (wordBlocks.length > 2) {
          wordBlocks[removeIndex] = null;
          setremoveIndex(i => ++i);
        }

        setactiveIndex(i => ++i);

        wordBlocks.push({ word: words[list.length], correct: false, done: false });
        return wordBlocks;
      });
      setInputRef("");
    } else setInputRef(value);
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Hello World {username}</IonTitle>
          <IonButton onClick={logout}>Logout</IonButton>
        </IonToolbar>
      </IonHeader>
      <IonLoading message="Please wait..." duration={0} isOpen={busy} />
      <IonContent className="ion-padding">
        {activeWordList.filter(Boolean).map((block, key) => {
          const wordBlock = block as WordType;
          const isDone = wordBlock.done;
          const isCorrect = wordBlock.correct;

          if (isDone && isCorrect) {
            return (
              <span className="word done correct" key={key}>
                {wordBlock.word}
              </span>
            );
          } else if (isDone) {
            return (
              <span className="word done incorrect" key={key}>
                {wordBlock.word}
              </span>
            );
          } else {
            return (
              <span className="word" key={key}>
                {wordBlock.word}
              </span>
            );
          }
        })}
        {/* <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader> */}
        <IonInput
          ref={inputRef}
          value={value}
          placeholder="..."
          onIonChange={(e: any) => setInput(e.target.value)}
        ></IonInput>

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
