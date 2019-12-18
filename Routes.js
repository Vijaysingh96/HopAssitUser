import { AsyncStorage, Platform, Alert } from 'react-native';
import { Actions, Router, Stack, Scene } from 'react-native-router-flux';
// import {Actions} from 'react-native-router-flux';
import React from 'react';
import { BackHandler } from 'react-native'
//import Home from './screens/home'
//import Login from './screens/login'
import Splash from './screens/splash'
import ViewPager from './screens/viewPager'
import SignUp from './screens/signUp'
import Login from './screens/login'
import Register from './screens/register'
import Location from './screens/location'
import ChooseService from './screens/chooseService'
import CreateReservations from './screens/createReservation'
import AddCart from './screens/addCart'
import ExpertsList from './screens/expertsList'
import ExpertDetails from './screens/expertDetails'
import Rating from './screens/rating'
import SideBar from './screens/sideBar'
import Profile from './screens/profile'
import EditProfile from './screens/editprofile'
import History from './screens/historys'
import InterventionDetails from './screens/interventionDetails'


_backAndroidHandler = () => {
  const scene = Actions.currentScene;
  // alert(scene)
  if (scene === 'Tabs' || scene === 'Home') {
    AsyncStorage.setItem("backEvent", "" + true);
    // console.log("backEvent test "+backEvent);
    BackHandler.exitApp();
    return true;
  }
  Actions.pop();
  return true;
};


const Routes = () => (
  <Router
    navigationBarStyle={{ backgroundColor: '#8B008B', height: 45 }} tintColor='white' backAndroidHandler={this._backAndroidHandler}>

    <Stack key="root">
    <Scene key="Splash" component={Splash} left={()=>null} hideNavBar />
    <Scene key="ViewPager" component={ViewPager} left={()=>null} hideNavBar />
    <Scene key="SignUp" component={SignUp} left={()=>null} hideNavBar />
    <Scene key="Login" component={Login} left={()=>null} hideNavBar /> 
    <Scene key="Register" component={Register} left={()=>null} hideNavBar />
    <Scene key="Location" component={Location} left={()=>null} hideNavBar />
    <Scene key="ChooseService" component={ChooseService} left={()=>null} hideNavBar />
    <Scene key="CreateReservations" component={CreateReservations} left={()=>null} hideNavBar />
    <Scene key="AddCart" component={AddCart} left={()=>null} hideNavBar />
    <Scene key="ExpertsList" component={ExpertsList} left={()=>null} hideNavBar />
    <Scene key="ExpertDetails" component={ExpertDetails} left={()=>null} hideNavBar />
    <Scene key="Rating" component={Rating} left={()=>null} hideNavBar />
    <Scene key="SideBar" component={SideBar} left={()=>null} hideNavBar />
    <Scene key="Profile" component={Profile} left={()=>null} hideNavBar />
    <Scene key="EditProfile" component={EditProfile} left={()=>null} hideNavBar />
    <Scene key="History" component={History} left={()=>null} hideNavBar />
    <Scene key="InterventionDetails" component={InterventionDetails} left={()=>null} hideNavBar />
   </Stack>
  </Router>
);
export default Routes;

