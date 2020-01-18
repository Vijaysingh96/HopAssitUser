import React from 'react';
import { StatusBar, DrawerLayoutAndroid, ScrollView, TextInput, View, ImageBackground, Text, Image, Dimensions, TouchableOpacity, Linking, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import styles from "../styles/styles";
import Strings from '../strings/strings'
const { width, height } = Dimensions.get("window");
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import RBSheet from "react-native-raw-bottom-sheet";
import Sidebar from '../screens/sideBar'
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = 0.0421;

export default class location extends React.Component {

    constructor(props, context) {
        super(props);
        this.state = {
            userid: '',
            currentlatitude: 37.78825,
            currentlongitude: -122.4324,
            markerArray: [],

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
    componentDidMount() {
       // this.currentlatlongDriver();
        this.refs['DRAWER'].closeDrawer();
        // BackAndroid.exitApp();
    }
    _setDrawer() {
        this.refs['DRAWER'].openDrawer();
    }

    currentlatlongDriver() {
        fetch(Strings.base_Url + "technicians", {
            method: 'GET',
            headers: {
                // 'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((responseData) => {

                this.setState({
                    markerArray: responseData
                })

            }
            )
    }
    clickDone(){
        alert("Avec succès Fait")
    }
    markerClick(id){
        //alert(id)
        Actions.push("CreateReservations",{currentTechId:id})
    }
    render() {
        var navigationView = (
            <Sidebar />
        );
        return (
            <DrawerLayoutAndroid
                drawerWidth={250}
                drawerPosition={DrawerLayoutAndroid.positions.Left}
                renderNavigationView={() => navigationView}
                ref={'DRAWER'} >
                <View style={styles.containerWhite}>
                    <View style={{ width: '100%', height: 50, flexDirection: 'row' }}>
                        <TouchableOpacity onPress={this._setDrawer.bind(this)} style={{ width: '20%', height: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: '#01A2C4', borderTopRightRadius: 20, borderBottomRightRadius: 20 }}>
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
                            {this.state.markerArray.map((marker, index) => (
                                //console.log("response pickupLocationMap===" +JSON.parse(marker.currentLat))

                            <MapView.Marker
                                coordinate={
                                    {
                                        latitude: JSON.parse(marker.currentLat),
                                        longitude: JSON.parse(marker.currentLong),
                                        }
                                } 
                                onPress={() => this.markerClick(marker.id)}
                                // title="hello"
                                // image={marker.avatar}                             
                            >
                           
                              {marker.serviceCategory == 1 ? <Image source ={require('../assets/windows.png')}
                                    style={{width:30,height:30}}
                                    resizeMode='contain'></Image>
                                    :
                                    <Image source ={require('../assets/linux.png')}
                                    style={{width:30,height:30}}
                                    resizeMode='stretch'></Image>
                             
                             }

                                    {/* <Image source ={require('../assets/wifi.png')}
                                    style={{width:30,height:30}}></Image> */}
                               
                            </MapView.Marker>
                                
                            ))}
                        </MapView>
                        <View style={{ alignItems: 'center', flexDirection: 'column', width: '100%' }}>
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
                            <View style={{ width: '95%', alignItems: 'flex-end', marginTop: 10 }}>
                                <TouchableOpacity onPress={() => this.RBSheet.open()} style={{ width: '50%', backgroundColor: '#01A2C4', height: 30, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'white' }}>
                                        {Strings.Complement_De_Adresse_text}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>

                            <TouchableOpacity onPress={()=>Actions.push("ChooseService")} style={{ flexDirection: 'row', width: '60%', height: 50, backgroundColor: 'white', marginBottom: 20, borderRadius: 10 }}>
                                <View style={{ width: '30%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                    <Image source={require("../assets/x-button.png")}
                                        style={{ width: 20, height: 20, }}
                                        resizeMode="contain" />
                                </View>
                                <View style={{ width: '70%', height: '100%', justifyContent: 'center' }}>
                                    <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{Strings.Quelle_text}</Text>
                                </View>
                            </TouchableOpacity>

                        </View>


                    </View>

                    <RBSheet
                        ref={ref => { this.RBSheet = ref; }}
                        height={500}
                        duration={200}
                        closeOnPressMask={false}
                        customStyles={{
                            container: {
                                alignItems: "center",
                                borderRadius: 10,
                                // backgroundColor: 'rgba(52, 52, 52, 0.8)'  
                                backgroundColor: 'transparent'
                            }
                        }}>
                        <ImageBackground source={require("../assets/Box(1).png")}
                            style={{ width: 360, height: 520, borderRadius: 50, alignItems: 'center' }}
                            resizeMode='stretch'>
                            <View style={{ flexDirection: 'column', width: '90%', height: '98%', borderRadius: 10, alignItems: 'center', marginTop: 20 }}>
                                <View style={{ width: '100%', height: 40, alignItems: 'flex-end' }}>
                                    <TouchableOpacity onPress={() => this.RBSheet.close()} style={{ width: 40, height: 40, alignItems: 'center', justifyContent: 'center' }}>
                                        <Image source={require("../assets/clear.png")}
                                            style={{ width: 15, height: 15, }}
                                            resizeMode="contain" />

                                    </TouchableOpacity>
                                </View>
                                <Text style={{ fontSize: 14, fontWeight: 'bold', paddingBottom: 20 }}>{Strings.Complement_De_Adresse_text}</Text>
                                <View style={{ width: '95%', marginTop: 20, height: 360 }}>


                                    <ScrollView
                                        showsVerticalScrollIndicator={false}
                                        style={{ width: '100%', }}>
                                        <View style={{ width: '100%', alignItems: 'center', }}>


                                            <View style={{ width: '100%', flexDirection: 'column' }}>
                                                <Text style={{ paddingLeft: 15 }}>{Strings.Veuillez_indiquer_text}</Text>

                                                <View style={{ marginLeft: 20, marginTop: 10 }}>
                                                    <Text style={{ fontSize: 14, }}>{Strings.street_text}</Text>
                                                    <TextInput style={{ marginTop: -10 }}></TextInput>
                                                    <View style={{ width: '98%', borderWidth: 0.5, borderColor: Strings.light_color, marginTop: -10 }}>
                                                    </View>
                                                </View>
                                                <View style={{ marginLeft: 20, marginTop: 20 }}>
                                                    <Text style={{ fontSize: 14, }}>{Strings.zip_code_text}</Text>
                                                    <TextInput keyboardType="decimal-pad" style={{ marginTop: -10 }}></TextInput>
                                                    <View style={{ width: '98%', borderWidth: 0.5, borderColor: Strings.light_color, marginTop: -10 }}>
                                                    </View>
                                                </View>

                                                <View style={{ marginLeft: 20, marginTop: 20 }}>
                                                    <Text style={{ fontSize: 14, }}>{Strings.city_text}</Text>
                                                    <TextInput style={{ marginTop: -10 }}></TextInput>
                                                    <View style={{ width: '98%', borderWidth: 0.5, borderColor: Strings.light_color, marginTop: -10 }}>
                                                    </View>
                                                </View>

                                                <View style={{ marginLeft: 20, marginTop: 20 }}>
                                                    <Text style={{ fontSize: 14, }}>{Strings.door_code_text}</Text>
                                                    <TextInput keyboardType="decimal-pad" style={{ marginTop: -10 }}></TextInput>
                                                    <View style={{ width: '98%', borderWidth: 0.5, borderColor: Strings.light_color, marginTop: -10 }}>
                                                    </View>
                                                </View>

                                                <View style={{ marginLeft: 20, marginTop: 20 }}>
                                                    <Text style={{ fontSize: 14, }}>{Strings.floor_level_text}</Text>
                                                    <TextInput style={{ marginTop: -10 }}></TextInput>
                                                    <View style={{ width: '98%', borderWidth: 0.5, borderColor: Strings.light_color, marginTop: -10 }}>
                                                    </View>
                                                </View>

                                                <View style={{ marginLeft: 20, marginTop: 20 }}>
                                                    <Text style={{ fontSize: 14, }}>{Strings.other_text}</Text>
                                                    <TextInput style={{ marginTop: -10 }}></TextInput>
                                                    <View style={{ width: '98%', borderWidth: 0.5, borderColor: Strings.light_color, marginTop: -10 }}>
                                                    </View>
                                                </View>

                                                <View style={{ marginLeft: 20, marginTop: 20 }}>
                                                    <Text style={{ fontSize: 14, }}>{Strings.telephone_text}</Text>
                                                    <TextInput
                                                        keyboardType="decimal-pad"
                                                        style={{ marginTop: -10 }}></TextInput>
                                                    <View style={{ width: '98%', borderWidth: 0.5, borderColor: Strings.light_color, marginTop: -10 }}>
                                                    </View>
                                                </View>

                                                <View style={{ width: '100%', marginTop: 20, marginBottom: 20, flexDirection: 'row' }}>
                                                    <View style={{ width: '50%', alignItems: 'center', justifyContent: 'center', height: 40 }}>

                                                        <TouchableOpacity onPress={() => this.RBSheet.close()+this.clickDone()} style={{ width: '80%', height: '100%', backgroundColor: '#01A2C4', borderRadius: 8, alignItems: 'center', justifyContent: 'center', }}>
                                                            <Text style={{ color: 'white', fontSize: 14 }}>{Strings.next_text}</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                    <View style={{ width: '50%', alignItems: 'center', justifyContent: 'center', height: 40 }}>
                                                        <TouchableOpacity onPress={() => this.RBSheet.close()} style={{
                                                            width: '80%', height: '100%', borderColor: '#01A2C4', borderWidth: 1, borderRadius: 8
                                                            , alignItems: 'center', justifyContent: 'center'
                                                        }}>
                                                            <Text style={{ color: '#01A2C4', fontSize: 14 }}>{Strings.cancel_text}</Text>

                                                        </TouchableOpacity>
                                                    </View>
                                                </View>




                                            </View>

                                        </View>
                                    </ScrollView>
                                </View>
                            </View>
                        </ImageBackground>
                    </RBSheet>
                </View>
            </DrawerLayoutAndroid>
        );
    }
}
