'use strict';

import React, {Component} from 'react';
import PropTypes          from 'prop-types';
import Patient            from './Patient.jsx';

export default class Shift extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return <div>
            <table className="table">
                <thread>
                    <tr>
                        <th> Patient ID </th>
                        <th> Name </th>
                        <th> Allergies </th>
                        <th> Treatments </th>
                        <th> Complaints </th>
                    </tr>
                </thread>
            </table>
        </div>
    }
}