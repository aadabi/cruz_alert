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
        const { title, category, description, thankCount, usersThanked } = child.val();
        const temp = child.val().hasUserThanked;
        // encode as string to pass into array
        const hasUserThanked = JSON.stringify(temp);
        const currKey = child.key;
        reports.push({
          title,
          currKey,
          category,
          description,
          thankCount,
          hasUserThanked,
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

export const toggleThank = (reportID, prevThankCount, prevHasUserThanked) => {
  const { uid } = firebase.auth().currentUser;
  // check if user already thanked report
  firebase
    .database()
    .ref(`/reports/public/${reportID}/hasUserThanked`)
    .once("value", snap => {
      const findUser = snap.val();
      if (findUser == null) {
        incrementThank(uid, reportID, 0, {});
      }
      console.log("findUser: ", findUser[uid]);
      // check if user has thanked this report
      if (findUser[uid] == true) {
        //decrement
        console.log("decrement");
        decrementThank(uid, reportID, prevThankCount, prevHasUserThanked);
      } else {
        //increment
        console.log("increment");
        incrementThank(uid, reportID, prevThankCount, prevHasUserThanked);
      }
  });
  
  
};

const incrementThank = (uid, reportID, prevThankCount, prevHasUserThanked) => {
    const thankCount = prevThankCount + 1;
    const hasUserThanked = prevHasUserThanked;
    hasUserThanked[uid] = true;
    const thankData = { thankCount, hasUserThanked };
    firebase
      .database()
      .ref(`/reports/public/${reportID}/`)
      .update(thankData);
}

const decrementThank = (uid, reportID, prevThankCount, _prevHasUserThanked) => {
  // decode json object
  const prevHasUserThanked = JSON.parse(_prevHasUserThanked);
  const thankCount = prevThankCount - 1;
  delete prevHasUserThanked[uid];
  const hasUserThanked = prevHasUserThanked;
  const thankData = { thankCount, hasUserThanked }
  firebase
    .database()
    .ref(`/reports/public/${reportID}/`)
    .update(thankData);
}
