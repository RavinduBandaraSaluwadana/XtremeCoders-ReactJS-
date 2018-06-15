'use strict';

import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Search from './SearchAllPatients';
import DPatiants from './AllDischargePatiants';
import About from './About';
import Home from './Home';
import Navbar from './Navbar';
import RegistrationView from './RegistrationView';
import DoctorExamView from './DoctoExamView';
import Login from '../Controllers/Login';

export default class AppContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logedIn: false
        }
        this.logHandler = this.logHandler.bind(this);
    }

    logHandler(){
        this.setState({
            logedIn: true
        })
    }

    render() {
        if(this.state.logedIn){
            return <div>
                <Router>
                    <div>
                        <div>
                            <Navbar/>
                        </div>
                        <Route exact path="/" render={props => {
                            return <RegistrationView/>
                        }}/>
                        <Route path={"/discharge"} render={props => {
                            return <DPatiants/>
                        }}/>
                        <Route path={"/search"} render={props =>{
                            return <Search/>
                        }}/>
                        <Route path="/about" render={props => {
                            return <About/>
                        }}/>
                        <Route path="/exams" render={props => {
                            return <DoctorExamView/>
                        }}/>
                    </div>
                </Router>
            </div>;
        }
       else{
            return <Login log={this.logHandler}/>
        }
    }
}
