'use strict';

import React, {Component} from 'react';
import PropTypes from "prop-types";
import axios from "axios/index";
var Base = require('../APIspecs');

export default class AdmittPatient extends Component{
    static get propTypes(){
        return({
            id: PropTypes.number,
            patient: PropTypes.object
        })
    }
    constructor(props){
        super(props);
        this.id = this.props.id;
        this.patient = this.props.patient;
        // this.state ={
        //     patient: null
        // }
        console.log(this.id);
        this.modalname = "myModal"+this.id;
        this.target = "#myModal"+this.id
        //this.getPatient(this.props.id);
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

    // getPatient(id){
    //     axios.get(Base.nodeAPI+"/patient/"+id).then(result =>{
    //         if(result.status == 200){
    //             console.log(result);
    //             this.setState({
    //                 patient: result.data[0]
    //             })
    //             //alert("Patient AdmissionNo: "+ result.data[0].admissionNo);
    //         }
    //     }).catch(err => {
    //         alert(err);
    //     })
    // }

    admitPatient(id, patient){
        axios.put(Base.nodeAPI+"/patient/"+id,patient).then(res =>{
            if(res.status == 200){
                //console.log(res);
                axios.get(Base.nodeAPI+"/patient/"+id).then(result =>{
                    if(result.status == 200){
                        //console.log(result);
                        alert("Patient AdmissionNo: "+ result.data[0].admissionNo);
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
        //var old = null;
        console.log(this.id);
        var today = new Date();
        var admission = today.getFullYear()+150+this.id;
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
        this.admitPatient(this.id, patientInstance);
    }

    render(){
        if(this.patient.status == "admitted"){
            return <div>
                <button type="button" class="btn btn-info" disabled>
                    Admit Patient
                </button>
            </div>
        }
        else{
            return <div>
                <button type="button" class="btn btn-info" data-toggle="modal" data-target={this.target}>
                    Admit Patient
                </button>
                <div class="modal fade" id={this.modalname}>
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h4 class="modal-title">Patient Admission</h4>
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div class="modal-body">
                                <form onSubmit={event => this.onSubmit(event)}>
                                    <table>
                                        <tr>
                                            <td><label> Patient Name: </label></td>
                                            <td><input type="text" value={this.patient.name} onChange={event => this.onNameChange(event)}/></td>
                                        </tr>
                                        <tr>
                                            <td><label> Patient Age: </label></td>
                                            <td><input type="text" value={this.patient.age} onChange={event => this.onAgeChange(event)}/></td>
                                        </tr>
                                        <tr>
                                            <td><label> Issue: </label></td>
                                            <td><input type="text" value={this.patient.issue} onChange={event => this.onIssueChange(event)}/></td>
                                        </tr>
                                        <tr>
                                            <td><label> Admitted By: </label></td>
                                            <td><input type="text" onChange={event => this.onAdmittedChange(event)}/></td>
                                        </tr>
                                        <tr>
                                            <td><label> Address: </label></td>
                                            <td><input type="text" onChange={event => this.onAddressChange(event)}/></td>
                                        </tr>
                                        <tr>
                                            <td><label> Contact No: </label></td>
                                            <td><input type="text" onChange={event => this.onContactNoChange(event)}/></td>
                                        </tr>
                                    </table>
                                    <button type="submit" className="btn btn-danger">Admit</button>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        }


    }
}