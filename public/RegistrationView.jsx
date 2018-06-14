'use strict';

import React, {Component} from 'react';
import AddPatient from '../Controllers/AddPatient';
import Patient from '../Modules/Patient';
import Patients  from '../Modules/Patients';
import ViewPatient from '../Controllers/ViewPatient';
import AdmittedPatients from '../Modules/AdmittedPatients';
import axios from 'axios';
import Base from '../APIspecs';
import AdmittPatient from "../Controllers/AdmittPatient";

export default class RegistrationView extends Component{
    constructor(props) {
        super(props);
        this.state = {
            patients: [],
            admitView: false
        }
        this.getAllPatients= this.getAllPatients.bind(this);
        this.clickHandlerClose = this.clickHandlerClose.bind(this);
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
        //console.log("inside add");
        axios.post(Base.nodeAPI+'/patient/',{name: patient.name, age: patient.age, issue: patient.issue, priorityLevel: patient.priorityLevel}).then(result =>{
            $("input").val("");
            this.getAllPatients();
            if(result.status == 200){
                //this.getAllPatients();
            }
        }).catch(err =>{
            alert("Please enter all the details of the patient!");
        })
    }

    clickHandler(){
        this.setState({admitView: true});
    }

    clickHandlerClose(){
        this.setState({admitView: false});
    }


    render() {
        if(this.state.admitView){
            return <div>
                <div className="jumbotron text-center">
                    <h2>Patient Registration details</h2>
                </div>
                <div className="container">
                    <AdmittedPatients back={this.clickHandlerClose}/>
                </div>
            </div>

        }
        else{
            return <div>
                <div className="jumbotron text-center">
                    <h2>Patient Registration details</h2>
                </div>
                <div className="container">
                    <div class="row">
                        <div class="col-sm-8">
                            <AddPatient addPatient={patient => this.addPatient(patient)} />
                        </div>
                        <div class="col-sm-4">
                            <button type="button" class="btn btn-info btn-block" onClick={()=> this.clickHandler()}>View All Admitted Patients</button>
                        </div>
                    </div>
                    <Patients patients={this.state.patients} getAllPatients={() => this.getAllPatients()}/>
                </div>
            </div>;
        }
    }
}