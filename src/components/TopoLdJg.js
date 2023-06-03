import React from 'react';
import {Logo} from '../assets';

export default function TopoLdJg({jogo, index, onClick0, onClick1, colors, cron, SalvaCamp}){
  const [bttSell, setBttSell] = React.useState({btt1: 'red', btt2: 'blue'});
  const [stt, setStt]         = React.useState(false);

  React.useEffect(() => {
    setStt(!stt);
    /*setInterval(() => {
        jogo.time = ""+ ("0" + Math.floor((time / 60000) % 60)).slice(-2)+":"+
        ("0" + Math.floor((time / 1000) % 60)).slice(-2)+"."+
        ("0" + ((time / 10) % 100)).slice(-2);
      SalvaCamp(jogo);
    }, 1000);*/
  }, [jogo]);

  // Bloco Cronometro
  const [isActive, setIsActive] = React.useState(false);
  const [isPaused, setIsPaused] = React.useState(true);
  const [time, setTime]         = React.useState(0);   

  React.useEffect(() => {
    if(cron === "start") handleStart();
    if(cron === "paused") handlePauseResume();
    if(cron === "reset") handleReset();
  }, [cron]);

  React.useEffect(() => {
    let interval = null;
    if(isActive && !isPaused){
      interval = setInterval(() => {
        setTime((time) => time + 10);
        
      }, 10);
    } else clearInterval(interval);
    
    return () => clearInterval(interval);
  }, [isActive, isPaused]);

    
  function handleStart(){
    setIsActive(true);
    setIsPaused(false);
  } 
  function handlePauseResume(){
    setIsPaused(!isPaused);
  }
  function handleReset(){
    console.log("Reset");
    setIsActive(false);
    setTime(0);
  }
  // Fim Bloco Cronometro
  return (
    <div className = "cmpTopoLdJg">
      <img 
        src = {Logo}
        className = "imgLogo"
      />
      <div>
        <h1>{jogo.rotulo}</h1>
        <div style={styles.div1}>
          <button 
            style = {{...styles.btt, backgroundColor: colors.btt1}}
            onClick = {onClick0}
          >
            {jogo.timeA.nome}
          </button>
          <h1 style = {styles.txt}>{jogo.plcA}</h1>
          <h1 style = {styles.txt}>Vs.</h1>
          <h1 style = {styles.txt}>{jogo.plcB}</h1>
          <button 
            style = {{...styles.btt, backgroundColor: colors.btt2}}
            onClick = {onClick1}
          >
            {jogo.timeB.nome}
          </button>
        </div>
        <div style ={styles.div2}>
          <h1 style = {styles.txtInf}>Faltas: {jogo.timeA.faltas}</h1>
          <h1 style = {styles.txtInf}>
            {("0" + Math.floor((time / 60000) % 60)).slice(-2)}:
            {("0" + Math.floor((time / 1000) % 60)).slice(-2)}.
            {("0" + ((time / 10) % 100)).slice(-2)}

          </h1>
          <h1 style = {styles.txtInf}>Faltas: {jogo.timeB.faltas}</h1>
        </div>
      </div>
    </div>
  );
}
const styles = {
  div1: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: '45%',
  },
  div2: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: '0.5%',
    width: '100%',
    height: '25%',
  },
  btt: {
    width: '30%',
    height: '70%',
    border: 'solid 1px black',
    fontSize: '26px',
    fontWeight: 'bold',
    color: 'white',
    cursor: 'pointer',
    margin: '0.5%',
  },
  txt:{
    fontSize: '35px',
    fontWeight: 'bold',
    color: 'black',
  },
  txtInf:{
    alignText: 'center',
    width: '30%',
    fontSize: '30px',
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  }
}