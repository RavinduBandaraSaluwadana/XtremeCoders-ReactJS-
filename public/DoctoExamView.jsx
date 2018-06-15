'use strict';

import React, {Component} from 'react';
import AddPatient from '../Controllers/AddPatient';
import Patient from '../Modules/Patient';
import Patients  from '../Modules/Patients';
import ViewPatient from '../Controllers/ViewPatient';
import AdmittPatient from '../Controllers/AdmittPatient';
import axios from 'axios';
import Base from '../APIspecs';
import DocExam from "../Modules/DocExam";

export default class DoctorExamView extends Component{
    constructor(props) {
        super(props);
        this.state = {
            patients: [],
            view: false
        }
        this.getAllRecords= this.getAllRecords.bind(this);
        this.getAllRecords();
        this.docexam = null;
    }

    getAllRecords(){
        axios.get(Base.nodeAPI+'/docexam/').then(res =>{
            this.setState({
               docexams: res.data.data || res.data
            });

        })
    }

    addExam(docexam){
        console.log("inside add");
        axios.post(Base.nodeAPI+'/docexam/',{patientid:docexam.patientid,name: docexam.name, complaints: docexam.complaints, allergies:  docexam.allergies, physicalExaminations:  docexam.physicalExaminations,treatments:  docexam.treatments,drugs:  docexam.drugs}).then(result =>{
            $("input").val("");
            this.getAllRecords();
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
                    <h2>Doctor Examination Details</h2>
                </div>
                <div className="container">
                    <DocExam/>
                </div>
            </div>

        }
        else{
            return <div>
                <div className="jumbotron text-center">
                    <h2>Doctor Examination Details</h2>
                </div>
                <div className="container">
                    <AddPatient addExam={docexam => this.addExam(docexam)}/>
                    <Patients docexams={this.state.docexams} getAllRecords={() => this.getAllRecords()}/>
                </div>
            </div>;
        }

    }
}