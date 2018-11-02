import React, { Component } from 'react';
import './App.css';
import {connect} from 'react-redux';
import Auth from './components/Auth';
import Chat from './components/Chat';

class App extends Component 
{
  constructor(props)
  {
    super(props);

    // Bindings
    this.processServerResponse = this.processServerResponse.bind(this);
  }

  componentDidMount()
    {
        // Do the fetch here
        fetch('/login', {
            method:'GET',
            credentials:'include'
        })
        .then(function(response){ return response.text()})
        .then(this.processServerResponse)
    }

    processServerResponse(jsonString)
    {
        let parsedObj = JSON.parse(jsonString);

        // Dispatch the object as an "authResponse" action
        this.props.dispatch({type:'authResponse', payload:parsedObj});
    }

  render()
  {
    return (
      <div className="App">
        {!this.props.loggedIn && <><Auth endpoint='/login' title='Login'/><Auth endpoint='/signup' title='Signup'/></>}
        {this.props.loggedIn && <Chat/>}
      </div>
    );
  }
}

function mapStateToProps(state)
{
  return {loggedIn:state.loggedIn};
}

export default connect(mapStateToProps)(App);
