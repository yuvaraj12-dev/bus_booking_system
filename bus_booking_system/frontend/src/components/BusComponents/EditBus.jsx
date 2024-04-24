import React from 'react';
import { Link } from 'react-router-dom';
import {FormattedMessage} from 'react-intl';

export default class EditBus extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            list  :  this.props.val,
            id  : '',
            busName : '',
            from : '',
            to : '',
            busType : '',
            feature:'',
            fare : '',
            chargingPoint: false,
            wifi: false,
            dvd: false,
            television: false,
            waterBottle: false,
            pillow: false,
            readingLight: false,
            AllFeature: []
        }
    }

    componentDidMount(){
        this.onChangeValue();
    }

    onChangeValue = () => {
        {this.state.list.map(value =>
            {this.setState({
                id : value.id,
                busName : value.busName,
                from : value.currentFrom,
                to : value.currentTo,
                busType : value.busType,
                feature : value.feature,
                fare  : value.fare,
            })
            if(this.state.AllFeature.length === 0){
                value.feature.split(",").map(alreadySel =>
                   {this.state.AllFeature.push(alreadySel)
                   this.setState({AllFeature : this.state.AllFeature})}
                )
            }
            this.setState({
                chargingPoint : value.feature.includes("fa fa-battery-full"),
                wifi : value.feature.includes("fa fa-wifi"),
                dvd : value.feature.includes("fa fa-bluetooth"),
                television : value.feature.includes("fa fa-television"),
                waterBottle : value.feature.includes("fa fa-tint"),
                pillow : value.feature.includes("fa fa-square"),
                readingLight : value.feature.includes("fa fa-lightbulb-o")
            })}
        )}
    }

    onUpdate = () => {
        const featureToStr = this.state.AllFeature.toString();
        fetch("/saveEditBus/"+this.state.id,{
            method : "PUT",
            headers : new Headers({'content-type':'application/json'}),
            body:JSON.stringify({busName : this.state.busName,from : this.state.from, to : this.state.to, busType : this.state.busType,
                                                 feature: featureToStr ,fare :this.state.fare}),
        })
    }

    handleFeature = (event) => {
        const {name,value,checked} = event.target;
        if(name === 'chargingPoint')this.setState({chargingPoint : !this.state.chargingPoint})
        else if(name === 'wifi')this.setState({wifi : !this.state.wifi})
        else if(name === 'dvd')this.setState({dvd : !this.state.dvd})
        else if(name === 'television')this.setState({television : !this.state.television})
        else if(name === 'waterBottle')this.setState({waterBottle : !this.state.waterBottle})
        else if(name === 'pillow')this.setState({pillow : !this.state.pillow})
        else if(name === 'readingLight')this.setState({readingLight : !this.state.readingLight})
        if(checked){
            this.state.AllFeature.push(value)
            this.setState({AllFeature : this.state.AllFeature})
        }else{
            var removedFeature = this.state.AllFeature.filter(filter => filter !== value);
            this.setState({AllFeature : removedFeature})
        }
    }

    render(){
        return(
        <div className="editBg">
            <div className="container py-4"  style={{width: '40rem'}}>
                <div className="card" >
                    <div className="card-body p-3">
                        <h1><FormattedMessage id="toEditBus"/></h1>
                        <div className="text-end">
                            <Link to="/busList">
                                <button className="btn btn-outline-danger"><FormattedMessage id="back"/></button>
                            </Link>
                        </div>
                        <div className="form-outline mb-4">
                            <label className="form-label float-start"><b><FormattedMessage id="busName"/> : </b></label>
                            <input className="form-control" type="text" value={this.state.busName} onChange={(e) => this.setState({busName : e.target.value.toUpperCase()})}/>
                            <label className="form-label float-start"><b><FormattedMessage id="from"/> : </b></label>
                            <input className="form-control text-uppercase" type="text" value={this.state.from} onChange={(e) => this.setState({from : e.target.value.toUpperCase()})}/>
                            <label className="form-label float-start"><b><FormattedMessage id="to"/> : </b></label>
                            <input className="form-control text-uppercase" type='text' value={this.state.to} onChange={(e) => this.setState({to :e.target.value.toUpperCase()})}/>
                            <label className="form-label float-start"><b><FormattedMessage id="busType"/> : </b></label>
                            <select className="form-select"  value={this.state.busType} onChange = {(event) => this.setState({busType : event.target.value.toUpperCase()})}>
                                <option value=""></option>
                                <option value="GENERAL">GENERAL</option>
                                <option value="AC SEATER" >AC SEATER</option>
                                <option value="AC SLEEPER" >AC SLEEPER</option>
                            </select>
                            {this.state.busType === '' && <a>{this.state.busTypeError}</a>}
                            <div>
                                <label className="form-label float-start"><b><FormattedMessage id="availableFeatures"/> :</b></label>
                            </div><br/><br/>
                            <div className="d-flex">
                                <div>
                                    <label><FormattedMessage id="chargingPoint"/> 🔋 </label>&ensp;
                                    <input type="checkbox" id="0" name="chargingPoint" value="fa fa-battery-full" checked={this.state.chargingPoint} onChange={this.handleFeature}/><br/>
                                    <label><FormattedMessage id="wirelessFidelity"/> 🌐</label>&ensp;
                                    <input type="checkbox" id="1" name="wifi" value="fa fa-wifi" checked={this.state.wifi} onChange={this.handleFeature} />&ensp;
                                </div>
                                <div>
                                    <label><FormattedMessage id="dvd"/> 💽 </label>&ensp;
                                    <input type="checkbox" id="2" name="dvd" value="fa fa-bluetooth" checked={this.state.dvd} onChange={this.handleFeature} /><br/>
                                    <label ><FormattedMessage id="television"/> 📺</label>&ensp;
                                    <input type="checkbox" id="3" name="television" value="fa fa-television" checked={this.state.television} onChange={this.handleFeature} />
                                </div>
                                <div>
                                    <label ><FormattedMessage id="waterBottle"/> 🥤 </label>&ensp;
                                    <input type="checkbox" id="4" name="waterBottle" value="fa fa-tint" checked={this.state.waterBottle} onChange={this.handleFeature} /><br/>
                                    <label ><FormattedMessage id="pillow"/> 🛏️ </label>&ensp;
                                    <input type="checkbox" id="5" name="pillow" value="fa fa-square" checked={this.state.pillow} onChange={this.handleFeature} />
                                </div>
                                <div>
                                    &ensp;<label ><FormattedMessage id="readingLight"/> 💡 </label>&ensp;
                                    <input type="checkbox" id="6" name="readingLight" value="fa fa-lightbulb-o" checked={this.state.readingLight} onChange={this.handleFeature} />
                                </div>
                            </div>
                            <label className="form-label float-start"><b><FormattedMessage id="fare"/> : </b></label>
                            <input className="form-control" type="number" value={this.state.fare} onChange={(e) => this.setState({fare : e.target.value})}/>
                        </div>
                        <div>
                            <a href="/busList">
                                <button style={{width : '100%'}} className="btn btn-outline-primary" onClick={this.onUpdate}><FormattedMessage id="EditBus"/></button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        );
    }
}