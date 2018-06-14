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
            update: false,
            patient: this.props.patient,
            patientId: this.props.patient._id
        }
        //this.patient = this.props.patient;
        this.getAllPatients = this.props.getAllPatients;
        this.getPatient = this.getPatient.bind(this);
        //this.returnBack = this.returnBack.bind(this);
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
                this.setState({patient: results.data[0]});
                this.props.stateHandler();
                //this.patient = results.data[0];
                console.log(results.data[0]);
                // this.setState({
                //     view: false
                // });
            }
        }).catch(err =>{
            alert(err);
        })
    }

    refreshDeleted(){
        this.setState({patient: null});
    }
    delete(id){
        axios.delete(Base.nodeAPI+'/patient/'+id).then(results =>{
            console.log("inside delete");
            this.getAllPatients();
            //this.refreshDeleted();
            //this.refreshHandler();
        }).catch(err =>{
            alert(err);
        })
    }

    // returnBack(){
    //     this.getPatient(this.patient._id);
    // }

    // viewPatient(id) {
    //     console.log("inside view");
    //     if(this.patient.status != "admitted"){
    //         axios.get(Base.nodeAPI + '/patient/' + id).then(results => {
    //             this.patient = results.data[0];
    //             console.log(results.data[0]);
    //             //this.props.view();
    //             this.setState({
    //                 view: true
    //             });
    //         }).catch(err => {
    //             alert(err);
    //         })
    //     }
    //
    // }


    render(){
        if(this.state.patient != null){
            return <tr>
                <td>{this.state.patient._id || this.state.patient.id}</td>
                <td>{this.state.patient.name}</td>
                <td>{this.state.patient.age}</td>
                <td>{this.state.patient.issue}</td>
                <td>{this.state.patient.priorityLevel}</td>
                <td>{this.state.patient.status}</td>
                <td><AdmittPatient patient={this.state.patient} id={this.state.patient._id||this.state.patientId} update={this.getPatient}/></td>
            </tr>
        }




    }
}