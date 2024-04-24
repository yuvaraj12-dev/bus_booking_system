import React from 'react';
import { Link} from 'react-router-dom';
import LoginRightSideLogo from '../images/stock-photo-bus-icon.jpeg';
import GooglePlayImage from '../images/googlePlayStore.png';
import WhatsApp from '../images/WhatsApp.png';
import LoginLeftSideLogo from '../images/360_F_208725884_9c4n0EY0Ob3lgs8vUse9xswcCwI8tmrs.jpg';
import { FormattedMessage } from 'react-intl';


export default class Bus extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            username: '',
            password: '',
            login: false,
            loginFunction : false,
            userNameError : '',
            passwordError : '',
            offer1: 'WELCOME500',
            offer2: 'LUCKY100',
            offer3: 'GOLD200',
            offer4: 'SILVER10',
        }
    }

    loginError = () => {
        this.setState({
            userNameError : "*.Given Field(username) is required",
            passwordError : "*.Given Field(password) is required"
        })
    }

    render(){
        return(
            <div className="logInBg">
               <img src={LoginRightSideLogo} alt="icon"style={{ float: 'left', width: '100px', height: '100px' }}/>
               <img src={LoginLeftSideLogo} alt="icon"style={{ float: 'right', width: '100px', height: '100px' }}/>
               <FormattedMessage  id="makeYourJourneyPleasant" tagName="h1"/>
               <p className="text-primary fw-bold"> <FormattedMessage id="downloadOurAppForBetterExperience"/>
                 <img src={GooglePlayImage} alt="Google Play Store" style={{ width: '70px', marginLeft: '10px' }} />
                 <img src={WhatsApp} alt="WhatsApp" style={{ width: '20px', marginLeft: '10px' }} />
               </p>
                <marquee className="marq text-danger fw-bold" direction="left" loop="">
                   <a href="https://www.veenaworld.com/package/kashmir-to-kanyakumari-road-trip-tour-package-rtkk" target="_blank" > 🔴 <FormattedMessage id="aPackagedTourToTheKanniyakumariToKashmir"/></a><a href="/searchBus"> 🔴 <FormattedMessage id="bookATicketsNow"/></a>🔴 <FormattedMessage id="aLimitedSeatsAreAvailable"/>.
                </marquee>
                <div className="container" style={{width : '25rem'}}>
                    <div className="card">
                        <div className="card-body">
                            <div className="d-flex gap-1">
                                <button style={{width : '50%'}} className="btn btn-outline-primary" onClick={() => this.setState({login: true})}><FormattedMessage id="adminLogin"/></button>
                                <button style={{width : '50%'}} className="btn btn-outline-secondary" onClick={() => this.setState({login: false})}><FormattedMessage id="userLogin"/></button>
                            </div><br/>
                            <h2>{this.state.login ? <FormattedMessage id="adminLogin"/> : <FormattedMessage id="userLogin"/> }</h2><br/>
                            <input type="text" className="form-control" placeholder="UserName or email" value={this.state.username  } onChange={(e) => this.setState({username : e.target.value})}></input>
                            {this.state.username === '' && <label className="text-danger fw-bold">{this.state.userNameError}</label>}<br/>
                            <input type="password" className="form-control" placeholder="Password" value={this.state.password} onChange={(e) => this.setState({password : e.target.value})}></input>
                            {this.state.password === '' && <label className="text-danger fw-bold">{this.state.passwordError}</label>}<br/>
                            {(this.state.username !== '' && this.state.password !== '') ?
                                (this.state.login ?
                                    <Link to="/busList" style={{width : '100%'}} className="btn btn-outline-primary" ><FormattedMessage id="signIn"/></Link>
                                :
                                    <Link to="/searchBus" style={{width : '100%'}} className="btn btn-outline-primary" ><FormattedMessage id="signIn"/></Link>
                                )
                            :
                                <Link style={{width : '100%'}} className="btn btn-outline-primary" onClick={this.loginError}><FormattedMessage id="signIn"/></Link>
                            }
                        </div>
                    </div>
                </div>
                <div>
                    <h2 style={{color:'yellow',float:'left'}}>🥳<FormattedMessage id="trendingOffers"/>🥳</h2><br/><br/>
                    <div className="d-flex justify-content-between">
                        <div className="redbus1" >
                            <div className="d-flex offer1">
                                <input size="2" value={this.state.offer1} readOnly/><button onClick={() => {navigator.clipboard.writeText(this.state.offer1)}}><i className='fa fa-copy'></i></button>
                            </div>
                        </div>
                        <div className="redbus2" >
                            <div className="d-flex offer1">
                                <input size="2" value={this.state.offer2} readOnly/><button onClick={() => {navigator.clipboard.writeText(this.state.offer2)}}><i className='fa fa-copy'></i></button>
                            </div>
                        </div>
                        <div className="redbus3">
                            <div className="d-flex offer1">
                                <input size="2" value={this.state.offer3} readOnly/><button onClick={() => {navigator.clipboard.writeText(this.state.offer3)}}><i className='fa fa-copy'></i></button>
                            </div>
                        </div>
                        <div className="redbus4">
                            <div className="d-flex offer1">
                                <input size="2" value={this.state.offer4} readOnly/><button onClick={() => {navigator.clipboard.writeText(this.state.offer4)}}><i className='fa fa-copy'></i></button>
                            </div>
                        </div>
                    </div>
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
                </div>
            </div>
        );
    }
}