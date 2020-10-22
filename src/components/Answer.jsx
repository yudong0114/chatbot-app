import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

/**
 * Material UIで使用する変数
 * https://material-ui.com/components/buttons/
 */
const useStyles = makeStyles(() => (
    createStyles({
        "button": {
            borderColor: '#FFB549',
            color: '#FFB549',
            fontWeight: 600,
            marginBottom: '8px',
            "&:hover": {
                backgroundColor: '#FFB549',
                color: '#FFF'
            }
        }
    })
));

/**
 * 回答ボタンの生成
 * 
 * @param {string} props 回答内容のテキスト
 */
const Answer = (props) => {
    // ボタンのメソッドを読み込む
    const classes = useStyles();

    return(
        <Button 
            className={classes.button}
            variant="outlined" 
            onClick={() => props.select(props.content, props.nextId)}
        >
            {props.content}
        </Button>
    )
}

export default Answer;