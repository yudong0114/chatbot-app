import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

/**
 * Material UIで使用する変数
 * https://material-ui.com/components/buttons/
 */
const useStyles = makeStyles((theme) => ({
    root: {

    },
}));

/**
 * 回答ボタンの生成
 * 
 * @param {string} props 回答内容のテキスト
 */
const Answer = (props) => {
    // ボタンのメソッドを読み込む(一時的にコメントアウト)
    // const classes = useStyles();
    return(
        <Button variant="contained" color="primary">
            {props.content}
        </Button>
    )
}

export default Answer;