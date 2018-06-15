'use strict';

import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

import About from './About';
import Home from './Home';
import Navbar from './Navbar';
import RegistrationView from './RegistrationView';
import DoctorExamView from './DoctoExamView';

export default class AppContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div>
            <Router>
                <div>
                    <div>
                        <Navbar/>
                    </div>
                    <Route exact path="/" render={props => {
                        return <RegistrationView/>
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
}
