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

  const encryptDecryptFile = (encryptButtonClicked: boolean) => {
    getMoveLetterValue();
    let textFileArray: Array<string> = textFile.split("");
    let newTextValue = "";

    for (let textFileValue of textFileArray) {
      for (var i in alphabet) {
        if (textFileValue.toLocaleUpperCase() === alphabet[i]) {
          let index = 0;
          if (encryptButtonClicked) {
            index = parseInt(i) + moveLetterLength;
            if (index > 27) {
            }
          } else {
            index = parseInt(i) - moveLetterLength;
          }
          newTextValue += alphabet[index];
          if (newTextValue.length === textFileArray.length) {
            break;
          }
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
      <button type="button" onClick={() => encryptDecryptFile(true)}>
        Krypter
      </button>
      <button type="button" onClick={() => encryptDecryptFile(false)}>
        Dekrypter
      </button>
      <p>Output:{textFile}</p>
    </div>
  );
}
