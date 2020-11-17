import React, {useState, useEffect, useCallback} from 'react';
import './assets/styles/style.css';
import {AnswersList, Chats} from './components/index'
import FormDialog from './components/forms/FormDialog'
import {db} from './firebase/index'

const App = () => {
  
  // stateの初期設定
  const [answers, setAnswers] = useState([]);
  const [chats, setChats] = useState([]);
  const [currentId, setCurrentId] = useState("init");
  const [dataset, setDataset] = useState({});
  const [open, setOpen] = useState(false);

  /**
   * 次の質問を表示
   * 
   * @param {string} nextQuestionId 
   */
  const displayNextQuestion = (nextQuestionId, nextDataset) => {
    addChats({
      text: nextDataset.question,
      type: 'question'
    })

    setAnswers(nextDataset.answers);
    setCurrentId(nextQuestionId);
  }

  /**
   * 回答内容に応じて、displayNextQuestion()で次の質問を表示
   * 
   * @param {string} selectedAnswer 回答内容
   * @param {string} nextQuestionId 次に表示する質問のId
   */
  const selectAnswer = (selectedAnswer, nextQuestionId) => {
    switch (true) {

      // 問合せる回答の場合
      case (nextQuestionId === 'contact'):
        handleClickOpen();
        break;
      
      // URLの場合(httpsが含む場合)、リンクを表示
      case (/^https:*/.test(nextQuestionId)):
        const a = document.createElement('a');
        a.href = nextQuestionId;
        a.target = '_blank';
        a.click();
        break;

      // その他の場合
      default:
        addChats({
          text: selectedAnswer,
          type: 'answer',
        })

        // 引数で受け取った次の質問のIdを渡し、質問を表示、setTimeoutでやや遅延させる
        setTimeout( () => displayNextQuestion(nextQuestionId, dataset[nextQuestionId]), 1000); 
        break;
    }
  }

  const addChats = (chat) => {
    // prevChatsで前回のチャットを受け取る
    setChats(prevChats => {
      // 前回までのprevChatsに現在のchatを追加
      return[...prevChats, chat];
    });
  }

  /**
   * お問合せモーダルのクリック時にstateをtrueに変更(モーダルを開く)
   */
  const handleClickOpen = () => {
    setOpen(true);
  };

  /**
   * お問合せモーダルのクリック時にstateをfalseに変更(モーダルを閉じる)
   */
  const handleClose = useCallback( () => {
    setOpen(false);
  }, [setOpen]);

  /**
   * componentDidMountをuseEffectで書き換えたもの
   * 初期で1度のみ実行(第二引数に空の配列)
   */
  useEffect( () => {
    // 非同期処理(async付きの即時関数)
    (async() => {
      // 現在のstateを定数に
      const initDataset = {};

      // questionsに入っているdocumentsのデータを取得
      await db.collection('questions').get().then(snapshots => {
        // 取得したdocumentsをループ
        snapshots.forEach(doc => {
          // 質問のID(automation_toolなど)
          const id = doc.id;
          // 質問や回答の内容(questionやanswersなど)
          const data = doc.data();
          // dataset定数に挿入
          initDataset[id] = data;
        })
      });

      // datasetの初期化関数を実行
      setDataset(initDataset);
      // 初期の回答を送信(回答：なし、Id：init)
      displayNextQuestion(currentId, initDataset[currentId]);
    })()
  }, []);

  /**
   * componentDidUpdateをuseEffectで書き換えたもの
   * state変更後に毎回実行(第二引数に指定なし)
   */
  useEffect(() => {
    // チャットエリアのDOMを取得
    const scrollArea = document.getElementById('scroll-area');
    // scrollAreaが存在する場合、上にスクロール
    if(scrollArea){
      scrollArea.scrollTop = scrollArea.scrollHeight;
    }
  })

  return (
    <section className="c-section">
      <div className="c-box">
        <Chats chats={chats} />
        <AnswersList answers={answers} select={selectAnswer} />
        <FormDialog open={open} handleClose={handleClose} />
      </div>
    </section>
  );
}

export default App