import {View, Text, TextInput, StyleSheet} from 'react-native';

export const LoginStyle = StyleSheet.create({
  ScreenCont:{
       alignItems:'center',
       justifyContent:'center',
       flex: 1,
       backgroundColor:'#236B8E'

   },
   loginContainer:{
       flex: 1,
       justifyContent:'flex-end',
       padding:10

   },
   logo:{
       position: 'absolute',
       borderWidth:.8,
       borderColor:'#fff',
       width:300,
       height:200,
       padding:10
   }
});
