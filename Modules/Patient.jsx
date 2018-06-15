'use strict';

import React, {Component} from 'react';
import PropTypes          from 'prop-types';
import axios              from 'axios';
import {Link} from 'react-router-dom';
import ViewPatient from '../Controllers/ViewPatient';
import AdmittPatient from '../Controllers/AdmittPatient';
var Base = require('../APIspecs');

export default class Patient extends Component{
    static get propTypes(){
        return{
            patient: PropTypes.object,
            getAllPatients: PropTypes.func,
            //viewPatient: PropTypes.func
        }
    }

    constructor(props){
        super(props);
        this.state = {
            update: false
        }
        this.patient = this.props.patient;
        this.getAllPatients = this.props.getAllPatients;
        this.returnBack = this.returnBack.bind(this);
        //this.action = this.props.view;
        //console.log(this.action);
        //this.viewPatient = this.props.viewPatient;
    }

    componentDidUpdate(){
        this.props.getAllPatients();
    }

    refreshHandler(){
        this.setState({
            update: true
        })
    }

    getPatient(id){
        axios.get(Base.nodeAPI+'/patient/'+id).then(results =>{
            if(results.status == 200){
                console.log("inside get");
                this.patient = results.data[0];
                console.log(results.data[0]);
                // this.setState({
                //     view: false
                // });
            }
        }).catch(err =>{
            alert(err);
        })
    }

    delete(id){
        axios.delete(Base.nodeAPI+'/patient/'+id).then(results =>{
            console.log("inside delete");
            this.refreshHandler();
        }).catch(err =>{
            alert(err);
        })
    }

    returnBack(){
        this.getPatient(this.patient._id);
    }

    viewPatient(id) {
        console.log("inside view");
        if(this.patient.status != "admitted"){
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


    render(){
        if(this.state.view){
            return <ViewPatient patient={this.patient} action={this.returnBack}/>
        }
        else{
            return <tr>
                <td>{this.patient._id || this.patient.id}</td>
                <td>{this.patient.name}</td>
                <td>{this.patient.age}</td>
                <td>{this.patient.issue}</td>
                <td>{this.patient.priorityLevel}</td>
                <td>{this.patient.status}</td>
                <td><AdmittPatient patient={this.patient} id={this.patient._id||this.patient.id}/></td>
                <td><button class="btn btn-info" onClick={(event)=> this.delete(this.patient._id )}>Delete</button></td>
            </tr>
        }

    }
}