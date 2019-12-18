import React from 'react';
import { StatusBar, Button, FlatList, ScrollView, PixelRatio, TextInput, View, ImageBackground, Text, Image, Dimensions, TouchableOpacity, Linking, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import styles from "../styles/styles";
import Strings from '../strings/strings'
import { Card } from 'native-base';
import { Rating, AirbnbRating } from 'react-native-elements';


export default class interventionDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           

        };

    }

    
    render() {
        return (
            <View style={styles.containerWhite}>
                <View style={{ width: '100%', height: 50, flexDirection: 'row', backgroundColor: 'white' }}>
                    <TouchableOpacity onPress={() => Actions.pop()} style={{ width: '20%', height: 50, justifyContent: 'center', alignItems: 'center', borderTopRightRadius: 20, borderBottomRightRadius: 20 }}>
                        <Image source={require("../assets/left-arrow.png")}
                            style={{ width: 30, height: 20, }}
                            resizeMode="contain" />
                    </TouchableOpacity>
                    <View style={{ width: '70%', height: 50, justifyContent: 'center', alignItems: 'center', }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{Strings.l_intervention_text}</Text>
                    </View>
                </View>
                <ScrollView>
                    <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
                        <Image source={require("../assets/image.png")}
                            style={{ width: '100%', height: 150, backgroundColor: 'red' }}
                        />

                        <View style={{ width: 100, height: 100, borderRadius: 100 / 2, backgroundColor: 'white', marginTop: -50, alignItems: 'center', justifyContent: 'center' }}>
                            <Image source={require("../assets/images.jpeg")}
                                style={{ width: 95, height: 95, borderRadius: 95 / 2 }} />
                        </View>

                        <Text style={{ fontSize: 18, fontWeight: 'bold', padding: 5 }}>John Smith</Text>
                        <Text style={{ fontSize: 16, }}>johnsmith@gmail.com</Text>
                        <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
                            <View style={{ width: 25, height: 25, borderWidth: 1, borderRadius: 4, borderColor: Strings.color_green_code, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontWeight: 'bold', color: Strings.color_green_code }}>5</Text>
                            </View>
                            <Text style={{ fontSize: 14, }}>{Strings.travaux_text}</Text>
                        </View>
                        <Text style={{ fontSize: 14, padding: 5 }}>{Strings.cout_text} € 25</Text>
                        <AirbnbRating
                            showRating={false}
                            count={5}
                            color={Strings.color_green_code}
                            defaultRating={3}
                            size={15} />

                      

                       

                    </View>
                </ScrollView>
            </View>
        );
    }
}
