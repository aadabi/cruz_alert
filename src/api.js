import firebase from "react-native-firebase";

export const getPublicReports = () => {
  return new Promise(async (resolve, reject) => {
    const publicReportsRef = firebase.database().ref("/reports/public");
    resolve(await getReports(publicReportsRef));
  });
};

export const getUserReports = uid => {
  return new Promise(async (resolve, reject) => {
    const { uid } = firebase.auth().currentUser;
    const userReportsRef = firebase.database().ref(`/userReports/${uid}/`);
    resolve(await getReports(userReportsRef));
  });
};

const getReports = ref => {
  return new Promise((resolve, reject) => {
    ref.once("value", snap => {
      const reports = [];
      snap.forEach(child => {
        const { category, description, thankCount, usersThanked } = child.val();
        const hasUserThanked = false;
        reports.push({
          category,
          description,
          thankCount,
          hasUserThanked
        });
      });
      resolve(reports.reverse());
    });
  });
};

export const submitReport = reportData => {
  const { description, category, longitude, latitude, isPublic } = reportData;
  const timestamp = new Date();
  const { uid, displayName, email } = firebase.auth().currentUser;
  const subfield = isPublic ? "public" : "private";
  const report = {
    uid,
    displayName,
    email,
    category,
    description,
    timestamp,
    longitude,
    latitude,
    thankCount: 0
  };
  const reportRef = firebase
    .database()
    .ref(`/reports/${subfield}/`)
    .push(report);
  firebase
    .database()
    .ref(`/userReports/${uid}/${reportRef.key}`)
    .set(report);
};

const toggleThank = reportID => {
  // TODO: get the user and toggle thank for that user
};
