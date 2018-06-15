import React, {Component} from 'react';
import axios from 'axios';
import Base from '../APIspecs';
import Update from "./Update";


export default class ManageShifts extends Component{
    constructor(props){
        super(props);

        this.state = {
            employees : [],
            shifts: [],
            key: ""
        }
        this.getAllShifts();
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



    onSubmit(event){
        event.preventDefault();
        event.stopPropagation();
        axios.post(Base.nodeAPI+'/shift/',{employeeId: this.employeeId, fromDate: this.fromDate, fromTime:this.fromTime, toDate:this.toDate, toTime:this.toTime}).then(result =>{
            $("input").val("");
          //  this.getAllPatients();
            if(result.status == 200){
                this.getAllShifts();
            }
        }).catch(err =>{
            console.log("rrrrr");
            alert(err);
        })
    }

    onSearchChange(event){
        event.preventDefault();
        event.stopPropagation();
        this.setState({key:event.target.value});
    }

    componentDidMount(){
        axios.get(Base.nodeAPI+"/doctor/").then(res => {
            console.log(res.data);
            if(res.data.length !== 0){
                this.setState({
                    employees : res.data.data || res.data
                })
            }
        })
    }

    render() {
        return <div>
            <div className="jumbotron text-center">
                <h2> Manage Shifts </h2>
            </div>
            <div>
                <form onSubmit={event => this.onSubmit(event)}>
                    <table>
                        <tr>
                           <td><label> Employee Id : </label></td>
                            <td><select onChange={event => this.onIdChange(event)} >
                                {
                                    this.state.employees.map(employee => {
                                        return <option value={employee._id}>{employee._id}</option>
                                    })
                                }
                            </select>

                            </td>
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
                        <tr>
                            <button type="submit" className="btn btn-info" > Add Shift</button>
                        </tr>
                    </table>
                </form>
            </div>
            <br/>
            <div>
                <input type="text" placeHolder = "Search by employee ID" onChange={event => this.onSearchChange(event)}/>
                <br/>
                <table className="table">
                    <thead>
                    <tr>

                        <th> Employee Id</th>
                        <th> From(Date)</th>
                        <th> From(Time)</th>
                        <th> To(Date)</th>
                        <th> To(Time)</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.shifts.map(shifts => {
                            let searchkey = new RegExp(this.state.key, "gi");
                            let emId = shifts.employeeId.toString();
                            if (this.state.key === "") {
                                return <tr>

                                    <td> {shifts.employeeId}</td>
                                    <td> {shifts.fromDate}</td>
                                    <td> {shifts.fromTime}</td>
                                    <td> {shifts.toDate}</td>
                                    <td> {shifts.toTime}</td>
                                    <td> <Update shift={shifts} id={shifts.employeeId}/> </td>
                                </tr>
                            }
                            else if (emId.match(searchkey)) {
                                return <tr>
                                    <td> {shifts.employeeId}</td>
                                    <td> {shifts.fromDate}</td>
                                    <td> {shifts.fromTime}</td>
                                    <td> {shifts.toDate}</td>
                                    <td> {shifts.toTime}</td>
                                    <td>  <Update shift={shifts} id={shifts.employeeId}/> </td>
                                </tr>
                            }
                            else {
                             return <div class = "container">
                                   <div class="alert alert-danger">
                                        <strong>Not Found!</strong> No Shift records for this employee ID.
                                    </div>
                             </div>
                            }
                        })
                        /*
                        this.state.shifts.map(shifts => {
                        return <tr>
                        <td> {shifts._id} </td>
                        <td> {shifts.employeeId}</td>
                        <td> {shifts.fromDate}</td>
                        <td> {shifts.fromTime}</td>
                        <td> {shifts.toDate}</td>
                        <td> {shifts.toTime}</td>
                        </tr>
                    })*/
                    }

                    </tbody>
                </table>
            </div>

        </div>
    }
}