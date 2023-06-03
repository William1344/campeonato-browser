export default function CmpCamp({cmp,onClick}) {
  console.log("cmp: ", cmp);
  return (
    <div 
      className="cmpCamp"
      onClick = {onClick }
    >
      <img
        src= {cmp.imagem}
        alt = {cmp.nome}
      />
      <div>
        <h1>{cmp.nome}</h1>
        <h2>Times: {cmp.times.length}</h2>
        <h2>Data: {cmp.data}</h2>
      </div>
    </div>
  );
}