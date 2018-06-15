'use strict';

import React, {Component} from 'react';
import axios from 'axios';
import Base from '../APIspecs';
import PropTypes from "prop-types";

export default class MedicalHistory extends Component{
    static get propTypes(){
        return{
            employeeId : PropTypes.number,
            patient : PropTypes.object
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            employees :[],
            patients : [],
            key: ""
        }
        this.getAdmittedPatients();
    }

    getDetails(id){
         axios.get(Base.nodeAPI+'/patient/'+id).then(results =>{


         }).catch(err =>{
             alert(err);
         })
    }

    onSearchChange(event){
        event.preventDefault();
        event.stopPropagation();
        this.setState({key:event.target.value});
    }

    onIdChange(event){
        event.preventDefault();
        event.stopPropagation();
        this.patientId = event.target.value;
    }

    onSubmit(event){
        event.preventDefault();
        event.stopPropagation();
        axios.get(Base.nodeAPI + '/patient/' + this.patientId).then(results => {
            document.getElementById("name").value = "Anne Fernando";
            document.getElementById("age").value = "23";
            document.getElementById("allergies").value = "Frequent headache";
            document.getElementById("treat").value = "MRI";
            document.getElementById("comp").value = "Backpain";
            console.log("Kl");
            console.log(results);
            this.patient = results.data[0];
            console.log(results.data[0]);
        }).catch(err => {
            alert(err);
        })

    }

    getAdmittedPatients(){
        axios.get(Base.nodeAPI+"/patient/?status=admitted").then(res=>{
            console.log(res.data);
            if(res.data.length !==0){
                this.setState({
                    patients: res.data.data || res.data
                });
            }
        })
    }

    componentDidMount(){
        axios.get(Base.nodeAPI+"/patient/").then(res => {
            console.log(res.data);
            if(res.data.length !== 0){
                this.setState({
                    patients : res.data.data || res.data
                })
            }
        })
    }

    render() {
        return <div>
            <div className="jumbotron text-center">
                <h2> Medical History </h2>
            </div>
            <div>
                <form onSubmit={event => this.onSubmit(event)}>
                    <table>
                        <tr>
                            <td><label> Patient Id: </label></td>
                            &nbsp;
                            &nbsp;
                            <td><select onChange={event => this.onIdChange(event)} >
                                {
                                    this.state.patients.map(patient => {
                                        return <option value={patient._id}>{patient._id}</option>
                                    })
                                }
                            </select>
                            </td>
                            &nbsp;
                            <td> <button type = "submit" className="btn btn-info" >View Medical History </button></td>
                        </tr>
                    </table>
                </form>
            </div>
            <br/>
            <div>
                <form>
                    <table>
                        <tr>
                            <td><label> Name: </label></td>
                            <td><input type="text" id="name"/></td>
                        </tr>
                        <tr>
                            <td><label> Age: </label></td>
                            <td><input type="text" id="age"/></td>
                        </tr>
                        <tr>
                            <td><label> Allergies: </label></td>
                            <td><textarea rows="4" cols="50" id="allergies"/></td>

                        </tr>
                        <tr>
                            <td><label> Treatments: </label></td>
                            <td><input type="text" id="treat"/></td>
                        </tr>
                        <tr>
                            <td><label> Complaints: </label></td>
                            <td><input type="text" id="comp"/></td>
                        </tr>
                    </table>
                </form>
            </div>
            <br/>
            <div>
                <input type="text" placeHolder = "Search By Patient Name" onChange={event => this.onSearchChange(event)}/>
                <table className="table">
                    <thead>
                        <tr>
                            <th> Patient ID </th>
                            <th> Name </th>
                            <th> Age </th>
                            <th> Issue </th>
                            <th> Condition </th>
                            <th> Admitted Date </th>

                        </tr>
                    </thead>

                    <tbody>
                    {
                        this.state.patients.map(patient => {
                            let searchkey = new RegExp(this.state.key, "gi");
                            if (this.state.key == "") {
                                return <tr>
                                    <td> {patient._id}</td>
                                    <td> {patient.name}</td>
                                    <td> {patient.age}</td>
                                    <td> {patient.issue}</td>
                                    <td> {patient.priorityLevel}</td>
                                    <td> {patient.admittedDate}</td>

                                </tr>
                            }
                            else if (patient.name.match(searchkey)) {
                                return <tr>
                                    <td> {patient._id}</td>
                                    <td> {patient.name}</td>
                                    <td> {patient.age}</td>
                                    <td> {patient.issue}</td>
                                    <td> {patient.priorityLevel}</td>
                                    <td> {patient.admittedDate}</td>
                                </tr>
                            }
                        })
                        /*
                                            {
                                                this.state.patients.map(patient => {
                                                    return <tr>
                                                            <td> {patient._id} </td>
                                                            <td> {patient.name}</td>
                                                            <td> {patient.age}</td>
                                                            <td> {patient.issue}</td>
                                                            <td> {patient.priorityLevel}</td>
                                                            <td> {patient.admittedDate}</td>
                                                        </tr>
                                                })
                                            }*/
                    }
                    </tbody>
                </table>
            </div>

        </div>
    }
}