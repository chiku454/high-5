import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from 'react-select';
import Header from '../header'
import Steper from '../renderSteps';
import Loader from '../loader';
import ThankYouPage from '../thankYouPgae'
import '../dashboard/style.css';

const sector = [
    {
        label: "Manufacturer",
        value: "manufacturer"        
    },
    {
        label: "Trader",
        value: "trader"        
    },
    {
        label: "Services",
        value: "services"        
    },

]
const constitution = [
    {"value":"propreitorship" , "label": "Propreitorship"},
    {"value":"partnership" , "label":"Partnership" },
    {"value": "private", "label":"Pvt Ltd" },
    {"value": "public" , "label": "Public Ltd"}
]
export default class VendorForm extends React.Component{
    constructor(){
        super();
        this.state = {
            stepIndex: 0,
            activeStep: 0,
            isDataFetch: false,
        }
    }   
    fetchAPI(params){
         const url = `http://54.174.174.229:8888/scf/v1/financial-data/`
            params.sector = params.sector.value
            params.constitution = params.constitution.value
          fetch(url,{
            method: "POST",
            body: JSON.stringify(params)
        }) 
      
          .then(res => { return res.ok && res.json()})
          .then(data => {
            this.setState({
                orgDetails: data.res_data,
                activeStep: 2,
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
    onSubmit = () => {
        const { activeStep  } = this.state;
        if(activeStep === 1){
            const {stepIndex, activeStep, isDataFetch,...rest} = this.state;
            this.setState({
                isDataFetch: true,
            }, () => this.fetchAPI(rest))
        }
    }
    getStepIndex = (data) => {
        console.log('data', data)
    }
    handleDropDown = (value, key) => {
        this.setState({
            [key]: value
        })
    }
    fetchAPIForStepFirst(url, rest){
        fetch(url,{
            method: "POST",
            body: JSON.stringify(rest)
        }) 
      
          .then(res => {  return res.ok && res.json()})
          .then(data => {
            this.setState({
                scf_id: data.res_data.scf_id,
                role: data.res_data.role,
                activeStep: 1,
                name: '',
                email: '',
                pan_no:'',
                gstin_no: '',
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
    handleStepOne = () => {
        if(this.state.activeStep === 0){
            const {stepIndex, activeStep, isDataFetch, ...rest} = this.state;
            const url = `http://54.174.174.229:8888/scf/v1/register/`
            rest.role = 'vendor';
            this.setState({
                isDataFetch: true
            }, () => this.fetchAPIForStepFirst(url, rest))
             }
        
    }
    render(){
        const { activeStep, isDataFetch } = this.state;
        return(
            <div>
                <div>
                    <Header history={this.props.history}/>
                </div>
                <Steper getIndex={this.getStepIndex} activeStep={this.state.activeStep} history={this.props.location.pathname}/>
                {
                    isDataFetch ? <Loader /> :
                    activeStep === 0 ?
                    <div style={{height: '60vh',overflow: 'scroll'}}>
                        <div style={{textAlign:'center'}}>
                        <h3>Fill your personal details</h3>
                        <div className={"textField"}>
                                <TextField  
                                label="Name"
                                style={{width: "30%"}} 
                                variant="outlined" value={this.state.name} 
                                onChange={(e) => this.setState({ name: e.target.value })}/>

                            </div>
                            <div className={"textField"}>
                                <TextField  
                                label="Email"
                                style={{width: "30%"}} 
                                variant="outlined" value={this.state.email} 
                                onChange={(e) => this.setState({ email: e.target.value })}/>

                            </div>
                            <div className={"textField"}>
                                <TextField  
                                label="Pan Number"
                                style={{width: "30%"}} 
                                variant="outlined" value={this.state.pan_no} 
                                onChange={(e) => this.setState({ pan_no: e.target.value })}/>

                            </div>
                            <div className={"textField"}>
                                <TextField  
                                label="GST Number"
                                style={{width: "30%"}} 
                                variant="outlined" value={this.state.gstin_no} 
                                onChange={(e) => this.setState({ gstin_no: e.target.value })}/>

                            </div>
                            <div>
                                <Button variant="contained" color="primary" disableElevation style={{margin: "10px"}} onClick={this.handleStepOne}>Continue</Button>
                            </div>
                        </div>
                    </div>
                : activeStep === 1 ? 
                <div style={{height: '60vh',overflow: 'scroll'}}>
                        <div style={{textAlign:'center'}}>
                        <h3>Fill your personal details</h3>
                            <div className={"textField"}>
                                <TextField  
                                label="TOI (in Crs)"
                                style={{width: "30%"}} 
                                variant="outlined" value={this.state.toi} 
                                onChange={(e) => this.setState({ toi: e.target.value })}/>

                            </div>
                            <div className={"textField"}>
                                <TextField  
                                label="EBIDTA (in %)"
                                style={{width: "30%"}} 
                                variant="outlined" value={this.state.ebidta} 
                                onChange={(e) => this.setState({ ebidta: e.target.value })}/>

                            </div>
                            <div className={"textField"}>
                                <TextField  
                                label="Bussiness Vinatage (in year)"
                                style={{width: "30%"}} 
                                variant="outlined" value={this.state.vintage} 
                                onChange={(e) => this.setState({ vintage: e.target.value })}/>

                            </div>
                            <div className={"textField"}>
                                <TextField  
                                label="PAT (in %)"
                                style={{width: "30%"}} 
                                variant="outlined" value={this.state.pat} 
                                onChange={(e) => this.setState({ pat: e.target.value })}/>

                            </div>

                            <div className={"textField"}>
                                <TextField  
                                label="TOL / TNW "
                                style={{width: "30%"}} 
                                variant="outlined" value={this.state.tol_tnw} 
                                onChange={(e) => this.setState({ tol_tnw: e.target.value })}/>

                            </div>
                            <div className={"textField"}>
                                <TextField  
                                label="Current Ratio"
                                style={{width: "30%"}} 
                                variant="outlined" value={this.state.current_ratio} 
                                onChange={(e) => this.setState({ current_ratio: e.target.value })}/>

                            </div>
                            <div className={"textField"}>
                                <TextField  
                                label="Total Debt / Net cash accurals"
                                style={{width: "30%"}} 
                                variant="outlined" value={this.state.td_nca} 
                                onChange={(e) => this.setState({ td_nca: e.target.value })}/>

                            </div>
                            <div className={"textField"}>
                                <TextField  
                                label="Cheques bouncing (in %) "
                                style={{width: "30%"}} 
                                variant="outlined" value={this.state.chequ_bounce} 
                                onChange={(e) => this.setState({ chequ_bounce: e.target.value })}/>

                            </div>

                            <div className={"textField"}>
                                <TextField  
                                label="Utilization of fund based limits "
                                style={{width: "30%"}} 
                                variant="outlined" value={this.state.fund_utilization} 
                                onChange={(e) => this.setState({ fund_utilization: e.target.value })}/>

                            </div>
                            <div className={"textField"}>
                                <TextField  
                                label="Credit summation as % of last year turnover "
                                style={{width: "30%"}} 
                                variant="outlined" value={this.state.credit_summation} 
                                onChange={(e) => this.setState({ credit_summation: e.target.value })}/>

                            </div>
                            <div className={"textField"}>
                                <TextField  
                                label="Average delay in interest servicing"
                                style={{width: "30%"}} 
                                variant="outlined" value={this.state.interest_serving_delay} 
                                onChange={(e) => this.setState({ interest_serving_delay: e.target.value })}/>

                            </div>
                            <div>
                            <div className={"textField"}>
                                <div><label>Sector</label></div>
                                <div style={{width: '27rem', margin: '0 auto'}}>
                                <Select
                                    multi
                                    style={{height: "3.3rem"}}
                                    id="reimbsmt_wallet"
                                    name="reimbsmt_wallet"
                                    valueKey="org_wallet_id"
                                    labelKey="wallet_name"
                                    value={this.state.sector}
                                    options={sector}
                                    onChange={(value) => this.handleDropDown(value, 'sector')}
                                />
                            </div>
                            </div>
                            <div className={"textField"}>
                                <div><label>Constitution</label></div>
                                <div style={{width: '27rem', margin: '0 auto'}}>
                                <Select
                                    multi
                                    id="reimbsmt_wallet"
                                    name="reimbsmt_wallet"
                                    valueKey="org_wallet_id"
                                    labelKey="wallet_name"
                                    value={this.state.constitution}
                                    options={constitution}
                                    onChange={(value) => this.handleDropDown(value, 'constitution')}
                                />
                            </div>
                            </div>
                                <Button variant="contained" color="primary" disableElevation style={{margin: "10px"}} onClick={this.onSubmit}>Submit</Button>
                            </div>
                        </div>
                    </div>
                : <div>
                    <ThankYouPage data={this.state.orgDetails} history={this.props.history}/>
                </div>
                }   
            </div>
        )
    }
}
