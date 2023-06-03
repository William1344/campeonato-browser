import React from "react";
import { renderIntoDocument } from "react-dom/test-utils";
import urlRootNode from "../../../confgs";
import { TelaFull } from "../../components";
import styles from "./styles";

export default function ViewGm() {

  const [game,    setGame]  = React.useState(JSON.parse(localStorage.getItem("game")));
  const [camp,    setCamps] = React.useState(JSON.parse(localStorage.getItem("campsHoje")));
  const [bttSel,  setBttS]  = React.useState({tmA: "red", tmB: "blue"});
  
  React.useEffect(() => {
    console.log("Game status: ", game);
    setInterval(() => {
      if(game.status == 1){
        console.log("Pegou aqui ó");
        PegaJogo();
      }   
    }, 1000);
  }, []);

  async function PegaJogo() {
    const reqs = await fetch(urlRootNode + "render-game",{
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({camp: camp,game: game})
    });
    const ress = await reqs.json();
    if(ress.status === 200){
      console.log("Game status: ", ress.game);
      localStorage.setItem("game", JSON.stringify(ress.game));
      setGame(ress.game);
    }
  }

  function RenderTime(){
    if(bttSel.tmA === "red"){
      return (
        game.timeA.users.map((jgdr, idx) => {
          return (
            <div style = {styles.divRot}>
              <h1 style = {{...styles.cel, width: '30%'}}>{jgdr.nome} n:{jgdr.numero}</h1>
              <h1 style = {styles.cel}>{jgdr.a2pts}</h1>
              <h1 style = {styles.cel}>{jgdr.a3pts}</h1>
              <h1 style = {styles.cel}>{jgdr.rebotes}</h1>
              <h1 style = {styles.cel}>{jgdr.assts}</h1>
              <h1 style = {styles.cel}>{jgdr.block}</h1>
              <h1 style = {styles.cel}>{jgdr.roubo}</h1>
              <h1 style = {styles.cel}>{jgdr.airBall}</h1>
            </div>
          )
        })
      );
    } else {
      return (
        game.timeB.users.map((jgdr, idx) => {
          return (
            <div style = {styles.divRot}>
              <h1 style = {{...styles.cel, width: '30%'}}>{jgdr.nome}</h1>
              <h1 style = {styles.cel}>{jgdr.a2pts}</h1>
              <h1 style = {styles.cel}>{jgdr.a3pts}</h1>
              <h1 style = {styles.cel}>{jgdr.rebotes}</h1>
              <h1 style = {styles.cel}>{jgdr.assts}</h1>
              <h1 style = {styles.cel}>{jgdr.block}</h1>
              <h1 style = {styles.cel}>{jgdr.roubo}</h1>
              <h1 style = {styles.cel}>{jgdr.airBall}</h1>
            </div>
          )
        })
      );
    }
  }

  return(
    <div className="telaFM">
      <div style = {styles.divSup} >
        <h1 style = {styles.rotulo}>{game.rotulo}{/* | Tempo: {game.time}*/}</h1>
      </div>
      <div style = {styles.divBtts}>
        <button
          style = {{...styles.btts, backgroundColor: bttSel.tmA}}
          onClick = {() => {
            setBttS({tmA: "red", tmB: "blue"});
          }}
        >{game.timeA.nome}</button>
        <div style = {styles.divPlc}>
          <h1 style = {styles.txtPlc}>{game.plcA}</h1>
          <h1 style = {styles.txtPlc}>X</h1>
          <h1 style = {styles.txtPlc}>{game.plcB}</h1>
        </div>
        <button
          style = {{...styles.btts, backgroundColor: bttSel.tmB}}
          onClick = {() => {
            setBttS({tmA: "blue", tmB: "red"});
          }}
        >{game.timeB.nome}</button>
      </div>
      <div style = {styles.divRot}>
        <h1 style = {{...styles.cel, width: '30%'}}>Jogador</h1>
        <h1 style = {styles.cel}>2 Pts</h1>
        <h1 style = {styles.cel}>3 Pts</h1>
        <h1 style = {styles.cel}>Reb</h1>
        <h1 style = {styles.cel}>Asst</h1>
        <h1 style = {styles.cel}>Blk</h1>
        <h1 style = {styles.cel}>Stl</h1>
        <h1 style = {styles.cel}>AirB</h1>
      </div>
      <div style = {styles.divJog}>
        { RenderTime() }
      </div>
    </div>
  );
}