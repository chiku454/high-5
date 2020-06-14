import React from 'react';
import { CircularProgressbar, CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import RadialSeparators from "./RadialSeparators";
import Button from '@material-ui/core/Button';
import ChangingProgressProvider from "./ChangingProgressProvider";


export default class ThankYouPage extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            orgDetails: props.data
        }
    }
    makeUI(){
        const { orgDetails } = this.state;
        if(Object.keys(orgDetails) && Object.keys(orgDetails).length){
            return (
                <div style={{position: 'relative',
                    }}>
                    <div style={{textAlign:'center'}}>
                        <div style={{fontSize: '24px', color:'#2d3840', fontWeight:600}}>Thanks for your patience</div>
                        <div style={{fontSize: '16px', color:'#4f566b', fontWeight:300, marginTop:"12px"}}>Here's you Happay Score</div>
                    </div>
                    <div style={{margin: '34px 42.8%'}}>
                    <div style={{width: "200px", height: "200px"} }>
                    <ChangingProgressProvider values={[0, 20, 40, 60, 80, 100]}>
                        {percentage => (<CircularProgressbarWithChildren
                            value={orgDetails.score.toFixed(2)}
                            text={`${orgDetails.score.toFixed(2)}`}
                            strokeWidth={10}
                            styles={buildStyles({
                            strokeLinecap: "butt",
                            textColor: "#1DBF52",
                            pathColor: "#1DBF52",
                            trailColor: "#E8F1F8",
                            pathTransitionDuration: 0.15,
                            })}
                        >
                        <div style={{ fontSize: 14, marginTop: '55px' }}>
                            <span> out of 100</span>
                        </div>
                        <RadialSeparators
                            count={12}
                            style={{
                                background: "#fff",
                                width: "2px",
                                // This needs to be equal to props.strokeWidth
                                height: `${10}%`
                            }}
                        />
                        </CircularProgressbarWithChildren>)}
                    </ChangingProgressProvider>
                    </div>
                </div>
                <div className={"orgDetailFooter"}>
                    <div>On the basis of this score, we can give you upto 30% of total limit assigned to {orgDetails.name}</div>
                    <div>We’ll deduct total of 1.75% from your Invoices amount</div>
                </div>
                <div style={{textAlign: 'center', lineHeight: 6}}>
                    <Button variant="contained" color="primary" disableElevation style={{margin: "10px"}} onClick={() => this.props.history.push('/')} >Claim this limit</Button>
                </div>
             </div>
            )
        }
       
    }
   
    render(){
        return(
            <div style={{position:'relative'}}>              
               {this.makeUI()}
            </div>
        )
    }
}