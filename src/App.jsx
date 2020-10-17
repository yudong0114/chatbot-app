import React from 'react';
import defaultDataset from './dataset';
import './assets/styles/style.css';
import {AnswersList} from './components/index'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    // stateの初期設定
    this.state = {
      answers: [],
      chats: [],
      currentId: "init",
      dataset: defaultDataset,
      open: false
    }
  }

  /**
   * currentIdの値からdataset.jsからanswersのデータ(配列)を受け取る
   */
  initAnswer = () => {
    const initDataset = this.state.dataset[this.state.currentId];
    const initAnswers = initDataset.answers;
    this.setState({
      answers: initAnswers
    })
  }

  /**
   * render()後に実行
   */
  componentDidMount() {
    // answersのデータ(配列)を受け取るメソッドの実行
    this.initAnswer();
  }

  render() {
    return (
      <section className="c-section">
        <div className="c-box">
        <AnswersList answers={this.state.answers} />
        </div>
      </section>
    );
  }
}