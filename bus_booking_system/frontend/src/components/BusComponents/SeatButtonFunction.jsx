import React from 'react';

export default class SeatButtonFunction extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            bookedSeat: true
        }
    }

    changeValue = () => {
        this.setState({bookedSeat: !this.state.bookedSeat})
    }

    render(){
        var seatType = "";
        if(this.props.busDetails.busType === "GENERAL"){
            seatType = "fa fa-user";
        }else if(this.props.busDetails.busType === "AC SLEEPER"){
            seatType = "fa fa-bed";
        }
        return(
            <>
                {this.props.seatValue.bookedStatus ?
                    <button className="bg-primary" disabled>{this.props.seatValue.seatNum}</button>
                :
                <>
                    {this.state.bookedSeat ?
                        <>
                            {this.props.seatCount < 6 ?
                                <button className="btn btn-outline-danger sleeper" onClick={() => {this.props.setSeat(this.props.busDetails.id,this.state.bookedSeat,this.props.keys)
                                                                                                    this.changeValue()}}>{this.props.busDetails.busType === "AC SEATER" ? <img style={{width : "80%"}} src="https://cdn-icons-png.flaticon.com/512/3351/3351424.png"/> : <i className={seatType}></i>}</button>
                            :
                                <button className="bg-light">{this.props.seatValue.seatNum}</button>
                            }
                        </>
                    :
                        <button className="btn btn-outline-primary" onClick={() => {this.props.setSeat(this.props.busDetails.id,this.state.bookedSeat,this.props.keys)
                                                                                                    this.changeValue()}}>{this.props.seatValue.seatNum}</button>
                    }
                </>
                }
            </>
        )
    }
}