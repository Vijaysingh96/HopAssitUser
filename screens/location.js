import React from 'react';
import { StatusBar, ScrollView, TextInput, View, ImageBackground, Text, Image, Dimensions, TouchableOpacity, Linking, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import styles from "../styles/styles";
import Strings from '../strings/strings'
const { width, height } = Dimensions.get("window");
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = 0.0421;

export default class location extends React.Component {

    constructor(props, context) {
        super(props);
        this.state = {
            userid: '',
            currentlatitude: 37.78825,
            currentlongitude: -122.4324,

        };
    }
    componentWillMount() {
        Geolocation.getCurrentPosition(info =>
            this.setState({
                currentlatitude: info.coords.latitude,
                currentlongitude: info.coords.longitude,
            }),
        );
    }
    render() {
        return (
            <View style={styles.containerWhite}>
                <View style={{ width: '100%', height: 50, flexDirection: 'row' }}>
                    <TouchableOpacity style={{ width: '20%', height: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: '#01A2C4', borderTopRightRadius: 20, borderBottomRightRadius: 20 }}>
                        <Image source={require("../assets/menu.png")}
                            style={{ width: 30, height: 30, }}
                            resizeMode="contain" />
                    </TouchableOpacity>
                    <View style={{ width: '70%', height: 50, justifyContent: 'center', alignItems: 'center', }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{Strings.Adresse_de_dépannage_text}</Text>
                    </View>

                </View>

                <View style={{ flex: 1 }}>

                    <MapView style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                    }}
                        initialRegion={{
                            latitude: this.state.currentlatitude,
                            longitude: this.state.currentlongitude,
                            latitudeDelta: LATITUDE_DELTA,
                            longitudeDelta: LONGITUDE_DELTA,
                        }}

                        provider={PROVIDER_GOOGLE}
                        minZoomLevel={4}
                        maxZoomLevel={17}
                        enableZoomControl={true}
                        showsUserLocation={true}
                        showsMyLocationButton={true}
                        zoomEnabled={true}
                    >
                    </MapView>
                    <View style={{ alignItems: 'center',flexDirection:'column',width:'100%' }}>
                        <View style={{ width: '90%', flexDirection: 'row', height: 50, backgroundColor: 'white', marginTop: 10, borderRadius: 10 }}>
                            <TouchableOpacity style={{ width: '15%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={require("../assets/search.png")}
                                    style={{ width: 20, height: 20, }}
                                    resizeMode="contain" />
                            </TouchableOpacity>
                            <View style={{ width: '70%', height: '100%', justifyContent: 'center' }}>
                                <TextInput
                                    placeholder='Rechercher'>
                                </TextInput>
                            </View>
                            <TouchableOpacity style={{ width: '15%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={require("../assets/clear.png")}
                                    style={{ width: 15, height: 15, }}
                                    resizeMode="contain" />
                            </TouchableOpacity>
                        </View>
                        <View style={{width: '95%',alignItems:'flex-end',marginTop:10}}>
                            <TouchableOpacity style={{ width: '50%', backgroundColor: '#01A2C4',height:30,borderRadius:10,justifyContent:'center',alignItems:'center' }}>
                               <Text style={{fontSize:14,fontWeight:'bold',color:'white'}}>
                                   {Strings.Complement_De_Adresse_text}
                               </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>

                        <TouchableOpacity style={{flexDirection:'row', width: '60%', height: 50, backgroundColor: 'white', marginBottom: 20, borderRadius: 10 }}>
                            <View style={{width:'30%',height:'100%',justifyContent:'center',alignItems:'center'}}>
                            <Image source={require("../assets/x-button.png")}
                                    style={{ width: 20, height: 20, }}
                                    resizeMode="contain" />
                            </View>
                            <View style={{width:'70%',height:'100%',justifyContent:'center'}}>
                                <Text  style={{fontSize:14,fontWeight:'bold'}}>{Strings.Quelle_text}</Text>
                            </View>
                        </TouchableOpacity>

                    </View>


                </View>
            </View>
        );
    }
}
