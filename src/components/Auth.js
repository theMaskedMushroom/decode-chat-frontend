import React, { Component } from 'react';
import {connect} from 'react-redux';

class Auth extends Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            name:'',
            password:'',
            msg:''
        }

        // Bindings
        this.onNameChange = this.onNameChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.processServerResponse = this.processServerResponse.bind(this);
    }

    onNameChange(evt)
    {
        this.setState({name:evt.target.value});
    }

    onPasswordChange(evt)
    {
        this.setState({password:evt.target.value});
    }

    onSubmit(evt)
    {
        evt.preventDefault();

        // Do the fetch here
        fetch(this.props.endpoint, {
            method:'POST',
            credentials:'include',
            body: JSON.stringify({username:this.state.name, password:this.state.password})
        })
        .then(function(response){ return response.text()})
        .then(this.processServerResponse)

        // Clear input boxes
        this.setState({name:'', password:''})
    }

    processServerResponse(jsonString)
    {
        let parsedObj = JSON.parse(jsonString);

        // if there's a message from the server, display it
        if (parsedObj.msg)
        {
            this.setState({msg:parsedObj.msg})
        }

        // Dispatch the object as an "authResponse" action
        this.props.dispatch({type:'authResponse', payload:parsedObj});
    }

    render()
    {
        return (<form onSubmit={this.onSubmit}>
                    <div>{this.props.title}</div>
                    <div>Name: <input onChange={this.onNameChange} value={this.state.name}/></div>
                    <div>Password: <input type='password' onChange={this.onPasswordChange} value={this.state.password}/><input type='submit'/></div>
                    {(this.state.msg !== '') && <div>{this.state.msg}</div>}
                </form>);
    }
}

function mapStateToProps(state)
{
    return {msg:state.msg};
}

export default connect(mapStateToProps)(Auth);