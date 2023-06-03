export default function CmpJgdr({jgdr,onClick,index}){

  return (
    <div 
      className="cmpJgdr"
      onClick = {onClick}
    >
      <img src={jgdr.imagem} alt="jogador" />
      <div>
        <h1>{jgdr.nome}</h1>
        <h2>Time: {jgdr.time}</h2>
        <h2>Posição: {jgdr.posicao}</h2>
        <h2>Numero: {jgdr.numero}</h2>
        <h2>Altura: {jgdr.altura}</h2>
      </div>
    </div>
  );
}