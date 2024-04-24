import React from 'react';
import {Link} from 'react-router-dom';
import {FormattedMessage} from 'react-intl';

export default class AddBus extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            busName : '',
            from : '',
            to : '',
            busType : '',
            fare : '',
            seat : '',
            busNameError : '',
            fromError : '',
            toError : '',
            busTypeError : '',
            fareError : '',
            featureError : '',
            seatError : '',
            feature: [],

        }
    }

    handleAddBusFunction = () => {
        const featureToStr = this.state.feature.toString();
        console.log(featureToStr)
        if(this.state.busName !== '' && this.state.from !== '' && this.state.to !== '' && this.state.busType !== ''
                && this.state.feature.length !== 0 && this.state.fare !== '' && this.state.seat !== ''  &&  (this.state.seat >= 20 && this.state.seat <= 30) ){
            fetch('/addBus',{
                method : "POST",
                headers : new Headers({'content-type':'application/json'}),
                body : JSON.stringify({busName : this.state.busName,from : this.state.from, to : this.state.to, busType : this.state.busType,
                 fare :this.state.fare, seat : this.state.seat, feature: featureToStr})
            })
        }else{
            {this.state.busName === '' && this.setState({busNameError: '*.Given Field(BusName) is required'})}
            {this.state.from === '' && this.setState({fromError: '*.Given Field(From) is required'})}
            {this.state.to === '' && this.setState({toError: '*.Given Field(To) is required'})}
            {this.state.busType === '' && this.setState({busTypeError: '*.Given Field(BusType) is required'})}
            {this.state.fare === '' && this.setState({fareError: '*.Given Field(Fare) is required'})}
            {this.state.feature.length === 0 && this.setState({featureError: '*.Given Field(feature) is required'})}
            {this.state.seat === '' ? this.setState({seatError: '*.Given Field(Seat) is required'}) :
            ((this.state.seat < 20 || this.state.seat > 30) && this.setState({seatError: 'give the seat count between 20 to 30'}))
            }
        }
    }

    handleFeature = (event) => {
        const {value,checked} = event.target;
        if(checked){
            this.state.feature.push(value)
            this.setState({feature : this.state.feature})
        }else{
            var removedFeature = this.state.feature.filter(filter => filter !== value);
            this.setState({feature : removedFeature})
        }
    }

    render(){
        return(
            <div className="passengerBg">
                <div className="container py-4" style={{width: '40rem'}}>
                    <div className="card" >
                        <div className="card-body p-3">
                            <h1 style={{color:'red'}}><FormattedMessage id="toAddNewBus"/></h1>
                            <div className="text-end">
                                <Link to="/busList">
                                    <button className="btn btn-outline-danger"><FormattedMessage id="back"/></button>
                                </Link>
                            </div>
                            <div className="form-outline mb-4">
                                <label className="form-label float-start"><b><FormattedMessage id="busName"/> : </b></label>
                                <input className="form-control text-uppercase" type="text" value={this.state.busName} onChange={(e) => this.setState({busName : e.target.value.toUpperCase()})}/>
                                {this.state.busName === '' && <label className="text-danger fw-bold">{this.state.busNameError}</label>}
                                <label className="form-label float-start"><b><FormattedMessage id="from"/> : </b></label>
                                <input className="form-control text-uppercase" type="text" value={this.state.from} onChange={(e) => this.setState({from : e.target.value.toUpperCase()})}/>
                                {this.state.from === '' && <label className="text-danger fw-bold">{this.state.fromError}</label>}
                                <label className="form-label float-start"><b><FormattedMessage id="to"/> : </b></label>
                                <input className="form-control text-uppercase" type='text' value={this.state.to} onChange={(e) => this.setState({to :e.target.value.toUpperCase()})}/>
                                {this.state.to === '' && <label className="text-danger fw-bold">{this.state.toError}</label>}
                                <label className="form-label float-start"><b><FormattedMessage id="busType"/> : </b></label>
                                <select className="form-select"  value={this.state.busType} onChange = {(event) => this.setState({busType : event.target.value.toUpperCase()})}>
                                    <option value=""></option>
                                    <option value="GENERAL"><FormattedMessage id="general"/></option>
                                    <option value="AC SEATER" ><FormattedMessage id="acSleeper"/></option>
                                    <option value="AC SLEEPER" ><FormattedMessage id="acSeater"/></option>
                                </select>
                                {this.state.busType === '' && <label className="text-danger fw-bold">{this.state.busTypeError}</label>}
                                <div>
                                    <label className="form-label float-start"><b><FormattedMessage id="availableFeatures"/> :</b></label>
                                </div><br/><br/>
                                <div className="d-flex">
                                    <div>
                                        <label className="form-check-label"><FormattedMessage id="chargingPoint"/> 🔋 </label>&ensp;
                                        <input className="form-check-input" type="checkbox" id="0" name="chargingPoint" value="fa fa-battery-full"  onChange={this.handleFeature} /><br/>
                                        <label className="form-check-label"><FormattedMessage id="wirelessFidelity"/> 🌐</label>&ensp;
                                        <input className="form-check-input" type="checkbox" id="1" name="wifi" value="fa fa-wifi" onChange={this.handleFeature} />&ensp;
                                    </div>
                                    <div>
                                        <label className="form-check-label"><FormattedMessage id="dvd"/> 💽 </label>&ensp;
                                        <input className="form-check-input" type="checkbox" id="2" name="dvd" value="fa fa-bluetooth" onChange={this.handleFeature} /><br/>
                                        <label className="form-check-label"><FormattedMessage id="television"/> 📺</label>&ensp;
                                        <input className="form-check-input" type="checkbox" id="3" name="television" value="fa fa-television" onChange={this.handleFeature} />
                                    </div>
                                    <div>
                                        <label className="form-check-label"><FormattedMessage id="waterBottle"/> 🥤 </label>&ensp;
                                        <input className="form-check-input" type="checkbox" id="4" value="fa fa-tint" onChange={this.handleFeature} /><br/>
                                        <label className="form-check-label"><FormattedMessage id="pillow"/> 🛏️ </label>&ensp;
                                        <input className="form-check-input" type="checkbox" id="5" name="pillow" value="fa fa-square" onChange={this.handleFeature} />
                                    </div>
                                    <div>
                                        <label className="form-check-label"><FormattedMessage id="readingLight"/> 💡 </label>
                                        <input className="form-check-input" type="checkbox" id="6" name="readingLight" value="fa fa-lightbulb-o" onChange={this.handleFeature} />
                                    </div>
                                </div>
                                {this.state.feature.length === 0 && <label className="text-danger fw-bold">{this.state.featureError}</label>}
                                <label className="form-label float-start"><b><FormattedMessage id="fare"/> : </b></label>
                                <input className="form-control" type="number" value={this.state.fare} onChange={(e) => this.setState({fare : e.target.value})}/>
                                {this.state.fare === '' && <label className="text-danger fw-bold">{this.state.fareError}</label>}
                                <label className="form-label float-start"><b><FormattedMessage id="seat"/> : </b></label>
                                <input className="form-control" type="number" value={this.state.seat} onChange={(e) => this.setState({seat : e.target.value})} />
                                {(this.state.seat === '' || (this.state.seat < 20 || this.state.seat > 30)) && <label className="text-danger fw-bold">{this.state.seatError}</label>}<br/><br/>
                                {this.state.busName !== '' && this.state.from !== '' && this.state.to !== '' && this.state.feature.length !== 0 && this.state.busType !== ''
                                                 && this.state.fare !== '' && this.state.seat !== '' && (this.state.seat >= 20 && this.state.seat <= 30)  ?
                                <a href="/busList">
                                    <button style={{width : '100%'}} className="btn btn-outline-success" onClick={this.handleAddBusFunction}><FormattedMessage id="addBus"/></button>
                                </a>
                                :
                                    <button style={{width : '100%'}} className="btn btn-outline-success" onClick={this.handleAddBusFunction}><FormattedMessage id="addBus"/></button>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}