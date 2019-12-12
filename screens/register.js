import React from 'react';
import { StatusBar, ScrollView, TextInput, View, ImageBackground, Text, Image, Dimensions, TouchableOpacity, Linking, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import styles from "../styles/styles";
import Strings from '../strings/strings';
import { Card, Radio, CheckBox } from 'native-base';
import ImagePicker from 'react-native-image-picker';


const { width, height } = Dimensions.get("window");

export default class register extends React.Component {
    // onRegionChange(region) {
    //   this.setState({ region });
    // }
    constructor(props, context) {
        super(props);
        this.state = {
            Particulier_radio: false,
            Entreprise_radio: false,
            Clienten_radio: false,
            child_radio: false,
            girl_radio: false,
            man_radio: false,
            people_radio: false,
            fsPath: '',
            checked: false,

        };
    }

    selectProfilePic = () => {
        const options = {
            title: 'Select Avatar',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = { uri: response.uri };

                const imageUrl = response.uri
                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };
                console.log("image url:###:" + JSON.stringify(response))
                this.setState({
                    fsPath: response.fileName,
                });
                console.log("image url::" + JSON.stringify(imageUrl))
                console.log("image url::" + JSON.stringify(source))

            }
        });
    }

    render() {
        return (
            <View style={styles.containerWhite}>
                <View style={{ width: '100%', height: 50, flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => Actions.pop()} style={{ width: '15%', height: 50, justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={require("../assets/back.png")}
                            style={{ width: 30, height: 30, }}
                            resizeMode="contain" />
                    </TouchableOpacity>
                    <View style={{ width: '70%', height: 50, justifyContent: 'center', alignItems: 'center', }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{Strings.register_text}</Text>
                    </View>

                </View>
                <ScrollView>
                    <View style={{ marginTop: 10 }}>

                        <Text style={{ padding: 15, fontSize: 14, fontWeight: 'bold' }}>
                            {Strings.new_coplete_text}
                        </Text>


                        <View style={{ margin: 20, width: '90%' }}>

                            <View style={{ width: '100%', height: 45, borderWidth: 1, borderColor: 'black', borderRadius: 10 }}>
                                <TextInput placeholder={Strings.email_address_text}
                                    style={{ padding: 10 }}>

                                </TextInput>
                            </View>
                            <View style={{ width: '100%', height: 45, marginTop: 20, borderWidth: 1, borderColor: 'black', borderRadius: 10 }}>
                                <TextInput
                                    keyboardType="decimal-pad"
                                    placeholder={Strings.telephone_text}
                                    style={{ padding: 10 }}>

                                </TextInput>
                            </View>
                            <View style={{ width: '100%', height: 45, marginTop: 20, borderWidth: 1, borderColor: 'black', borderRadius: 10 }}>
                                <TextInput placeholder={Strings.password_text}
                                    secureTextEntry={true}
                                    style={{ padding: 10 }}>

                                </TextInput>
                            </View>
                            <View style={{ width: '100%', height: 45, marginTop: 20, borderWidth: 1, borderColor: 'black', borderRadius: 10 }}>
                                <TextInput placeholder={Strings.Nom_de_familee}
                                    style={{ padding: 10 }}>

                                </TextInput>
                            </View>

                            <View style={{ width: '100%', height: 45, marginTop: 20, borderWidth: 1, borderColor: 'black', borderRadius: 10 }}>
                                <TextInput placeholder={Strings.Addresse_text}
                                    style={{ padding: 10 }}>

                                </TextInput>
                            </View>
                            <View style={{ width: '100%', height: 45, marginTop: 20, borderWidth: 1, borderColor: 'black', borderRadius: 10 }}>
                                <TextInput placeholder={Strings.Anniversarie_text}
                                    style={{ padding: 10 }}>

                                </TextInput>
                            </View>
                            <View style={{ width: '100%', height: 45, marginTop: 20, borderWidth: 1, borderColor: 'black', borderRadius: 10 }}>
                                <TextInput placeholder={Strings.Homme_text}
                                    style={{ padding: 10 }}>

                                </TextInput>
                            </View>
                            <View style={{ width: '100%', height: 45, marginTop: 20, borderWidth: 1, borderColor: 'black', borderRadius: 10 }}>
                                <TextInput placeholder={Strings.Moyen_text}
                                    style={{ padding: 10 }}>

                                </TextInput>
                            </View>

                            <View style={{ marginTop: 20 }}>
                                <Text style={{ fontSize: 14, fontWeight: 'bold' }}>
                                    {Strings.Type_de_client_text}
                                </Text>
                                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                    <View style={{ width: '50%', flexDirection: 'row' }}>
                                        <TouchableOpacity onPress={() => this.setState({ Particulier_radio: true, Entreprise_radio: false, Clienten_radio: false })} style={{ width: '10%', justifyContent: 'center' }}>
                                            <View style={{ width: 20, height: 20, borderWidth: 1, borderRadius: 20 / 2, alignItems: 'center', justifyContent: 'center', borderColor: '#01A2C4' }}>
                                                {this.state.Particulier_radio === true && (<View style={{ width: 16, height: 16, borderRadius: 16 / 2, backgroundColor: '#01A2C4', alignItems: 'center', justifyContent: 'center' }}>
                                                    <Image source={require("../assets/right.png")}
                                                        style={{ width: 10, height: 10, }}
                                                        resizeMode="contain" />
                                                </View>)}

                                            </View>
                                        </TouchableOpacity>
                                        <View style={{ alignItems: 'center', marginLeft: 20, justifyContent: 'center' }}>
                                            <Text>{Strings.Particulier_text}</Text>
                                        </View>
                                    </View>
                                    <View style={{ width: '50%', flexDirection: 'row' }}>
                                        <TouchableOpacity onPress={() => this.setState({ Particulier_radio: false, Entreprise_radio: true, Clienten_radio: false })} style={{ width: '10%', justifyContent: 'center' }}>
                                            <View style={{ width: 20, height: 20, borderWidth: 1, borderRadius: 20 / 2, alignItems: 'center', justifyContent: 'center', borderColor: '#01A2C4' }}>
                                                {this.state.Entreprise_radio === true && (<View style={{ width: 16, height: 16, borderRadius: 16 / 2, backgroundColor: '#01A2C4', alignItems: 'center', justifyContent: 'center' }}>
                                                    <Image source={require("../assets/right.png")}
                                                        style={{ width: 10, height: 10, }}
                                                        resizeMode="contain" />
                                                </View>)}

                                            </View>
                                        </TouchableOpacity>
                                        <View style={{ alignItems: 'center', marginLeft: 20, justifyContent: 'center' }}>
                                            <Text>{Strings.Entreprise_text}</Text>
                                        </View>
                                    </View>
                                </View>

                                <View style={{ flexDirection: 'row', marginTop: 20 }}>
                                    <View style={{ width: '100%', flexDirection: 'row' }}>
                                        <TouchableOpacity onPress={() => this.setState({ Particulier_radio: false, Entreprise_radio: false, Clienten_radio: true })} style={{ width: '5%', justifyContent: 'center' }}>
                                            <View style={{ width: 20, height: 20, borderWidth: 1, borderRadius: 20 / 2, alignItems: 'center', justifyContent: 'center', borderColor: '#01A2C4' }}>
                                                {this.state.Clienten_radio === true && (<View style={{ width: 16, height: 16, borderRadius: 16 / 2, backgroundColor: '#01A2C4', alignItems: 'center', justifyContent: 'center' }}>
                                                    <Image source={require("../assets/right.png")}
                                                        style={{ width: 10, height: 10, }}
                                                        resizeMode="contain" />
                                                </View>)}

                                            </View>
                                        </TouchableOpacity>
                                        <View style={{ alignItems: 'center', marginLeft: 20, justifyContent: 'center' }}>
                                            <Text>{Strings.Clienten_compte_text}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>


                            <View style={{ marginTop: 30 }}>
                                <Text style={{ fontSize: 14, fontWeight: 'bold' }}>
                                    {Strings.Sélectionnezun_avatar_text}
                                </Text>

                                <View style={{ flexDirection: 'row', width: '100%', marginTop: 20 }}>
                                    <View style={{ width: '50%', flexDirection: 'row' }}>

                                        <TouchableOpacity onPress={() => this.setState({ child_radio: true, girl_radio: false, man_radio: false, people_radio: false, })} style={{ width: '10%', justifyContent: 'center' }}>
                                            <View style={{ width: 20, height: 20, borderWidth: 1, borderRadius: 20 / 2, alignItems: 'center', justifyContent: 'center', borderColor: '#01A2C4' }}>
                                                {this.state.child_radio === true && (<View style={{ width: 16, height: 16, borderRadius: 16 / 2, backgroundColor: '#01A2C4', alignItems: 'center', justifyContent: 'center' }}>
                                                    <Image source={require("../assets/right.png")}
                                                        style={{ width: 10, height: 10, }}
                                                        resizeMode="contain" />
                                                </View>)}

                                            </View>
                                        </TouchableOpacity>
                                        <View style={{ alignItems: 'center', marginLeft: 20, justifyContent: 'center' }}>
                                            <Image source={require("../assets/5.png")}
                                                style={{ width: 50, height: 50, }}
                                                resizeMode="contain" />
                                        </View>

                                    </View>
                                    <View style={{ width: '50%', flexDirection: 'row' }}>
                                        <TouchableOpacity onPress={() => this.setState({ child_radio: false, girl_radio: true, man_radio: false, people_radio: false, })} style={{ width: '10%', justifyContent: 'center' }}>
                                            <View style={{ width: 20, height: 20, borderWidth: 1, borderRadius: 20 / 2, alignItems: 'center', justifyContent: 'center', borderColor: '#01A2C4' }}>
                                                {this.state.girl_radio === true && (<View style={{ width: 16, height: 16, borderRadius: 16 / 2, backgroundColor: '#01A2C4', alignItems: 'center', justifyContent: 'center' }}>
                                                    <Image source={require("../assets/right.png")}
                                                        style={{ width: 10, height: 10, }}
                                                        resizeMode="contain" />
                                                </View>)}

                                            </View>
                                        </TouchableOpacity>
                                        <View style={{ alignItems: 'center', marginLeft: 20, justifyContent: 'center' }}>
                                            <Image source={require("../assets/5.png")}
                                                style={{ width: 50, height: 50, }}
                                                resizeMode="contain" />
                                        </View>
                                    </View>

                                </View>

                                <View style={{ flexDirection: 'row', width: '100%', marginTop: 20 }}>
                                    <View style={{ width: '50%', flexDirection: 'row' }}>

                                        <TouchableOpacity onPress={() => this.setState({ child_radio: false, girl_radio: false, man_radio: true, people_radio: false, })} style={{ width: '10%', justifyContent: 'center' }}>
                                            <View style={{ width: 20, height: 20, borderWidth: 1, borderRadius: 20 / 2, alignItems: 'center', justifyContent: 'center', borderColor: '#01A2C4' }}>
                                                {this.state.man_radio === true && (<View style={{ width: 16, height: 16, borderRadius: 16 / 2, backgroundColor: '#01A2C4', alignItems: 'center', justifyContent: 'center' }}>
                                                    <Image source={require("../assets/right.png")}
                                                        style={{ width: 10, height: 10, }}
                                                        resizeMode="contain" />
                                                </View>)}

                                            </View>
                                        </TouchableOpacity>
                                        <View style={{ alignItems: 'center', marginLeft: 20, justifyContent: 'center' }}>
                                            <Image source={require("../assets/5.png")}
                                                style={{ width: 50, height: 50, }}
                                                resizeMode="contain" />
                                        </View>

                                    </View>
                                    <View style={{ width: '50%', flexDirection: 'row' }}>
                                        <TouchableOpacity onPress={() => this.setState({ child_radio: false, girl_radio: false, man_radio: false, people_radio: true, })} style={{ width: '10%', justifyContent: 'center' }}>
                                            <View style={{ width: 20, height: 20, borderWidth: 1, borderRadius: 20 / 2, alignItems: 'center', justifyContent: 'center', borderColor: '#01A2C4' }}>
                                                {this.state.people_radio === true && (<View style={{ width: 16, height: 16, borderRadius: 16 / 2, backgroundColor: '#01A2C4', alignItems: 'center', justifyContent: 'center' }}>
                                                    <Image source={require("../assets/right.png")}
                                                        style={{ width: 10, height: 10, }}
                                                        resizeMode="contain" />
                                                </View>)}

                                            </View>
                                        </TouchableOpacity>
                                        <View style={{ alignItems: 'center', marginLeft: 20, justifyContent: 'center' }}>
                                            <Image source={require("../assets/5.png")}
                                                style={{ width: 50, height: 50, }}
                                                resizeMode="contain" />
                                        </View>
                                    </View>

                                </View>
                            </View>

                            <View style={{ marginTop: 30 }}>
                                <Text style={{ fontSize: 14, fontWeight: 'bold' }}>
                                    {Strings.Ajouter_une_photo_text}
                                </Text>

                                <TouchableOpacity onPress={this.selectProfilePic} style={{ alignItems: 'center', justifyContent: 'center', width: '50%', height: 40, marginTop: 10, borderRadius: 10, backgroundColor: '#01A2C4' }}>
                                    <Text style={{ fontSize: 14, color: 'white' }}>{Strings.Prendre_votre_photo_text}</Text>

                                </TouchableOpacity>

                                <Text style={{ fontSize: 14, padding: 5, width: '100%' }}>
                                    {this.state.fsPath}
                                </Text>


                            </View>

                            <View style={{marginTop: 10, flexDirection: 'row' }}>
                                <TouchableOpacity onPress={() => this.setState({ checked: !this.state.checked })} style={{  width: '10%', justifyContent: 'center' }}>
                                    <View style={{ width: 20, height: 20, borderWidth: 2, alignItems: 'center', justifyContent: 'center', borderColor: '#01A2C4' }}>
                                        {this.state.checked === true && (<View style={{ width: 20, height: 20, backgroundColor: '#01A2C4', alignItems: 'center', justifyContent: 'center' }}>
                                            <Image source={require("../assets/right.png")}
                                                style={{ width: 10, height: 10, }}
                                                resizeMode="contain" />
                                        </View>)}
                                    </View>
                                </TouchableOpacity>
                                <Text style={{fontSize:14,fontWeight:'bold'}}>{Strings.J_accepte_les_text}</Text>
                                <Text style={{fontSize:14,fontWeight:'bold',color:'#01A2C4'}}>{Strings.term_cinditions}</Text>
                                <Text style={{fontSize:14,fontWeight:'bold'}}>{Strings.hop_assist}</Text>
                            </View>



                            <View style={{width:'100%',alignItems:'center',marginTop:30,marginBottom:30}}>
                            {this.state.checked === false ?  <View style={{width:'50%',height:40,borderRadius:10,backgroundColor:'#CEFAFA',alignItems:'center',justifyContent:'center'}}>
                                <Text style={{ fontSize: 16, color: 'white' }}>{Strings.Inscrire_Maintenant_text}</Text>
                                </View> : <TouchableOpacity style={{width:'50%',height:40,borderRadius:10,backgroundColor:'#01A2C4',alignItems:'center',justifyContent:'center'}}>
                                <Text style={{ fontSize: 16, color: 'white' }}>{Strings.Inscrire_Maintenant_text}</Text>
                                </TouchableOpacity>
                            } 
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}
