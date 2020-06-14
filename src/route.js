import React from "react";
import {
  Router,
  Switch,
  Route,
} from "react-router-dom";
import Dashboard from './components/dashboard';
import Corporate from './components/corporate';
import VendorForm from './components/vender';
import OrgDetail from './components/orgDetail';


import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
import Download from 'material-ui/svg-icons/file/file-download';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';



import history from './history';


// This site has 3 pages, all of which are rendered
// dynamically in the browser (not server rendered).
//
// Although the page does not ever refresh, notice how
// React Router keeps the URL up to date as you navigate
// through the site. This preserves the browser history,
// making sure things like the back button and bookmarks
// work properly.

export default function Rouets() {
    console.log('here', history)
  return (
    <Router history={history}>
        <Switch>
          {/* <Route exact path="/" component={Dashboard } />
          <Route path="/corporate" component={Corporate} />
           <Route path="/vendor"  component={VendorForm}/>
      <Route path="/orgDetail/:tabId"  component={OrgDetail}/> */}
              <Route path="/"  component={DrewMenu}/> 

        </Switch>
    </Router>
  );
}

// You can think of these components as "pages"
// in your app.
const person = {
  "name":"Ram",
  "age":27,
  "vehicles": {
     "car":"limousine",
     "bike":"ktm-duke",
     "airlines":{
        "lufthansa" : "Air123",
         "British airways" : "Brt707"
     }
  }
}
const data = [
  {
    name: "Manish",
    lname: 'Chouhan',
    child: [
      {
        name: "Manish 1",
        lname: 'Chouhan 1',
        child: [
          {
            name: "Manish 2",
            lname: 'Chouhan 2',
            child: [
              {
                name: "Manish 3",
                lname: 'Chouhan 3',
            }
            ]
        }
        ]
    }
    ]
  },
  {
    name: "Piyush",
    lname: 'Dubey',
    child: [
      {
        name: "Piyush 1",
        lname: 'Dubey 1',
        child: [
          {
            name: "Piyush 2",
            lname: 'Dubey 2',
            child: [
              {
                name: "Piyush 3",
                lname: 'Dubey 3',
            }
            ]
        }
        ]
    }
    ]
  }
]
class DrewMenu extends React.Component{
  constructor(){
    super();
    this.state = {}
  }
  _drawNEsted = (data, index) => {
    console.log('data', data)
  //   if(data && data.child && data.child.length){
  //         this._drawNEsted(data.child[0])
     
  // } else{
    return (
      <MenuItem
            primaryText={data.name}
            key={index}
            rightIcon={data && data.child && <ArrowDropRight /> }
            menuItems={data && data.child && this._drawNEsted(data.child[0])}
          />    
    ) 
  // }
       
  }
  makeUI = () => {
 return   <IconMenu 
    iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
     anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
     targetOrigin={{horizontal: 'left', vertical: 'bottom'}}
   >
      { data && data.map((unit, index) => {
       return this._drawNEsted(unit,  index)
     }) }
     </IconMenu>
      //     iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
      //     anchorOrigin={{horizontal: 'left', vertical: 'top'}}
      //     targetOrigin={{horizontal: 'left', vertical: 'top'}}
      //   >
      //     <MenuItem
      //       primaryText="Copy & Paste"
      //       rightIcon={<ArrowDropRight />}
      //       menuItems={[
      //         <MenuItem primaryText="Cut" />,
      //         <MenuItem primaryText="Copy" />,
      //         <Divider />,
      //         <MenuItem primaryText="Paste" />,
      //       ]}
      //     />

      //     <MenuItem
      //       primaryText="Case Tools"
      //       rightIcon={<ArrowDropRight />}
      //       menuItems={[
      //         <MenuItem primaryText="UPPERCASE" />,
      //         <MenuItem primaryText="lowercase" />,
      //         <MenuItem primaryText="CamelCase" />,
      //         <MenuItem primaryText="Propercase" />,
      //       ]}
      //     />
      //     <Divider />
      //     <MenuItem primaryText="Download" leftIcon={<Download />} />
      //     <Divider />
      //     <MenuItem value="Del" primaryText="Delete" />

      //   </IconMenu>
  }
  render(){
    return (
      <div>
          Indie the DrewMenu
          {this.makeUI()}
      </div>
    )
  }
}