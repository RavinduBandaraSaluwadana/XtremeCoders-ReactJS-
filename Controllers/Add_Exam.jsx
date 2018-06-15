'use strict';

import React, {Component} from 'react';
import PropTypes from "prop-types";

export default class Add_Exam extends Component{
    static get propTypes(){
        return{
            addExam: PropTypes.func,
            patientid:PropTypes.number,
            name : PropTypes.string,
            complaints:PropTypes.array(),
            allergies:PropTypes.array(),
            physicalExaminations:PropTypes.array(),
            treatments:PropTypes.array(),
            drugs:PropTypes.array()
        }
    }

    constructor(props){
        super(props);
    }

    onPatientIdChange(event){
        event.preventDefault();
        event.stopPropagation();
        this.patientid= event.target.value;
    }

    onNameChange(event){
        event.preventDefault();
        event.stopPropagation();
        this.name = event.target.value;
    }

    onComplaintsChange(event){
        event.preventDefault();
        event.stopPropagation();
        this.complaints = event.target.value;
    }

    onAllergiesChange(event){
        event.preventDefault();
        event.stopPropagation();
        this.allergies = event.target.value;
    }

    onPhysicalExaminationsChange(event){
        event.preventDefault();
        event.stopPropagation();
        this.physicalExaminations = event.target.value;
    }

    onTreatmentsChange(event){
        event.preventDefault();
        event.stopPropagation();
        this.complaints = event.target.value;
    }

    ondrugsChange(event){
        event.preventDefault();
        event.stopPropagation();
        this.drugs = event.target.value;
    }

    onSubmit(event){
        event.preventDefault();
        event.stopPropagation();
        if(this.patientid && this.name){
            console.log('blaaaa');
            this.props.addExam({patientid : this.patientid,name: this.name, complaints:this.complaints, allergies:this.allergies, physicalExaminations:this.physicalExaminations,treatments:this.treatments,drugs:this.drugs});
            this.patientid = "";
            this.name = "";
            this.complaints = "";
            this.allergies = "";
            this.physicalExaminations = "";
            this.treatments = "";
            this.drugs = "";

        }
    }

    render(){
        return <div>
            <legend>Doctor Examination</legend>
            <form onSubmit={event => this.onSubmit(event)}>
                <table>
                    <tr>
                        <td><label>Patient Id: </label></td>
                        <td>
                            <select patientid="id" onChange={event => this.onLevelChange(event)}>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td><label> Name: </label></td>
                        <td><input type="text" onChange={event => this.onNameChange(event)}/></td>
                    </tr>
                    <tr>
                        <td><label> Cpmplaints : </label></td>
                        <td><input type="text" onChange={event => this.onComplaintsChange(event)}/></td>
                    </tr>
                    <tr>
                        <td><label> Allergies : </label></td>
                        <td><input type="text" onChange={event => this.onAllergiesChange(event)}/></td>
                    </tr>
                    <tr>
                        <td><label> Physical Examinations : </label></td>
                        <td><input type="text" onChange={event => this.onPhysicalExaminationsChange(event)}/></td>
                    </tr>
                    <tr>
                        <td><label> Treatments : </label></td>
                        <td><input type="text" onChange={event => this.onTreatmentsChange(event)}/></td>
                    </tr>
                    <tr>
                        <td><label> Drugs : </label></td>
                        <td><input type="text" onChange={event => this.ondrugsChange(event)}/></td>
                    </tr>

                </table>
                <button type = "submit" class="btn btn-secondary">Add</button>
                <br/>
                <br/>
            </form>
        </div>
    }

}