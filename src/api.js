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
    const { uid } = firebase.auth().currentUser;
    ref.once("value", snap => {
      const reports = [];
      snap.forEach(child => {
        const {
          title,
          category,
          description,
          thankCount,
          usersThanked,
          isPublic
        } = child.val();
        const hasUserThanked =
          child.val().hasUserThanked !== undefined &&
          child.val().hasUserThanked[uid];
        const reportID = child.key;
        const report = {
          title,
          reportID,
          category,
          description,
          thankCount,
          hasUserThanked,
          isPublic
        };
        console.log(report);
        reports.push(report);
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

export const toggleThank = (reportID, isPublic) => {
  const currentUserUID = firebase.auth().currentUser.uid;
  const subfield = isPublic ? "public" : "private";
  console.log("ispublic:", subfield);
  const reportRef = firebase.database().ref(`/reports/${subfield}/${reportID}`);
  reportRef.once("value", snap => {
    const reportOwnerUID = snap.val().uid;
    const userReportRef = firebase
      .database()
      .ref(`/userReports/${reportOwnerUID}/${reportID}`);
    const hasUserThanked =
      snap.val().hasUserThanked !== undefined &&
      snap.val().hasUserThanked[currentUserUID] === true;
    const thankCount = snap.val().thankCount;
    console.log("thankCount:", thankCount);
    if (hasUserThanked) {
      reportRef.child(`/hasUserThanked/${currentUserUID}`).remove();
      userReportRef.child(`/hasUserThanked/${currentUserUID}`).remove();
      reportRef.child("/thankCount").set(thankCount - 1);
      userReportRef.child("/thankCount").set(thankCount - 1);
    } else {
      reportRef.child(`/hasUserThanked/${currentUserUID}`).set(true);
      userReportRef.child(`/hasUserThanked/${currentUserUID}`).set(true);
      reportRef.child("/thankCount").set(thankCount + 1);
      userReportRef.child("/thankCount").set(thankCount + 1);
    }
  });
};
