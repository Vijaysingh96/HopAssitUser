import React from 'react';
import { StatusBar, ScrollView, TextInput, View, ImageBackground, Text, Image, Dimensions, TouchableOpacity, Linking, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import styles from "../styles/styles";
import { FlatGrid } from 'react-native-super-grid';
import Strings from '../strings/strings'
import { Card } from "native-base";
const { width, height } = Dimensions.get("window");


export default class chooseService extends React.Component {

    constructor(props, context) {
        super(props);
        this.state = {
            userid: '',


        };
    }

    render() {
        const items = [
            { name: 'Réseau', code: require("../assets/network.png")}, { name: 'PC-Windows', code: require("../assets/windows.png") },
            { name: 'Imprimante', code: require("../assets/printer.png") }, { name: 'Internet', code: require("../assets/wifi.png") },
            { name: 'Virus', code:require("../assets/warning.png") }, { name: 'Réseau', code: require("../assets/network.png") },
            { name: 'PC-Linux', code: require("../assets/linux.png") }, { name: 'Mac', code: require("../assets/apple(1).png") },
            { name: 'Tablettes', code:require("../assets/smartphone.png") }, { name: 'smartphone', code: require("../assets/apple.png") },
         
        ];
        return (
            <View style={styles.containerWhite}>
                <View style={{ width: '100%', height: 50, flexDirection: 'row',backgroundColor:'white' }}>
                    <TouchableOpacity onPress={()=> Actions.pop()} style={{ width: '20%', height: 50, justifyContent: 'center', alignItems: 'center', borderTopRightRadius: 20, borderBottomRightRadius: 20 }}>
                        <Image source={require("../assets/left-arrow.png")}
                            style={{ width: 30, height: 20, }}
                            resizeMode="contain" />
                    </TouchableOpacity>
                    <View style={{ width: '70%', height: 50, justifyContent: 'center', alignItems: 'center', }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{Strings.Magasins_disponibles}</Text>
                    </View>

                </View>

                <View style={{ alignItems: 'center' }}>
                    <Text style={{ fontSize: 14, color: Strings.color_green_code, fontWeight: 'bold', padding: 10 }}>{Strings.Quel_est_text}</Text>
                </View>

                
                <View>
                    <FlatGrid
                        itemDimension={130}
                        items={items}
                        style={{marginBottom:100}}
                        // staticDimension={300}
                        // fixed
                        // spacing={20}
                        renderItem={({ item, index }) => (
                            <View>
                            <Card style={[{
                                justifyContent: 'center',alignItems:'center',
                                borderRadius: 5,
                                padding: 10,
                                height: 150,
                               
                                
                            }, { backgroundColor:'white' }]}>
  <Image source={item.code}
                            style={{ width: 50, height: 50, }}
                            resizeMode="contain" />
                                <Text style={{ fontSize: 14 }}>{item.name}</Text>
                              
                               
                            </Card>
                            </View>
                        )}
                    />

                </View>


            </View>
        );
    }
}
