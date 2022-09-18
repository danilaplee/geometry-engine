export const firebaseConfig = {
  apiKey: "AIzaSyBzcwX3ybLkNpbfe2Ss-1Mo_8JsV3dVbrk",
  authDomain: "geometry-lab.firebaseapp.com",
  databaseURL: "https://geometry-lab-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "geometry-lab",
  storageBucket: "geometry-lab.appspot.com",
  messagingSenderId: "853066501500",
  appId: "1:853066501500:web:8aee5ff90f42239557e8f9",
  measurementId: "G-BCW9V25BYL"
};

export const actionCodeSettings = {
  url: 'https://geometry-lab.ew.r.appspot.com/finishSignUp',
  // This must be true.
  handleCodeInApp: true,
  iOS: {
    bundleId: 'geometry-lab.danilaplee.ios'
  },
  android: {
    packageName: 'geometry-lab.danilaplee.android',
    installApp: true,
    minimumVersion: '12'
  },
  dynamicLinkDomain: 'geometry-lab.danilaplee.com'
};

export const FileUploadURL = process.env.FILE_UPLOAD_URL 
|| "https://europe-west2-geometry-lab.cloudfunctions.net/geometry-lab-dev-processPolygonPayloadSQS"

export const annotationsLink = "https://raw.githubusercontent.com/danilaplee/geometry-engine/main/annotations.json"

export const Errors = {
  nofile: "NO FILE SELECTED"
}