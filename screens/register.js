import React from 'react';
import { StatusBar, ScrollView, TextInput, View, ActivityIndicator, ImageBackground, Text, Image, Dimensions, TouchableOpacity, Linking, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import styles from "../styles/styles";
import Strings from '../strings/strings';
import { Card, Radio, CheckBox } from 'native-base';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';
import DateTimePicker from "react-native-modal-datetime-picker";
import PopupDialog, {
    DialogTitle, DialogContent, DialogFooter, DialogButton, SlideAnimation, ScaleAnimation,
} from 'react-native-popup-dialog';


const { width, height } = Dimensions.get("window");

export default class register extends React.Component {
    // onRegionChange(region) {
    //   this.setState({ region });
    // }
    constructor(props, context) {
        super(props);
        this.state = {
            animating: false,
            lodingDialog: false,
            Particulier_radio: false,
            Entreprise_radio: false,
            Clienten_radio: false,
            isDateTimePickerVisible: false,
            child_radio: false,
            girl_radio: false,
            man_radio: false,
            people_radio: false,
            fsPath: '',
            fsPath2: '',
            checked: false,
            first_name: '',
            first_nameErr: '',
            last_name: '',
            last_nameErr: '',
            email: '',
            emailErr: '',
            password: '',
            passwordErr: '',
            telephone: '',
            telephoneErr: '',
            aniversary: Strings.Anniversarie_text,
            aniversaryErr: '',
            gender: '',
            genderErr: '',
            tncAccept: false,
            avatar_Image: '',
            avatar_ImageErr: '',
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
                    fsPath2: response.data
                });
                console.log("image url::" + JSON.stringify(imageUrl))
                console.log("image url::" + JSON.stringify(source))

            }
        });
    }

    showDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: true });
    };

    hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
    };

    handleDatePicked = date => {

        console.log("A date has been picked: ", date);
        var date_select = date.toString().substr(3, 12);
        this.setState({
            aniversary: date_select
        })
        this.hideDateTimePicker();
    };

    validationRegister() {
        // this.UserRegister();
        var isValidate = 0;
        if (this.state.first_name != "") {
            isValidate += 1;
        } else {
            isValidate -= 1
            this.setState({
                first_nameErr: Strings.ShouldemptyText,
            });
        }
        if (this.state.last_name != "") {
            isValidate += 1;
        } else {
            isValidate -= 1
            this.setState({
                last_nameErr: Strings.ShouldemptyText,
            });
        }
        if (this.state.email != "") {
            isValidate += 1;
            if (this.validateEmail(this.state.email)) {
                isValidate += 1;
            } else {
                isValidate -= 1;
                this.setState({
                    emailErr: "S'il vous plaît entrer email valide",
                });
            }
        } else {
            console.log("cat empty::::");
            isValidate -= 1;
            this.setState({
                emailErr: Strings.ShouldemptyText,
            });
        }

        if (this.state.password != "") {
            isValidate += 1;
            if (this.validatePassword(this.state.password)) {
                isValidate += 1;
            } else {
                isValidate -= 1;
                this.setState({
                    passwordErr: "La longueur devrait être min 6",

                });
            }
        } else {
            console.log("cat empty::::");
            isValidate -= 1;
            this.setState({
                passwordErr: Strings.ShouldemptyText,
            });
        }

        if (this.state.telephone != "") {
            isValidate += 1
        } else {
            isValidate -= 1;
            this.setState({
                telephoneErr: Strings.ShouldemptyText,
            });
        }

        if (this.state.aniversary != Strings.Anniversarie_text) {
            isValidate += 1
        } else {
            isValidate -= 1;
            this.setState({
                aniversaryErr: Strings.ShouldemptyText,
            });
        }

        if (this.state.gender != "") {
            isValidate += 1
        } else {
            isValidate -= 1;
            this.setState({
                genderErr: Strings.ShouldemptyText,
            });

        }

        if (this.state.child_radio != false || this.state.girl_radio != false || this.state.man_radio != false || this.state.people_radio != false) {

            isValidate += 1
            if (this.state.child_radio == true) {
                console.log("avatar image::" + 1)

            }
            else if (this.state.girl_radio == true) {
                console.log("avatar image::" + 2)

            }
            else if (this.state.man_radio == true) {
                console.log("avatar image::" + 3)

            }
            else if (this.state.people_radio == true) {
                console.log("avatar image::" + 4)

            }
        } else {
            isValidate -= 1;
            this.setState({
                avatar_ImageErr: Strings.ShouldemptyText,
            });
        }

        if (this.state.checked != false) {
            isValidate += 1
        } else {

        }
        console.log("Use Login::::" + isValidate)
        if (isValidate == 11) {

            console.log("Use Login::::" + this.state.first_name + this.state.last_name)

            this.UserRegister();
            this.setState({
                animating: true,
                lodingDialog: true,

            });
        }
        else {
            // alert(strings.Pleasefillallthefields)
        }

    }
    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    validatePassword(password) {
        if (password.length < 6) {
            return false;
        } else if (password.length > 16) {
            return false;
        } else {
            return true;
        }
    }

    UserRegister() {
        let headers = {
            'Content-Type': 'application/json',
            // 'User-Id': this.state.userid,
            //   'token': this.state.token,
        };
        RNFetchBlob.fetch('POST', Strings.base_Url + 'users', headers, JSON.stringify({
            "firstname": this.state.first_name,
            "lastname": this.state.last_name,
            "email": this.state.email,
            "password": this.state.password,
            "telephone": this.state.telephone,
            "avatar": this.state.fsPath,
            "aniversary": this.state.aniversary,
            "gender": this.state.gender,
            "tncAccept": this.state.checked
        }),
        ).then((resp) => {

            console.log("response:::::::" + JSON.stringify(resp.json()));
            var id =JSON.stringify(resp.json().id)
            console.log("response:::::::" +id);
            AsyncStorage.setItem("UserId",id)

            this.setState({
                animating: false,
                lodingDialog: false,
            });
            Actions.push("Login")
        }).catch((err) => {
            this.setState({
                animating: false,
                lodingDialog: false,
            });
            console.log("response::::err:::" + err);
        });
    }



    render() {
        console.log("date::" + this.state.aniversary.toString().substr(4, 12))
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
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{Strings.register_text}</Text>

                        </View>

                    </View>
                </ImageBackground>
                <ScrollView style={{marginTop:-25}}>
                    <View style={{ marginTop: 0 }}>

                        <Text style={{ padding: 15, fontSize: 14, fontWeight: 'bold' }}>
                            {Strings.new_coplete_text}
                        </Text>


                        <View style={{ margin: 20, width: '90%' }}>

                            <View style={{ width: '100%', height: 45, borderWidth: 1, borderColor: Strings.light_color, borderRadius: 10 }}>
                                <TextInput placeholder={Strings.first_name}
                                    onChangeText={(first_name) => this.setState({ first_name, first_nameErr: '' })}
                                    style={{ padding: 10 }}>

                                </TextInput>
                            </View>
                            {!!this.state.first_nameErr && (
                                <Text style={{ color: 'red', marginLeft: 10, fontSize: 12 }}>{this.state.first_nameErr}</Text>
                            )}

                            <View style={{ width: '100%', marginTop: 20, height: 45, borderWidth: 1, borderColor: Strings.light_color, borderRadius: 10 }}>
                                <TextInput placeholder={Strings.Nom_de_familee}
                                    onChangeText={(last_name) => this.setState({ last_name, last_nameErr: '' })}
                                    style={{ padding: 10 }}>

                                </TextInput>
                            </View>
                            {!!this.state.last_nameErr && (
                                <Text style={{ color: 'red', marginLeft: 10, fontSize: 12 }}>{this.state.last_nameErr}</Text>
                            )}

                            <View style={{ width: '100%', marginTop: 20, height: 45, borderWidth: 1, borderColor: Strings.light_color, borderRadius: 10 }}>
                                <TextInput placeholder={Strings.email_address_text}
                                    onChangeText={(email) => this.setState({ email, emailErr: '' })}
                                    style={{ padding: 10 }}>

                                </TextInput>
                            </View>
                            {!!this.state.emailErr && (
                                <Text style={{ color: 'red', marginLeft: 10, fontSize: 12 }}>{this.state.emailErr}</Text>
                            )}
                            <View style={{ width: '100%', height: 45, marginTop: 20, borderWidth: 1, borderColor: Strings.light_color, borderRadius: 10 }}>
                                <TextInput
                                    keyboardType="decimal-pad"
                                    maxLength={12}
                                    onChangeText={(telephone) => this.setState({ telephone, telephoneErr: '' })}
                                    placeholder={Strings.telephone_text}
                                    style={{ padding: 10 }}>

                                </TextInput>
                            </View>
                            {!!this.state.telephoneErr && (
                                <Text style={{ color: 'red', marginLeft: 10, fontSize: 12 }}>{this.state.telephoneErr}</Text>
                            )}
                            <View style={{ width: '100%', height: 45, marginTop: 20, borderWidth: 1, borderColor: Strings.light_color, borderRadius: 10 }}>
                                <TextInput placeholder={Strings.password_text}
                                    secureTextEntry={true}
                                    onChangeText={(password) => this.setState({ password, passwordErr: '' })}
                                    style={{ padding: 10 }}>

                                </TextInput>
                            </View>
                            {!!this.state.passwordErr && (
                                <Text style={{ color: 'red', marginLeft: 10, fontSize: 12 }}>{this.state.passwordErr}</Text>
                            )}


                            <View style={{ width: '100%', height: 45, marginTop: 20, borderWidth: 1, borderColor: Strings.light_color, borderRadius: 10 }}>
                                <TextInput placeholder={Strings.Addresse_text}
                                    style={{ padding: 10 }}>

                                </TextInput>
                            </View>
                            <TouchableOpacity onPress={this.showDateTimePicker} style={{ width: '100%', height: 45, marginTop: 20, borderWidth: 1, borderColor: Strings.light_color, borderRadius: 10 }}>
                                <Text placeholder={Strings.Anniversarie_text}
                                    style={{ padding: 10 }}>
                                    {this.state.aniversary}
                                </Text>

                                <DateTimePicker
                                    isVisible={this.state.isDateTimePickerVisible}
                                    onConfirm={this.handleDatePicked}
                                    onCancel={this.hideDateTimePicker}
                                />
                            </TouchableOpacity>
                            {!!this.state.aniversaryErr && (
                                <Text style={{ color: 'red', marginLeft: 10, fontSize: 12 }}>{this.state.aniversaryErr}</Text>
                            )}
                            <View style={{ width: '100%', height: 45, marginTop: 20, borderWidth: 1, borderColor: Strings.light_color, borderRadius: 10 }}>
                                <TextInput placeholder={Strings.Homme_text}
                                    onChangeText={(gender) => this.setState({ gender, genderErr: '' })}
                                    style={{ padding: 10 }}>

                                </TextInput>
                            </View>
                            {!!this.state.genderErr && (
                                <Text style={{ color: 'red', marginLeft: 10, fontSize: 12 }}>{this.state.genderErr}</Text>
                            )}
                            {/* <View style={{ width: '100%', height: 45, marginTop: 20, borderWidth: 1, borderColor: Strings.light_color, borderRadius: 10 }}>
                                <TextInput placeholder={Strings.Moyen_text}
                                    style={{ padding: 10 }}>

                                </TextInput>
                            </View> */}

                            <View style={{ marginTop: 20 }}>
                                <Text style={{ fontSize: 14, fontWeight: 'bold' }}>
                                    {Strings.Type_de_client_text}
                                </Text>
                                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                    <View style={{ width: '50%', flexDirection: 'row' }}>
                                        <TouchableOpacity onPress={() => this.setState({ Particulier_radio: true, Entreprise_radio: false, Clienten_radio: false })} style={{ width: '20%', height: 30, alignItems: 'center', justifyContent: 'center' }}>
                                            <View style={{ width: 20, height: 20, borderWidth: 2, borderRadius: 20 / 2, alignItems: 'center', justifyContent: 'center', borderColor: Strings.light_color }}>
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
                                        <TouchableOpacity onPress={() => this.setState({ Particulier_radio: false, Entreprise_radio: true, Clienten_radio: false })} style={{ width: '20%', height: 30, alignItems: 'center', justifyContent: 'center' }}>
                                            <View style={{ width: 20, height: 20, borderWidth: 2, borderRadius: 20 / 2, alignItems: 'center', justifyContent: 'center', borderColor: Strings.light_color }}>
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
                                        <TouchableOpacity onPress={() => this.setState({ Particulier_radio: false, Entreprise_radio: false, Clienten_radio: true })} style={{ width: '10%', height: 30, alignItems: 'center', justifyContent: 'center' }}>
                                            <View style={{ width: 20, height: 20, borderWidth: 2, borderRadius: 20 / 2, alignItems: 'center', justifyContent: 'center', borderColor: Strings.light_color }}>
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

                                        <TouchableOpacity onPress={() => this.setState({ child_radio: true, girl_radio: false, man_radio: false, people_radio: false, })} style={{ width: '20%', justifyContent: 'center', alignItems: 'center' }}>
                                            <View style={{ width: 20, height: 20, borderWidth: 2, borderRadius: 20 / 2, alignItems: 'center', justifyContent: 'center', borderColor: Strings.light_color }}>
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
                                        <TouchableOpacity onPress={() => this.setState({ child_radio: false, girl_radio: true, man_radio: false, people_radio: false, })} style={{ width: '20%', justifyContent: 'center', alignItems: 'center' }}>
                                            <View style={{ width: 20, height: 20, borderWidth: 2, borderRadius: 20 / 2, alignItems: 'center', justifyContent: 'center', borderColor: Strings.light_color }}>
                                                {this.state.girl_radio === true && (<View style={{ width: 16, height: 16, borderRadius: 16 / 2, backgroundColor: '#01A2C4', alignItems: 'center', justifyContent: 'center' }}>
                                                    <Image source={require("../assets/right.png")}
                                                        style={{ width: 10, height: 10, }}
                                                        resizeMode="contain" />
                                                </View>)}

                                            </View>
                                        </TouchableOpacity>
                                        <View style={{ alignItems: 'center', marginLeft: 20, justifyContent: 'center' }}>
                                            <Image source={require("../assets/96.png")}
                                                style={{ width: 50, height: 50, }}
                                                resizeMode="contain" />
                                        </View>
                                    </View>

                                </View>

                                <View style={{ flexDirection: 'row', width: '100%', marginTop: 20 }}>
                                    <View style={{ width: '50%', flexDirection: 'row' }}>

                                        <TouchableOpacity onPress={() => this.setState({ child_radio: false, girl_radio: false, man_radio: true, people_radio: false, })} style={{ width: '20%', justifyContent: 'center', alignItems: 'center' }}>
                                            <View style={{ width: 20, height: 20, borderWidth: 2, borderRadius: 20 / 2, alignItems: 'center', justifyContent: 'center', borderColor: Strings.light_color }}>
                                                {this.state.man_radio === true && (<View style={{ width: 16, height: 16, borderRadius: 16 / 2, backgroundColor: '#01A2C4', alignItems: 'center', justifyContent: 'center' }}>
                                                    <Image source={require("../assets/right.png")}
                                                        style={{ width: 10, height: 10, }}
                                                        resizeMode="contain" />
                                                </View>)}

                                            </View>
                                        </TouchableOpacity>
                                        <View style={{ alignItems: 'center', marginLeft: 20, justifyContent: 'center' }}>
                                            <Image source={require("../assets/97.png")}
                                                style={{ width: 50, height: 50, }}
                                                resizeMode="contain" />
                                        </View>

                                    </View>
                                    <View style={{ width: '50%', flexDirection: 'row' }}>
                                        <TouchableOpacity onPress={() => this.setState({ child_radio: false, girl_radio: false, man_radio: false, people_radio: true, })} style={{ width: '20%', justifyContent: 'center', alignItems: 'center' }}>
                                            <View style={{ width: 20, height: 20, borderWidth: 2, borderRadius: 20 / 2, alignItems: 'center', justifyContent: 'center', borderColor: Strings.light_color }}>
                                                {this.state.people_radio === true && (<View style={{ width: 16, height: 16, borderRadius: 16 / 2, backgroundColor: '#01A2C4', alignItems: 'center', justifyContent: 'center' }}>
                                                    <Image source={require("../assets/right.png")}
                                                        style={{ width: 10, height: 10, }}
                                                        resizeMode="contain" />
                                                </View>)}

                                            </View>
                                        </TouchableOpacity>
                                        <View style={{ alignItems: 'center', marginLeft: 20, justifyContent: 'center' }}>
                                            <Image source={require("../assets/98.png")}
                                                style={{ width: 50, height: 50, }}
                                                resizeMode="contain" />
                                        </View>
                                    </View>

                                </View>
                            </View>

                            {!!this.state.avatar_ImageErr && (
                                <Text style={{ color: 'red', marginLeft: 10, fontSize: 12 }}>{this.state.aniversaryErr}</Text>
                            )}

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

                            <View style={{ marginTop: 10, flexDirection: 'row' }}>
                                <TouchableOpacity onPress={() => this.setState({ checked: !this.state.checked })} style={{ width: '10%', justifyContent: 'center' }}>
                                    <View style={{ width: 20, height: 20, borderWidth: 2, alignItems: 'center', justifyContent: 'center', borderColor: Strings.light_color }}>
                                        {this.state.checked === true && (<View style={{ width: 20, height: 20, backgroundColor: '#01A2C4', alignItems: 'center', justifyContent: 'center' }}>
                                            <Image source={require("../assets/right.png")}
                                                style={{ width: 10, height: 10, }}
                                                resizeMode="contain" />
                                        </View>)}
                                    </View>
                                </TouchableOpacity>
                                <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{Strings.J_accepte_les_text}</Text>
                                <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#01A2C4' }}>{Strings.term_cinditions}</Text>
                                <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{Strings.hop_assist}</Text>
                            </View>



                            <View style={{ width: '100%', alignItems: 'center', marginTop: 30, marginBottom: 30 }}>
                                {this.state.checked === false ? <View style={{ width: '50%', height: 40, borderRadius: 10, backgroundColor: Strings.light_color, alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ fontSize: 16, color: 'white' }}>{Strings.Inscrire_Maintenant_text}</Text>
                                </View> : <TouchableOpacity onPress={() => this.validationRegister()} style={{ width: '50%', height: 40, borderRadius: 10, backgroundColor: '#01A2C4', alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={{ fontSize: 16, color: 'white' }}>{Strings.Inscrire_Maintenant_text}</Text>
                                    </TouchableOpacity>
                                }
                            </View>
                        </View>
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
                </ScrollView>
            </View>
        );
    }
}
