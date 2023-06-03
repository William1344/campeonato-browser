const styles = {
  divInf:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    height: '70%',
    width: '100%',
  },
    divFlat: {
      display         : "flex",
      flexDirection   : "column",
      justifyContent  : "flex-start",
      alignItems      : "center",
      height          : "100%",
      width           : "33%",
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
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: '88%',
        width: '100%',
        overflow: 'auto',
      } 
}; export default styles;