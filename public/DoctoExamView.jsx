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
import Add_Exam from "../Controllers/Add_Exam";
import DocExams from "../Modules/DocExams";

export default class DoctorExamView extends Component{
    constructor(props) {
        super(props);
        this.state = {
            docexams: [],
            view: false
        }
        this.getAllRecords= this.getAllRecords.bind(this);
        this.getAllRecords();
        //this.docexam = null;
    }

    getAllRecords(){
        axios.get(Base.nodeAPI+'/docexam/').then(res =>{
            console.log(res);
            this.setState({
               docexams: res.data.data || res.data
            });
            console.log(this.state.docexams);

        })
    }

    addExam(docexam){
        console.log("inside add");
        axios.post(Base.nodeAPI+'/docexam/',{patientid:docexam.patientid,name: docexam.name, complaints: docexam.complaints, allergies:  docexam.allergies, physicalExaminations:  docexam.physicalExaminations,treatments:  docexam.treatments,drugs:  docexam.drugs}).then(result =>{
            console.log(result);
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
            return <div>
                <div className="jumbotron text-center">
                    <h2>Doctor Examination Details</h2>
                </div>
                <div className="container">
                    <Add_Exam addExam={exam => this.addExam(exam)}/>
                    <DocExams docexam={this.state.docexams} getAllRecords={()=> this.getAllRecords()}/>
                </div>
            </div>

    }
}