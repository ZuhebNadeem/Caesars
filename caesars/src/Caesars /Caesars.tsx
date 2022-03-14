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

  const encryptDecryptFile = (encryptButtonClicked: boolean) => {
    getMoveLetterValue();
    let textFileArray: Array<string> = textFile.split("");
    let newTextValue = "";

    for (let textFileValue of textFileArray) {
      if (textFileValue === "\n") {
        newTextValue += "\n";
      } else {
        for (var i in alphabet) {
          if (textFileValue.toLocaleUpperCase() === alphabet[i]) {
            let index = 0;
            if (encryptButtonClicked) {
              index = getIndexForEncrypting(index, i);
            } else {
              index = getIndexForDecrypting(index, i);
            }
            newTextValue = setTextValue(index, newTextValue);
            if (newTextValue.length === textFileArray.length) {
              break;
            }
          } else {
            console.log("Ikke lik");
          }
        }
      }
    }
    setTextFile(newTextValue);
  };

  function getMoveLetterValue() {
    moveLetterLength = +(
      document.getElementById("moveLetterXTimes") as HTMLInputElement
    ).value;
  }

  function getIndexForEncrypting(index: number, i: string) {
    index = parseInt(i) + moveLetterLength;
    if (index > 28) {
      index = index - 29;
    }
    return index;
  }

  function getIndexForDecrypting(index: number, i: string) {
    index = parseInt(i) - moveLetterLength;
    if (index < 0) {
      index = index + 30;
    }
    return index;
  }

  function setTextValue(index: number, newTextValue: string) {
    if (index === 29) {
      newTextValue += " ";
    } else {
      newTextValue += alphabet[index];
    }
    return newTextValue;
  }

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
      <pre>Output:{textFile}</pre>
    </div>
  );
}
