import React from 'react';
import { StatusBar, View,ImageBackground, Text, Image, Dimensions, TouchableOpacity, Linking, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import styles from "../styles/styles";

const { width, height } = Dimensions.get("window");

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


// import React, { Component } from 'react';
// import {
//     StyleSheet,
//     Text,
//     View,
//     TouchableHighlight,
// } from 'react-native';

// import Loading from 'react-native-whc-loading';

// export default class App extends Component {
//   render() {
//     return (
//       <View style={styles.container}>
//           <TouchableHighlight
//               style={[styles.button, {backgroundColor: 'red'}]}
//               onPress={() => {
//                 this.refs.loading.show();
//                 setTimeout(() => {
//                     this.refs.loading.close();
//                 }, 2000);
//               }} >
//               <Text style={styles.text}>loading style 1</Text>
//           </TouchableHighlight>
//           <TouchableHighlight
//               style={[styles.button, {backgroundColor: 'gray'}]}
//               onPress={() => {
//                   this.refs.loading2.show();
//                   setTimeout(() => {
//                       this.refs.loading2.close();
//                   }, 2000);
//               }}>
//               <Text style={styles.text}>loading style 2</Text>
//           </TouchableHighlight>
//           <TouchableHighlight
//               style={[styles.button, {backgroundColor: '#13227a'}]}
//               onPress={() => {
//                   this.refs.loading3.show();
//                   setTimeout(() => {
//                       this.refs.loading3.close();
//                   }, 2000);
//               }} >
//               <Text style={styles.text}>loading style 3</Text>
//           </TouchableHighlight>
//           <TouchableHighlight
//               style={[styles.button, {backgroundColor: '#1296db'}]}
//               onPress={() => {
//                   this.refs.loading4.show();
//                   setTimeout(() => {
//                       this.refs.loading4.close();
//                   }, 2000); }}>
//               <Text style={styles.text}>loading style 4</Text>
//           </TouchableHighlight>
//           <Loading
//                     ref={"loading"}
//                     image={require("../assets/spinner-of-dots.png")}
//                     backgroundColor='#ffffffF2'
//                     borderRadius={5}
//                     size={70}
//                     imageSize={40}
//                     indicatorColor='gray'
//                     easing={Loading.EasingType.ease}
//                 />
//           <Loading ref={'loading1'}/>
//           <Loading ref={'loading2'}
//                    image={require("../assets/spinner-of-dots.png")}/>
//           <Loading ref={'loading3'}
//                    image={require("../assets/spinner-of-dots.png")}
//                    easing={Loading.EasingType.linear}/>
//           <Loading ref={'loading4'}
//                    backgroundColor={'#00000096'}
//                    indicatorColor={'#fff'}/>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         flexDirection: 'column',
//         justifyContent: 'space-around',
//         padding:30,
//     },
//     button: {
//         height: 50,
//         justifyContent:'center',
//         alignItems:'center',
//     },
//     text: {
//         color: '#fff',
//         fontSize: 18,
//     }
// });
      