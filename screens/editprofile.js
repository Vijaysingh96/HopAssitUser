import React from 'react';
import { StatusBar, Button, FlatList, ActivityIndicator, ScrollView, PixelRatio, TextInput, View, ImageBackground, Text, Image, Dimensions, TouchableOpacity, Linking, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import styles from "../styles/styles";
import Strings from '../strings/strings'
import ImagePicker from 'react-native-image-picker';
import { Card } from 'native-base';
import PopupDialog, {
    DialogTitle, DialogContent, DialogFooter, DialogButton, SlideAnimation, ScaleAnimation,
} from 'react-native-popup-dialog';
import RNFetchBlob from 'rn-fetch-blob';
import DateTimePicker from "react-native-modal-datetime-picker";
import Moment from 'moment';

export default class editprofile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isDateTimePickerVisible: false,
            first_name: '',
            last_name: '',
            address: '',
            email: '',
            gender: '',
            telephone: '',
            Anniversarie: '',
            userid: '',
            first_nameErr: '',
            last_nameErr: '',
            telephoneErr: '',
            errEmail: '',
            addressErr: '',
            AnniversarieErr: '',
            genderErr:''

        };

    }

    componentDidMount() {
        this.getProfileUser();
    }

    getProfileUser() {
        AsyncStorage.getItem("UserId")
            .then(UserId => {
                console.log("user id @:::" + UserId)
                var userid = JSON.parse(UserId);
                this.setState({ userid: userid });

                this.setState({
                    animating: true,
                    lodingDialog: true,
                })
                fetch(Strings.base_Url + "users/" + userid, {
                    method: 'GET',
                    headers: {
                        // 'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                })
                    .then((response) => response.json())
                    .then((responseData) => {

                        this.setState({
                            animating: false,
                            lodingDialog: false,
                            first_name: responseData.firstname,
                            last_name: responseData.lastname,
                            address: responseData.firstname,
                            email: responseData.email,
                            gender: responseData.gender,
                            telephone: responseData.telephone,
                            Anniversarie: Moment(responseData.aniversary).format('DD-MM-YYYY'),
                        })

                        console.log("responseData:::" + responseData.id)

                    })
            })
    }

    showDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: true });
    };

    hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
    };

    handleDatePicked = date => {

        console.log("A date has been picked: ", date);
        var date_select = Moment(date).format('DD-MM-YYYY');
        this.setState({
            Anniversarie: date_select
        })
        this.hideDateTimePicker();
    };

    validation() {

        var isValidate = 0;
        if (this.state.first_name != '') {
            isValidate += 1
        } else {
            isValidate -= 1
            this.setState({ first_nameErr: Strings.ShouldemptyText })
        }
        if (this.state.last_name != "") {
            isValidate += 1
        } else {
            isValidate -= 1
            this.setState({ last_nameErr: Strings.ShouldemptyText })
        }
        if (this.state.telephone != "") {
            isValidate += 1
        } else {
            isValidate -= 1
            this.setState({ telephoneErr: Strings.ShouldemptyText })
        }
        if (this.state.email != "") {
            isValidate += 1
            if (this.validateEmail(this.state.email)) {
                isValidate += 1;
            } else {
                isValidate -= 1;
                this.setState({
                    errEmail: "S'il vous plaît entrer email valide",
                });
            }
        } else {
            isValidate -= 1
            this.setState({ errEmail: Strings.ShouldemptyText })
        }
        

        if (this.state.address != '') {
            isValidate += 1;

        } else {
            isValidate -= 1;
            this.setState({
                addressErr: Strings.ShouldemptyText,
            });
        }
        if (this.state.gender != '') {
            isValidate += 1;

        } else {
            isValidate -= 1;
            this.setState({
                genderErr: Strings.ShouldemptyText,
            });
        }

        if (this.state.Anniversarie != Strings.Anniversarie_text) {
            isValidate += 1
        } else {
            isValidate -= 1
            this.setState({
                AnniversarieErr: Strings.ShouldemptyText
            })
        }

        console.log("isvalidate::" + isValidate)

        if (isValidate == 8) {
            this.editProfile();
        }


    }

    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    editProfile() {
        this.setState({
            animating: true,
            lodingDialog: true,
        })
        let headers = {
            'Content-Type': 'application/json',
            // 'User-Id': this.state.userid,
            //   'token': this.state.token,
        };
        RNFetchBlob.fetch('PUT', Strings.base_Url + 'users/' + this.state.userid, headers, JSON.stringify({
            "id": this.state.userid,
            "firstname": this.state.first_name,
            "lastname": this.state.last_name,
            "email": this.state.email,
            "password": this.state.password,
            "telephone": this.state.telephone,
            "avatar": this.state.fsPath,
            "aniversary": this.state.Anniversarie,
            "gender": this.state.gender,

        }),
        ).then((resp) => {

            console.log("response:::::::" + JSON.stringify(resp.json()));
            this.setState({
                animating: false,
                lodingDialog: false,
            });
            Actions.push("Profile")
        }).catch((err) => {
            this.setState({
                animating: false,
                lodingDialog: false,
            });
            console.log("response::::err:::" + err);
        });
    }

    selectProfilePic = () => {
        const options = {
            title: 'Select Avatar',
            storageOptions: {
                skipBackup: true,
                path: 'images',
                profilePic: '',
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
                AsyncStorage.setItem("profilePic", JSON.stringify(source));
                this.setState({
                    profilePic: source,
                    isImageAvailable: true,
                    image_Url: response.uri,
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
                <View style={{ width: '100%', height: 50, flexDirection: 'row', backgroundColor: 'white' }}>
                    <TouchableOpacity onPress={() => Actions.pop()} style={{ width: '15%', height: 50, justifyContent: 'center', alignItems: 'center', borderTopRightRadius: 20, borderBottomRightRadius: 20 }}>
                        <Image source={require("../assets/left-arrow.png")}
                            style={{ width: 30, height: 20, }}
                            resizeMode="contain" />
                    </TouchableOpacity>
                    <View style={{ width: '70%', height: 50, justifyContent: 'center', alignItems: 'center', }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{"Modifier le profil "}</Text>
                    </View>

                </View>
                <ScrollView>
                    <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
                        <Image source={require("../assets/image.png")}
                            style={{ height: 180, }}
                        />
                        <TouchableOpacity onPress={this.selectProfilePic} style={{ width: 100, height: 100, backgroundColor: 'white', borderRadius: 100 / 2, marginTop: -70, alignItems: 'center', justifyContent: 'center' }}>
                            {this.state.isImageAvailable == true ? <Image source={this.state.profilePic}
                                style={{ width: 95, height: 95, borderRadius: 95 / 2 }}
                            /> : <Image source={require("../assets/images.jpeg")}
                                style={{ width: 95, height: 95, borderRadius: 95 / 2 }}
                                />

                            }
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.selectProfilePic} style={{ width: 25, height: 25, backgroundColor: Strings.color_green_code, borderRadius: 25 / 2, marginTop: -35, marginLeft: 81, alignItems: 'center', justifyContent: 'center' }}>
                            <Image source={require("../assets/pencil.png")}
                                style={{ width: 15, height: 15, }}
                                resizeMode="contain" />
                        </TouchableOpacity>

                        <View style={{ width: '80%', flexDirection: 'column', marginTop: 60 }}>
                            <Text style={{ fontSize: 16, paddingLeft: 10 }}>{Strings.prenom_text}</Text>
                            <Card style={{ width: '100%', height: 40, borderRadius: 10, backgroundColor: 'white', marginTop: 10, justifyContent: 'center' }}>
                                <TextInput value={this.state.first_name}
                                    onChangeText={(first_name) => this.setState({ first_name, first_nameErr: '' })}
                                    placeholder="Jonh" style={{ fontSize: 15, padding: 10 }}></TextInput>
                            </Card>
                            {!!this.state.first_nameErr && (
                                <Text style={{ color: 'red', marginLeft: 10, fontSize: 12 }}>{this.state.first_nameErr}</Text>
                            )}

                            <Text style={{ fontSize: 16, paddingLeft: 10, marginTop: 30 }}>{Strings.Nom_de_familee}</Text>
                            <Card style={{ width: '100%', height: 40, borderRadius: 10, backgroundColor: 'white', marginTop: 10, justifyContent: 'center' }}>
                                <TextInput value={this.state.last_name}
                                    onChangeText={(last_name) => this.setState({ last_name, last_nameErr: '' })}
                                    placeholder="Smith" style={{ fontSize: 15, padding: 10 }}></TextInput>
                            </Card>
                            {!!this.state.last_nameErr && (
                                <Text style={{ color: 'red', marginLeft: 10, fontSize: 12 }}>{this.state.last_nameErr}</Text>
                            )}

                            <Text style={{ fontSize: 16, paddingLeft: 10, marginTop: 30 }}>{Strings.Addresse_text}</Text>
                            <Card style={{ width: '100%', height: 40, borderRadius: 10, backgroundColor: 'white', marginTop: 10, justifyContent: 'center' }}>

                                <TextInput
                                    placeholder="23, Simple France" style={{ fontSize: 15, padding: 10 }}></TextInput>

                            </Card>

                            <Text style={{ fontSize: 16, paddingLeft: 10, marginTop: 30 }}>{Strings.telephone_text}</Text>
                            <Card style={{ width: '100%', height: 40, borderRadius: 10, backgroundColor: 'white', marginTop: 10, justifyContent: 'center' }}>

                                <TextInput
                                    onChangeText={(telephone) => this.setState({ telephone, telephoneErr: '' })}
                                    placeholder="+33 123456" style={{ fontSize: 15, padding: 10 }}>{this.state.telephone}</TextInput>
                            </Card>
                            {!!this.state.telephoneErr && (
                                <Text style={{ color: 'red', marginLeft: 10, fontSize: 12 }}>{this.state.telephoneErr}</Text>
                            )}

                            <Text style={{ fontSize: 16, paddingLeft: 10, marginTop: 30 }}>{Strings.email_address_text}</Text>
                            <Card style={{ width: '100%', height: 40, borderRadius: 10, backgroundColor: 'white', marginTop: 10, justifyContent: 'center' }}>

                                <TextInput
                                onChangeText={(email) => this.setState({ email, errEmail: '' })}
                                 placeholder="johnsmith@gmail.com" style={{ fontSize: 15, padding: 10 }}>{this.state.email}</TextInput>
                            </Card>
                            {!!this.state.errEmail && (
                                <Text style={{ color: 'red', marginLeft: 10, fontSize: 12 }}>{this.state.errEmail}</Text>
                            )}

                            <Text style={{ fontSize: 16, paddingLeft: 10, marginTop: 30 }}>{"Sexe"}</Text>
                            <Card style={{ width: '100%', height: 40, borderRadius: 10, backgroundColor: 'white', marginTop: 10, justifyContent: 'center' }}>

                                <TextInput
                                 onChangeText={(gender) => this.setState({ gender, genderErr: '' })}
                                 placeholder="Homme" style={{ fontSize: 15, padding: 10 }}> {this.state.gender}</TextInput>

                            </Card>
                            {!!this.state.genderErr && (
                                <Text style={{ color: 'red', marginLeft: 10, fontSize: 12 }}>{this.state.genderErr}</Text>
                            )}
                            <Text style={{ fontSize: 16, paddingLeft: 10, marginTop: 30 }}>{Strings.Anniversarie_text}</Text>
                            <Card style={{ width: '100%', height: 40, borderRadius: 10, backgroundColor: 'white', marginTop: 10, justifyContent: 'center', marginBottom: 50 }}>
                                <TouchableOpacity onPress={this.showDateTimePicker} style={{ backgroundColor: '' }}>
                                    <Text placeholder="31/10/2019" style={{ fontSize: 15, padding: 10 }}>{this.state.Anniversarie}</Text>
                                </TouchableOpacity>
                                <DateTimePicker
                                    isVisible={this.state.isDateTimePickerVisible}
                                    onConfirm={this.handleDatePicked}
                                    onCancel={this.hideDateTimePicker}
                                />
                            </Card>

                        </View>

                        <TouchableOpacity onPress={() => this.validation()} style={{ width: '50%', height: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: Strings.color_green_code, marginBottom: 40 }}>
                            <Text style={{ fontSize: 16, color: 'white' }}> Mattre A Jour</Text>
                        </TouchableOpacity>


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
                </ScrollView>
            </View>
        );
    }
}
