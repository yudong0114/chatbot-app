import React from 'react';
import {Answer} from './index'

/**
 * 回答内容枠の作成
 * 
 * @param {object} props 回答内容の連想配列
 */
const AnswersList = (props) => {
    return(
        <div className="c-grid__answer">
            {
                // propsから受け取ったanswersの連想配列をmap関数でループ
                // keyは渡さないとエラーになるため必要
                props.answers.map((value, index) => {
                    return <Answer content={value.content} nextId={value.nextId} key={index.toString()} select={props.select}  />
                })
            }
        </div>
    )
}

export default AnswersList;