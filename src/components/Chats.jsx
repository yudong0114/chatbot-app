import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import {Chat} from './index';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: '36ch',
      backgroundColor: theme.palette.background.paper,
    },
}));

/**
 * チャット枠の生成
 * 
 * @param {object} props チャット内容の連想配列
 */
const Chats = (props) => {

    // チャット枠のclassの宣言
    const classes = useStyles();

    return (
        <List className={classes.root}>
            {
                // propsから受け取ったchatsの連想配列をmap関数でループ
                props.chats.map((chat, index) => {
                    return <Chat text={chat.text} type={chat.type} key={index.toString()}  />
                })
            }
        </List>
    );
}

export default Chats;