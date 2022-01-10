import { StyleSheet, Dimensions} from "react-native";

const PRIMARY = "#efd3ad";

const ScreenHeight = Dimensions.get("window").height;
const ScreenWidth = Dimensions.get("window").width;

export default style = StyleSheet.create({
      
      //Home screen styles
      homeScreenWrapper: {
        flex: 1,
      },
      homeScreenImage: {
        flex: 1,
        justifyContent: "center",
        alignItems:"center",
      },
      homeScreenTextContainerOpenApp: {
        justifyContent:"center",
        alignItems:"center",
        transform: [{ translateY: 300 }],
        padding: 20,
        height:80,
        width:300,
        backgroundColor: "#000000CC",
        borderRadius:25,
      },
      homeScreenTextContainerUploadPackage: {
        justifyContent:"center",
        alignItems:"center",
        transform: [{ translateY: 300 }],
        padding: 20,
        marginTop:15,
        height:80,
        width:300,
        backgroundColor: "#000000CC",
        borderRadius:25,
      },
      homeScreenTitle: {
        color: PRIMARY,
        fontSize: 24,
        lineHeight: 40,
        fontWeight: "bold",
        textAlign: "center",
        width:300,
        height:80,
        borderRadius:25,
        paddingTop:10,
      },

      //Character editor styles
      characterEditorWrapper: {
        backgroundColor: "#000",
        justifyContent: "flex-start",
        alignItems: 'center',
        height: ScreenHeight,
      },
      characterEditorTitle: {
        textAlign:"center",
        fontSize:38,
        color: "#EFD4AD",
        marginTop:5,
      },
      characterEditorAddImage: {
        height: ScreenHeight * 0.25,
        width: ScreenWidth * 0.7,
        marginTop:15,
        marginBottom:15,
        resizeMode:"contain",
      },
      characterEditorInput: {
        height: ScreenHeight * 0.08,
        width: ScreenWidth * 0.7,
        margin: 8,
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        backgroundColor:"#3B3B3B",
        color:"#CCC",
        fontSize:16,
      },
      characterEditorSaveButtonContainer: {
        marginTop:20,
        width: ScreenWidth * 0.7,
        justifyContent: "center",
        alignItems: "flex-end",
      },

      //Item editor styles
      itemEditorWrapper: {
        backgroundColor: "#000",
        justifyContent: "flex-start",
        alignItems: 'center',
        height: ScreenHeight,
      },
      itemEditorTitle: {
        textAlign:"center",
        fontSize:38,
        color: "#EFD4AD",
        marginTop:5,
      },
      itemEditorAddImage: {
        height: ScreenHeight * 0.25,
        width: ScreenWidth * 0.7,
        marginTop:15,
        marginBottom:15,
        resizeMode:"contain",
      },
      itemEditorInput: {
        height: ScreenHeight * 0.08,
        width: ScreenWidth * 0.7,
        margin: 8,
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        backgroundColor:"#3B3B3B",
        color:"#FFF",
        fontSize:16,
      },
      itemEditorInputDescription: {
        width: ScreenWidth * 0.7,
        margin: 8,
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        backgroundColor:"#3B3B3B",
        color:"#FFF",
        fontSize:16,
      },
      itemEditorSaveButtonContainer: {
        marginTop:20,
        width: ScreenWidth * 0.7,
        justifyContent: "center",
        alignItems: "flex-end",
      },

      //Packages styles
      packagesWrapper: {
        backgroundColor: "#000",
        justifyContent: "flex-start",
        alignItems: 'center',
        height: ScreenHeight,
      },
      packagesTitle: {
        textAlign:"center",
        fontSize:38,
        color: "#EFD4AD",
        marginTop:25,
        marginBottom:15,
      },
      packagesRow: {
        width:ScreenWidth * 0.8,
        backgroundColor: "#232323",
        paddingTop:10,
        paddingBottom:10,
        paddingLeft:5,
        paddingRight:5,
        borderRadius:10,
        marginBottom:10,
      },
      packagesAddNewContainer:{
        flexDirection:"row",
        justifyContent: "flex-end",
        alignItems: "flex-end",
        width:ScreenWidth * 0.8,
        padding:3,
        position:"absolute", 
        bottom:40,
        right:20
      },
      packagesRowHeader:{
        marginLeft:10,
        fontSize:20,
        color: "#EFD4AD",
        marginBottom:5,
      },
      packagesRowLink:{
        marginLeft:10,
        fontSize:16,
        color: "#EFD4AD",
      },
      packagesButton: {
        marginRight:10,
        marginTop:20,
        justifyContent: "flex-end",
        alignItems: "flex-end",
        flexDirection:"row",
        borderRadius:3,
        padding:5,
        backgroundColor:PRIMARY
      },
      packagesAddButton:{
        justifyContent: "center",
        alignItems: "center",
        flexDirection:"row",
        borderRadius:35,
        width:80,
        height:80,
        backgroundColor:PRIMARY,
        shadowColor: "#000",
        opacity:0.9,
        shadowOffset: {
          width: 0,
          height: 10,
        },
        shadowOpacity: 0.9,
        shadowRadius: 13.97,
        elevation: 21,
      },
      packagesButtonsRow:{
        flexDirection:"row",
        justifyContent: "flex-end",
        alignItems: "flex-end",
      },
      packagesButtonText:{
        color:"black",
        fontWeight: "bold"
      },
      packagesAddButtonText:{
        color:"black",
        fontSize:20,
        textAlign:"center",
        fontWeight: "bold"
      },
      packagesSaveButton: {
        marginTop:20,
        width: ScreenWidth * 0.7,
        alignItems: "flex-end",
      },
      //Package editor styles
      packageEditorWrapper: {
        backgroundColor: "#000",
        justifyContent: "flex-start",
        alignItems: 'center',
        height: ScreenHeight,
      },
      packageEditorTitle: {
        textAlign:"center",
        fontSize:38,
        color: "#EFD4AD",
        marginTop:5,
      },
      packageEditorAddImage: {
        height: ScreenHeight * 0.25,
        width: ScreenWidth * 0.7,
        marginTop:15,
        marginBottom:15,
        resizeMode:"contain",
      },
      packageEditorInput: {
        height: ScreenHeight * 0.08,
        width: ScreenWidth * 0.7,
        margin: 8,
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        backgroundColor:"#3B3B3B",
        color:"#CCC",
        fontSize:16,
      },
      packageEditorSaveButtonContainer: {
        marginTop:20,
        width: ScreenWidth * 0.7,
        justifyContent: "center",
        alignItems: "flex-end",
      },
  });