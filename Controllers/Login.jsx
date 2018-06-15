'use strict';

import React, {Component} from 'react';
import PropTypes from "prop-types";

export default class Login extends Component{
    constructor(props){
        super(props);
        this.logStatus = this.props.log;
    }

    onUserNameChange(event){
        event.preventDefault();
        event.stopPropagation();
        this.username = event.target.value;
    }

    onPasswordChange(event){
        event.preventDefault();
        event.stopPropagation();
        this.password = event.target.value;
    }

    login(){
        if(this.password=== "admin123" && this.username==="admin"){
            this.logStatus();
        }else{
            alert("Invalid Username or password")
        }
    }

    render(){
        return <div>
        <div class="container" id="login">
                <div class="row">
                    <div class="col-md-offset-4 col-md-8">
                        <div class="form-login">
                            <h4>Progressive Care Unit</h4>
                            <label>username </label>
                            <input type="text" id="userName" class="form-control input-md chat-input" placeholder="username" onChange={event => this.onUserNameChange(event)} />
                        <br/>
                            <label>password</label>
                        <input type="password" id="userPassword" class="form-control input-md chat-input" placeholder="password" onChange={event => this.onPasswordChange(event)}/>
                    <br/>
                    <div class="wrapper">
            <span class="group-btn">
                <button className="btn btn-info btn-md" onClick={()=> this.login()}>Login</button>
            </span>
                    </div>
                </div>
                    </div>
            </div>
                </div>
        </div>


    }
}