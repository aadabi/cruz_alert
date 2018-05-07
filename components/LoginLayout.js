import {View, Text, TextInput, StyleSheet} from 'react-native';

export const LoginStyle = StyleSheet.create({
  ScreenCont:{
       alignItems:'center',
       justifyContent:'center',
       flex: 1,
       backgroundColor:'#007E8C'

   },
   loginContainer:{
       flex: 1,
       justifyContent:'flex-end',
       padding:10

   },
   logo:{
       position: 'absolute',
       borderWidth:.8,
       borderColor:'#007E8C',
       width:450,
       height:450,
       padding:10
   }
});
