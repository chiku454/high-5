import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import ProgessBar from "../progrssbar";
import Header from "../header";
import Loader from "../loader"
export default class OrgDetail extends Component {
    constructor(){
        super()
            this.state = {
                orgDetails: [],
                isDataFetch: true
            }
    }
    fetchAPI(params){
        var url = new URL("http://54.174.174.229:8888/scf/v1/get-user/"),
        params = {scf_id:params}
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
            fetch(url) 
            .then(res => { return res.json()})
            .then(data => {
            console.log('data', data)
            this.setState({
                orgDetails: data.res_data,
                isDataFetch: false
            })
            })
            .catch(function(err) {
            console.log('err', err)
            this.setState({
                isDataFetch: false
            })
            });
    }
    componentDidMount(){
        console.log('this.props', this.props.match.params.tabId);
        this.fetchAPI(this.props.match.params.tabId);
        
    }
  render() {
      const  { orgDetails, isDataFetch } = this.state;
      let imgSrc = null;
      try{
        imgSrc = require(`../../images/${orgDetails.scf_id}.png`)
      }catch(e){
       imgSrc = require(`../../images/${1}.png`)
      }
    return (
        <div style={{width: "94%"}}>
            {/* <div>
                <span>Home / Dunzo</span>
                <span>Serach Bar</span>
            </div> */}
            <Header history={this.props.history}/>
            {
                isDataFetch ? <div style={{margin: '11rem'}}><Loader/> </div>:
                <div>
                <div style={{display: 'flex', justifyContent: 'center', width: '100%', margin: "8rem auto -1rem auto"}}>
                    <div > <img style={{width: '156px'}} src={imgSrc} alt="no Pre"/></div>
                    <div>
                    <div style={{fontSize: "32px", color: '#2D3840', fontWeight: "600", padding: '20px'}}>{orgDetails.name}</div>
                        <div style={{fontSize: "14px", color: '#4F566B', fontWeight: "300", padding: '20px'}}>Unlock money tied up in invoices through the power of invoice discounting</div>
                    </div>
                </div>
                <div style={{width:'75%', margin: "23px auto"}}>
                    <ProgessBar allocatedLimit={10000} totalLimit={80000} currencyCode={'₹'}/>
                </div>
                <div style={{textAlign: 'center', padding: '30px', lineHeight: 3}}>
                    <div style={{color: '#4F566B', fontSize: "24px", fontWeight: '500'}}>Turn Your Unpaid Invoices Into Paid ones, Today</div>
                    <div style={{color: '#4F566B', fontSize: "14px", fontWeight: '500'}}>Avail collateral-free working capital in just 24-72 hours</div>
                    <Button variant="contained" color="primary" disableElevation onClick={() => this.props.history.push('/')}>Get your Limit now</Button>
                </div>
                <div style={{textAlign: 'center', padding: '30px', lineHeight: 3}}>
                    <div style={{color: '#4F566B', fontSize: "24px", fontWeight: '500'}}>Check out all other Dunzo vendors who are enjoying the discount</div>
                    <div style={{display: "flex", justifyContent: "center"}}>
                        <div style={{margin:'10px'}}>
                            <img src={require(`../../images/group-3-copy.png`)}/>
                        </div>
                        <div style={{margin:'10px'}}>
                            <img src={require(`../../images/group-3-copy-2.png`)}/>
                        </div>
                    </div>
                </div>
                </div>
            }
        </div>
    );
  }
}






// import React from 'react';
// import { CircularProgressbar, CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
// import 'react-circular-progressbar/dist/styles.css';
// import RadialSeparators from "../thankYouPgae/RadialSeparators";
// import Button from '@material-ui/core/Button';
// import ChangingProgressProvider from "../thankYouPgae/ChangingProgressProvider";
// import Header from '../header'


// export default class OrgDetail extends React.Component{
//     constructor(){
//         super()
//         this.state = {
//             orgDetails: []
//         }
//     }
//     fetchAPI(params){
//         var url = new URL("http://54.174.174.229:8888/scf/v1/get-user/"),
//         params = {scf_id:params}
//         Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
//           fetch(url) 
//           .then(res => { return res.json()})
//           .then(data => {
//             console.log('data', data)
//             this.setState({
//                 orgDetails: data.res_data
//             })
//           })
//           .catch(function(err) {
//             console.log('err', err)
//           });

//       }
//     componentDidMount(){
//         console.log('this.props', this.props.match.params.tabId);
//         this.fetchAPI(this.props.match.params.tabId);
//         const  { orgDetails } = this.state
        
//     }
//     makeUI(){
//         const { orgDetails } = this.state;
//         console.log(orgDetails,33); 
//         if(Object.keys(orgDetails) && Object.keys(orgDetails).length){
//             return (
//                 <div style={{position: 'relative',
//                     top: '10rem',
//                     }}>
//                     <div style={{textAlign:'center'}}>
//                         <div style={{fontSize: '24px', color:'#2d3840', fontWeight:600}}>Thanks for your patience</div>
//                         <div style={{fontSize: '16px', color:'#4f566b', fontWeight:300, marginTop:"12px"}}>Here's you Happay Score</div>
//                     </div>
//                     <div style={{margin: '34px 42.8%'}}>
//                     <div style={{width: "200px", height: "200px"} }>
//                     <ChangingProgressProvider values={[0, 20, 40, 60, 80, 100]}>
//                         {percentage => (<CircularProgressbarWithChildren
//                             value={orgDetails.score.toFixed(2)}
//                             text={`${orgDetails.score.toFixed(2)}`}
//                             strokeWidth={10}
//                             styles={buildStyles({
//                             strokeLinecap: "butt",
//                             textColor: "#1DBF52",
//                             pathColor: "#1DBF52",
//                             trailColor: "#E8F1F8",
//                             pathTransitionDuration: 0.15,
//                             })}
//                         >
//                         <div style={{ fontSize: 14, marginTop: '55px' }}>
//                             <span> out of 100</span>
//                         </div>
//                         <RadialSeparators
//                             count={12}
//                             style={{
//                                 background: "#fff",
//                                 width: "2px",
//                                 // This needs to be equal to props.strokeWidth
//                                 height: `${10}%`
//                             }}
//                         />
//                         </CircularProgressbarWithChildren>)}
//                     </ChangingProgressProvider>
//                     </div>
//                 </div>
//                 <div className={"orgDetailFooter"}>
//                     <div>On the basis of this score, we can give you upto 30% of total limit assigned to {orgDetails.name}</div>
//                     <div>We’ll deduct total of 1.75% from your Invoices amount</div>
//                 </div>
//                 <div style={{textAlign: 'center', lineHeight: 6}}>
//                     <Button variant="contained" color="primary" disableElevation style={{margin: "10px"}} >Claim this limit</Button>
//                 </div>
//              </div>
//             )
//         }
       
//     }
   
//     render(){
//         return(
//             <div style={{position:'relative'}}>
//                 <div>                   
//                      <Header history={this.props.history}/>
//                 </div>
//                {this.makeUI()}
               
//             </div>
//         )
//     }
// }