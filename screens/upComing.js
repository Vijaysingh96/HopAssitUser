import React from 'react';
import { StatusBar, Button, FlatList, ScrollView, PixelRatio, TextInput, View, ImageBackground, Text, Image, Dimensions, TouchableOpacity, Linking, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import styles from "../styles/styles";
import Strings from '../strings/strings'
import ImagePicker from 'react-native-image-picker';

export default class upComming extends React.Component {
    constructor(props) {
        super(props);
        this.state = {


        };

    }

 


    render() {
        return (
            <View style={styles.containerWhite}>
              
                    <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center',backgroundColor:'white',height:500 }}>
                   <Text>Hello</Text>
                    </View>
               
            </View>
        );
    }
}
