import React, {Component} from 'react';
import shortId from 'shortid';

class Messages extends Component
{
    formatMessages()
    {
        let messageArr = [];
        let thisMsg;

        for (let i = 0; i < this.props.messages.length; i++)
        {
            thisMsg = this.props.messages[i];// msg format is {type:'server or user', msg:'message...'}
            messageArr.push(<div key={shortId.generate()} className={(thisMsg.type === 'server'? 'serverMsg' : 'userMsg')}>{thisMsg.msg}</div>);
        }

        return messageArr;
    }

    render()
    {
        return <>{this.formatMessages()}</>;
    }
}

export default Messages;