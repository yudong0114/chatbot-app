import * as functions from 'firebase-functions'; 
import * as admin from "firebase-admin"; 
//import { object } from 'firebase-functions/lib/providers/storage';
// 初期化
admin.initializeApp(); 
// 管理者権限を定数に宣言
const db = admin.firestore();

/**
 * レスポンスの生成関数
 * 
 * @param response   レスポンスの内容
 * @param statusCode ステータスコード
 * @param body       メッセージ
 */
const sendResponse = (response: functions.Response, statusCode: number, body: any) => {
    response.send({
        statusCode,
        body: JSON.stringify(body)
    });
}

/**
 * jsonのデータをセットするためのAPIを作成
 * 
 * メモ：Firebase
 * 参考：https://firebase.google.com/docs/firestore?hl=ja#how_does_it_work
 * collection(DBだとDB自体？) > document(DBだとテーブル？) > data(DBだと各レコード)
 * 
 * 今回作成した関数がjsonをFirebaseに登録できるもの(curl使用)
 * curl -X POST -H "Content-Type: application/json" -d @dataset.json {firebaseのurl}
 */
export const addDataset = functions.https.onRequest(async (req: any, res: any) => {
    // POST以外の時エラーを返す
    if (req.method !== 'POST') {
        // 失敗のレスポンスを返す
        sendResponse(res, 405, {error: 'Invalid Request!'});
    } 
    // 成功の場合
    else {
        // 定数にリクエストのデータの内容を挿入
        const dataset = req.body;
        // ループでcollectionに挿入するdataを生成・セット
        for (const key of Object.keys(dataset)) {
            // dataを作成
            const data = dataset[key];
            // collectionにセット
            await db.collection('questions').doc(key).set(data);
        }
        // 成功のレスポンスを返す
        sendResponse(res, 200, {message: 'Successful added dataset!'});
    }
})