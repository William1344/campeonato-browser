import React from "react";
import { TelaFull, Button, TopoLdJg, CmpUserLG } from "../../components";
import urlRootNode from "../../confgs";
import styles from "./styles";

export default function LoadGame(){

  const [bttSell, setBttSell] = React.useState(
    JSON.parse(localStorage.getItem("timeSel")) ? 
    {btt1: 'red', btt2: 'blue'}:{btt1: 'blue', btt2: 'red'} 
  );
  const [camp, setCamp]       = React.useState(JSON.parse(localStorage.getItem("campSel")));
  const [jogo, setJogo]       = React.useState(JSON.parse(localStorage.getItem("jogoSel")));
  const [timeSel, setTimeSel] = React.useState(JSON.parse(localStorage.getItem("timeSel")));
  const [stt, setStt]         = React.useState("blue");
  const [cmdCron, setCmdCron] = React.useState("paused");
  const [cluth, setCluth]     = React.useState(null);
  const [ss, set]             = React.useState(true);

  React.useEffect(() => {
    setInterval(() => {
      SalvarCamp(jogo);
    }, 1000);
  }, []);
  
  // Fim Cronometro
  async function SalvarCamp(jogo){
    camp.jogos[jogo.index] = jogo;
    const reqs = await fetch(urlRootNode + "salve-camp",{
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(camp)
    });
    const ress = await reqs.json();
    if(ress.status === 200){
      console.log("SalvarCamp: ", ress);
      localStorage.setItem("campSel", JSON.stringify(ress.camp));
      localStorage.setItem("timeSel", JSON.stringify(timeSel));
      //return window.location.href = "/desktop/load-game"
    }
  }
  
  async function handleCmds(cmd, user){
    switch(cmd){
      case '2pts':
        if(stt === "blue"){
          user.a2pts += 1;
          timeSel ? jogo.plcA += 2 : jogo.plcB += 2;
          setCluth(user.index);
        } else {
          user.a2pts -= 1;
          timeSel ? jogo.plcA -= 2 : jogo.plcB -= 2;
        }
        break;
      case '3pts':
        if(stt === "blue"){
          user.a3pts += 1;
          timeSel ? jogo.plcA += 3 : jogo.plcB += 3;
          setCluth(user.index);
        }
        else {
          user.a3pts -= 1;
          timeSel ? jogo.plcA -= 3 : jogo.plcB -= 3;
        }
        break;
      case 'rebotes':
        if(stt === "blue")
          user.rebotes += 1;
        else
          user.rebotes -= 1;
        break;
      case 'assist':
        if(stt === "blue")
          user.assts += 1;
        else
          user.assts -= 1;
        break;
      case 'roubo':
        if(stt === "blue")
          user.roubo += 1;
        else
          user.roubo -= 1;
        break;
      case 'bloqueio':
        if(stt === "blue")
          user.block += 1;
        else
          user.block -= 1;
        break;
      case 'airBall':
        if(stt === "blue")
          user.airBall += 1;
        else
          user.airBall -= 1;
        break;
        case 'faltas':
        if(stt === "blue"){
          user.faltas.push(1);
          timeSel ? jogo.timeA.faltas++ : jogo.timeB.faltas++;
        }else{
          user.faltas.pop();
          timeSel ? jogo.timeA.faltas-- : jogo.timeB.faltas--;
        }
      default:
        break;          
    }
    setJogo(jogo);
    set(!ss);
    return await SalvarCamp(jogo);
  }

  async function FinalizarGame(){
    console.log("Entrou!");
    if(window.confirm("Deseja finalizar o jogo?")){
      DefineGame();
      const reqs = await fetch(urlRootNode + "fim-game",{
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({jogo:jogo.index,camp:camp})
      })
      const ress = await reqs.json();
      if(ress.status === 200){
        console.log("FinalizarGame: ", ress);
        localStorage.setItem("campSel", JSON.stringify(ress.camp));
        //await Atualiza();
        window.location.href = "/desktop/main-campeonato"
      }
    }
    function DefineGame(){
      camp.times[jogo.timeA.index].jogos++;
      camp.times[jogo.timeB.index].jogos++;
      console.log("Placar do jogo:" + jogo.plcA + "X" + jogo.plcB);
      if(jogo.plcA > jogo.plcB){
        jogo.timeA.vitorias++;
        camp.times[jogo.timeA.index].vitorias++;
        for(let usG of jogo.timeA.users){
          usG.boolDec = true;
          if(cluth == usG.index) usG.boolCluth = true;
        }
      } else {
        jogo.timeB.vitorias++;
        camp.times[jogo.timeA.index].vitorias++;
        for(let usG of jogo.timeB.users){
          usG.boolDec = true;
          if(cluth == usG.index) usG.boolCluth = true;
        }
      }
      for(let usG of jogo.timeA.users) 
        camp.times[jogo.timeA.index].pontos += (usG.a2pts * 2) + (usG.a3pts * 3); 
      for(let usG of jogo.timeB.users)
        camp.times[jogo.timeB.index].pontos += (usG.a2pts * 2) + (usG.a3pts * 3);
      camp.times[jogo.timeA.index].aFG = ((camp.times[jogo.timeA.index].vitorias / camp.times[jogo.timeA.index].jogos) * 100).toFixed(1);
      camp.times[jogo.timeB.index].aFG = ((camp.times[jogo.timeB.index].vitorias / camp.times[jogo.timeB.index].jogos) * 100).toFixed(1);
      camp.jogos[jogo.index].status = 2;
      
      if(jogo.tipo === "mata-mata"){
        if(jogo.rotulo === "Semi-Final A"){
          if(jogo.plcA > jogo.plcB) camp.jogos[2].timeA = camp.times[jogo.timeA.index];
          else                      camp.jogos[2].timeA = camp.times[jogo.timeB.index];
        } else if(jogo.rotulo === "Semi-Final B") {
          if(jogo.plcA > jogo.plcB) camp.jogos[2].timeB = camp.times[jogo.timeA.index];
          else                      camp.jogos[2].timeB = camp.times[jogo.timeB.index];
        }
      }
    }
    return 0;
  }
  
  function BttCnfg({onClick, txt, sty}){
    return (
      <button
        style={{...styles.bttFim, ...sty}}
        onClick={onClick}
      >
        {txt}
      </button>
    );
  }

  return (
    <TelaFull>
      <BttCnfg
        onClick={() => FinalizarGame()}
        sty = {{left: "16%"}}
        txt="Fim"
      />
      <BttCnfg
        onClick={() => {
          //Cronometro
          setCmdCron("start")
        }}
        sty = {{left: "20%"}}
        txt={"P"}
      />
      <BttCnfg
        onClick={() => {
          // State da tela (+ || -)
          setCmdCron("paused")
        }}
        sty = {{left: "24%"}}
        txt={"S"}
      />
      <BttCnfg
        onClick={() => {
          // State da tela (+ || -)
          setCmdCron("reset");
        }}
        sty = {{left: "28%"}}
        txt={"R"}
      />
      <BttCnfg
        onClick={() => {
          // State da tela (+ || -)
          setStt(stt === "blue" ? "red" : "blue");
        }}
        sty = {{left: "32%", backgroundColor: stt}}
        txt={stt === "blue" ? "++" : "--"}
      />
      <TopoLdJg
        colors  = {bttSell}
        jogo    = {jogo}
        cron    = {cmdCron}
        SalvaCamp = {SalvarCamp()}
        onClick0 = {() => {
          if(!timeSel){
            localStorage.setItem("timeSel", JSON.stringify(true));
            setBttSell({btt1: 'red', btt2: 'blue'});
            setTimeSel(true);
          }
        }}
        onClick1 = {() => {
          if(timeSel){
            localStorage.setItem("timeSel", JSON.stringify(false));
            setBttSell({btt1: 'blue', btt2: 'red'});
            setTimeSel(false);
          }
        }}
      />
      <div style ={styles.divInf}>
        <div style={styles.divCab}>
          <div style = {styles.divImm}/>
          <h2 style={{...styles.txtCb, width: '30%'}}>Nome</h2>
          <h2 style={styles.txtCb}>2 Pts</h2>
          <h2 style={styles.txtCb}>3 Pts</h2>
          <h2 style={styles.txtCb}>Reb</h2>
          <h2 style={styles.txtCb}>Asst</h2>
          <h2 style={styles.txtCb}>Rou</h2>
          <h2 style={styles.txtCb}>Blk</h2>
          <h2 style={styles.txtCb}>AirB</h2>
          <h2 style={styles.txtCb}>N</h2>
        </div>
        <div style={styles.divCmps}>
          {timeSel ? (
            jogo.timeA.users.map((user) => {
              return(
                <CmpUserLG 
                  onClick = {handleCmds}
                  key     = {user.index}
                  user    = {user}
                />
              );
            })
          ):(
            jogo.timeB.users.map((user) => {
              return(
                <CmpUserLG
                  onClick = {handleCmds}
                  key     = {user.index}
                  user    = {user}
                />
              );
            })
          )}
        </div>

      </div>
    </TelaFull>
  );
}