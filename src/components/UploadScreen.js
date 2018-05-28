import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  Image,
  ActivityIndicator,
  KeyboardAvoidingView,
  TextInput
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob';
import firebase from 'firebase';
import {StackNavigator} from "react-navigation";

//configuring our reference to our database storage
const config = {
  apiKey: "AIzaSyA56NpR0fum7P1fFwfNLE8dC273NAMp3tc",
  datbaseURL: "https://cruzalert.firebaseio.com",
  authDomain: "cruzalert.firebaseapp.com",
  storageBucket: "gs://cruzalert.appspot.com",
}
firebase.initializeApp(config)
const storage = firebase.storage()
//phtos are uploaded as blob to firebase
// prepare Blob support
window.Blob = RNFetchBlob.polyfill.Blob
window.fs = RNFetchBlob.fs
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob

//upload image factory function returns a url object of the image and a blob
//mime type indicates the nature and format of the object/document/file
//promise checks when upload actually happens returns error if unable to resolve the url
const UploadImage = (uri, filename,mime = 'image/jpg') => {
//promise object to check eventual complemtion of an asynchronous operation like uploading an image
   return new Promise((resolve, reject) => {
     const imguploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
       const sessionId = new Date().getTime()
       //initial upload blob object should bt null
       let uploadBlob = null
       //reference for our firebase storage
       const reftoStorage = storage.ref('reportimg').child(filename)
       //encode image with base 64 as required for the blob object
       fs.readFile(imguploadUri, 'base64')
       .then((data) => {
         return Blob.build(data, { type: `${mime};BASE64` })
       })
       //places the blob object into data reference
       .then((blob) => {
         uploadBlob = blob
         //description : type
         return reftoStorage.put(blob, { contentType: mime })
       })
       //returns the URL of the image
       .then(() => {
         uploadBlob.close()
         return reftoStorage.getDownloadURL()
       })
       //promise gets resolve with the url of the image
       .then((url) => {
         resolve(url)
         //then we  can call this method to upload image to database
        urlReference(url, sessionId, filename)
       })
       .catch((error) => {
         reject(error)
       })
   })
 }




class UploadScreen extends Component {
  constructor(props) {
    super(props)
    this.pickImage = this.pickImage.bind(this);
    this.state = {description: ""};
    this.state = {}
  }



//method to pick an image
  pickImage() {
    this.setState({ uploadURL: '' })
    const description = this.state.description;
    //laucbhes the local library where images are store in phone
    ImagePicker.launchImageLibrary({}, response  => {
      //pass the description name to upload image function
      UploadImage(response.uri, description)
        .then(url => this.setState({ uploadURL: url }))
        .catch(error => console.log(error))

    })

  }




  render() {
    return (
      <View style={ UploadLayout.container }>


        <KeyboardAvoidingView style={UploadLayout.inputcontainer}>
          <TextInput
            multiline
            selectionColor='lightgray'
            style={UploadLayout.descriptionInput}
            placeholder="Enter a description for your photo"
            onChangeText={description => this.setState({ description })}

          />


        </KeyboardAvoidingView>

        <TouchableOpacity style = {UploadLayout.uploadIcon} onPress={ () => this.pickImage() }>
          <Image
            source={require('../components/images/uploadIcon.png')}
            style={UploadLayout.upload}
          />
          <Text style = {UploadLayout.textinput}> Upload your Image</Text>
        </TouchableOpacity>

        <TouchableOpacity style = {UploadLayout.uploadIcon} onPress={ () => this.props.navigation.navigate("PublicReportsFeed")}>
          <Image
            source={require('../components/images/homeIcon.png')}
            style={UploadLayout.upload}
          />
          <Text style = {UploadLayout.textinput}> Go To Public Feed</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const UploadLayout = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: "#D1D1D1"

  },
  image: {
    height: 200,
    justifyContent: 'center',
    resizeMode: 'contain',
  },
  upload: {
    resizeMode: 'contain',
    justifyContent: 'center',
    height: 30,
    width: 30,
    padding: 10,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: 'lightgray'
  },
  descriptionInput: {
    borderRadius: 10,
    fontSize: 16,
    backgroundColor: "#F2F2F2",
    borderColor: "#1295D8",
    borderWidth: 1,
    height: "45%",
    padding: 5,
    paddingTop: 5,
    marginBottom: 20,
    textAlignVertical: "top"

  },
  inputcontainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    paddingTop: 50,
    height: 300,
    width: 300
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10
  },
  textinput:{
    marginBottom : 4,
    marginRight :20,
    color: 'gray'


  },
  uploadIcon:{
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
    borderColor: "#1295D8",
    height: 50,

    borderRadius:10,
    margin: 50,
  }

})


export default UploadScreen;
