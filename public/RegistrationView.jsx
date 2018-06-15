'use strict';

import React, {Component} from 'react';
import AddPatient from '../Controllers/AddPatient';
import Patient from '../Modules/Patient';
import Patients  from '../Modules/Patients';
import ViewPatient from '../Controllers/ViewPatient';
import AdmittPatient from '../Controllers/AdmittPatient';
import axios from 'axios';
import Base from '../APIspecs';

export default class RegistrationView extends Component{
    constructor(props) {
        super(props);
        this.state = {
            patients: [],
            view: false
        }
        this.getAllPatients= this.getAllPatients.bind(this);
        this.getAllPatients();
        this.patient = null;
    }

    getAllPatients(){
        axios.get(Base.nodeAPI+'/patient/').then(res =>{
            this.setState({
                patients: res.data.data || res.data
            });

        })
    }

    addPatient(patient){
        console.log("inside add");
        axios.post(Base.nodeAPI+'/patient/',{name: patient.name, age: patient.age, issue: patient.issue, priorityLevel: patient.priorityLevel}).then(result =>{
            $("input").val("");
            this.getAllPatients();
            if(result.status == 200){
                //this.getAllPatients();
            }
        }).catch(err =>{
            alert(err);
        })
    }




    render() {
        if(this.state.view){
            return <div>
                <div className="jumbotron text-center">
                    <h2>Patient Registration details</h2>
                </div>
                <div className="container">
                    <Patient/>
                </div>
            </div>

        }
        else{
            return <div>
                <div className="jumbotron text-center">
                    <h2>Patient Registration details</h2>
                </div>
                <div className="container">
                    <AddPatient addPatient={patient => this.addPatient(patient)}/>
                    <Patients patients={this.state.patients} getAllPatients={() => this.getAllPatients()}/>
                </div>
            </div>;
        }

    }
}