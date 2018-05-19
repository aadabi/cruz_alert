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
  const { displayName, email, uid } = firebase.auth().currentUser;
  const timestamp = new Date();
  const report = {
    ...reportData,
    displayName,
    email,
    uid,
    timestamp,
    thankCount: 0
  };
  const subfield = reportData.isPublic ? "public" : "private";
  console.log(report);
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
