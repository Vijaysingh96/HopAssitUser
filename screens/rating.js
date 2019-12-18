import React from 'react';
import { StatusBar, Button, FlatList, ScrollView, PixelRatio, TextInput, View, ImageBackground, Text, Image, Dimensions, TouchableOpacity, Linking, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import styles from "../styles/styles";
import Strings from '../strings/strings'
import { Card } from 'native-base';
import { Rating, AirbnbRating } from 'react-native-elements';


export default class rating extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          

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
                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{Strings.avis_text}</Text>
                    </View>
                </View>
                <ScrollView>
                    <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
                        <Image source={require("../assets/image.png")}
                            style={{ width: '100%', height: 100, backgroundColor: 'red' }}
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
                        <View style={{marginTop:50}}>
                        <AirbnbRating
                            showRating={false}
                            count={5}
                            color={Strings.color_green_code}
                            defaultRating={0}
                            size={35} 
                            onFinishRating={this.ratingCompleted}/>
                        </View>
                       

                       
                            <Card style={{ width: '95%', backgroundColor: 'white', borderRadius: 10, marginLeft: 10,marginTop:20 }}>
                               <TextInput placeholder={Strings.ou_commenter_text}
                               multiline={true} style={{padding:10}}>

                               </TextInput>
                            </Card>
                   

                        <View style={{ width: '95%', marginTop: 40, flexDirection: 'row', marginBottom: 50 }}>
                           
                            <View style={{ width: '100%', alignItems: 'center' }}>
                                <TouchableOpacity  style={{ width: '50%', height: 40, borderRadius: 10, backgroundColor: Strings.color_green_code, alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ padding: 10, color: 'white' }}>{Strings.confirmer_text}</Text>

                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>
                </ScrollView>
            </View>
        );
    }
}
