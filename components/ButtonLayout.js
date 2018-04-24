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
  backgroundColor: '#5D92B1',
  //color of the divider between image and text
  //also the border of the button
  borderColor: '#fff',
  borderWidth: .5,
  height: 40,
  //this makes button corners rounded
  borderRadius: 5 ,
  margin: 5,



},

TextLayout:{
  marginBottom : 4,
  marginRight :20,
  color: "#fff"


},

ButtonDivider :{
  width: 1,
  height: 40,
  backgroundColor : '#fff'


},
IconLayout: {
   padding: 10,
   margin: 5,
   height: 25,
   width: 25,
   resizeMode : 'stretch',

}
});
