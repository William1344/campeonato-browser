import React from "react";
import { CompUserTp, TelaFull } from "../../components";
import styles from "./styles";

export default function ViewUs(){

  const [user, setUser] = React.useState(JSON.parse(localStorage.getItem("user")));

  return (
    <TelaFull>
      <CompUserTp
        user = {user}
      />
      <div style = {styles.divInf}>
        <div style = {styles.divLinha}>
          <Cell text = {"Jogos - "    + user.scorsTC.jogos} />
          <Cell text = {"Vitórias - " + user.scorsTC.vit} />
        </div>
        <div style = {styles.divLinha}>
          <Cell text = {"FG% - "      + user.scorsTC.aFG} />
          <Cell text = {"Total Pts - "+ user.scorsTC.vit} />
        </div>
        <div style = {styles.divLinha}>
          <Cell text = {"2Pts - "+ user.scorsTC.a2pts} />
          <Cell text = {"3Pts - "+ user.scorsTC.a3pts} />
        </div>
        <div style = {styles.divLinha}>
          <Cell text = {"Rebotes - " + user.scorsTC.rebotes} />
          <Cell text = {"Assists - " + user.scorsTC.assts} />
        </div>
        <div style = {styles.divLinha}>
          <Cell text = {"Tocos - "  + user.scorsTC.block} />
          <Cell text = {"Roubos - " + user.scorsTC.roubo} />
        </div>
        <div style = {styles.divLinha}>
          <Cell styl = {{width : "100%"}}
            text = {"Air Balls - " + user.scorsTC.airBall} />
        </div>
        <div style = {styles.divLinha}>
          <Cell styl = {{width : "100%"}}
            text = {"Médias"} />
        </div>
        <div style = {styles.divLinha}>
          <Cell text = {"2PPG - " + user.scorsTC.a2PG} />
          <Cell text = {"3PPG - " + user.scorsTC.a3PG} />
        </div>
        <div style = {styles.divLinha}>
          <Cell text = {"Total PG - " + user.scorsTC.totalPPG} />
          <Cell text = {"RPG - "      + user.scorsTC.RPG} />
        </div>
        <div style = {styles.divLinha}>
          <Cell text = {"APG - " + user.scorsTC.APG} />
          <Cell text = {"TPG - " + user.scorsTC.BPG} />
        </div>
        <div style = {styles.divLinha}>
          <Cell text = {"RouPG - " + user.scorsTC.RouPG} />
          <Cell text = {"AirPG - " + user.scorsTC.AirPG} />
        </div>
        
      </div>
    </TelaFull>
  );

}

const Cell = ({text, styl}) => {
  return (
    <div style = {{...styles.divCell, ...styl}}>
      <h2 style = {styles.h2Cell}>{text}</h2>        
    </div>
  );
}