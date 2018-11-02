import React, {Component} from 'react';
import {connect} from 'react-redux';
import io from 'socket.io-client';
import '../App.css';
import Messages from './Messages';

class Chat extends Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            message:'',
            users:[],
            messages: []
        }

        // This doesn't belong in the state, it's our socket
        this.socket = null;

        // Bindings
        this.onMessageChange = this.onMessageChange.bind(this);
        this.onSubmitMsg = this.onSubmitMsg.bind(this);
        this.onUserJoin = this.onUserJoin.bind(this);
        this.onUserLeft = this.onUserLeft.bind(this);
        this.onMessage = this.onMessage.bind(this);
    }

    onMessageChange(evt)
    {
        this.setState({message: evt.target.value});
    }

    componentDidMount()
    {
        // DO THE SOCKET.IO CONNECTION
        this.socket = io('http://localhost:4000');

        this.socket.on('userJoined', this.onUserJoin);
        this.socket.on('userLeft', this.onUserLeft);
        this.socket.on('msg', this.onMessage);

        this.socket.connect();
    }

    onSubmitMsg(evt)
    {
        evt.preventDefault();

        // Emit the message
        this.socket.emit('msg', {msg:this.state.message});

        // Clear the input box
        this.setState({message:''});
    }

    onUserJoin(data)
    {
        //alert('user added: ' + data.serverMsg + "\nUsers" + data.users)
        this.setState({messages: this.state.messages.concat({msg:data.msg, type:'server'})});
    }

    onUserLeft(data)
    {
        //alert('user left: ' + data.serverMsg + "\nUsers" + data.users)
        this.setState({messages: this.state.messages.concat({msg:data.msg, type:'server'})});
    }

    onMessage(data)
    {
        //alert('message => ' + data.msg);
        this.setState({messages: this.state.messages.concat({msg:data.msg, type:'user'})});
    }

    render()
    {
        return (
        <div>
            <div className="topcontainer">
                    <Messages messages={this.state.messages}/>
            </div>
            <div className="botcontainer">
                <form onSubmit={this.onSubmitMsg}>
                    <div className="chat">
                        <input type="text" onChange={this.onMessageChange} value={this.state.message}/>
                        <input type="submit"/>
                    </div>
                </form>
            </div>
        </div>
        )
    }
}

function mapStateToProps(state)
{
    return {}
}

export default connect(mapStateToProps)(Chat);