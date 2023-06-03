import styles from "./styles";

export default function CompCamp({camps}) {
  

  return (
    <>
      <div className="containTpCampMobile">
        <img src = {camps.imagem} alt = {camps.nome} />
        <div>
          <h1>{camps.nome}</h1>
          <h1>{camps.data}</h1>
          <h1>Times: {camps.times.length}</h1>
        </div>
      </div>
      <div className="barraMob"/>
    </>
  );
}