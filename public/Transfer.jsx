import React, {Component} from 'react'
import propTypes from 'prop-types';
import ReactDOM from "react-dom";
import axios              from 'axios';
var Base = require('../APIspecs');
export default class Transfer extends Component{
    static get propTypes(){
        patiant: propTypes.array;
    }

    constructor(props){
        super(props);
        this.state={
            key: ""
        }
    }

    onSearchChange(event){
        event.preventDefault();
        event.stopPropagation();
        this.setState({key:event.target.value});
    }

    componentWillReceiveProps(props){
        this.setState(props);
        console.log('will receive');
    }

    addTransferDetails(id,pname,age,wno,Admitteddate,Doctor,issue,Treatements){

        wno = prompt("Transfer patient " +pname ,"");

        if(wno == null || wno==""){
            alert("Plese specify ward number to transfer patiant "+pname);
        }else {
            var data = {
                "patiant_id": id,
                "name": pname,
                "age": age,
                "ward_no": wno,
                "admitted_date": Admitteddate,
                "Doctor": Doctor,
                "issue": issue,
                "Tretements": Treatements
            };

            fetch('http://localhost:8083/transfer/', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {'Content-Type': 'application/json'}
            }).then(response => {
                return response.json();
            }).then(data => {
                alert('Transfer details added');
                this.delete(id);
            }).catch(err => {
                alert(err);
            })

        }
    }

    delete(id){
        axios.delete(Base.nodeAPI+'/patient/'+id).then(results =>{
            this.patiant;
            alert("Deleted from Patiant table");
        }).catch(err =>{
            alert(err);
        })
    }

    /*UpdateB(wno){

        var data={"ward_no":wno};

            fetch('http://localhost:8085/discharge/'+data.wno,{

                method:'PUT',
                body:JSON.stringify(data),
                headers:{'Content-Type':'application/json'}
            }).then(response=>{
                return response.json();
            }).then(data=>{
                alert('Transfered');
            }).catch(err=>{
                alert(err);
            })

    }*/


    render(){
        this.patiant = this.props.allPatiants;
        let SearchKey = new RegExp(this.state.key,"gi");
        return(
            <div>
                <div className="jumbotron text-center">
                    <h2>Transfer patients</h2>
                </div>
                <div>
                    <form>
                        <table className="table table-condensed">
                            <tr>
                                <td><span>Search Patient </span></td>
                                <td><input type={"text"} onChange={event => this.onSearchChange(event)} placeholder={"Patient Name"}/></td>
                            </tr>
                            <tr>
                                <th>Patient ID</th>
                                <th>Patient Name</th>
                                <th>Patient Age</th>
                                <th>Admitted date</th>
                                <th>Issue</th>
                            </tr>
                            <tbody>
                                {this.patiant.map(item=>
                                    {
                                        if(this.state.key === ""){
                                            return <tr className={"tablerow"} key={item._id}>
                                                <td id={'id'} className={"tabledata"}>{item._id}</td>
                                                <td id={'name'}>{item.name}</td>
                                                <td id={'age'}>{item.age}</td>
                                                <td id={'adate'}>{item.admittedDate}</td>
                                                <td id={'issue'}>{item.issue}</td>
                                                <td id={'tretements'}></td>
                                                <td><input type={"button"} className="btn btn-info"
                                                           value={"Transfer Patients"} onClick={() => {
                                                    this.addTransferDetails(document.getElementById('id').innerHTML,
                                                        document.getElementById('name').innerHTML, document.getElementById('age').innerHTML, "", document.getElementById('adate').innerHTML,
                                                        document.getElementById('issue').innerHTML, document.getElementById('tretements').innerHTML)
                                                }}/></td>
                                            </tr>

                                        }else if(item.name.match(SearchKey)){
                                            return <tr className={"tablerow"} key={item._id}>
                                                <td id={'id'} className={"tabledata"}>{item._id}</td>
                                                <td id={'name'}>{item.name}</td>
                                                <td id={'age'}>{item.age}</td>
                                                <td id={'adate'}>{item.admittedDate}</td>
                                                <td id={'issue'}>{item.issue}</td>
                                                <td id={'tretements'}></td>
                                                <td><input type={"button"} className="btn btn-info"
                                                           value={"Transfer Patients"} onClick={() => {
                                                    this.addTransferDetails(document.getElementById('id').innerHTML,
                                                        document.getElementById('name').innerHTML, document.getElementById('age').innerHTML, "", document.getElementById('adate').innerHTML,
                                                        document.getElementById('issue').innerHTML, document.getElementById('tretements').innerHTML)
                                                }}/></td>
                                            </tr>
                                        }
                                    }
                                )}
                            </tbody>
                        </table>
                    </form>
                </div>
            </div>
        );
    }
}