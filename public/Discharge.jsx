import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import propTypes from 'prop-types';
import axios              from 'axios';
var Base = require('../APIspecs');

export default class Discharge extends Component{

    static get propTypes(){
        patiant: propTypes.array;
    }

    componentWillReceiveProps(props){
        this.setState(props);
        console.log('will receive');
    }


    constructor(props){
        super(props);

        var d = new Date();
        this.state = {
            id: "",
            pname: "",
            age: "",
            wno: "",
            Admitteddate: "",
            Dischargedate: "",
            Doctor: "",
            issue: "",
            Treatements: "",
            key: ""
        }



    }

    onSearchChange(event){
        event.preventDefault();
        event.stopPropagation();
        this.setState({key:event.target.value});
    }

    addDischargePatiants(id,pname,age,Admitteddate,Dischargedate,issue,Treatements){

        var data = {"patiant_id":id,"name":pname,"age":age,"admitted_date":Admitteddate,"Dischargedate":Dischargedate,"issue":issue,"Tretements":Treatements};

        fetch('http://localhost:8083/discharge/',{
            method:'POST',
            body:JSON.stringify(data),
            headers: {'Content-Type': 'application/json'}
        }).then(response=>{
            return response.json();
        }).then(data=>{
            alert('Discharge details added');

            this.setState({
                id:data.id,
                pname: data.name,
                age: data.age,
                Admitteddate:data.admittedDate,
                Dischargedate:data.dischargeDate,
                issue:data.issue,
                Treatements:data.Treatements
            })

            this.delete(id);
        }).catch(err=>{
            alert(err);
        })


    }

    search(id){
        axios.get(Base.nodeAPI+'/patient/'+id).then(results =>{
            this.patiant;
        }).catch(err =>{
            alert(err);
        })
    }

    delete(id){
        axios.delete(Base.nodeAPI+'/patient/'+id).then(results =>{
            this.patiant;
            alert("Deleted from Patiant table");
        }).catch(err =>{
            alert(err);
        })
    }

    render(){
        this.patiant = this.props.allPatiants;
        var date = new Date();
        let SearchKey = new RegExp(this.state.key,"gi");
        return(
            <div>
                <div className="jumbotron text-center">
                    <h2>Discharge Patients</h2>
                </div>
                <div>
                    <form>
                        <table className="table table-condensed">
                            <tr>
                                <td><span>Search Patient </span></td>
                                <td><input type={"text"} id={"search"} onChange={event => this.onSearchChange(event)} placeholder={"Patient Name" }/></td>
                            </tr>
                            <tr>
                                <th> Patient ID</th>
                                <th> Patient Name</th>
                                <th> Patient Age</th>
                                <th> Admitted Date</th>
                                <th> Discharged Date</th>
                                <th> Issue</th>
                                <th> Treatments</th>
                            </tr>

                            <tbody>
                            {this.patiant.map(item =>
                                {
                                    if(this.state.key === ""){
                                        return<tr className={"tablerow"} key={item._id}>
                                            <td className={"tabledata"} id={'pid'}>{item._id}</td>
                                            <td id={'pname'}>{item.name}</td>
                                            <td id={'age'}>{item.age}</td>
                                            <td id={'adate'}>{item.admittedDate}</td>
                                            <td id={'ddate'}>{date.getFullYear()+"/"+date.getMonth()+"/"+date.getDay()}</td>
                                            <td id={'issue'}>{item.issue}</td>
                                            <td id={'treatements'}></td>
                                            <td><input type={"button"} className="btn btn-info" value={"Discharge"} onClick={()=>{this.addDischargePatiants(document.getElementById('pid').innerHTML,
                                                document.getElementById('pname').innerHTML,document.getElementById('age').innerHTML,document.getElementById('adate').innerHTML,
                                                document.getElementById('ddate').innerHTML,document.getElementById('issue').innerHTML,document.getElementById('treatements').innerHTML)}}/>
                                            </td>
                                        </tr>

                                    }else if(item.name.match(SearchKey)){
                                        return<tr className={"tablerow"} key={item._id}>
                                            <td className={"tabledata"} id={'pid'}>{item._id}</td>
                                            <td id={'pname'}>{item.name}</td>
                                            <td id={'age'}>{item.age}</td>
                                            <td id={'adate'}>{item.admittedDate}</td>
                                            <td id={'ddate'}>{date.getFullYear()+"/"+date.getMonth()+"/"+date.getDay()}</td>
                                            <td id={'issue'}>{item.issue}</td>
                                            <td id={'treatements'}></td>
                                            <td><input type={"button"} className="btn btn-info" value={"Discharge"} onClick={()=>{this.addDischargePatiants(document.getElementById('pid').innerHTML,
                                                document.getElementById('pname').innerHTML,document.getElementById('age').innerHTML,document.getElementById('adate').innerHTML,
                                                document.getElementById('ddate').innerHTML,document.getElementById('issue').innerHTML,document.getElementById('treatements').innerHTML)}}/>
                                            </td>
                                        </tr>

                                    }
                                }
                            )}
                            </tbody>
                        </table>
                    </form>
                </div>
            </div>
        )
    }

}