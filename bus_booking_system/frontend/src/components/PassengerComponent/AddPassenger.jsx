import React from "react";
import {FormattedMessage} from 'react-intl';

export default class AddPassenger extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name : '',
            age : '',
            gender : '',
            mobileNo : ''
        }
    }

    render(){
        return(
            <>
                <div className="container">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label className="form-label float-start"><b><FormattedMessage id="name"/> : </b></label>
                                        <input className="form-control" type="text" name="name" minLength="3" onChange={(e) => {this.props.passPassengerDetails(this.props.keys,e.target.name,e.target.value) ;this.setState({name : e.target.value})}}/>
                                        {this.state.name === '' && <h6 className="form-label text-center text-danger"><b>{this.props.errorMessage === true ? "*.Given Field (name) is required" : ""}</b></h6>}
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group" >
                                        <label className="form-label float-start"><b><FormattedMessage id="age"/> : </b></label>
                                        <input className="form-control" type="text" name="age" minLength="1" maxLength="2" onChange={(e) => {this.props.passPassengerDetails(this.props.keys,e.target.name,e.target.value);this.setState({age : e.target.value})}}/>
                                        {this.state.age === '' && <h6 className="form-label text-center text-danger"><b>{this.props.errorMessage === true ? "*.Given Field (age) is required" : ""}</b></h6>}
                                    </div>
                                </div>
                            </div><br/>
                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label className="form-label float-start"><b><FormattedMessage id="mobileNumber"/> : </b></label>
                                        <input className="form-control" type="text" name="mobileNo"  minLength="1" maxLength="10" onChange={(e) => {this.props.passPassengerDetails(this.props.keys,e.target.name,e.target.value);this.setState({mobileNo : e.target.value})}}/>
                                        {this.state.mobileNo === '' && <h6 className="form-label text-center text-danger"><b>{this.props.errorMessage === true ? "*.Given Field (mobileNo) is required" : ""}</b></h6>}
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group" >
                                        <label className="form-label float-start"><b><FormattedMessage id="gender"/> : </b></label>
                                        <select className="form-select" name="gender"  onChange={(e) => {this.props.passPassengerDetails(this.props.keys,e.target.name,e.target.value);this.setState({gender : e.target.value})}}>
                                            <option></option>
                                            <option value="Male"><FormattedMessage id="male"/></option>
                                            <option value="Female"><FormattedMessage id="female"/></option>
                                            <option value="Transgender"><FormattedMessage id="transgender"/></option>
                                        </select>
                                        {this.state.gender === '' && <h6 className="form-label text-center text-danger"><b>{this.props.errorMessage === true ? "*.Given Field (gender) is required" : ""}</b></h6>}<br/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}