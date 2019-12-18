import React from 'react';
import { StatusBar, Button, ScrollView, PixelRatio, TextInput, View, ImageBackground, Text, Image, Dimensions, TouchableOpacity, Linking, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import DateTimePicker from "react-native-modal-datetime-picker";
import styles from "../styles/styles";
import Strings from '../strings/strings'
import { DatePicker } from "native-base";
import ImagePicker from 'react-native-image-picker';
import RBSheet from "react-native-raw-bottom-sheet";
const { width, height } = Dimensions.get("window");
export default class createReservation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            child_radio: false,
            girl_radio: false,
            man_radio: false,
            people_radio: false,
            checked: false
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
                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{Strings.add_card_text}</Text>
                    </View>
                </View>
                <ScrollView>
                    <View style={{ flex: 1, flexDirection: 'column', margin: 10 }}>

                        <Text style={{ textAlign: 'center', fontSize: 16 }}>{Strings.Veuillez_renseigner_text}</Text>

                        <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: 20, padding: 10 }}>{Strings.type_de_card_text}</Text>


                        <View style={{ marginLeft: 20 }}>
                            <View style={{ flexDirection: 'row', width: '100%', marginTop: 20 }}>
                                <View style={{ width: '50%', flexDirection: 'row' }}>

                                    <TouchableOpacity onPress={() => this.setState({ child_radio: true, girl_radio: false, man_radio: false, people_radio: false, })} style={{ width: '14%', justifyContent: 'center' }}>
                                        <View style={{ width: 20, height: 20, borderWidth: 1, borderRadius: 20 / 2, alignItems: 'center', justifyContent: 'center', borderColor: '#01A2C4' }}>
                                            {this.state.child_radio === true && (<View style={{ width: 16, height: 16, borderRadius: 16 / 2, backgroundColor: '#01A2C4', alignItems: 'center', justifyContent: 'center' }}>
                                                <Image source={require("../assets/right.png")}
                                                    style={{ width: 10, height: 10, }}
                                                    resizeMode="contain" />
                                            </View>)}

                                        </View>
                                    </TouchableOpacity>
                                    <View style={{ alignItems: 'center', marginLeft: 20, justifyContent: 'center' }}>
                                        <Image source={require("../assets/mastercard.png")}
                                            style={{ width: 50, height: 50, }}
                                            resizeMode="contain" />
                                    </View>

                                </View>
                                <View style={{ width: '50%', flexDirection: 'row' }}>
                                    <TouchableOpacity onPress={() => this.setState({ child_radio: false, girl_radio: true, man_radio: false, people_radio: false, })} style={{ width: '14%', justifyContent: 'center' }}>
                                        <View style={{ width: 20, height: 20, borderWidth: 1, borderRadius: 20 / 2, alignItems: 'center', justifyContent: 'center', borderColor: '#01A2C4' }}>
                                            {this.state.girl_radio === true && (<View style={{ width: 16, height: 16, borderRadius: 16 / 2, backgroundColor: '#01A2C4', alignItems: 'center', justifyContent: 'center' }}>
                                                <Image source={require("../assets/right.png")}
                                                    style={{ width: 10, height: 10, }}
                                                    resizeMode="contain" />
                                            </View>)}

                                        </View>
                                    </TouchableOpacity>
                                    <View style={{ alignItems: 'center', marginLeft: 20, justifyContent: 'center' }}>
                                        <Image source={require("../assets/visa.png")}
                                            style={{ width: 50, height: 50, }}
                                            resizeMode="contain" />
                                    </View>
                                </View>

                            </View>

                            <View style={{ flexDirection: 'row', width: '100%', marginTop: 20 }}>
                                <View style={{ width: '50%', flexDirection: 'row' }}>

                                    <TouchableOpacity onPress={() => this.setState({ child_radio: false, girl_radio: false, man_radio: true, people_radio: false, })} style={{ width: '14%', justifyContent: 'center' }}>
                                        <View style={{ width: 20, height: 20, borderWidth: 1, borderRadius: 20 / 2, alignItems: 'center', justifyContent: 'center', borderColor: '#01A2C4' }}>
                                            {this.state.man_radio === true && (<View style={{ width: 16, height: 16, borderRadius: 16 / 2, backgroundColor: '#01A2C4', alignItems: 'center', justifyContent: 'center' }}>
                                                <Image source={require("../assets/right.png")}
                                                    style={{ width: 10, height: 10, }}
                                                    resizeMode="contain" />
                                            </View>)}

                                        </View>
                                    </TouchableOpacity>
                                    <View style={{ alignItems: 'center', marginLeft: 20, justifyContent: 'center' }}>
                                        <Image source={require("../assets/american-express.png")}
                                            style={{ width: 50, height: 50, }}
                                            resizeMode="contain" />
                                    </View>

                                </View>
                                <View style={{ width: '50%', flexDirection: 'row' }}>
                                    <TouchableOpacity onPress={() => this.setState({ child_radio: false, girl_radio: false, man_radio: false, people_radio: true, })} style={{ width: '14%', justifyContent: 'center' }}>
                                        <View style={{ width: 20, height: 20, borderWidth: 1, borderRadius: 20 / 2, alignItems: 'center', justifyContent: 'center', borderColor: '#01A2C4' }}>
                                            {this.state.people_radio === true && (<View style={{ width: 16, height: 16, borderRadius: 16 / 2, backgroundColor: '#01A2C4', alignItems: 'center', justifyContent: 'center' }}>
                                                <Image source={require("../assets/right.png")}
                                                    style={{ width: 10, height: 10, }}
                                                    resizeMode="contain" />
                                            </View>)}

                                        </View>
                                    </TouchableOpacity>
                                    <View style={{ alignItems: 'center', marginLeft: 20, justifyContent: 'center' }}>
                                        <Image source={require("../assets/discover.png")}
                                            style={{ width: 50, height: 50, }}
                                            resizeMode="contain" />
                                    </View>
                                </View>

                            </View>
                        </View>


                        <Text style={{ padding: 10, marginTop: 20, fontSize: 16 }}>{Strings.numero_de_text}</Text>
                        <View style={{ height: 40, width: '100%', backgroundColor: 'white', borderRadius: 10 }}>
                            <TextInput keyboardType='decimal-pad' placeholder="12345678901234" style={{ padding: 10 }}>

                            </TextInput>
                        </View>

                        <Text style={{ padding: 10, marginTop: 20, fontSize: 16 }}>{Strings.Expire_le_text}</Text>
                        <View style={{ height: 40, width: '100%', flexDirection: 'row', marginTop: 10 }}>
                            <View style={{ width: '50%', flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ marginRight: 10, marginLeft: 10 }} >Mois </Text>
                                <View style={{ height: 40, width: 100, backgroundColor: 'white', borderRadius: 10 }}>
                                    <TextInput keyboardType='decimal-pad' placeholder="04" style={{ padding: 10 }}>

                                    </TextInput>
                                </View>
                            </View>
                            <View style={{ width: '50%', flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ marginRight: 10, marginLeft: 10 }}  >Année</Text>
                                <View style={{ height: 40, width: 100, backgroundColor: 'white', borderRadius: 10 }}>
                                    <TextInput keyboardType='decimal-pad' placeholder="2019" style={{ padding: 10 }}>

                                    </TextInput>
                                </View>
                            </View>

                        </View>


                        <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', marginTop: 30, }}>
                            <Text style={{ padding: 10, fontSize: 16 }}>{Strings.Cryptogramme_text}</Text>
                            <View style={{ height: 40, width: 100, backgroundColor: 'white', borderRadius: 10 }}>
                                <TextInput keyboardType='decimal-pad' placeholder="123" style={{ padding: 10 }}>

                                </TextInput>
                            </View>
                        </View>

                        <View style={{ marginTop: 30, flexDirection: 'row' }}>
                            <TouchableOpacity onPress={() => this.setState({ checked: !this.state.checked })} style={{ width: '10%', justifyContent: 'center' }}>
                                <View style={{ width: 20, height: 20, borderWidth: 2, alignItems: 'center', justifyContent: 'center', borderColor: '#01A2C4' }}>
                                    {this.state.checked === true && (<View style={{ width: 20, height: 20, backgroundColor: '#01A2C4', alignItems: 'center', justifyContent: 'center' }}>
                                        <Image source={require("../assets/right.png")}
                                            style={{ width: 10, height: 10, }}
                                            resizeMode="contain" />
                                    </View>)}
                                </View>
                            </TouchableOpacity>
                            <Text
                                style={{ fontSize: 14, width: '90%' }}>{Strings.lorem_ipsum_has_text}</Text>
                        </View>

                        <View style={{ width: '100%', alignItems: 'center', marginTop: 30, marginBottom: 30, flexDirection: 'row' }}>
                            <View style={{ width: '50%' }}>
                                <TouchableOpacity style={{ width: '90%', height: 40, borderRadius: 10, borderColor: '#01A2C4', borderWidth: 1, alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ fontSize: 16, color: Strings.color_green_code }}>{Strings.Retour_text}</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ width: '50%' }}>
                                {this.state.checked === false ? <View style={{ width: '90%', height: 40, borderRadius: 10, backgroundColor: '#CEFAFA', alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ fontSize: 16, color: 'white' }}>{Strings.next_text}</Text>
                                </View> : <TouchableOpacity onPress={() => this.RBSheet.open()} style={{ width: '100%', height: 40, borderRadius: 10, backgroundColor: '#01A2C4', alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={{ fontSize: 16, color: 'white' }}>{Strings.next_text}</Text>
                                    </TouchableOpacity>
                                }

                            </View>

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

                        <View style={{ flexDirection: 'column', width: '90%', height: '100%', borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
                            <View style={{ width: '90%', height: 300, backgroundColor: 'white', borderRadius: 10, alignItems: 'center' }}>
                                <Image source={require("../assets/CashonDelivery.png")}
                                    style={{ width: 50, height: 50, marginTop: 30 }}
                                    resizeMode="contain" />
                                <Text style={{ fontSize: 18, marginTop: 30, padding: 10, textAlign: 'center' }}>{Strings.credit_cart_add}</Text>
                                <TouchableOpacity  onPress={() => this.RBSheet.close()}  style={{width:100,height:40,backgroundColor:Strings.color_green_code,borderRadius:10,marginTop:20,alignItems:'center',justifyContent:'center'}}>
                                    <Text style={{fontSize:16,color:'white'}}>Ok</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </RBSheet>
                </ScrollView>
            </View>
        );
    }
}
