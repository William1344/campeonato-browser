import React from "react";
import urlRootNode from "../confgs";
import Button from "./Button";

export default function CmpUserLG({user, onClick}) {

  const [stt, setStt] = React.useState(true);

  return(
    <div className="cmpUserLG">
      <img src={user.imagem} alt="Foto do Jogador"
        onClick = {() => {onClick("faltas",user)}}
      />
      <div>
        <h1 style = {styles.txt}>{user.nome}</h1>
        <div style={styles.divFaltas}>
          {
            user.faltas.map(() => {
              return(
                <div style={styles.falta}/>
              );
            }) 
          }
        </div>
      </div>
      <Button 
        className = "btt3"
        text = {user.a2pts}
        onClick = {() => {onClick("2pts", user)}}
      />
      <Button 
        className = "btt3"
        text = {user.a3pts}
        onClick = {() => {onClick("3pts", user)}}
      />
      <Button 
        className = "btt3"
        text = {user.rebotes}
        onClick = {() => {onClick("rebotes", user)}}
      />
      <Button 
        className = "btt3"
        text = {user.assts}
        onClick = {() => {onClick("assist", user)}}
      />
      <Button 
        className = "btt3"
        text = {user.roubo}
        onClick = {() => {onClick("roubo", user)}}
      />
      <Button 
        className = "btt3"
        text = {user.block}
        onClick = {() => {onClick("bloqueio", user)}}
      />
      <Button 
        className = "btt3"
        text = {user.airBall}
        onClick = {() => {onClick("airBall", user)}}
      />
      <h1>{user.numero}</h1>
    </div>
  );
}
const styles = {
  
    txt: {
      fontSize: "22px",
      color: "white",
      textAlign: "center",
      width: "100%",
    },
    divFaltas: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
    },
    falta:{
      width: "15px",
      height: "15px",
      backgroundColor: "red",
      margin: "2px",
      borderRadius: "90px",
      
    }
}