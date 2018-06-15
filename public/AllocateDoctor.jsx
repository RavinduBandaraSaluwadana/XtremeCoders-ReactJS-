'use strict';

import React, {Component} from 'react';
import axios from 'axios';
import Base from '../APIspecs';
import ViewHistory from "../Conrollers/ViewHistory";
import PropTypes from "prop-types";

export default class AllocateDoctor extends Component{
    constructor(props){
        super(props);
    }

    getByPririty(priorityLevel){
        axios.get(Base.nodeAPI+'/doctor/'+id).then(results =>{
            console.log("inside delete");
            this.refreshHandler();
        }).catch(err =>{
            alert(err);
        })
    }

    onLevelChange(event){
        event.preventDefault();
        event.stopPropagation();
        this.priorityLevel = event.target.value;
    }

    onSubmit(event) {
        event.preventDefault();
        event.stopPropagation();
    }



    render() {
        return <div>
            <div className="jumbotron text-center">
                <h2> Allocate Doctors </h2>
            </div>
            <div>
                <form onSubmit={event => this.onSubmit(event)}>
                    <table>
                        <tr>
                            <td><label> Patient Condition: </label></td>
                            &nbsp;
                            <td>
                                <select name="level" onChange={event => this.onLevelChange(event)}>>
                                    <option value="critical">critical</option>
                                    <option value="major">major</option>
                                    <option value="medium">medium</option>
                                    <option value="minor">minor</option>
                                </select>
                            </td>
                            &nbsp;
                            <td> <button type = "submit" className="btn btn-secondary" > Search </button> </td>
                        </tr>
                    </table>
                </form>
            </div>
        </div>
    }
}