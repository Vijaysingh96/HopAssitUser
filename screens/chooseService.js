import React from 'react';
import { StatusBar, ScrollView,ActivityIndicator, TextInput, View, ImageBackground, Text, Image, Dimensions, TouchableOpacity, Linking, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import styles from "../styles/styles";
import { FlatGrid } from 'react-native-super-grid';
import Strings from '../strings/strings'
import { Card } from "native-base";
import PopupDialog, {
    DialogTitle, DialogContent, DialogFooter, DialogButton, SlideAnimation, ScaleAnimation,
} from 'react-native-popup-dialog';
const { width, height } = Dimensions.get("window");


export default class chooseService extends React.Component {

    constructor(props, context) {
        super(props);
        this.state = {
            animating: false,
            lodingDialog: false,
            userid: '',
            items :[],


        };
    }

    componentDidMount(){
        this.categoryGet();
    }

    categoryGet(){
        this.setState({
            animating: true,
            lodingDialog: true,
        }) 
        fetch(Strings.base_Url + "categories", {
            method: 'GET',
            headers: { // 'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    animating: false,
                    lodingDialog: false,
                    items: responseData
                })

            }
            )
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
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{Strings.Magasins_disponibles}</Text>

                        </View>

                    </View>
                </ImageBackground>

                <View style={{ alignItems: 'center',marginTop:-25 }}>
                    <Text style={{ fontSize: 14, color: Strings.color_green_code, fontWeight: 'bold', padding: 10 }}>{Strings.Quel_est_text}</Text>
                </View>


                <View>
                    <FlatGrid
                        itemDimension={130}
                        items={this.state.items}
                        style={{ marginBottom: 100 }}
                        // staticDimension={300}
                        // fixed
                        // spacing={20}
                        renderItem={({ item, index }) => (
                            <TouchableOpacity>
                                <Card style={[{
                                    justifyContent: 'center', alignItems: 'center',
                                    borderRadius: 5,
                                    padding: 10,
                                    height: 150,


                                }, { backgroundColor: 'white' }]}>
                                    <Image source={{uri: item.avatar}}
                                        style={{ width: 50, height: 50, }}
                                        resizeMode="contain" />
                                    <Text style={{ fontSize: 14 }}>{item.name}</Text>


                                </Card>
                            </TouchableOpacity>
                        )}
                    />

                </View>
                <PopupDialog
                            onHardwareBackPress={() => { this.setState({ lodingDialog: false }) }}
                            width={0.3}
                            visible={this.state.lodingDialog}
                            dialogAnimation={new SlideAnimation({ slideFrom: 'bottom' })}>
                            <DialogContent>
                                <View style={{ alignItems: 'center', }}>
                                    <ActivityIndicator
                                        animating={this.state.animating}
                                        style={[{ height: 10, marginBottom: 10, marginTop: 30, marginLeft: 20, marginRight: 20 }]}
                                        color="#C00"
                                        size="large"
                                        hidesWhenStopped={true}
                                    />
                                </View>
                            </DialogContent>
                        </PopupDialog>

            </View>
        );
    }
}
