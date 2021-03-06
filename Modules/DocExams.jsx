'use strict';

import React, {Component} from 'react';
import PropTypes          from 'prop-types';
import Patient            from './Patient.jsx';
import axios from "axios/index";
import Base from "../APIspecs";
import DocExam from "./DocExam";

export default class DocExams extends Component{
    static get propTypes(){
        return {
            docexams: PropTypes.array
            //view: PropTypes.func
        }
    }

    constructor(props){
        super(props);
        this.state = {
            view: false
        }
        this.viewDetails = this.viewDetails.bind(this);
        console.log(this.props.docexam);
        //this.view = this.props.view;
        //console.log(this.view);
    }

    componenetWillRecieveProps(props){
        this.setState(props)
    }



    viewDetails(e){
        console.log(this.state.view);
        e.preventDefault();
        this.setState({
            view: true
        });

    }

    // searchFunc(){
    //     var input, filter, table, tr, td, i;
    //     input = document.getElementById("myInput");
    //     filter = input.value.toUpperCase();
    //     table = document.getElementById("myTable");
    //     tr = table.getElementsByTagName("tr");
    //     for (i = 0; i < tr.length; i++) {
    //         td = tr[i].getElementsByTagName("td")[1];
    //         if (td) {
    //             if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
    //                 tr[i].style.display = "";
    //             } else {
    //                 tr[i].style.display = "none";
    //             }
    //         }
    //     }
    // }



    render(){
        this.docexams = this.props.docexam;
        if(this.state.view){
            this.docexams.map(patient => {
                return <Patient key={docexam._id || docexam.id} docexam ={docexam} getAllRecords={()=> this.props.getAllRecords} viewDetails={this.viewDetails}/>
            })
        }
        else{
            return <div>
                <input type="text" id="myInput" placeholder="Search for names.." title="Type in a name"/>
                <table className="table" id="myTable">
                    <thead>
                    <tr>
                        <th>Patient ID</th>
                        <th>Name</th>
                        <th>Complaints</th>
                        <th>Allergies</th>
                        <th>Physical Examinations</th>
                        <th>Treatments</th>
                        <th>Drugs</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.docexams.map(docexam => {
                            return <DocExam key={docexam._id  || docexam.patientid } docexam={docexam} getAllRecords={()=> this.props.getAllRecords} view={this.props.view}/>
                        })
                    }
                    </tbody>
                </table>
            </div>
        }

    }
}