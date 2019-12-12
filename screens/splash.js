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
      