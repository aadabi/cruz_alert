import React, { Component } from "react";
import {
   StyleSheet,
   Text,
   View,
   Image,
   TouchableOpacity,
   Platform

}from 'react-native';
import Camera from 'react-native-camera';
import { StackNavigator } from "react-navigation";



class CameraScreen extends Component {
static navigationOptions = {
  drawerLabel: "Take A Photo",
  drawerIcon: () => (
    <Image
      source={require("../components/images/camera-icon.png")}
      style={{ width: 25, height: 25, resizeMode: "contain" }}
    />
  )
};
   constructor(props){
    super(props);
    this.handleUpload = this.handleUpload.bind(this);
   }

//method to take picture
   takePicture(){
     //const variable to hold our pictures as metadata stored in phone
      const pictures = {};
      this.camera.capture({ metadata: pictures })
      .then((data) => console.log(data))
      .catch(err => console.error(err));




   }
   handleUpload() {
     this.takePicture();
     this.props.navigation.navigate("UploadScreenModal");
   }

   render() {
      return (
         <View style = {CameraStyle.container}>
            <Camera
               ref = {(cam) => {
                  this.camera = cam;
               }}

               style = {CameraStyle.preview}
               aspect = {Camera.constants.Aspect.fill}>
            </Camera>
            <TouchableOpacity style={CameraStyle.capture} activeOpacity={0.5} onPress={this.handleUpload}>
              <Image source={require('../components/images/Camera-Next-icon.png')}
                style ={CameraStyle.cameracontainer}/>

            </TouchableOpacity>


         </View>

      );
   }
}


const CameraStyle = StyleSheet.create({
   container: {
     flex: 1,
   },
   preview: {
      flex:1,
      justifyContent: 'center',
      alignItems: 'center'
   },
   capture: {
      alignSelf: 'center',
   },
   cameracontainer: {
     resizeMode: 'contain',
     justifyContent: 'center',
     height: 50,
     width: 50,
     padding: 10,
     marginBottom: 5,
     borderWidth: 1,
     borderColor: 'darkgray'
   }


});






export default CameraScreen;
