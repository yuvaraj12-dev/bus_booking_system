import React from "react";

export default class ListFeature extends React.Component{
    constructor(props){
        super(props);
        this.state={
            error : false,
            iconName : ''
        };
    }

    render(){
        const showName = () => {
            this.setState({error : !this.state.error})
        }
        const getIconName = (name) => {
            if(name === "fa fa-battery-full")this.setState({iconName : "charging point"})
            else if (name === "fa fa-wifi")this.setState({iconName : "wifi"})
            else if (name === "fa fa-bluetooth")this.setState({iconName : "bluetooth"})
            else if (name === "fa fa-television")this.setState({iconName : "television"})
            else if (name === "fa fa-tint")this.setState({iconName : "water bottle"})
            else if (name === "fa fa-square")this.setState({iconName : "pillow"})
            else if (name === "fa fa-lightbulb-o")this.setState({iconName : "reading light"})
        }
        const numOfFeature = this.props.feature.split(",")
        return(
            <div>
                <div className="d-flex justify-content-center" onMouseEnter={showName} onMouseLeave={showName}>
                    {numOfFeature.map((value,key) =>
                        <span key={key}>
                            <i className={this.props.feature.split(",")[key]} onMouseEnter={() => getIconName(value)}/>&nbsp;
                        </span>
                    )}
                </div>
                {this.state.error &&<i className="featureError">{this.state.iconName}</i>}
            </div>
        )
    }
}