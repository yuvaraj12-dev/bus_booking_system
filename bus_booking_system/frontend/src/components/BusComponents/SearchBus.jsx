import React from 'react';
import {Link} from 'react-router-dom';
import {FormattedMessage} from 'react-intl';

export default class SearchBus extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            from : '',
            to : '',
            departureDate : '',
            fromError : '',
            toError : '',
            departureDateError : '',
            loader :false
        }
    }

    setErrorMessage = () =>{
        {this.state.from === '' && this.setState({fromError : "*.Given Field (from) is required"})}
        {this.state.to === '' && this.setState({toError : "*.Given Field (to) is required"})}
        {this.state.departureDate === '' && this.setState({departureDateError : "*Given Field (departure date) is required"})}
    }

    render(){
        var filterBusUrl = "/searchBus/busDetails/"+this.state.from+"/"+this.state.to;
        return(
            <div className="searchBg">
                <Link to="/" style={{ float: 'right' }}>
                    <br/><button  className='btn btn-outline-primary' ><FormattedMessage id="back"/></button>
                </Link>
                <h1 style={{color:'white'}}> <FormattedMessage id="indiasNo1OnlineBusticketBookingSite"/></h1>
                <div className="container py-2" style={{width: '30rem'}}>
                    <div className="card" >
                        {this.state.loader &&
                        <div className="loader">
                            <div className="busLoader">🚌</div>
                            <div className="earthLoader">🌍</div>
                        </div>}
                        <div className="card-body h-50">
                            <h2 style={{color:'red',float:'right'}}><b>🎫 <FormattedMessage id="bookYourTicketsNow"/></b></h2>
                            <div className="form-outline mb-4">
                                <label className="form-label float-start"><b><FormattedMessage id="from"/> : </b></label>
                                <input className="form-control text-uppercase" type="text" value={this.state.from} onChange={(e) => this.setState({from : e.target.value.toUpperCase()})}/>
                                {this.state.from === '' && <label className="form-label text-danger fw-bold">{this.state.fromError}</label>}
                                <button className="btn btn-outline " style={{width : '100%'}}  onClick={() => this.setState({ from: this.state.to, to: this.state.from })}>&#10607;</button><br/>
                                <label className="form-label float-start"><b><FormattedMessage id="to"/> : </b></label>
                                <input className="form-control text-uppercase" type='text' value={this.state.to} onChange={(e) => this.setState({to :e.target.value.toUpperCase()})}/>
                                {this.state.to === '' && <label className="form-label text-danger fw-bold">{this.state.toError}</label>}<br/>
                                <label className="form-label float-start"><b><FormattedMessage id="departureDate"/> : </b></label>
                                <input className="form-control" type='date' value={this.state.departureDate} onChange={(e) => this.setState({departureDate :e.target.value})}/>
                                {this.state.departureDate === '' && <label className="form-label text-danger fw-bold">{this.state.departureDateError}</label>}<br/>
                                {this.state.from !== '' && this.state.to !== '' && this.state.departureDate !== '' ?
                                    <Link to={filterBusUrl}>
                                        <button style={{width : '100%'}} className="btn btn-outline-success" onClick={() => {this.props.handleSearch(this.state.from, this.state.to)
                                                                                                                                this.setState({loader : true})
                                            alert("IMPORTANT TIP: Showing results from your searched boarding and drop location. Scroll down to see  more bus options from to");}}>🔍 <FormattedMessage id="searchBus"/></button>
                                    </Link>
                                :
                                    <button style={{width : '100%'}} className="btn btn-outline-success" onClick={this.setErrorMessage}>🔍 <FormattedMessage id="searchBus"/></button>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container" style={{width : '75rem'}}>
                    <div style={{top:'565px'}}> <h4 className="text-white"><FormattedMessage id="popularRoute"/></h4>
                        <button style={{ color: 'red' }} onClick={() => this.setState({ from: 'CHENNAI', to: 'BENGALURU' })}><FormattedMessage id="chennaiToBangalore"/></button>
                        <button style={{ color: 'red' }} onClick={() => this.setState({ from: 'CHENNAI', to: 'DELHI' })}><FormattedMessage id="chennaiToDelhi"/></button>
                        <button style={{ color: 'red' }} onClick={() => this.setState({ from: 'CHENNAI', to: 'MUMBAI' })}><FormattedMessage id="chennaiToMumbai"/></button>
                        <button style={{ color: 'red' }} onClick={() => this.setState({ from: 'CHENNAI', to: 'KOLKATA' })}><FormattedMessage id="chennaiToKolkata"/></button>
                        <button style={{ color: 'red' }} onClick={() => this.setState({ from: 'CHENNAI', to: 'KOCHIN' })}><FormattedMessage id="chennaiToKochin"/></button>
                    </div>
                </div>
            </div>
        );
    }
}
