export default function CmpJogo({jogo, index, onClick}) {
  return (
    <div 
      className="cmpJogo"
      onClick = {onClick} 
    >
      <h1>{jogo.rotulo} - Hora: {jogo.hora}</h1>
      <div>
        <h2>{jogo.timeA.nome}</h2>
        <h2>{jogo.plcA}</h2>
        <h2>X</h2>
        <h2>{jogo.plcB}</h2>
        <h2>{jogo.timeB.nome}</h2>
      </div>

    </div>
  );
}