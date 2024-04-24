import React from 'react';
import {Link} from 'react-router-dom';
import ListFeature from '../BusComponents/ListFeature.jsx'
import {FormattedMessage} from 'react-intl';

export default class FilteredBusDetails extends React.Component {

    constructor(props){
        super(props);
        this.state={
            busDetails : [],
            filteredBusDetails : [],
            filteredFrom : window.location.href.split("/")[5],
            filteredTo : window.location.href.split("/")[6],
            roundedMaxFare : '',
            priceRange : '',
            currentBusType : '',
            spinner : true,
            filterOptions: {
                general: false,
                acSleeper: false,
                acSeater: false
            },
            modifyFrom : "",
            modifyTo : "",
            modifyError : false,
            modifyButton : true
        };
    }

    componentDidMount(){
        this.handleFetchBusData();
    }

    handleFetchBusData = async () => {
        const url = await fetch('/getBus');
        const response = await url.json();
        this.setState({
            busDetails : response.filter(filter => filter.currentFrom === this.state.filteredFrom && filter.currentTo === this.state.filteredTo)
        });
        this.setState({filteredBusDetails : this.state.busDetails})
        if(this.state.busDetails.length !== 0){
            var maxFare = Math.max(...this.state.busDetails.map(o=>o.fare));
            var lastVal = maxFare.toString().substring(maxFare.toString().length-2);
            this.setState({roundedMaxFare : lastVal === "00" ? maxFare : (maxFare + (100 - lastVal))})
        }
    };

    handleCheckboxChange = event => {
        const { name, checked } = event.target;
        this.setState(prevState => ({
            filterOptions: {
                [name.replaceAll(" ","")]: checked
            }
        }));
        this.setState({filteredBusDetails : this.state.busDetails.filter(bus =>
            (((name === 'general' && checked && bus.busType === "GENERAL") ||
            (name === 'ac Sleeper' && checked && bus.busType === "AC SLEEPER") ||
            (name === 'ac Seater' && checked && bus.busType === "AC SEATER")) &&
            (this.state.priceRange !== '' ? bus.fare <= this.state.priceRange : true))
        )})
        {checked === true && this.setState({currentBusType : name})}
        {checked === false && this.setState({
            filteredBusDetails : this.state.busDetails,
            currentBusType : ''
        })}
    };

    handlePriceRange = (event) => {
        this.setState({
            filteredBusDetails : this.state.busDetails.filter(filter => (filter.fare <= event.target.value && (this.state.currentBusType !== '' ? filter.busType === this.state.currentBusType.toUpperCase(): true))),
            priceRange : event.target.value
        })
    }

