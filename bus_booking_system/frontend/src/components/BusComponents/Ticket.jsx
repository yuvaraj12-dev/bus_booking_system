import React from 'react';
import { Link } from 'react-router-dom';
import TicketBusLogo from '../images/travel-bus-logo-template-with-white-background-suitable-for-your-design-need-logo-illustration-animation-etc-free-vector.jpg';
import GovtLogo from '../images/govtlogo.jpeg';
import JsPDF from 'jspdf';
import html2canvas from 'html2canvas';


export default class Ticket extends React.Component {

 calculateGST = () => {

        let totalGST = 0;
        this.props.allPassenger.forEach(passenger => {
            totalGST += passenger.gst;
        });
        return totalGST;
    };
    generatePDF = () => {
        const input = document.getElementById("pdf-content");
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            const pdf = new JsPDF("portrait", "pt", "a4");
            pdf.addImage(imgData, "PNG", 0, 0);
            pdf.save("document.pdf");
        });
    };

    clearData = () => {
        const input = document.getElementById("pdf-content");
        input.innerHTML = '';
    }

    onBackFunction = () => {
        this.clearData();
    }



    render() {
        return (
        <>
        {this.props.allPassenger.length === 0 ?
            <div>
                <h2>website is empty back to search</h2><br/>
                <a href="/searchBus">
                    <button className="btn btn-outline-primary bg-light" onClick={this.onBackFunction}>Back</button>
                </a>
            </div>
        :
            <div id="image" className="section">
                <div className="container py-4" style={{ width: '40rem' }}>
                    <div className="form-group text-end py-2">
                        <a href="/searchBus">
                            <button className="btn btn-outline-primary bg-light" onClick={this.onBackFunction}>Back</button>
                        </a>&nbsp;
                        <button className="btn btn-outline-primary" onClick={this.generatePDF}>📥Generate PDF</button>
                    </div>
                    <div style={{outlineStyle : 'double',padding : '0px 10px 10px'}}>
                        <div>
                            <div id="pdf-content">
                                <img src={TicketBusLogo} alt="icon" style={{ float: 'left', width: '100px', height: '120px' }} />
                                <img src={GovtLogo} alt="icon" style={{ float: 'right', width: '100px', height: '120px' }} />
                                <h1 className="text-center">Bus Ticket</h1>
                                <center><h1 style={{ color: 'orange' }}> HAPPY JOURNEY </h1></center><br/>
                                <h4 className="card-title">PASSENGER DETAILS</h4><br/>
                                <div className="row">
                                    <div className="col-sm-4">
                                        <div className="form-group">
                                            <label className="form-label"><b>TravelsName : </b> {this.props.busDetails.map(value => value.busName)}</label>
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="form-group">
                                            <label className="form-label"><b>From  : </b> {this.props.from}</label><br />
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="form-group">
                                            <label className="form-label"><b>To  : </b> {this.props.to}</label><br />
                                        </div>
                                    </div>
                                </div><br/>
                                <div>
                                    <table className="table table-hover">
                                        <thead className="table-dark">
                                            <tr>
                                               <th>Name</th>
                                               <th>Age</th>
                                               <th>Mobile No</th>
                                               <th>Gender</th>
                                               <th>PNR Number</th>
                                               <th>Txn Password</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.props.allPassenger.map((passengers, key) =>
                                                <tr key={key}>
                                                    <td>{passengers.name}</td>
                                                    <td>{passengers.age}</td>
                                                    <td>{passengers.mobileNo}</td>
                                                    <td>{passengers.gender}</td>
                                                    <td>{passengers.confirmationNumber}</td>
                                                    <td>{passengers.txnPassword}</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                 <h5 style={{float:'left' , color:'blue'}}>  GST Amount : {this.calculateGST()} </h5><br/><br/>
                               <h5 style={{float:'left',color:'blue'}}>Total Fare Paid : {(this.props.allPassenger[0].totalPayment * this.props.allPassenger.length)}</h5><br/>    <br/>
                               <p>Valid IDs to be presented during journey by one of the passenger booked on an e-ticket:- Driving License, Voter Identity Card, PAN Card, Passport, Aadhar, Ration Card, Senior Citizen card with photograph /Original Identity Card issued by the Government Departments with photo / Original with Photo identification card issued by Private Companies/ Original with photo Identity Card issued by the Education Institutions/ Original with Photo debit / credit cards/ Aadhaar, PAN Card and Driving License Identity (Soft Copy) presented through Digilocker App considered as valid proof of identity.</p><br/>
                               <h2 style={{color:'red'}}> IMPORTANT INFORMATION </h2>
                               <p>➡️For details, rules of E-Ticketing, please visit www.redBus.in</p>
                               <p>➡The seat(s) booked under this e-ticket/m-ticket is/are not transferable.</p>
                               <p>➡Passenger shall keep the e-ticket/m-ticket safely till the end of the journey.</p>
                               <p>➡Passenger shall show the e-ticket/m-ticket and ID proof at the time of checking.</p>
                               <p>➡ All departure / arrival timings are in 24 hour format i.e 8:00 AM will be displayed as 08:00 hrs and 8:00 PM as 20:00 hrs</p>
                               <p> 🌟🌟🌟🌟🌟HAPPY JOURNEY🌟🌟🌟🌟🌟</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            }
        </>
        );
    }
}