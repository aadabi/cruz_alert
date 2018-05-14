import {View, Text, TextInput, StyleSheet} from 'react-native';

export const LoginStyle = StyleSheet.create({
  ScreenCont:{
       alignItems:'center',
       justifyContent:'center',
       flex: 1,
       backgroundColor:'#1295D8'

   },
   loginContainer:{
       flex: 1,
       justifyContent:'flex-end',
       padding:10

   },
   logo:{
       position: 'absolute',
       borderWidth:.8,
       borderColor:'#1295D8',
       width:300,
       height:300,
       padding:5
   }
});
