'use strict';

import React, {Component} from 'react';
import PropTypes from "prop-types";
import Patient from "../Modules/Patient";
import axios              from 'axios';
var Base = require('../APIspecs');

export default class ViewPatient extends Component{
    static get propTypes(){
        return{
            viewPatient: PropTypes.func,
            patient: PropTypes.object,
            name: PropTypes.string,
            age: PropTypes.number,
            issue : PropTypes.string,
            address:PropTypes.string,
            admittedBy: PropTypes.string,
            contactNo: PropTypes.string

        }
    }

    constructor(props){
        super(props);
        this.state = ({
            show: false
        })
        this.patient = this.props.patient;
        console.log(this.patient._id);
    }

    admit(){
        this.setState({
            show: true
        })
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

    onAddressChange(event){
        event.preventDefault();
        event.stopPropagation();
        this.address = event.target.value;
    }

    onAdmittedChange(event){
        event.preventDefault();
        event.stopPropagation();
        this.admittedBy = event.target.value;
    }

    onContactNoChange(event){
        event.preventDefault();
        event.stopPropagation();
        this.contactNo = event.target.value;
    }

    admitPatient(id, patient){
        axios.put(Base.nodeAPI+"/patient/"+id,patient).then(res =>{
            if(res.status == 200){
                //console.log(res);
                axios.get(Base.nodeAPI+"/patient/"+id).then(result =>{
                    if(result.status == 200){
                        //console.log(result);
                        alert("Patient AdmissionNo: "+ result.data[0].admissionNo);
                        this.setState({
                            show: false
                        });
                    }
                }).catch(err => {
                    alert(err);
                })
            }
        }).catch(err =>{
            alert(err);
        })
    }
    onSubmit(event){
        event.preventDefault();
        event.stopPropagation();
        var today = new Date();
        var admission = today.getFullYear()+150+this.patient._id;
        var patientInstance = {
            name: this.patient.name || this.name,
            age: this.patient.age || this.age,
            issue: this.patient.issue || this.issue,
            priorityLevel: this.patient.priorityLevel,
            status: "admitted",
            admittedDate: this.patient.admittedDate,
            address: this.address,
            admittedBy: this.admittedBy,
            contactNo: this.contactNo,
            admissionNo: admission
        };
        this.admitPatient(this.patient._id, patientInstance);
        this.props.action(event);
    }

    render(){

            return <div class="container">
                <form onSubmit={event => this.onSubmit(event)}>
                    <label> Patient Name: </label>
                    <input type="text" value={this.patient.name} onChange={event => this.onNameChange(event)}/>
                    <br/>
                    <br/>
                    <label> Patient Age: </label>
                    <input type="text" value={this.patient.age} onChange={event => this.onAgeChange(event)}/>
                    <br/>
                    <br/>
                    <label> Issue: </label>
                    <input type="text" value={this.patient.issue} onChange={event => this.onIssueChange(event)}/>
                    <br/>
                    <br/>
                    <div className="admit">
                        <label> Admitted By: </label>
                        <input type="text" onChange={event => this.onAdmittedChange(event)}/>
                        <br/>
                        <br/>
                        <label> Address: </label>
                        <input type="text" onChange={event => this.onAddressChange(event)}/>
                        <br/>
                        <br/>
                        <label> Contact No: </label>
                        <input type="text" onChange={event => this.onContactNoChange(event)}/>
                        <br/>
                        <br/>
                        <button type = "submit" class="btn btn-secondary">Admit patient</button>
                    </div>
                    <br/>
                    <br/>
                </form>
            </div>


    }



}