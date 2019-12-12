
import React, { Component } from 'react';
import { AppRegistry,Alert ,View } from 'react-native';
import Routes from './Routes.js'

class hopAssitUser extends Component {
   render() {
      return (
         <Routes />
         
      )
   }
}
export default hopAssitUser
AppRegistry.registerComponent('hopAssitUser', () => hopAssitUser)