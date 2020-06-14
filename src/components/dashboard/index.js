import React from 'react';
import Card from '@material-ui/core/Card';
// import logo from '../../logo.svg';
// import logo from '../../images/1.svg';


// import happayScoreLogo from '../../logo.svg';
import Loader from '../loader'
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';

import Tile from './tile'
import './style.css';

// const tileData = [
//     {
//         scf_id: 1242,
//         name: 'Manish Chouhan',
//         logo: logo,
//     },
//     {
//         scf_id: 1243,
//         name: 'Manish Kumar',
//         logo: logo,
//     },
//     {
//         scf_id: 1244,
//         name: 'Vidya',
//         logo: logo,
//     },
//     {
//         scf_id: 1245,
//         name: 'Sorabh',
//         logo: logo,
//     },
//     {
//         scf_id: 1246,
//         name: 'Ankit',
//         logo: logo,
//     },
//     {
//         scf_id: 12427,
//         name: 'Shulka',
//         logo: logo,
//     },
//     {
//         scf_id: 1248,
//         name: 'Chouhan',
//         logo: logo,
//     },
//     {
//         scf_id: 1249,
//         name: 'Nagar',
//         logo: logo,
//     }
// ]
 export default class Dashboard extends React.Component{
     constructor(){
         super();
         this.state = {
             searchVal: '',
             tileData : [],
             isDataFetch: true,
             msg:'',
         }
     }
     fetchAPI(){
        // const url = 'https://00ffd8bd.ngrok.io/scf/v1/get-user/'
        const url = 'http://54.174.174.229:8888/scf/v1/get-user/'

        // const url = "https://v2-uat-api.happay.in/access/v1/countrycode/"
          fetch(url) 
      
          .then(res => { return res.json()})
          .then(data => {
            // data = res;
            this.setState({
                tileData: data.res_data,
                isDataFetch: false,
                msg:data.res_str
            })
          })
          .catch(function(err) {
            console.log('err', err)
          });

      }
     componentDidMount(){
        this.fetchAPI()
     }
    _handleSearch = (e, value) => {
        console.log(e ,value)
        this.setState({searchVal: e.target.value})
    }
    render(){
        const { tileData, searchVal, isDataFetch, msg } = this.state;
        let renderTileData = [];
        searchVal ? 
         tileData && tileData.forEach((unit) => {
            if(unit.name.toLowerCase().indexOf(searchVal.toLowerCase()) !== -1)
                renderTileData.push(unit);
         }) : renderTileData = tileData;
        return(
            <Card className={"cardWrapper"}>     
                <CardContent>        
                    <div>
                        <div style={{margin:"0 45%"}}>
                            {/* <img src={logo} style={{width:'100px', margin: "12px"}}/> */}
                            <div style={{fontWeight: 'bold', fontSize:"16px", color:"#4f566a"}}>Happay - SNS</div>                            
                        </div>
                        <div>
                            <div style={{fontWeight: 'bold', fontSize:"32px"}}>Get your Happay score today and enjoy all </div>
                            <div style={{fontWeight: 'bold', fontSize:"32px"}}>our benefits</div>
                        </div>
                        <div style={{margin:"0 28%"}}>
                            <ul style={{textAlign:"left", lineHeight: 2.5}}>
                                <li>Corporates, Leave your Invoice payments with us and we’ll take care of that.</li>
                                <li>Vendors, Wants to get all your Invoices Paid “RIGHT NOW”.</li>
                                <li>One score, multiple benefits 😉</li>
                            </ul>
                        </div>
                        <div className={"orgBtnWrap withPadding"}>
                            <div className={"withPadding"} style={{padding:'1rem', fontWeight:"bolder"}}> Tell us who you are?</div>
                            <div style={{padding:'1rem'}}>
                                <Button variant="contained" color="primary" disableElevation style={{margin: "10px"}} onClick={() => this.props.history.push('/corporate')}>I am a Corporate</Button>
                                <Button variant="contained" color="primary" disableElevation style={{margin: "10px"}} onClick={() => this.props.history.push('/vendor')}>I am a Vendor</Button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className={"searchOrg"}>Search for your Organization</div>
                        <div>
                            <TextField  label="Search Organization" style={{width: "75%"}} variant="outlined" value={this.state.searchVal} onChange={(e) => this.setState({ searchVal: e.target.value })}/>
                        </div>{
                            isDataFetch ? <Loader /> :
                            <div className={'tileWraper'}>
                             <Tile data={renderTileData} history={this.props.history}/>
                        </div>
                        }
                                            
                    </div>
                </CardContent>  
            </Card>
            
        )
    }
}