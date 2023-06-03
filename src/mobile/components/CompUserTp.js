export default function CompUserTp({user}){
  return (
    <>
      <div className="cmpUserTpMob">
        <img
          src={user.imagem}
          alt={user.nome}
        />
        <div>
          <h1>{user.nome} | nº {user.numero}</h1>
          <h1>Idade: {user.idade}</h1>
          <h1>Posição: {user.posicao}</h1>
          <h1>Altura: {user.altura}</h1>
        </div>
      </div>
      <div className="barraMob" />
    </>
  );
}