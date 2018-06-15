import React, {Component} from 'react';
import Transfer from './Transfer';
import Discharge from './Discharge';

export default class SearchAllPatients extends Component{

    constructor(props){
        super(props);

        this.state={
            allPatiants:[]
        }

        this.getPatiants();
    }

    getPatiants(){
        fetch('http://localhost:8083/Patient/',{
            method:'GET',
            headers:{'Content-Type':'application/json'}
        }).then(response=>{
            return response.json()
        }).then(data=>{
            this.setState({allPatiants: data})
        }).catch(err=>{
            alert('Failed to upload Patiants '+err)
        })
        console.log('getPatiants method call');
    }

    render(){
        return(
            <div>
                <Transfer allPatiants={this.state.allPatiants}/>
            </div>
        );
    }
}
