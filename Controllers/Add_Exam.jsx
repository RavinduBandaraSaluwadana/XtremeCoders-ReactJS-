'use strict';

import React, {Component} from 'react';
import PropTypes from "prop-types";
import axios from 'axios';
import Base from '../APIspecs';

export default class Add_Exam extends Component{
    static get propTypes(){
        return{
            addExam: PropTypes.func,
            patientid:PropTypes.number,
            name : PropTypes.string,
            complaints:PropTypes.array,
            allergies:PropTypes.array,
            physicalExaminations:PropTypes.array,
            treatments:PropTypes.array,
            drugs:PropTypes.array
        }
    }

    constructor(props){
        super(props);
        this.state={
            patients:[]
        }
    }

    componentDidMount(){
        axios.get(Base.nodeAPI+"/patient/?status=admitted").then(res =>{
            console.log(res.data);
            if(res.data.length !== 0){
                this.setState({
                    patients: res.data.data || res.data
                });
            }

        })
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
        this.treatments = event.target.value;
    }

    ondrugsChange(event){
        event.preventDefault();
        event.stopPropagation();
        this.drugs = event.target.value;
    }

    search(){
        //console.log("aaaaaa");
        if(this.patientid){
            axios.get(Base.nodeAPI+"/patient/"+this.patientid).then(res => {
                if(res.status === 200){
                    console.log(res.data[0]);
                    this.name = res.data[0].name;
                    $(".name").val(this.name);
                }
            }).catch(err => {
                alert(err);
            });
        }

        //$(".name").value(this.name);
    }

    onSubmit(event){
        event.preventDefault();
        event.stopPropagation();
        console.log(this.patientid+"  "+this.name);
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
                            <select onChange={event => this.onPatientIdChange(event)}>{
                                this.state.patients.map(patient =>{
                                    return <option value={patient._id}>{patient._id}</option>
                                })
                            }
                            </select>
                        </td>
                        <td><button className="btn btn-secondary" onClick={() => this.search()}>Search</button></td>
                    </tr>
                    <tr>
                        <td><label> Name: </label></td>
                        <td><input className="name" type="text" onChange={event => this.onNameChange(event)}/></td>
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
                <button type = "submit" className="btn btn-secondary">Add</button>
                <br/>
                <br/>
            </form>
        </div>
    }

}