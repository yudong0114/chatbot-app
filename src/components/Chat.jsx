import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import NoProfile from '../assets/img/no-profile.png';
import Torahack from '../assets/img/torahack.png';

/**
 * チャット表示
 * 
 * @param {object} props チャット内容の連想配列
 */
const Chat = (props) => {
    // 質問か回答かのboolを変数に格納
    const isQuestion = (props.type === 'question');
    // 質問と回答に合わせてclassの切替
    const classes = isQuestion ? 'p-chat__row' : 'p-chat__reverse';
    return (
        <ListItem className={classes}>
            <ListItemAvatar>
                {isQuestion ? (
                    <Avatar alt="icon" src={Torahack} />
                ) : (
                    <Avatar alt="icon" src={NoProfile} />
                )}
            </ListItemAvatar>
            <div className="p-chat__bubble">{props.text}</div>
        </ListItem>
    );
}

export default Chat;