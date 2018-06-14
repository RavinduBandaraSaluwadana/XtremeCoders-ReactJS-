'use strict';

import React, {Component} from 'react';
import PropTypes from "prop-types";

export default class AddPatient extends Component{
    static get propTypes(){
        return{
            addPatient: PropTypes.func,
            name : PropTypes.string,
            age: PropTypes.number,
            issue : PropTypes.string,
            priorityLevel: PropTypes.string
        }
    }

    constructor(props){
        super(props);
    }

    onNameChange(event){
        event.preventDefault();
        event.stopPropagation();
        this.name = event.target.value;
    }

    onAgeChange(event){
        event.preventDefault();
        event.stopPropagation();
        this.age = event.target.value;
    }

    onIssueChange(event){
        event.preventDefault();
        event.stopPropagation();
        this.issue = event.target.value;
    }

    onLevelChange(event){
        event.preventDefault();
        event.stopPropagation();
        this. priorityLevel = event.target.value;
    }

    onSubmit(event){
        event.preventDefault();
        event.stopPropagation();
        if(this.name && this.age && this.issue){
            //console.log('blaaaa');
            this.props.addPatient({name: this.name,  age: this.age, issue: this.issue, priorityLevel: this.priorityLevel});
            this.issue = "";
            this.age = "";
            this.name = "";
        }
    }

    render(){
        return <div>
            <legend>Patient registration</legend>
            <form onSubmit={event => this.onSubmit(event)}>
                <table>
                    <tr>
                        <td><label> Patient Name: </label></td>
                        <td><input type="text" onChange={event => this.onNameChange(event)}/></td>
                    </tr>
                    <tr>
                        <td><label> Patient Age: </label></td>
                        <td><input type="text" onChange={event => this.onAgeChange(event)}/></td>
                    </tr>
                    <tr>
                        <td><label> Issue: </label></td>
                        <td><input type="text" onChange={event => this.onIssueChange(event)}/></td>
                    </tr>
                    <tr>
                        <td><label>Condition: </label></td>
                        <td>
                            <select name="level" onChange={event => this.onLevelChange(event)}>
                                <option value="">Select..</option>
                                <option value="critical">critical</option>
                                <option value="major">major</option>
                                <option value="medium">medium</option>
                                <option value="minor">minor</option>
                            </select>
                        </td>
                    </tr>
                </table>
                <button type = "submit" class="btn btn-secondary">Add</button>
                <br/>
                <br/>
            </form>
        </div>
    }

}