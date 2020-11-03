import React from 'react';
import './assets/styles/style.css';
import {AnswersList, Chats} from './components/index'
import FormDialog from './components/forms/FormDialog'
import {db} from './firebase/index'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    // stateの初期設定
    this.state = {
      answers: [],
      chats: [],
      currentId: "init",
      dataset: {},
      open: false
    }
    // コールバック関数をbind(renderするたびに関数が生成されパフォーマンスが落ちるためbind)
    this.selectAnswer = this.selectAnswer.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  /**
   * 次の質問を表示
   * 
   * @param {string} nextQuestionId 
   */
  displayNextQuestion = (nextQuestionId) => {
    const chats = this.state.chats;
    chats.push({
      text: this.state.dataset[nextQuestionId].question,
      type: 'question'
    })

    this.setState({
      answers: this.state.dataset[nextQuestionId].answers,
      chats: chats,
      currentId: nextQuestionId
    })
  }

  /**
   * 回答内容に応じて、displayNextQuestion()で次の質問を表示
   * 
   * @param {string} selectedAnswer 回答内容
   * @param {string} nextQuestionId 次に表示する質問のId
   */
  selectAnswer = (selectedAnswer, nextQuestionId) => {
    switch (true) {
      // 初期の回答(空)の場合
      case (nextQuestionId === 'init'):
        // initの質問内容の表示、setTimeoutでやや遅延させる
        setTimeout( () => this.displayNextQuestion(nextQuestionId), 500); 
        break;

      // 問合せる回答の場合
      case (nextQuestionId === 'contact'):
        this.handleClickOpen();
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
        // 現在のチャット内容を取得
        const chats = this.state.chats;
        // 回答内容をchats履歴に追加
        chats.push({
          text: selectedAnswer,
          type: 'answer',
        })
    
        // chatsのstateの更新
        this.setState({
          chats: chats
        })

        // 引数で受け取った次の質問のIdを渡し、質問を表示、setTimeoutでやや遅延させる
        setTimeout( () => this.displayNextQuestion(nextQuestionId), 1000); 
        break;
    }
  }

  /**
   * お問合せモーダルのクリック時にstateをtrueに変更(モーダルを開く)
   */
  handleClickOpen = () => {
    this.setState({open: true});
  };

  /**
   * お問合せモーダルのクリック時にstateをfalseに変更(モーダルを閉じる)
   */
  handleClose = () => {
      this.setState({open: false});
  };

  /**
   * datasetを初期化
   * 
   * @param {object} dataset 引数のdatasetをstateを更新
   */
  initDataset = (dataset) => {
    // stateの更新
    this.setState({dataset: dataset});
  }

  /**
   * render()後に実行
   */
  componentDidMount() {
    // 非同期処理(async付きの即時関数)
    (async() => {
      // 現在のstateを定数に
      const dataset = this.state.dataset;
      // questionsに入っているdocumentsのデータを取得
      await db.collection('questions').get().then(snapshots => {
        // 取得したdocumentsをループ
        snapshots.forEach(doc => {
          // 質問のID(automation_toolなど)
          const id = doc.id;
          // 質問や回答の内容(questionやanswersなど)
          const data = doc.data();
          // dataset定数に挿入
          dataset[id] = data;
        })
      });
      // datasetの初期化関数を実行
      this.initDataset(dataset);
      // 初期は回答がないため空を宣言
      const initAnswer = "";
      // 初期の回答を送信(回答：なし、Id：init)
      this.selectAnswer(initAnswer, this.state.currentId);
    })();
  }

  /**
   * state変更後の再render()後に実行
   * 
   * @param {*} prevProps 前回のProps
   * @param {*} PrevState 前回のPrevState
   * @param {*} snapshot  スナップショット
   */
  componentDidUpdate(prevProps, PrevState, snapshot) {
    // チャットエリアのDOMを取得
    const scrollArea = document.getElementById('scroll-area');
    // scrollAreaが存在する場合、上にスクロール
    if(scrollArea){
      scrollArea.scrollTop = scrollArea.scrollHeight;
    }
  }

  render() {
    return (
      <section className="c-section">
        <div className="c-box">
          <Chats chats={this.state.chats} />
          <AnswersList answers={this.state.answers} select={this.selectAnswer} />
          <FormDialog open={this.state.open} handleClose={this.handleClose} />
        </div>
      </section>
    );
  }
}