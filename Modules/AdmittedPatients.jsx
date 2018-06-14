'use strict';

import React, {Component} from 'react';
import PropTypes from "prop-types";
import axios from 'axios';
import Base from '../APIspecs';

export default class AdmittedPatients extends Component{
    constructor(props){
        super(props);
        this.state ={
            patients: [],
            key: ""
        }
        this.getAdmittedPatients();
    }

    onSearchChange(event){
        event.preventDefault();
        event.stopPropagation();
        this.setState({key:event.target.value });
        //this.searchKey = event.target.value;
    }

    onDateChange(event){
        event.preventDefault();
        event.stopPropagation();
        this.date = event.target.value;
        let newPatients = [];
        let dateExp = new RegExp(this.date,"g");
        this.state.patients.map(patient => {
            let admitDate = patient.admittedDate.toString();
            if(admitDate.match(dateExp)){
                newPatients.push(patient);
            }
        });
        this.setState({patients: newPatients});
    }

    getAdmittedPatients(){
        axios.get(Base.nodeAPI+"/patient/?status=admitted").then(res =>{
            console.log(res.data);
            if(res.data.length !== 0){

                this.setState({
                    patients: res.data.data || res.data
                });
            }

        })
    }

    render(){
        if(this.state.patients.length === 0){
            return <div>
                <div class="col-sm-4">
                    <button className="btn btn-info" onClick={this.props.back}>Back to Registration View</button>
                </div>
                <div class="alert alert-danger">
                    <strong>Info!</strong> Currently No addmitted patients.
                </div>
            </div>
        } else{
            return <div>
                <div class="row">
                    <div class="col-sm-4">
                        <button className="btn btn-info" onClick={this.props.back}>Back to Registration View</button>
                    </div>
                    <div class="col-sm-4">
                        <label>Search by admitted date</label>
                        <input id="date" type="date" onChange={event => this.onDateChange(event)}/>
                    </div>
                    <div class="col-sm-4">
                        <input type="text" onChange={event => this.onSearchChange(event)} placeholder="Search for AddmissonNo.." title="Type the admission number"/>
                    </div>
                </div>
                <table className="table">
                    <thead>
                    <tr>
                        <th>Patient ID</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Issue</th>
                        <th>Condition</th>
                        <th>Admitted Date</th>
                        <th>Admitted By</th>
                        <th>Contact No</th>
                        <th>Admission Number</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.patients.map(patient => {
                            let searchkey = new RegExp(this.state.key, "gi");
                            let pAdmissionNo = patient.admissionNo.toString();
                            if(this.state.key === ""){
                                return <tr>
                                    <td>{patient._id}</td>
                                    <td>{patient.name}</td>
                                    <td>{patient.age}</td>
                                    <td>{patient.issue}</td>
                                    <td>{patient.priorityLevel}</td>
                                    <td>{patient.admittedDate}</td>
                                    <td>{patient.admittedBy}</td>
                                    <td>{patient.contactNo}</td>
                                    <td>{patient.admissionNo}</td>
                                </tr>
                            }else if(pAdmissionNo.match(searchkey)){
                                return <tr>
                                    <td>{patient._id}</td>
                                    <td>{patient.name}</td>
                                    <td>{patient.age}</td>
                                    <td>{patient.issue}</td>
                                    <td>{patient.priorityLevel}</td>
                                    <td>{patient.admittedDate}</td>
                                    <td>{patient.admittedBy}</td>
                                    <td>{patient.contactNo}</td>
                                    <td>{patient.admissionNo}</td>
                                </tr>
                            }
                        })
                    }
                    </tbody>
                </table>
            </div>
        }

    }
}