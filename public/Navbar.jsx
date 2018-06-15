'use strict';

import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class Navbar extends Component{
    render(){
        return <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <a className="navbar-brand" href="#">Progressive Care Unit </a>
                <button className="navbar-toggler" aria-expanded="false" aria-controls="navbarColor02" aria-label="Toggle navigation" type="button" data-target="#navbarColor02" data-toggle="collapse">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarColor02">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="/">Patient Registration <span class="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/discharge">Discharge Patients</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/search">Transfer Patients </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/exams">Patient Examinations</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>;
    }
}