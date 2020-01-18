import React from 'react';
import {Platform,
 
  SafeAreaView, StatusBar, View,ImageBackground, Text, Image, Dimensions, TouchableOpacity, Linking, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import styles from "../styles/styles";
import MapView, { Marker, AnimatedRegion } from "react-native-maps";
import PubNubReact from "pubnub-react";
import Geolocation from '@react-native-community/geolocation';


const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class Splash extends React.Component {
  // onRegionChange(region) {
  //   this.setState({ region });
  // }
  constructor(props, context) {
    super(props);
    this.state = {
      setlangDefault: "", isUpdated: false,
      showUpdateDialog: false,
      isAuthorized: "1",
      userid: '',
    };
  }

  componentWillMount() {
     setTimeout(() => {
      AsyncStorage.getItem("userid")
        .then(userid => {
          this.setState({ userid: userid });

          console.log("state userId============" + userid);

          if (userid != null && userid != "" && userid != undefined) {
             //Actions.push("Demo")
          } else {
            Actions.push("ViewPager");
          }

        })
       console.log("restaurantId::::::" +this.state.userid)
     },2000);

  }
  render() {
    return (

      <View style={styles.containerWhite}>
         <Image  source={require("../assets/Splash.png")}
          style={{width:'100%',height:'100%'}}
          resizeMode='stretch'>

           </Image>
      </View>
    );
  }
}

// export default class App extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       latitude: LATITUDE,
//       longitude: LONGITUDE,
//       coordinate: new AnimatedRegion({
//         latitude: LATITUDE,
//         longitude: LONGITUDE,
//         latitudeDelta: 0,
//         longitudeDelta: 0
//       })
//     };

//     this.pubnub = new PubNubReact({
//       publishKey: "X",
//       subscribeKey: "X"
//     });
//     this.pubnub.init(this);
//   }

//   componentDidMount() {
//     this.watchLocation();
//   }

//   componentDidUpdate(prevProps, prevState) {
//     if (this.props.latitude !== prevState.latitude) {
//       this.pubnub.publish({
//         message: {
//           latitude: this.state.latitude,
//           longitude: this.state.longitude
//         },
//         channel: "location"
//       });
//     }
//   }

//   componentWillUnmount() {
//     Geolocation.clearWatch(this.watchID);
//   }

//   watchLocation = () => {
//     const { coordinate } = this.state;

//     this.watchID = Geolocation.watchPosition(
//       position => {
//         const { latitude, longitude } = position.coords;

//         const newCoordinate = {
//           latitude,
//           longitude
//         };

//         if (Platform.OS === "android") {
//           if (this.marker) {
//             this.marker._component.animateMarkerToCoordinate(
//               newCoordinate,
//               500 // 500 is the duration to animate the marker
//             );
//           }
//         } else {
//           coordinate.timing(newCoordinate).start();
//         }

//         this.setState({
//           latitude,
//           longitude
//         });
//       },
//       error => console.log(error),
//       {
//         enableHighAccuracy: true,
//         timeout: 20000,
//         maximumAge: 1000,
//         distanceFilter: 10
//       }
//     );
//   };

//   getMapRegion = () => ({
//     latitude: this.state.latitude,
//     longitude: this.state.longitude,
//     latitudeDelta: LATITUDE_DELTA,
//     longitudeDelta: LONGITUDE_DELTA
//   });

//   render() {
//     return (
//       <SafeAreaView style={{ flex: 1 }}>
//         <View style={{
    
//     position:'absolute',
//     justifyContent: "flex-end",
//     alignItems: "center"
//   }}>
//           <MapView
//             style={ {
//               position:'absolute',
//             }}
//             showUserLocation
//             followUserLocation
//             loadingEnabled
//             region={this.getMapRegion()}
//           >
//             <Marker.Animated
//               ref={marker => {
//                 this.marker = marker;
//               }}
//               coordinate={this.state.coordinate}
//             />
//           </MapView>
//         </View>
//       </SafeAreaView>
//     );
//   }
// }






      