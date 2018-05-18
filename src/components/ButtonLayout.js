import {View, Text, TextInput, StyleSheet} from 'react-native';

export const ButtonStyle = StyleSheet.create({

 ButtonContainer: {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center',
   margin: 10
 },

 GoogleDesign: {
  //specifies direction of flexible alignItems
  //so that text image are in a row
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#FFFF52',
  //color of the divider between image and text
  //also the border of the button
  borderColor: '#D1D1D1',
  borderWidth: 1,
  height: 50,
  //this makes button corners rounded
  borderRadius: 15 ,
  margin: 50,



},

TextLayout:{
  marginBottom : 4,
  marginRight :20,
  color: "#005581"


},

ButtonDivider :{
  width: 2,
  height: 50,
  backgroundColor : '#005581'


},
IconLayout: {
   padding: 10,
   margin: 5,
   height: 40,
   width: 40,
   resizeMode : 'stretch',

}
});
