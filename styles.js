import { StyleSheet } from 'react-native';

const PRIMARY = "#efd3ad";
const BACKGROUND = "#010101";
const PANEL = "#121212";

export default styles = StyleSheet.create({
    body: {
      backgroundColor: BACKGROUND,
      height: "100%",
    },
    gridView: {
      marginTop: 10,
      flex: 1,
    },
    itemContainer: {
      borderRadius: 5,
      height: 150,
      backgroundColor: PANEL,
      padding: 7
    },
    itemView : {
      height:"95%",
      margin:7,
      padding:25,
      marginTop: 15,
    },
    itemName: {
      fontSize: 16,
      color: '#fff',
      fontWeight: '600',
    },
    itemCode: {
      fontWeight: '600',
      fontSize: 12,
      color: '#fff',
    },
    text: {
      color: PRIMARY,
      textAlign: "center",
      fontFamily:"roboto"
    },
    itemTitle: {
      color: PRIMARY,
      fontSize:45,
      width: '60%',
      margin:10,
      fontFamily:"roboto",
    },
    itemDescription: {
      color: PRIMARY,
      fontSize:20,
      margin:10,
      left:5,
      fontFamily:"roboto"
    },
    image: {
      width: '100%',
      height: 100,
      resizeMode: 'cover',
      borderRadius: 5,
    },
    itemViewImage:{
      width: '40%',
      height: 170,
      resizeMode: 'cover',
      borderRadius: 5,
      margin:10,
    },
    itemIcons:{
      color: PRIMARY,
      fontSize:70,
      textAlign:"center",
      fontFamily:"roboto",
      position: 'absolute',
      bottom:20,
      start:60
    },
  });