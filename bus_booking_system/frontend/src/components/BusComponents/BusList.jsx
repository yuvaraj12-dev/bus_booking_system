import React from 'react';
import {Link} from 'react-router-dom';
import ListFeature from '../BusComponents/ListFeature.jsx'
import {FormattedMessage} from 'react-intl';

export default class BusList extends React.Component {

    constructor(props){
        super(props);
        this.state={
            busList : []
        }
    }

    componentDidMount(){
        this.handleFetchBusData();
    }

    handleFetchBusData = async () => {
        const url = await fetch('/getBus');
        const response = await url.json();
        this.setState({
            busList : response
        })
    }

    render(){
        return(
            <div className="bg">
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
                <div className="col-xs py-2 col-md col-sm  col-lg center-block">
                     <h1 className="fw-bold text-center text-primary"><FormattedMessage id="listOfBus"/><span className="pull-right">
                     <Link to="/"><button className="btn btn-danger"><FormattedMessage id="logOut"/></button></Link></span></h1>
                </div>
                {this.state.busList.map((data,key) =>
                    <div key={key}>
                        <table className="table table-hover">
                            <tbody>
                                <tr className="tableDiv">
                                    <td ><p className="fw-bold"><FormattedMessage id="travelsName"/></p> {data.busName}</td>
                                    <td ><p className="fw-bold"><FormattedMessage id="from"/></p> {data.currentFrom}</td>
                                    <td ><p className="fw-bold"><FormattedMessage id="to"/></p> {data.currentTo}</td>
                                    <td ><p className="fw-bold"><FormattedMessage id="busType"/></p> {data.busType}</td>
                                    <td ><p className="fw-bold"><FormattedMessage id="availableFeatures"/></p> <ListFeature feature={data.feature}/></td>
                                    <td ><p className="fw-bold"><FormattedMessage id="fare"/></p> {data.fare}</td>
                                    <td ><p className="fw-bold"><FormattedMessage id="seat"/></p> {data.seat}</td>
                                    <td><p className="fw-bold"><FormattedMessage id="action"/></p>
                                        <Link to={`/busList/editBus/${data.id}`}>
                                            <button className="btn btn-outline-primary" onClick = {() =>{this.props.viewValue(data)}}><i className='fa fa-edit'></i></button>
                                        </Link>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}

                <Link to="/addBus">
                    <button className="btn btn-dark"><FormattedMessage id="addBus"/></button>
                </Link>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
            </div>
        );
    }
}