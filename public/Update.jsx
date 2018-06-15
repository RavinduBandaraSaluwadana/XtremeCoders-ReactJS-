import React, {Component} from 'react';
import axios from 'axios';
import Base from '../APIspecs';
import PropTypes from "prop-types";

export default class AllocateDoctor extends Component {
    static get propTypes(){
        return({
            shift: PropTypes.object,
            id: PropTypes.string
        })
    }

    constructor(props) {
        super(props);
        this.state = {
            shift: this.props.shift,
            shifts : []
        };
        this.getAllShifts();
        this.modalname = "myModal"+this.props.id;
        this.target = "#myModal"+this.props.id;
        console.log(this.target);
        console.log(this.state.shift);
    }

    onIdChange(event){
        event.preventDefault();
        event.stopPropagation();
        this.employeeId = event.target.value;
    }

    onFromDateChange(event){
        event.preventDefault();
        event.stopPropagation();
        this.fromDate = event.target.value;
    }

    onToDateChange(event){
        event.preventDefault();
        event.stopPropagation();
        this.toDate = event.target.value;
    }

    onFromTimeChange(event){
        event.preventDefault();
        event.stopPropagation();
        this.fromTime = event.target.value;
    }

    onToTimeChange(event){
        event.preventDefault();
        event.stopPropagation();
        this.toTime = event.target.value;
    }

    getAllShifts(){
        axios.get(Base.nodeAPI+"/shift/").then(res => {
            console.log("aaaaa");
            console.log(res.data);
            if(res.data.length !== 0) {
                this.setState ({
                    shifts : res.data.data || res.data
                });
            }
            console.log("gggg");
        }).catch(err => {
            console.log("inside getAllShifts");
            alert(err);
        })
    }

    onSubmit(event){
        event.preventDefault();
        event.stopPropagation();
        axios.put(Base.nodeAPI+'/shift/ + this.employeeId',{fromDate: this.fromDate, fromTime:this.fromTime, toDate:this.toDate, toTime:this.toTime}).then(result =>{
            $("input").val("");
            console.log("status"+result.status);
            if(result.status !== 200){
                this.getAllShifts();
                
            }
        }).catch(err =>{
            console.log("rrrrr");
            alert(err);
        })
    }

    // componentDidMount(){
    //     axios.get(Base.nodeAPI+"/bed/?availability=true").then(res => {
    //         //console.log(res);
    //         if(res.data.length !== 0){
    //             this.setState({
    //                 beds: res.data.data || res.data
    //             })
    //             this.bedNo = this.state.beds[0].bedNo;
    //         }
    //     }).catch(err => {
    //         alert(err);
    //     })
    // }



    render(){
        return <div>



            <button type="button" class="btn btn-info" data-toggle="modal" data-target={this.target}>
                Update
            </button>
            <div class="modal fade" id={this.modalname}>
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title"> Update Shift details </h4>
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                        </div>
                        <div class="modal-body">
                            <form onSubmit={event => this.onSubmit(event)}>
                                <table>
                                    <tr>
                                        <td><label> Employee Id : </label></td>
                                        <td><input type="text" setEditable="true" onChange={event => this.onIdChange(event)} value={this.state.shift.employeeId}/></td>
                                    </tr>
                                    <br/>
                                    <tr><label> From </label></tr>
                                    <tr>
                                        <td><label> Date : </label></td>
                                        <td><input type="date" onChange={event => this.onFromDateChange(event)}/></td>
                                    </tr>
                                    <tr>
                                        <td><label> Time : </label></td>
                                        <td><input type="time" onChange={event => this.onFromTimeChange(event)}/></td>
                                    </tr>
                                    <br/>
                                    <tr><label> To </label></tr>
                                    <tr>
                                        <td><label> Date : </label></td>
                                        <td><input type="date" onChange={event => this.onToDateChange(event)}/></td>
                                    </tr>
                                    <tr>
                                        <td><label> Time : </label></td>
                                        <td><input type="time" onChange={event => this.onToTimeChange(event)}/></td>
                                    </tr>
                                </table>
                                <button class="btn btn-danger" type="submit" className="btn btn-danger" > Update Shift</button>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </div>

    }
}