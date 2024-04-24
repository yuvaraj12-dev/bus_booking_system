import React from 'react';
import {Link} from 'react-router-dom';
import SeatButtonFunction from '../BusComponents/SeatButtonFunction.jsx';
import AddPassengers from '../PassengerComponent/AddPassenger.jsx';
import {FormattedMessage} from 'react-intl';

export default class PassengerDetails extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            busDetails : [],
            leftSeat: [],
            rightSeat: [],
            selectedSeat: [],
            currentPassengerDetails: [],
            currentBusId: 0,
            currentAvailableSeat: 0,
            from : '',
            to : '',
            fare : '',
            selectedPaymentMethod : '',
            cardHolderName : '',
            cardNumber : '',
            monthAndYear : '',
            cvv : '',
            upiId : '',
            cardHolderNameError : '',
            monthAndYearError : '',
            cvvError : '',
            cardNumberError : '',
            upiIdError : '',
            paymentButton : false,
            setPaymentError : false,
            gst:10

        }
    }

    applyCoupon = (couponCode) => {
        let discount = 0;
        if (couponCode === 'WELCOME500') {
            discount = 0.2;
        } else if (couponCode === 'LUCKY100') {
            discount = 0.1;
        } else if (couponCode === 'GOLD200') {
            discount = 0.6;
        } else if (couponCode === 'SILVER10') {
            discount = 0.15;
        }
        const discountedFare = this.state.fare - (this.state.fare * discount);
        const totalAmount = discountedFare + (discountedFare * this.state.gst) / 100;
        return { discountedFare, totalAmount };
    };

    handleCouponChange = (event) => {
        const couponCode = event.target.value;
        const { discountedFare, totalAmount } = this.applyCoupon(couponCode);
        this.setState({
            selectedCoupon: couponCode,
            fare: discountedFare,
        });
        this.state.currentPassengerDetails.map((value,key) =>
            {const changeValue = [...this.state.currentPassengerDetails]
            changeValue[key].totalPayment = (discountedFare + (this.state.gst / this.state.currentPassengerDetails.length))
            this.setState({currentPassengerDetails : changeValue})}
        )
    };


    onChangeValue = () => {
        this.state.busDetails.push(this.props.selectedTrain)
        this.setState({busDetails : this.props.selectedTrain})
        const numOfSeat = [];
        var splitSeat = 0;
        if(this.state.leftSeat.length === 0 ){
            this.state.busDetails[0].map(value =>
                {for (var findSeat = 0; findSeat < parseInt(value.seat); findSeat++) {
                    numOfSeat.push(findSeat);
                }
                this.setState({from : value.currentFrom ,to : value.currentTo})}
            )
            splitSeat = numOfSeat.length / 2 ;
            {for(var divSeats = 0 ; divSeats < numOfSeat.length; divSeats++){
                if(divSeats < splitSeat){
                    this.state.leftSeat.push({seatNum : divSeats+1,seatStatus : false,busId : 0,bookedStatus: false})
                }else if (divSeats < (splitSeat+splitSeat)){
                    this.state.rightSeat.push({seatNum : divSeats+1,seatStatus : false,busId : 0,bookedStatus: false})
                }
            }}
            this.checkedBookedSeats()
        }
    }

    componentDidMount(){
        this.onChangeValue();
        if (this.props.selectedTrain && this.props.selectedTrain.length > 0) {
            const initialFare = this.props.selectedTrain[0].fare;
            this.setState({ fare: initialFare, initialFare: initialFare });
        }
    }

    allPassengerDetails = (index,name,value) => {
        const changeValue = [...this.state.currentPassengerDetails]
        if(name === "name")changeValue[index].name = value
        else if(name === "age")changeValue[index].age = value
        else if(name === "mobileNo")changeValue[index].mobileNo = value
        else if(name === "gender")changeValue[index].gender = value
        this.setState({currentPassengerDetails : changeValue})
    }


    handlePaymentButton = () => {
        var allPassengerFilled = 0;
        this.state.currentPassengerDetails.map(value =>
            {if(value.name === '' || value.age === '' || value.mobileNo === ''
                || value.gender === ''){
                allPassengerFilled = 1;
            }}
        )

        if(allPassengerFilled === 0 && this.state.currentPassengerDetails.length > 0){
            const totalPassengers = this.state.currentPassengerDetails.length;
            const totalFare = totalPassengers * this.state.fare;
            const totalGst = (this.state.fare * this.state.gst) / 100;
            const GST = totalGst * totalPassengers;
            this.setState({
                gst: GST,
                paymentButton : true,
                setPaymentError : false
            })
            this.state.currentPassengerDetails.map((value,key) =>
                {const changeValue = [...this.state.currentPassengerDetails]
                changeValue[key].totalPayment = ((totalFare / this.state.currentPassengerDetails.length)+(GST / this.state.currentPassengerDetails.length))
                changeValue[key].gst = (GST / this.state.currentPassengerDetails.length)
                changeValue[key].confirmationNumber = Math. floor(Math. random() * 10000000000)
                changeValue[key].txnPassword = Math. floor(Math. random() * 10000)
                this.setState({currentPassengerDetails : changeValue})}
            )
        }else{
            this.setState({
                setPaymentError : true
            })
        }
    }

    handleBookTicketFunction = () => {
        var removedBookedSeat = (this.state.currentAvailableSeat - this.state.selectedSeat.length);
        fetch("/putNumOfSeat/"+this.state.currentBusId,{
            method : "PUT",
            headers : new Headers({'content-type':'application/json'}),
            body:JSON.stringify({numOfSeat : removedBookedSeat}),
        })
        this.state.leftSeat.filter(filter => filter.seatStatus === true).map(value =>
            fetch('/addBookedSeat',{
                method : "POST",
                headers : new Headers({'content-type':'application/json'}),
                body : JSON.stringify({
                    currentBusId : value.busId ,
                    bookingSeatNum : value.seatNum
                })
            })
        )
        this.state.rightSeat.filter(filter => filter.seatStatus === true).map(value =>
            fetch('/addBookedSeat',{
                method : "POST",
                headers : new Headers({'content-type':'application/json'}),
                body : JSON.stringify({
                    currentBusId : value.busId ,
                    bookingSeatNum : value.seatNum
                })
            })
        )
        var payment = (this.state.fare + this.state.gst) / this.state.currentPassengerDetails.length;
        var gst = (this.state.gst) / this.state.currentPassengerDetails.length;
        this.state.currentPassengerDetails.map(value =>
            fetch('/bookTicket',{
                method : "POST",
                headers : new Headers({'content-type':'application/json'}),
                body : JSON.stringify({
                    name : value.name,
                    age : value.age,
                    mobileNo : value.mobileNo,
                    gender : value.gender,
                    selectedPaymentOption : this.state.selectedPaymentMethod,
                    cardNumber : this.state.cardNumber,
                    monthAndYear : this.state.monthAndYear,
                    cvv : this.state.cvv,
                    cardHolderName : this.state.cardHolderName,
                    upiId : this.state.upiId,
                    totalPayment : payment,
                    totalGst : gst
                })
            })
        )
    }

    addPassenger = () =>{
        const currentSelectedSeat = []
        this.state.leftSeat.map(value =>
            {if(value.seatStatus === true){
                currentSelectedSeat.push(value.seatNum)
            }}
        )
        this.state.rightSeat.map(value =>
            {if(value.seatStatus === true){
                currentSelectedSeat.push(value.seatNum)
            }}
        )
        this.setState({selectedSeat : currentSelectedSeat})
        const emptyPassengers = [];
        {for (var findSeat = 0; findSeat < this.state.selectedSeat.length+1; findSeat++){
            emptyPassengers.push({
                name: '',
                age: '',
                mobileNo: '',
                gender: '',
                totalPayment : '',
                gst : '',
                confirmationNumber : ''
            })
        }}
        this.setState({currentPassengerDetails : emptyPassengers})
    }


    createSeatLeft = (id,booked,key) =>{
        const changeValue = [...this.state.leftSeat]
        changeValue[key].seatStatus = booked
        changeValue[key].busId = id
        this.setState({leftSeat : changeValue})
        this.addPassenger();
    }

    createSeatRight = (id,booked,key) =>{
        const changeValue = [...this.state.rightSeat]
        changeValue[key].seatStatus = booked
        changeValue[key].busId = id
        this.setState({rightSeat : changeValue})
        this.addPassenger();
    }

    checkedBookedSeats = () => {
        var currentBusId = 0 ;
        this.state.busDetails[0].map(value => {this.setState({currentBusId : value.id,currentAvailableSeat : value.numOfSeatBooked})
                                    currentBusId = value.id})
        fetch('/getBookedSeat')
            .then(response => response.json())
            .then(result => {
                result.filter(filter => parseInt(filter.busId) === currentBusId).map(bookedSeat =>
                    {this.state.leftSeat.map((value,key) =>
                        {if(parseInt(bookedSeat.seatNumber) === parseInt(value.seatNum)){
                            const changeValue = [...this.state.leftSeat]
                            changeValue[key].bookedStatus = true
                            this.setState({leftSeat : changeValue})
                        }}
                    )
                    this.state.rightSeat.map((value,key) =>
                        {if(parseInt(bookedSeat.seatNumber) === parseInt(value.seatNum)){
                            const changeValue = [...this.state.rightSeat]
                            changeValue[key].bookedStatus = true
                            this.setState({rightSeat : changeValue})
                        }}
                    )}
                )
            })
    }

    paymentStatusOnchange = (value) => {
        this.setState({
            selectedPaymentMethod : value,
            cardHolderNameError : "",
            cardHolderName : "",
            cardNumberError : "",
            cardNumber : "",
            monthAndYearError : "",
            monthAndYear : "",
            cvvError : "",
            cvv : "",
            upiIdError : "",
            upiId : ""
        })
    }

    PaymentValidation = () => {
        if(this.state.selectedPaymentMethod === ('CreditCard' || 'DebitCard')){
            this.setState({
                cardHolderNameError : "card holder name is required",
                cardNumberError : "card number is required",
                monthAndYearError : "month and year is required",
                cvvError : "cvv is required",
                upiIdError : ""
            })
        }else if (this.state.selectedPaymentMethod === "UPI"){
            this.setState({
                upiIdError : "UPI is required",
                cardHolderNameError : "",
                cardNumberError : "",
                monthAndYearError : "",
                cvvError : "",
            })
        }else{
            alert("Please select payment method !")
        }
    }

    render(){
        var backButtonUrl = this.state.from === '' ? ("/searchBus") : ("/searchBus/busDetails/"+this.state.from+"/"+this.state.to);
        return(
            <div>
                <div className="passengerBg">
                    {!this.state.paymentButton ?
                        <>
                            <div  className="passengerTrain">
                                {this.state.busDetails.map((value,key) =>
                                    <div style={{color:'yellow'}} key={key}>
                                        <label><b><FormattedMessage id="from"/> : &nbsp;</b></label><a>{value.currentFrom}</a>&emsp;&emsp;
                                        <label><b><FormattedMessage id="to"/> : &nbsp;</b></label><a>{value.currentTo}</a>&emsp;&emsp;
                                        <label><b><FormattedMessage id="fare"/> : &nbsp;</b></label><a>{value.fare}</a>&emsp;&emsp;
                                        <label><b><FormattedMessage id="seat"/> : &nbsp;</b></label><a>{value.seat}</a>&emsp;&emsp;
                                        <label><b><FormattedMessage id="busType"/> : &nbsp;</b></label><a>{value.busType}</a>
                                    </div>
                                )}
                            </div>
                            <div className="text-end">
                                <Link to={backButtonUrl}>
                                    <button className="btn btn-outline-success"><FormattedMessage id="back"/></button>
                                </Link>
                            </div>
                            <div className="passengerDetails d-flex ">
                                <div style={{color:'red'}}className="seatFrom">
                                    <div className="seatBox">
                                        <h1>{this.state.busDetails.map(value => value.busName)}</h1>
                                        <p style={{float:'right', fontSize:'24px'}}>ꔮ<br/><FormattedMessage id="driver"/></p><br/><br/><br/>

                                        <div className="numOfSeat">
                                            <>
                                                <div className="leftSeats">
                                                    {this.state.leftSeat.map((value,key) =>
                                                        <div className="leftSeats" key={key}>
                                                            <SeatButtonFunction seatValue={value} busDetails={this.state.busDetails[0]} setSeat={this.createSeatLeft} seatCount={this.state.selectedSeat.length} keys={key}/>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="rightSeats">
                                                    {this.state.rightSeat.map((value,key) =>
                                                        <div className="rightSeats" key={key}>
                                                            <SeatButtonFunction  seatValue={value} busDetails={this.state.busDetails[0]} setSeat={this.createSeatRight} seatCount={this.state.selectedSeat.length} keys={key}/>
                                                        </div>
                                                    )}
                                                </div>
                                            </>
                                        </div>
                                        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
                                        <h4 style={{color:'blue'}}> 🟦 - <FormattedMessage id="booked"/></h4>
                                        <h4 style={{color:'red'}}>  🟥 - <FormattedMessage id="available"/></h4>
                                    </div>
                                </div>
                                <div style={{color:'red'}} className="personFrom">
                                    <h1><FormattedMessage id="addPassenger"/></h1>
                                    <div className="form-outline">
                                        {this.state.selectedSeat.map((value,key) =>
                                            <div key={key}>
                                                <h3><FormattedMessage id="passenger"/> {key+1} </h3><label><h2><b> Seat No : {value} </b></h2></label>
                                                <AddPassengers keys={key} errorMessage={this.state.setPaymentError} passPassengerDetails={this.allPassengerDetails}/><br/>
                                            </div>
                                        )}
                                        {this.state.selectedSeat.length !== 0 ?
                                            <button className="btn btn-outline-primary" onClick={this.handlePaymentButton}><FormattedMessage id="bookNow"/></button>
                                        :
                                            <div className="selectSeatError" style={{color:'yellow'}} >
                                                <h2>&#11013; <FormattedMessage id="pleaseSelectOneSeat"/></h2>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </>
                        :
                        <div className="container py-4"  style={{ width: '30rem'}}>
                            <div className="card p-3 w-100 psg">
                                <div className="card-body p-3">
                                <h4 className="text-center">💲<FormattedMessage id="payment"/>💲</h4>
                                    <div className="form-outline mb-4">
                                        <label className="form-label float-start fw-bold"><FormattedMessage id="amount"/> 💵: </label>
                                        <input className="form-control" type="text" value={this.state.initialFare} readOnly />
                                        <label className="form-label float-start fw-bold"><FormattedMessage id="gst"/> 🪙: </label>
                                        <input className="form-control" type="text" value={this.state.gst} readOnly />
                                        <label className="form-label float-start fw-bold"><FormattedMessage id="applyCouponCode"/> 📌 :</label>
                                        <input className="form-control" type="text" value={this.state.selectedCoupon} onChange={this.handleCouponChange} />
                                        <label className="form-label float-start fw-bold"><FormattedMessage id="totalAmountNeedToPay"/> : </label>
                                        <input className="form-control" type="text" value={(this.state.fare * this.state.currentPassengerDetails.length) + this.state.gst} readOnly />
                                        <label className="form-label float-start fw-bold"><b><FormattedMessage id="paymentType"/> : </b></label>
                                        <select className="form-select" value={this.state.selectedPaymentMethod} onChange={(event) => this.paymentStatusOnchange(event.target.value)}>
                                            <option value=""></option>
                                            <option value="CreditCard"><FormattedMessage id="creditCard"/> 💳</option>
                                            <option value="DebitCard"><FormattedMessage id="debitCard"/> 💳</option>
                                            <option value="UPI"><FormattedMessage id="upi"/></option>
                                        </select><br/>
                                        <p style={{color:'#843280'}}><b><FormattedMessage id="oneLineParaPayment"/></b></p>
                                        {(this.state.selectedPaymentMethod === 'CreditCard' || this.state.selectedPaymentMethod === 'DebitCard') && (
                                            <div className="card-body p-2">
                                            <h3>{this.state.selectedPaymentMethod === 'CreditCard'? <FormattedMessage id="creditCard"/> : <FormattedMessage id="debitCard"/>} Card Details</h3><br/>
                                                <div className="form-outline mb-4">
                                                    <label className="form-label float-start"><b><FormattedMessage id="cardHolderName"/> : </b></label>
                                                    <input className="form-control input-lg" type="text" value={this.state.cardHolderName} minLength="3" onChange={(event) => this.setState({cardHolderName : event.target.value})}/><br/>
                                                    {this.state.cardHolderName === '' && <h6 className="form-label text-center text-danger"><b>{this.state.cardHolderNameError}</b></h6>}
                                                    <label className="form-label float-start"><b><FormattedMessage id="cardNumber"/> : </b></label>
                                                    <input className="form-control input-lg" type="text" value={this.state.cardNumber} maxLength="16" onChange={(event) => this.setState({cardNumber : event.target.value})}/><br/>
                                                    {this.state.cardNumber === '' && <h6 className="form-label text-center text-danger"><b>{this.state.cardNumberError}</b></h6>}
                                                    <label className="form-label float-start"><b><FormattedMessage id="monthAndYear"/> : </b></label>
                                                    <input className="form-control input-lg" type="date" value={this.state.monthAndYear} onChange={(event) => this.setState({monthAndYear : event.target.value})}/><br/>
                                                    {this.state.monthAndYear === '' && <h6 className="form-label text-center text-danger"><b>{this.state.monthAndYearError}</b></h6>}
                                                    <label className="form-label float-start"><b><FormattedMessage id="cvv"/> : </b></label>
                                                    <input className="form-control input-lg" type="text" value={this.state.cvv} maxLength="3" onChange={(event) => this.setState({cvv : event.target.value})}/><br/>
                                                    {this.state.cvv === '' && <h6 className="form-label text-center text-danger"><b>{this.state.cvvError}</b></h6>}
                                                </div>
                                            </div>
                                        )}

                                    {this.state.selectedPaymentMethod === 'UPI' && (
                                        <div className="card-body p-2">
                                            <h3><FormattedMessage id="upiDetails"/></h3><br/>
                                            <div className="form-outline mb-4">
                                                <label className="form-label float-start"><b><FormattedMessage id="upi"/> : </b></label>
                                                <input className="form-control input-lg" type="text" value={this.state.upiId} onChange={(event) => this.setState({upiId : event.target.value})} minLength="3"/>
                                                {this.state.upiId === '' && <h6 className="form-label text-center text-danger"><b>{this.state.upiIdError}</b></h6>}
                                            </div>
                                        </div>
                                    )}
                                </div>
                                {((this.state.selectedPaymentMethod === 'CreditCard' || this.state.selectedPaymentMethod === 'DebitCard') && this.state.cardHolderName !== '' &&
                                    this.state.cardNumber !== '' && this.state.monthAndYear !== '' && this.state.cvv !== '')
                                    || (this.state.selectedPaymentMethod === 'UPI' && this.state.upiId !== '') ?
                                <Link to="/Ticket">
                                    <button style={{width : '100%'}} className="btn btn-outline-primary" onClick={()=>{this.handleBookTicketFunction()
                                                                                                                        this.props.passengerDetails(this.state.currentPassengerDetails)}}><FormattedMessage id="bookATicketsNow"/></button>
                                </Link>
                                :
                                    <button style={{width : '100%'}} className="btn btn-outline-primary" onClick={this.PaymentValidation}><FormattedMessage id="bookATicketsNow"/></button>
                                }
                            </div>
                        </div>
                   </div>
                   }
                </div>
            </div>
        );
    }
}
