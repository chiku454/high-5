import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
// import lgog from '../../images'
import Grid from '@material-ui/core/Grid';
import './style.css'
const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      width:250,
      height: 250,
      margin: 10,
      padding: 10
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      height: '200px',
      cursor: "pointer",
      color: theme.palette.text.secondary,
    },
  }));
const Tile = (props) => {
    const classes = useStyles();
   return props && props.data.map((unit, i) => {
     let imgSrc = null;
     try{
       imgSrc = require(`../../images/${unit.scf_id}.png`)
     }catch(e){
      imgSrc = require(`../../images/${1}.png`)
     }
        return (
            <div className={classes.root} key={unit.scf_id}>
                  <div style={{height:"100%", cursor: "pointer"}} onClick={() => props.history.push(`/orgDetail/${unit.scf_id}`)}> 
                      <div style={{width: "150px", height: "150px", margin: "0 auto"}}>
                        <img src={imgSrc} 
                          alt="no Pre"/>
                      </div>
                  </div>
            </div>
          ); 
    })
    
}
export default Tile;