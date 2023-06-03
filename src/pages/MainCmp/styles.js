const styles = {
  divInf:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    height: '70%',
    width: '100%',
  },
    divBtts: {
      display         : "flex",
      flexDirection   : "column",
      justifyContent  : "space-evenly",
      alignItems      : "center",
      height          : "90%",
      width           : "20%",
    },
    divFlat: {
      display         : "flex",
      flexDirection   : "column",
      justifyContent  : "flex-start",
      alignItems      : "center",
      height          : "100%",
      width           : "38%",
    },
      label: {
        height: '10%',
        width: '100%',
        textAlign: 'center',
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
        marginTop: 10,
        marginHorizontal: 10,
      },
      flat: {
        height: '88%',
        width: '100%',
        overflow: 'auto',
      } 
}; export default styles;