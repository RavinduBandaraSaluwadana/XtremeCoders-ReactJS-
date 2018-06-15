'use strict';

import React, {Component} from 'react';
import PropTypes from "prop-types";
import axios from "axios/index";
var Base = require('../APIspecs');

export default class UpdateAdmission extends Component{
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
        this.update= this.props.update;
        // this.state ={
        //     status: this.props.patient.status
        // }
        //console.log(this.id);
        console.log(this.patient);
        this.modalname = "Modal"+this.id;
        this.target = "#Modal"+this.id;
        this.nameID = "name"+this.id;
        this.ageID = "age"+this.id;
        this.issueID = "issue"+this.id;
        this.addressID = "address"+this.id;
        this.levelID = "level"+this.id;
        this.byID = "by"+this.id;
        this.noID = "no"+this.id;


        //console.log(this.target);
        //this.getValues();
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

    onLevelChange(event){
        event.preventDefault();
        event.stopPropagation();
        this. priorityLevel = event.target.value;
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

    // componentDidMount(){
    //     $("#name").val(this.patient.name);
    //     $("#age").val(this.patient.age);
    //     $("#issue").val(this.patient.issue);
    //     $("#by").val(this.patient.admittedBy);
    //     $("#level").val(this.patient.priorityLevel);
    //     $("#address").val(this.patient.address);
    //     $("#no").val(this.patient.contactNo);
    // }

    getValues(){
        $("#"+this.nameID).val(this.patient.name);
        $("#"+this.ageID).val(this.patient.age);
        $("#"+this.issueID).val(this.patient.issue);
        $("#"+this.byID).val(this.patient.admittedBy);
        $("#"+this.levelID).val(this.patient.priorityLevel);
        $("#"+this.addressID).val(this.patient.address);
        $("#"+this.noID).val(this.patient.contactNo);
    }

    // updateBedAvailability(id, bedNo){
    //     let bed = {
    //         availability: false,
    //         patientNo: id
    //     }
    //     axios.put(Base.nodeAPI+"/bed/"+bedNo, bed).then(res => {
    //         console.log(res);
    //     }).catch(err => {
    //         alert(err);
    //     })
    // }

    updatePatient(id, patient){
        axios.put(Base.nodeAPI+"/patient/"+id,patient).then(res =>{
            if(res.status == 200){
                //console.log(res);
                //this.updateBedAvailability(this.id, this.bedNo);
                $(".close").trigger('click');
                this.update();

                // axios.get(Base.nodeAPI+"/patient/"+id).then(result =>{
                //     if(result.status == 200){
                //         //console.log(result);
                //         alert("Patient AdmissionNo: "+ result.data[0].admissionNo);
                //         $(".close").trigger('click');
                //         //$(this.target).hide();
                //         this.setState({status: result.data[0].status})
                //     }
                // }).catch(err => {
                //     alert(err);
                // })
            }
        }).catch(err =>{
            alert(err);
        })
    }

    onSubmit(event){
        event.preventDefault();
        event.stopPropagation();
        //var old = null;
        //console.log(this.id);

        if($("#"+this.noID).val().match(/^\d{10}$/)||this.patient.contactNo.match(/^\d{10}$/)){
            //var today = new Date();
            //var admission = today.getFullYear()+150+this.id;
            var patientInstance = {
                name: this.name||this.patient.name ,
                age: this.age || this.patient.age,
                issue: this.issue || this.patient.issue,
                priorityLevel: this.priorityLevel||this.patient.priorityLevel,
                status: "admitted",
                admittedDate: this.patient.admittedDate,
                address: this.address||this.patient.address,
                admittedBy: this.admittedBy||this.patient.admittedBy,
                contactNo: this.contactNo||this.patient.contactNo,
                admissionNo: this.patient.admissionNo
            };
            this.updatePatient(this.id, patientInstance);
        } else{
            alert("Please enter a valid contact number!");
        }


    }

    render(){
            return <div>
                <button type="button" class="btn btn-info" data-toggle="modal" data-target={this.target} onClick={()=> this.getValues()}>
                    Update Details
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
                                            <td><input type="text" id={this.nameID} onChange={event => this.onNameChange(event)}/></td>
                                        </tr>
                                        <tr>
                                            <td><label> Patient Age: </label></td>
                                            <td><input type="text" id={this.ageID} onChange={event => this.onAgeChange(event)}/></td>
                                        </tr>
                                        <tr>
                                            <td><label> Issue: </label></td>
                                            <td><input type="text" id={this.issueID} onChange={event => this.onIssueChange(event)}/></td>
                                        </tr>
                                        <tr>
                                            <td><label>Priority Level</label></td>
                                            <td><select id={this.levelID} onChange={event => this.onLevelChange(event)}>
                                                <option value="">Select..</option>
                                                <option value="critical">critical</option>
                                                <option value="major">major</option>
                                                <option value="medium">medium</option>
                                                <option value="minor">minor</option>
                                            </select></td>
                                        </tr>
                                        <tr>
                                            <td><label> Admitted By: </label></td>
                                            <td><input type="text" id={this.byID} onChange={event => this.onAdmittedChange(event)}/></td>
                                        </tr>
                                        <tr>
                                            <td><label> Address: </label></td>
                                            <td><input type="text" id={this.addressID} onChange={event => this.onAddressChange(event)}/></td>
                                        </tr>
                                        <tr>
                                            <td><label> Contact No: </label></td>
                                            <td><input type="text" id={this.noID} onChange={event => this.onContactNoChange(event)}/></td>
                                        </tr>
                                    </table>
                                    <button type="submit" className="btn btn-danger">Update</button>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button id="close" type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


    }
}