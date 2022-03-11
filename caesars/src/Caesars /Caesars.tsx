import { text } from "node:stream/consumers";
import { type } from "os";
import { stringify } from "querystring";
import React, { useState } from "react";
import "./Caesars.css";

export function Caesars() {
  const [textFile, setTextFile] = useState("");

  let alphabet = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "Æ",
    "Ø",
    "Å",
  ];
  let moveLetterLength = 0;

  const readFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files !== null) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = (e) => {
        setTextFile(reader.result as string);
      };
    } else {
      console.log("Ingen fil");
    }
  };

  const getMoveLetterValue = () => {
    moveLetterLength = +(
      document.getElementById("moveLetterXTimes") as HTMLInputElement
    ).value;
  };

  const encryptFile = () => {
    getMoveLetterValue();
    let textFileArray: Array<string> = textFile.split("");
    let newTextValue = "";

    for (let textFileValue of textFileArray) {
      for (var i in alphabet) {
        if (textFileValue.toLocaleUpperCase() === alphabet[i]) {
          let index = parseInt(i) + moveLetterLength;
          newTextValue += alphabet[index];
        } else {
          console.log("Ikke lik");
        }
      }
    }
    setTextFile(newTextValue);
  };

  const decryptFile = () => {
    getMoveLetterValue();
    let textFileArray: Array<string> = textFile.split("");
    let newTextValue = "";

    for (let textFileValue of textFileArray) {
      for (var i in alphabet) {
        if (textFileValue.toLocaleUpperCase() === alphabet[i]) {
          let index = parseInt(i) - moveLetterLength;
          newTextValue += alphabet[index];
        } else {
          console.log("Ikke lik");
        }
      }
    }
    setTextFile(newTextValue);
  };

  return (
    <div id="caesars">
      <h2 id="title"> Kryptering med Cæsars kode</h2>
      <label htmlFor="textFile">Velg en tekstfil:</label>
      <input type="file" id="textFile" name="textFile" onChange={readFile} />
      <label htmlFor="moveLetterXTimes">
        Antall plasser du vil flytte bokstavene i filen:
      </label>
      <input type="number" id="moveLetterXTimes" name="moveLetterXTimes" />
      <button type="button" onClick={encryptFile}>
        Krypter
      </button>
      <button type="button" onClick={decryptFile}>
        Dekrypter
      </button>
      <p>Output:{textFile}</p>
    </div>
  );
}
