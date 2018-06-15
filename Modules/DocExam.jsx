'use strict';

import React, {Component} from 'react';
import PropTypes          from 'prop-types';
import axios              from 'axios';
import {Link} from 'react-router-dom';
import ViewPatient from '../Controllers/ViewPatient';
import AdmittPatient from '../Controllers/AdmittPatient';
var Base = require('../APIspecs');

export default class DocExam extends Component{
    static get propTypes(){
        return{
            docexam: PropTypes.object,
            getAllRecords: PropTypes.func,
            //viewPatient: PropTypes.func
        }
    }

    constructor(props){
        super(props);
        this.state = {
            update: false
        }
        this.docexam = this.props.docexam;
        this.getAllRecords = this.props.getAllRecords;
        this.returnBack = this.returnBack.bind(this);
        //this.action = this.props.view;
        //console.log(this.action);
        //this.viewPatient = this.props.viewPatient;
    }

    componentDidUpdate(){
        this.props.getAllRecords();
    }

    refreshHandler(){
        this.setState({
            update: true
        })
    }

    getRecord(patientid){
        axios.get(Base.nodeAPI+'/docexam/'+patientidid).then(results =>{
            if(results.status == 200){
                console.log("inside get");
                this.docexam = results.data[0];
                console.log(results.data[0]);
                // this.setState({
                //     view: false
                // });
            }
        }).catch(err =>{
            alert(err);
        })
    }

   /* delete(id){
        axios.delete(Base.nodeAPI+'/patient/'+id).then(results =>{
            console.log("inside delete");
            this.refreshHandler();
        }).catch(err =>{
            alert(err);
        })
    }
*/
    returnBack(){
        this.getPatient(this.patient._id);
    }

    /*cant undestand
    viewRecord(patientid) {
        console.log("inside view");
        if(this.p.status != "admitted"){
            axios.get(Base.nodeAPI + '/patient/' + id).then(results => {
                this.patient = results.data[0];
                console.log(results.data[0]);
                //this.props.view();
                this.setState({
                    view: true
                });
            }).catch(err => {
                alert(err);
            })
        }

    }

*/
    render(){
        if(this.state.view){
            return <ViewRecord patient={this.docexam} action={this.returnBack}/>
        }
        else{
            return <tr>
                <td>{this.docexam._patientid || this.docexam.patientid}</td>
                <td>{this.docexam.name}</td>
                <td>{this.docexam.complaints}</td>
                <td>{this.docexam.allergies}</td>
                <td>{this.docexam.physicalExaminations}</td>
                <td>{this.docexam.treatments}</td>
                <td>{this.docexam.drugs}</td>



            </tr>
        }

    }
}