import React from 'react';
import './App.css';
import Route from './route'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const App = () => (
  <MuiThemeProvider>
    <Route />
  </MuiThemeProvider>
);

export default App;
