import React from 'react';
import { StatusBar, Button, FlatList, ScrollView, PixelRatio, TextInput, View, ImageBackground, Text, Image, Dimensions, TouchableOpacity, Linking, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import styles from "../styles/styles";
import Strings from '../strings/strings'
import { Card } from 'native-base';
import { Rating, AirbnbRating } from 'react-native-elements';


export default class notification extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [{ name: 'John Simth', rating: 'a accepté votre demande' }, { name: 'John Simth', rating: 'L\'expert Hardley peter est arrivé ' },]
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
                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{Strings.notificatiin_text}</Text>
                       
                    </View>
                </View>
                {/* <Image source={require("../assets/Artboard–2.png")}
                            style={{ width:'100%', height:30, }}
                            resizeMode='stretch' /> */}

                <ScrollView>
                    <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
                   <View style={{width:'100%',height:40,alignItems:'flex-end'}}>
                       <View style={{flexDirection:'row',alignItems:'center'}}>
                       <TouchableOpacity style={{width:30,height:30,alignItems:'center',justifyContent:'center'}}>
                          <Image source={require("../assets/filter.png")}
                            style={{ width: 25, height:25, }}
                            resizeMode="contain" />
                          </TouchableOpacity>
                           <Text style={{fontSize:14,padding:10}}>{Strings.lis_tout_text}</Text>
                          <TouchableOpacity style={{width:30,height:30,alignItems:'center',justifyContent:'center'}}>
                          <Image source={require("../assets/close-button.png")}
                            style={{ width: 15, height: 15, }}
                            resizeMode="contain" />
                          </TouchableOpacity>
                          
                       </View>
                   </View>
                   
                    <FlatList
                            keyExtractor={item => item.id}
                            data={this.state.data}
                            renderItem={({ item }) => (
                                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                                    <Card style={{ width: "95%", justifyContent: 'space-between', alignItems: 'center', flexDirection: 'column', padding: 10, borderRadius: 15 }}>
                                        <View style={{ width: '100%', flexDirection: 'row'}}>
                                            <View style={{ width: '20%', justifyContent: 'center', alignItems: 'center' }}>
                                                <Image source={require("../assets/5.png")}
                                                    style={{ width: 50, height: 50, }}
                                                    resizeMode="contain" />
                                            </View>
                                            <View style={{ width: '80%', flexDirection: 'column' }}>
                                                <Text style={{fontSize: 14, fontWeight: 'bold' }}>{item.name}</Text>
                                                <Text style={{fontSize: 14 }}>{item.rating}</Text>
                                                <Text style={{fontSize: 14 ,textAlign:'right'}}>{"- en 8 minutes"}</Text>
                                            </View>                                                                
                                        </View>
                                    </Card>
                                </View>
                            )}
                        />
                    </View>
                </ScrollView>
            </View>
        );
    }
}
