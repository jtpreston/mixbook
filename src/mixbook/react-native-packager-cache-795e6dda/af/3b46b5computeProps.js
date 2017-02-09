
var _ReactNativePropRegistry=require('react-native/Libraries/Renderer/src/renderers/native/ReactNativePropRegistry');var _ReactNativePropRegistry2=babelHelpers.interopRequireDefault(_ReactNativePropRegistry);var React=require('react');
var _=require('lodash');

module.exports=function(incomingProps,defaultProps){


var computedProps={};

incomingProps=_.clone(incomingProps);
delete incomingProps.children;

var incomingPropsStyle=incomingProps.style;
delete incomingProps.style;



if(incomingProps)
_.merge(computedProps,defaultProps,incomingProps);else

computedProps=defaultProps;


if(incomingPropsStyle){

var computedPropsStyle={};
computedProps.style={};
if(Array.isArray(incomingPropsStyle)){
_.forEach(incomingPropsStyle,function(style){
if(typeof style=='number'){
_.merge(computedPropsStyle,_ReactNativePropRegistry2.default.getByID(style));
}else{
_.merge(computedPropsStyle,style);
}
});

}else
{
if(typeof incomingPropsStyle=='number'){
computedPropsStyle=_ReactNativePropRegistry2.default.getByID(incomingPropsStyle);
}else{
computedPropsStyle=incomingPropsStyle;
}
}

_.merge(computedProps.style,defaultProps.style,computedPropsStyle);


}



return computedProps;


};