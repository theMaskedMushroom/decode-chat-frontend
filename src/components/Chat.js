import React, {Component} from 'react';
import {connect} from 'react-redux';
import io from 'socket.io-client';
import '../App.css';

class Chat extends Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            message:'',
            users:[]
        }

        // This doesn't belong in the state, it's our socket
        this.socket = null;

        // Bindings
        this.onMessageChange = this.onMessageChange.bind(this);
        this.onSubmitMsg = this.onSubmitMsg.bind(this);
        this.onUserJoin = this.onUserJoin.bind(this);
        this.onUserLeft = this.onUserLeft.bind(this);
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
        alert('user added: ' + data.serverMsg + "\nUsers" + data.users)
    }

    onUserLeft(data)
    {
        alert('user left: ' + data.serverMsg + "\nUsers" + data.users)
    }

    onMessage(data)
    {
        alert('message => ' + data.msg);
    }

    render()
    {
        return (
        <div>
            <div className="topcontainer">
                <div> jack: hello </div>
                <div> bob: hey </div>
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