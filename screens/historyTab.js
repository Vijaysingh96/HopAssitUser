import React from 'react';
import { StatusBar, Button, FlatList, ScrollView, PixelRatio, TextInput, View, ImageBackground, Text, Image, Dimensions, TouchableOpacity, Linking, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import styles from "../styles/styles";
import Strings from '../strings/strings'
import { Card } from 'native-base';
import { Rating, AirbnbRating } from 'react-native-elements';

export default class historyTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [{ name: 'John Simth', rating: '2' }, { name: 'John Simth', rating: '3' },]

        };

    }

    ratingCompleted(rating) {
        console.log("Rating is: " + rating)
    }
    render() {
        return (
            <View style={styles.containerWhite}>
    
                    <View style={{ flex: 1, flexDirection: 'column', margin: 10 }}>
                        <FlatList
                            keyExtractor={item => item.id}

                            data={this.state.data}
                            renderItem={({ item }) => (

                                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                                    <Card style={{ width: "100%", justifyContent: 'space-between', alignItems: 'center', flexDirection: 'column', padding: 10, borderRadius: 15 }}>
                                        <View style={{ width: '100%', flexDirection: 'row' }}>
                                            <View style={{ width: '20%', justifyContent: 'center', alignItems: 'center' }}>
                                                <Image source={require("../assets/5.png")}
                                                    style={{ width: 60, height: 60, }}
                                                    resizeMode="contain" />

                                            </View>
                                            <View style={{ width: '70%', flexDirection: 'column' }}>
                                                <Text style={{ padding: 10, fontSize: 14, fontWeight: 'bold' }}>{item.name}</Text>
                                                <Text style={{paddingLeft:10, fontSize: 14, }}>{"+33 12345"}</Text>

                                                <View style={{ flexDirection: 'row' ,marginTop:10}}>   
                                                    <Text style={{paddingLeft:0}}> Un service : </Text>
                                                    <Text style={{paddingTop:0}}> PC-Windows</Text>
                                                </View>

                                            </View>
                                            <TouchableOpacity onPress={() => Actions.push("InterventionDetails")} style={{ width: '10%',alignItems:'center',height:30  }}>
                                                <Image source={require("../assets/clear.png")}
                                                    style={{ width: 15, height: 15, }}
                                                    resizeMode="contain" />

                                            </TouchableOpacity>
                                        </View>
                                    </Card>
                                </View>

                            )}
                        />


                       
                    </View>
               
            </View>
        );
    }
}
