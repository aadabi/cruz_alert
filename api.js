import firebase from "react-native-firebase";

export const getPublicReports = () => {};

export const getUserReports = uid => {};

export const submitReport = report => {
  const { description, category, longitude, latitude, isPublic } = report;
  const timestamp = new Date();
  const { uid, displayName, email } = firebase.auth().currentUser;
  const subfield = isPublic ? "public" : "private";
  const reportRef = firebase
    .database()
    .ref(`/reports/${subfield}/`)
    .push({
      uid,
      displayName,
      email,
      category,
      description,
      timestamp,
      longitude,
      latitude
    });
  firebase
    .database()
    .ref(`/users/${uid}/reports/${subfield}/${reportRef.key}`)
    .set(true);
};
