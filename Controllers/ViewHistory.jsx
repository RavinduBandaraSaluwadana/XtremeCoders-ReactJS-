'use strict';

import React, {Component} from 'react';
var Base  = require('../APIspecs');

export default class ViewHistory extends Component{
    return() {
        return <div>
            <form>
                <table>
                    <tr>
                        <td><label> Name: </label></td>
                        <td><input type="text"/></td>
                    </tr>
                    <tr>
                        <td><label> Age: </label></td>
                        <td><input type="text"/></td>
                    </tr>
                    <tr>
                        <td><label> Allergies: </label></td>
                        <td><input type="text"/></td>
                    </tr>
                    <tr>
                        <td><label> Treatments: </label></td>
                        <td><input type="text" /></td>
                    </tr>
                </table>
            </form>
        </div>
    }
}