import React from 'react';
import { StatusBar, Button, FlatList, ScrollView, PixelRatio, TextInput, View, ImageBackground, Text, Image, Dimensions, TouchableOpacity, Linking, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import styles from "../styles/styles";
import Strings from '../strings/strings'
import { Card } from 'native-base';
import { Rating, AirbnbRating } from 'react-native-elements';

export default class expertsList extends React.Component {
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
                <View style={{ width: '100%', height: 50, flexDirection: 'row', backgroundColor: 'white' }}>
                    <TouchableOpacity onPress={() => Actions.pop()} style={{ width: '20%', height: 50, justifyContent: 'center', alignItems: 'center', borderTopRightRadius: 20, borderBottomRightRadius: 20 }}>
                        <Image source={require("../assets/left-arrow.png")}
                            style={{ width: 30, height: 20, }}
                            resizeMode="contain" />
                    </TouchableOpacity>
                    <View style={{ width: '70%', height: 50, justifyContent: 'center', alignItems: 'center', }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{Strings.list_expert_text}</Text>
                    </View>
                </View>
                <ScrollView>
                    <View style={{ flex: 1, flexDirection: 'column', margin: 10 }}>
                        <Text style={{ textAlign: 'center', fontSize: 14 }}>{Strings.des_experts_text}</Text>


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
                                            <View style={{ width: '80%', flexDirection: 'column' }}>
                                                <Text style={{ padding: 10, fontSize: 14, fontWeight: 'bold' }}>{item.name}</Text>
                                                <View style={{ alignItems: 'flex-start', marginTop: -10 }}>
                                                    <AirbnbRating
                                                        showRating={false}
                                                        count={5}
                                                        color={Strings.color_green_code}
                                                        defaultRating={item.rating}
                                                        size={15} />
                                                </View>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Image source={require("../assets/clock.png")}
                                                        style={{ width: 20, height: 20, }}
                                                        resizeMode="contain" />
                                                    <Text> 05:27PM, </Text>
                                                    <Text> 05-08-2019</Text>
                                                </View>

                                            </View>
                                        </View>
                                        <View style={{ flexDirection: 'row', width: '100%', marginTop: 20 }}>
                                            <View style={{ width: '50%', alignItems: 'center' }}>
                                                <Text>{Strings.cout_text}</Text>
                                                <Text>{"€ 25"}</Text>
                                            </View>
                                            <View style={{ width: '50%', alignItems: 'center' }}>
                                                <Text>{Strings.travaux_text}</Text>
                                                <Text>{"2"}</Text>
                                            </View>

                                        </View>
                                    </Card>
                                </View>

                            )}
                        />


                        <View style={{alignItems:'center'}}>
                                <TouchableOpacity onPress={()=> Actions.push("ExpertDetails")} style={{width:200,height:40,backgroundColor:Strings.color_green_code,borderRadius:10,marginTop:50,marginBottom:30,justifyContent:'center',alignItems:'center'}}>
                                    <Text style={{fontSize:16,color:'white'}}>{Strings.suprimer_text}</Text>
                                </TouchableOpacity>
                        </View>

                    </View>
                </ScrollView>
            </View>
        );
    }
}
