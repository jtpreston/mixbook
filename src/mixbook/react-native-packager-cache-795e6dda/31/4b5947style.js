
var React=require('react-native');var

StyleSheet=React.StyleSheet,Platform=React.Platform,Dimensions=React.Dimensions;

var deviceHeight=Dimensions.get('window').height;
var deviceWidth=Dimensions.get('window').width;

module.exports=StyleSheet.create({
sidebar:{
flex:1,
backgroundColor:'#fff'},

drawerCover:{
alignSelf:'stretch',

height:deviceHeight/3.5,
width:null,
position:'relative',
marginBottom:10},

drawerImage:{
position:'absolute',

left:Platform.OS==='android'?deviceWidth/10:deviceWidth/9,

top:Platform.OS==='android'?deviceHeight/13:deviceHeight/12,
width:210,
height:75,
resizeMode:'cover'},

listItemContainer:{
flexDirection:'row',
justifyContent:'flex-start',
alignItems:'center'},

iconContainer:{
width:37,
height:37,
borderRadius:18,
marginRight:4,
paddingLeft:0,
paddingTop:Platform.OS==='android'?7:5},

sidebarIcon:{
fontSize:21,
color:'#fff',
lineHeight:Platform.OS==='android'?21:25,
backgroundColor:'transparent'},

text:{
fontWeight:'500',
fontSize:16}});