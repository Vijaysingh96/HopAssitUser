import React from 'react';
import { StatusBar, Button, ActivityIndicator, FlatList, ScrollView, PixelRatio, TextInput, View, ImageBackground, Text, Image, Dimensions, TouchableOpacity, Linking, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import styles from "../styles/styles";
import Strings from '../strings/strings'
import { Card } from 'native-base';
import { Rating, AirbnbRating } from 'react-native-elements';

import Loading from 'react-native-whc-loading';


export default class expertsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []

        };

    }

    componentDidMount() {
        this.getExperDetails();
    }

    getExperDetails() {
        this.refs.loading2.show();
      
        fetch(Strings.base_Url + "technicians", {
            method: 'GET',
            headers: { // 'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((responseData) => {
                this.refs.loading2.close();
                this.setState({
                    animating: false,
                    lodingDialog: false,
                    data: responseData
                })

            }
            )
    }

    ratingCompleted(rating) {
        console.log("Rating is: " + rating)
    }
    render() {
        return (
            <View style={styles.containerWhite}>
                <ImageBackground source={require("../assets/simble.png")}
                    style={{ width: '100%', height: 78, }}>
                    <View style={{ width: '100%', height: 50, flexDirection: 'row' }}>
                        <TouchableOpacity onPress={() => Actions.pop()} style={{ width: '15%', height: 50, justifyContent: 'center', alignItems: 'center', }}>
                            <Image source={require("../assets/back.png")}
                                style={{ width: 25, height: 25, }}
                                resizeMode="contain" />
                        </TouchableOpacity>
                        <View style={{ width: '80%', height: 50, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{Strings.list_expert_text}</Text>

                        </View>

                    </View>
                </ImageBackground>
                <ScrollView style={{ marginTop: -25 }}>
                    <View style={{ flex: 1, flexDirection: 'column', margin: 10 }}>
                        <Text style={{ textAlign: 'center', fontSize: 14 }}>{Strings.des_experts_text}</Text>


                        <FlatList
                            keyExtractor={item => item.id}
                            data={this.state.data}
                            renderItem={({ item }) => (                            
                        <TouchableOpacity  onPress={()=> Actions.push("ExpertDetails",{currentTechId:item.id})} style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                            <Card  style={{ width: "100%", justifyContent: 'space-between', alignItems: 'center', flexDirection: 'column', padding: 10, borderRadius: 15 }}>
                                <View style={{ width: '100%', flexDirection: 'row' }}>
                                    <View style={{ width: '20%', justifyContent: 'center', alignItems: 'center' }}>
                                        <Image source={{ uri: item.avatar }}
                                            style={{ width: 40, height: 40, borderRadius: 40 / 2 }}
                                            resizeMode="contain" />

                                    </View>
                                    <View style={{ width: '80%', flexDirection: 'column' }}>
                                        <Text style={{ padding: 10, fontSize: 14, fontWeight: 'bold' }}>{item.firstname + " " + item.lastname}</Text>
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
                                                
                                            <Text> {item.anniversaryDate.toString().substr(11,8)+", "+item.anniversaryDate.toString().substr(0,10)} </Text>
                                            <Text> </Text>
                                        </View>

                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', width: '100%', marginTop: 20 }}>
                                    <View style={{ width: '50%', alignItems: 'center' }}>
                                        <Text>{Strings.cout_text}</Text>
                                        <Text>{"€" + item.totalJobsCompleted}</Text>
                                    </View>
                                    <View style={{ width: '50%', alignItems: 'center' }}>
                                        <Text>{Strings.travaux_text}</Text>
                                        <Text>{"2"}</Text>
                                    </View>

                                </View>
                            </Card>
                        </TouchableOpacity>
                            )}
                        />
                        <Loading
                        ref={"loading2"}
                        image={require("../assets/spinner-of-dots.png")}
                        // backgroundColor='transparent'
                        backgroundColor='white'
                        borderRadius={5}
                        size={100}
                        imageSize={80}
                        indicatorColor='gray'
                        easing={Loading.EasingType.ease} />
                    </View>
                </ScrollView>
            </View>
        );
    }
}
