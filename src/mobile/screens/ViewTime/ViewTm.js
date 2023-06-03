import React from "react";
import { TelaFull, CompUser } from "../../components";
import styles from "./styles";

export default function ViewTm() {

  const time = JSON.parse(localStorage.getItem("time"));

  return (
    <TelaFull>
      <div style = {styles.divSup} >
        <h1 style = {styles.infos}> {time.nome}</h1>
        <h1 style = {styles.infos}> {time.cidade}</h1>
        <h1 style = {styles.infos}> Jogos: {time.jogos}</h1>
        <h1 style = {styles.infos}> Vitorias: {time.vitorias}</h1>
        <h1 style = {styles.infos}> FG: </h1>
      </div>
      <div style = { styles.divInf } >
        
      </div>
    </TelaFull>
  );
}