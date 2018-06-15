'use strict';

import React, {Component} from 'react';
import PropTypes          from 'prop-types';
import Patient            from './Patient.jsx';
import axios from "axios/index";
import Base from "../APIspecs";

export default class Patients extends Component{
    static get propTypes(){
        return {
            patients: PropTypes.array
            //view: PropTypes.func
        }
    }

    constructor(props){
        super(props);
        this.state = {
            key: ""
        }
        this.stateHandler = this.stateHandler.bind(this);
        //this.viewDetails = this.viewDetails.bind(this);
        //this.view = this.props.view;
        //console.log(this.view);
    }

    componenetWillRecieveProps(props){
        this.setState(props)
    }

    stateHandler(){
        this.props.getAllPatients();
    }

    // viewDetails(e){
    //     console.log(this.state.view);
    //     e.preventDefault();
    //     this.setState({
    //         view: true
    //     });
    //
    // }

    onSearchChange(event){
        event.preventDefault();
        event.stopPropagation();
        this.setState({key:event.target.value });
        //this.searchKey = event.target.value;
    }

    // searchFunc(){
    //     var input, filter, table, tr, td, i;
    //     //input = document.getElementById("myInput");
    //     filter = this.searchKey;
    //
    //     tr = table.getElementsByTagName("Patient");
    //     for (i = 0; i < tr.length; i++) {
    //         td = tr[i].getElementsByTagName("td")[1];
    //         if (td) {
    //             if (td.innerHTML.indexOf(filter) > -1) {
    //                 tr[i].style.display = "";
    //             } else {
    //                 tr[i].style.display = "none";
    //             }
    //         }
    //     }
    // }




    render(){
        this.patients = this.props.patients;
        if(this.state.view){
            this.patients.map(patient => {
                return <Patient key={patient._id || patient.id} patient ={patient} getAllPatients={()=> this.props.getAllPatients} viewDetails={this.viewDetails}/>
            })
        }
        else{
            return <div>
                <input type="text" id="myInput" onChange={event => this.onSearchChange(event)} placeholder="Search for names.." title="Type in a name"/>
                <table className="table" id="myTable">
                    <thead>
                    <tr>
                        <th>Patient ID</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Issue</th>
                        <th>Condition</th>
                    <th>status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.patients.map(patient => {
                            let searchkey = new RegExp(this.state.key, "gi");
                            if(this.state.key === ""){
                                return <Patient key={patient._id || patient.id} patient ={patient} getAllPatients={()=> this.props.getAllPatients} stateHandler={this.stateHandler}/>
                            } else if(patient.name.match(searchkey)){
                                return <Patient key={patient._id || patient.id} patient ={patient} getAllPatients={()=> this.props.getAllPatients} stateHandler={this.stateHandler}/>
                            }

                        })
                    }
                    </tbody>
                </table>
            </div>
        }

    }
}