    render(){
        var filterBusUrl = "/searchBus/busDetails/"+this.state.modifyFrom+"/"+this.state.modifyTo;
        const { general, acSleeper, acSeater } = this.state.filterOptions;

        return(
            <div className="availableBusBg">
                <div>
                    <h1 style={{color:'burlywood'}}><FormattedMessage id="availableBusses"/></h1>
                    <h2  style={{color:'blueviolet'}}><FormattedMessage id="theResultOfYourJourney"/> <b style={{color: 'brown'}}>{this.state.filteredFrom}</b> <FormattedMessage id="to"/> <b style={{color: 'brown'}}>{this.state.filteredTo}</b> </h2>
                    <div className="text-end">
                        <Link to="/searchBus">
                            <button className="btn btn-outline-danger"><FormattedMessage id="back"/></button>
                        </Link>
                    </div>
                </div><br/>
                {this.state.busDetails.length === 0 ?
                    <h2 style={{color:'orange'}}>🙁Sorry No busses available in this route...🙁</h2>
                    :
                        <div>
                            <div className="d-flex justify-content-center">
                                <div className="filter">
                                    <div className="card bg-info">
                                        <div className="card-body w-100">
                                            <h2 style={{color: 'unset'}}><FormattedMessage id="filter"/></h2>
                                            <label style={{color: 'floralwhite'}} className="form-check-label"><b><FormattedMessage id="general"/> 💺 -> </b>&nbsp;
                                                <input className="form-check-input" type="checkbox" name="general" checked={general}   onChange={this.handleCheckboxChange} />
                                            </label>&nbsp;
                                            <label style={{color: 'floralwhite'}} className="form-check-label"><b><FormattedMessage id="acSleeper"/> 🛏️ -> </b>&nbsp;
                                                <input className="form-check-input" type="checkbox" name="ac Sleeper" checked={acSleeper}  onChange={this.handleCheckboxChange}/>
                                            </label>&nbsp;
                                            <label style={{color: 'floralwhite'}} className="form-check-label"><b><FormattedMessage id="acSeater"/> ❄️💺-> </b>&nbsp;
                                                <input className="form-check-input" type="checkbox"  name="ac Seater" checked={acSeater}  onChange={this.handleCheckboxChange}/>
                                            </label>&nbsp;
                                            <h4 style={{color: 'floralwhite'}}><b><FormattedMessage id="priceRange"/> : </b></h4>
                                            <input type="range" max={this.state.roundedMaxFare} step={Math.max(...this.state.busDetails.map(o=>o.fare)) <= 200 ? "50" : "100"} className="slider" id="myRange" onClick={this.handlePriceRange}/>
                                            <span>{this.state.priceRange}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="container" style={{width : '40rem'}}>
                                    <div className="card bg-info" style={{height : '10.5rem'}}>
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-sm-5">
                                                    <div className="form-group">
                                                        <label className="form-label float-start" ><b><FormattedMessage id="from"/> : </b>&nbsp;{this.state.modifyButton && this.state.filteredFrom}</label>
                                                        {!this.state.modifyButton && <input className="form-control form-control-sm text-uppercase" type="text" value={this.state.ModifyFrom} onChange={(e) => this.setState({modifyFrom : e.target.value.toUpperCase()})}/>}
                                                        {this.state.modifyError && <label className="text-danger fw-bold">{this.state.modifyFrom === '' && "*.Field(from) is required"}</label>}
                                                    </div>
                                                </div>
                                                <div className="col-sm-2">
                                                    <button className="btn btn-outline " style={{width : '100%'}}  onClick={() => this.setState({ modifyFrom: this.state.modifyTo, modifyTo: this.state.modifyFrom })}>&#10607;</button><br/>
                                                </div>
                                                <div className="col-sm-5">
                                                    <div className="form-group" >
                                                        <label className="form-label float-start"><b><FormattedMessage id="to"/> : </b> &nbsp;{this.state.modifyButton && this.state.filteredTo}</label>
                                                        {!this.state.modifyButton && <input className="form-control form-control-sm text-uppercase" type="text" value={this.state.ModifyTo} onChange={(e) => this.setState({modifyTo : e.target.value.toUpperCase()})}/>}
                                                        {this.state.modifyError && <label className="text-danger fw-bold">{this.state.modifyTo === '' && "*.Field(to) is required"}</label>}
                                                    </div>
                                                </div>
                                            </div><br/>
                                            {this.state.modifyButton ?
                                                <button className="btn btn-outline-danger btn-sm" style={{width : '50%'}} onClick={() => this.setState({modifyButton : false})}><FormattedMessage id="modify"/></button>
                                            :
                                                (this.state.modifyFrom === '' && this.state.modifyTo === '' ?
                                                    <button className="btn btn-outline-danger btn-sm" style={{width : '50%'}} onClick={() => this.setState({modifyError : true})}><FormattedMessage id="modify"/></button>
                                                :
                                                    <a href={filterBusUrl}>
                                                        <button className="btn btn-outline-danger btn-sm" style={{width : '50%'}}><FormattedMessage id="modify"/></button>
                                                    </a>
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div><br/>
                                <div className="bg-light">
                                    {this.state.filteredBusDetails.map((value,key) =>
                                        <table className="table table-hover table-light" style={{width : '100%'}} key={key}>
                                            <tbody>
                                                <tr className="tableDiv">
                                                    <td ><p className="fw-bold"><FormattedMessage id="travelsName"/></p> {value.busName}</td>
                                                    <td ><p className="fw-bold"><FormattedMessage id="from"/></p> {value.currentFrom}</td>
                                                    <td ><p className="fw-bold"><FormattedMessage id="to"/></p> {value.currentTo}</td>
                                                    <td ><p className="fw-bold"><FormattedMessage id="busType"/></p> {value.busType}</td>
                                                    <td ><p className="fw-bold"><FormattedMessage id="availableFeatures"/></p> <ListFeature feature={value.feature}/></td>
                                                    <td ><p className="fw-bold"><FormattedMessage id="fare"/></p> {value.fare}</td>
                                                    <td ><p className="fw-bold"><FormattedMessage id="availablitySeats"/></p> {value.numOfSeatBooked}</td>
                                                    <td ><p className="fw-bold"><FormattedMessage id="seat"/></p> {value.seat}</td>
                                                    <td>
                                                         <p className="fw-bold"><FormattedMessage id="action"/></p>
                                                          {value.numOfSeatBooked !== '0' ? (
                                                          <Link to="/searchBus/busDetails/passengerDetails">
                                                             <button className="btn btn-outline-primary" onClick={() => this.props.setBus(value)}>
                                                                <FormattedMessage id="bookNow"/>
                                                             </button>
                                                           </Link>
                                                             ) : (
                                                         <span style={{color:'red'}}>Sold out</span>
                                                            )}
                                                     </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    )}
                                </div>
                        </div>
                    }
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
            </div>
        );
    }
}