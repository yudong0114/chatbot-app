import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextInput from './TextInput';

export default class FormDialog extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            name: "",
            email: "",
            description: ""
        }

        // コールバック関数をbind(renderするたびに関数が生成されパフォーマンスが落ちるためbind)
        this.inputName = this.inputName.bind(this);
        this.inputEmail = this.inputEmail.bind(this);
        this.inputDescription = this.inputDescription.bind(this);
    }

    /**
     * 名前のフィールドのstateの変更
     * 
     * @param {object} event 
     */
    inputName = (event) => {
        this.setState({name: event.target.value});
    }

    /**
     * Emailのフィールドのstateの変更
     * 
     * @param {object} event 
     */
    inputEmail = (event) => {
        this.setState({email: event.target.value});
    }

    /**
     * お問合せ内容のフィールドのstateの変更
     * 
     * @param {object} event 
     */
    inputDescription = (event) => {
        this.setState({description: event.target.value});
    }

    /**
     * お問合せ内容の送信
     */
    submitForm = () => {
        // 名前の入力値を変数に格納
        const name = this.state.name;
        // Emailの入力値を変数に格納
        const email = this.state.email;
        // お問合せ内容の入力値を変数に格納
        const description = this.state.description;

        // slackに通知する内容
        const payload = {
            text: "【お問合せがありました！】\n" + 
                  "■お名前： " + name + "\n" + 
                  "■Email： " + email + "\n" + 
                  "■お問合せ内容： \n" + description
        }

        // slackのwebhookを変数に格納(.env.localにWEBHOOKの宣言)
        const url = process.env.REACT_APP_SLACK_WEBHOOK_URL;

        // APIにデータを送信
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(payload)
        }).then(() => {
            // 送信完了のアラートの表示
            alert('送信が完了しました！追ってご連絡します！');
            // stateを空に変更(次にモーダルを開いた時にお問合せ内容を空に)
            this.setState({
                name: "",
                email: "",
                description: ""
            })
            return this.props.handleClose();
        })
    }

    render () {
        return (
            <Dialog
                open={this.props.open}
                onClose={this.props.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"お問合せフォーム"}</DialogTitle>
                <DialogContent>
                    <TextInput 
                        label={"お名前(必須)"}
                        multiline={false}
                        rows={1}
                        value={this.state.name}
                        type={"text"}
                        onChange={this.inputName}
                    />
                    <TextInput 
                        label={"メールアドレス(必須)"}
                        multiline={false}
                        rows={1}
                        value={this.state.email}
                        type={"email"}
                        onChange={this.inputEmail}
                    />
                    <TextInput 
                        label={"お問合せ内容(必須)"}
                        multiline={true}
                        rows={5}
                        value={this.state.description}
                        type={"text"}
                        onChange={this.inputDescription}
                    />
                </DialogContent>
                <DialogActions>
                <Button onClick={this.props.handleClose} color="primary">
                    キャンセル
                </Button>
                <Button onClick={this.submitForm} color="primary" autoFocus>
                    送信する
                </Button>
                </DialogActions>
            </Dialog>
        )
    }
}