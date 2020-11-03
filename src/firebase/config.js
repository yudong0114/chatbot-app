// For Firebase JS SDK v7.20.0 and later, measurementId is optional
/**
 * 指定プロジェクトのfirebaseの設定
 * プロジェクトの設定 -> Firebase SDK snippetの構成で設定が書き出されます。
 * 各設定内容は.envに記載(ローカルなら.env.local)
 */
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

export default firebaseConfig;