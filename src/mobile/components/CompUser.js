export default function CompUser({user, onClick}) {
  console.log("user", user);
  return (
    <div className="cmpJgdrMob" onClick = {onClick}>
      <img
        src={user.imagem}
        alt={user.nome}
      />
      <div>
        <h2>{user.nome} | {user.idade} anos</h2>
        <h3>{user.posicao}</h3>
        <h3>Jogos: {user.scorsTC.jogos} | FG: {user.scorsTC.aFG}%</h3>
      </div>
    </div>
  );
}