
var React=require('react-native');var

StyleSheet=React.StyleSheet,Dimensions=React.Dimensions,Platform=React.Platform;

var deviceHeight=Dimensions.get('window').height;

module.exports=StyleSheet.create({
imageContainer:{
flex:1,
width:null,
height:null},

logoContainer:{
flex:1,
marginTop:deviceHeight/8,
marginBottom:30},

logo:{
position:'absolute',
left:Platform.OS==='android'?40:50,
top:Platform.OS==='android'?35:60,
width:280,
height:100},

text:{
color:'#D8D8D8',
bottom:6}});