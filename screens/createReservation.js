import React from 'react';
import { StatusBar, Button, ActivityIndicator, ScrollView, PixelRatio, TextInput, View, ImageBackground, Text, Image, Dimensions, TouchableOpacity, Linking, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import DateTimePicker from "react-native-modal-datetime-picker";
import styles from "../styles/styles";
import Strings from '../strings/strings'
import { DatePicker, Card } from "native-base";
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';
const { width, height } = Dimensions.get("window");
import PopupDialog, {
    DialogTitle, DialogContent, DialogFooter, DialogButton, SlideAnimation, ScaleAnimation,
} from 'react-native-popup-dialog';

export default class createReservation extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            animating: false,
            lodingDialog: false,
            chosenDate: '',
            chosenDateErr: '',
            time: "",
            timeErr: '',
            select_oneErr: '',
            ImageSource1: null,
            data: [],
            ImageSource2: null,
            ImageSource3: null,
            ImageSource2true: false,
            ImageSource3true: false,
            isDateTimePickerVisible: false,
            visa_radio: false,
            card_radio: false,
            reference_radio: false,
            writing_radio: false,
            audio_radio: false,
            photo_radio: false,
            select_cardErr: '',
            description: '',
            descriptionErr: '',
            user_id: '',
        };
        this.setDate = this.setDate.bind(this);
        console.log("currentTechId:::" + this.props.currentTechId)
    }

    componentDidMount(){
        AsyncStorage.getItem("UserId")
        .then(UserId => {
            console.log("user id @:::"+UserId)
            var userid = JSON.parse(UserId);
            this.setState({ user_id: userid });
        })
    }
    setDate(newDate) {
        this.setState({ chosenDate: newDate });

        console.log("chosenDate:::" + this.state.chosenDate)
    }

    showDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: true });
    };

    hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
    };
    handleDatePicked = date => {
        console.log("A date has been picked: ", date);
        this.hideDateTimePicker();
    };
    _handleDatePicked = time => {
        console.log("A date time has been picked: ", time);
        const selected1 = time.getHours() + ':' + time.getMinutes();
        console.log("A date time has been picked: ", selected1);
        this.setState({ time: selected1 })
        this.hideDateTimePicker();
    };
    selectPhotoTapped(num) {
        const options = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,

            storageOptions: {
                skipBackup: true
            }
        };

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled photo picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let source = { uri: response.uri };
                switch (num) {
                    case '1':
                        this.setState({
                            ImageSource2true: true,
                            ImageSource1: source,
                            data: [...this.state.data, response.data],

                        });
                        break;
                    case '2':
                        this.setState({
                            ImageSource3true: true,
                            ImageSource2: source,
                            data: [...this.state.data, response.data],

                        });
                        break;
                    case '3':
                        this.setState({
                            ImageSource3: source,
                            data: [...this.state.data, response.data],

                        });
                        break;


                    default:
                        break;
                }
            }
        });
    }

    validation() {
        var isVisible = 0;
        if (this.state.chosenDate != "") {
            isVisible += 1
        } else {
            isVisible -= 1
            this.setState({
                chosenDateErr: "Sélectionner la date et l'heure"
            })
        }
        if (this.state.time != "") {
            isVisible += 1
        } else {
            isVisible -= 1
            this.setState({
                chosenDateErr: "Sélectionner la date et l'heure"
            })
        }
        if (this.state.writing_radio != false || this.state.audio_radio != false || this.state.photo_radio != false) {
            isVisible += 1
            if (this.state.writing_radio == true) {
                if (this.state.description != '') {
                    isVisible += 1
                } else {
                    isVisible -= 1
                    this.setState({
                        descriptionErr: Strings.ShouldemptyText
                    })
                }
            }
        } else {
            isVisible -= 1
            this.setState({
                select_oneErr: Strings.wait_aduio_photo_text
            })
        }

        if (this.state.visa_radio != false || this.state.card_radio != false || this.state.reference_radio != false) {
            isVisible += 1
        } else {
            isVisible -= 1
            this.setState({
                select_cardErr: "Sélectionnez le type de paiement"
            })
        }
        console.log("response:::::::" + isVisible);

        if (isVisible == 5) {
            this.createReservation();
        }
    }

    createReservation() {

        this.setState({
            animating: true,
            lodingDialog: true,
        });

        let headers = {
            'Content-Type': 'application/json',
            // 'User-Id': this.state.userid,
            //   'token': this.state.token,
        };
        RNFetchBlob.fetch('POST', Strings.base_Url + 'users/' + this.state.user_id + '/servicerequests', headers, JSON.stringify({
            "userId": this.state.user_id,
            "visitDate": this.state.chosenDate,
            "visitTime": this.state.time,
            "technicianId": this.props.currentTechId,
            "requestDescription": this.state.description,
            "audioFile": {},
            "images": "images 1"
        }),
        ).then((resp) => {

            console.log("response:::::::" + JSON.stringify(resp.json()));
            this.setState({
                animating: false,
                lodingDialog: false,
            });
             Actions.push("ExpertsList")
        }).catch((err) => {
            this.setState({
                animating: false,
                lodingDialog: false,
            });
            console.log("response::::err:::" + err);
        });
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
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{Strings.createReservation_text}</Text>

                        </View>

                    </View>
                </ImageBackground>
                <ScrollView style={{ marginTop: -25 }}>
                    <View style={{ flex: 1, flexDirection: 'column', margin: 10 }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', padding: 10, }}>{Strings.je_souhaite_text}</Text>
                        <View style={{ width: '100%', flexDirection: 'row', height: 50 }} >
                            <Card style={{ width: '50%', justifyContent: 'center', flexDirection: 'row', alignItems: 'center', borderRadius: 10 }}>
                                <View style={{ width: '20%' }}>
                                    <Text style={{ padding: 5, fontSize: 15 }}>{Strings.le_text}</Text>
                                </View>
                                <TouchableOpacity style={{ width: '80%', backgroundColor: 'white', flexDirection: 'row', height: 40, borderRadius: 10, alignItems: 'center' }}>
                                    <Image source={require("../assets/calender.png")}
                                        style={{ width: 20, height: 20, marginLeft: 2 }}
                                        resizeMode="contain" />
                                    <DatePicker
                                        defaultDate={new Date()}
                                        locale={"en"}
                                        timeZoneOffsetInMinutes={undefined}
                                        modalTransparent={false}
                                        animationType={"fade"}
                                        androidMode={"default"}
                                        placeHolderText="Choisir la date"
                                        textStyle={{ color: 'black' }}
                                        placeHolderTextStyle={{ color: "#d3d3d3" }}
                                        onDateChange={this.setDate}
                                        disabled={false}
                                    />
                                </TouchableOpacity>
                            </Card>
                            <Card style={{ width: '50%', justifyContent: 'center', flexDirection: 'row', alignItems: 'center', borderRadius: 10 }}>
                                <View style={{ width: '50%' }}>
                                    <Text style={{ padding: 5, fontSize: 15 }}>{Strings.À_partir_de_text}</Text>
                                </View>
                                <TouchableOpacity onPress={this.showDateTimePicker} style={{ width: '50%', backgroundColor: 'white', flexDirection: 'row', height: 40, borderRadius: 10, alignItems: 'center' }}>
                                    <Image source={require("../assets/clock.png")}
                                        style={{ width: 30, height: 20, }}
                                        resizeMode="contain" />
                                    <Text>{this.state.time}</Text>
                                    <DateTimePicker
                                        mode="time"
                                        locale="en_GB" // Use "en_GB" here
                                        is24Hour={false}
                                        isVisible={this.state.isDateTimePickerVisible}
                                        onConfirm={this._handleDatePicked}
                                        onCancel={this.hideDateTimePicker}
                                    />
                                </TouchableOpacity>
                            </Card>
                        </View>
                        {!!this.state.chosenDateErr && (
                            <Text style={{ color: 'red', marginLeft: 10, fontSize: 12 }}>{this.state.chosenDateErr}</Text>
                        )}

                        <Text style={{ fontSize: 14, padding: 10, marginTop: 20 }}>{Strings.Aidez_nous_text}</Text>
                        {/* <Text style={{ fontSize: 14, fontWeight: 'bold', color: Strings.color_green_code, paddingLeft: 10, }}>{}</Text> */}

                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
                            <View style={{ width: '50%', flexDirection: 'row' }}>
                                <TouchableOpacity onPress={() => this.setState({ writing_radio: true, audio_radio: false, photo_radio: false, select_oneErr: '' })} style={{ width: '20%', height: 30, alignItems: 'center', justifyContent: 'center' }}>
                                    <View style={{ width: 20, height: 20, borderWidth: 2, borderRadius: 20 / 2, alignItems: 'center', justifyContent: 'center', borderColor: Strings.light_color }}>
                                        {this.state.writing_radio === true && (<View style={{ width: 16, height: 16, borderRadius: 16 / 2, backgroundColor: '#01A2C4', alignItems: 'center', justifyContent: 'center' }}>
                                            <Image source={require("../assets/right.png")}
                                                style={{ width: 10, height: 10, }}
                                                resizeMode="contain" />
                                        </View>)}

                                    </View>
                                </TouchableOpacity>
                                <View style={{ alignItems: 'center', marginLeft: 20, justifyContent: 'center' }}>
                                    <Text>{"Par écrit "}</Text>
                                </View>
                            </View>
                            <View style={{ width: '50%', flexDirection: 'row' }}>
                                <TouchableOpacity onPress={() => this.setState({ writing_radio: false, audio_radio: true, photo_radio: false, select_oneErr: '' })} style={{ width: '20%', height: 30, alignItems: 'center', justifyContent: 'center' }}>
                                    <View style={{ width: 20, height: 20, borderWidth: 2, borderRadius: 20 / 2, alignItems: 'center', justifyContent: 'center', borderColor: Strings.light_color }}>
                                        {this.state.audio_radio === true && (<View style={{ width: 16, height: 16, borderRadius: 16 / 2, backgroundColor: '#01A2C4', alignItems: 'center', justifyContent: 'center' }}>
                                            <Image source={require("../assets/right.png")}
                                                style={{ width: 10, height: 10, }}
                                                resizeMode="contain" />
                                        </View>)}

                                    </View>
                                </TouchableOpacity>
                                <View style={{ alignItems: 'center', marginLeft: 20, justifyContent: 'center' }}>
                                    <Text>{"audio"}</Text>
                                </View>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
                            <View style={{ width: '50%', flexDirection: 'row' }}>
                                <TouchableOpacity onPress={() => this.setState({ writing_radio: false, audio_radio: false, photo_radio: true, select_oneErr: '' })} style={{ width: '20%', height: 30, alignItems: 'center', justifyContent: 'center' }}>
                                    <View style={{ width: 20, height: 20, borderWidth: 2, borderRadius: 20 / 2, alignItems: 'center', justifyContent: 'center', borderColor: Strings.light_color }}>
                                        {this.state.photo_radio === true && (<View style={{ width: 16, height: 16, borderRadius: 16 / 2, backgroundColor: '#01A2C4', alignItems: 'center', justifyContent: 'center' }}>
                                            <Image source={require("../assets/right.png")}
                                                style={{ width: 10, height: 10, }}
                                                resizeMode="contain" />
                                        </View>)}

                                    </View>
                                </TouchableOpacity>
                                <View style={{ alignItems: 'center', marginLeft: 20, justifyContent: 'center' }}>
                                    <Text>{"par photo"}</Text>
                                </View>
                            </View>
                            {/* <View style={{ width: '50%', flexDirection: 'row' }}>
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
                                            <Text>{"audio"}</Text>
                                        </View>
                                    </View> */}
                        </View>

                        {!!this.state.select_oneErr && (
                            <Text style={{ color: 'red', marginLeft: 10, fontSize: 12 }}>{this.state.select_oneErr}</Text>
                        )}

                        {this.state.writing_radio === true && (<View style={{ width: '100%', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 14, fontWeight: 'bold', padding: 10, marginTop: 20 }}>{Strings.dites_nous_text}</Text>
                            <Card style={{ width: '100%', backgroundColor: 'white', borderRadius: 10 }}>
                                <TextInput
                                    multiline={true}
                                    placeholder="Description "
                                    onChangeText={(description) => this.setState({ description, descriptionErr: '' })}
                                    style={{ width: '100%', padding: 10 }}>

                                </TextInput>
                            </Card>


                            {!!this.state.descriptionErr && (
                                <Text style={{ color: 'red', marginLeft: 10, fontSize: 12 }}>{this.state.descriptionErr}</Text>
                            )}
                        </View>)
                        }

                        {this.state.audio_radio === true && (<View style={{ width: '100%', justifyContent: 'center' }}>
                            <Card style={{ marginTop: 30, width: '100%', height: 50, flexDirection: 'row', alignItems: 'center', borderRadius: 10 }}>
                                <Image source={require("../assets/microphone.png")}
                                    style={{ width: 30, height: 30, marginLeft: 10 }}
                                    resizeMode="contain" />
                                <Text style={{ fontSize: 14, fontWeight: 'bold', paddingLeft: 10, }}>{Strings.start_recording_text}</Text>
                            </Card>
                        </View>)}

                        {this.state.photo_radio === true && (<View style={{ width: '100%', justifyContent: 'center' }}>


                            <Text style={{ fontSize: 14, fontWeight: 'bold', color: Strings.color_green_code, paddingLeft: 10, marginTop: 30 }}>{Strings.Ajouter_une_photo_text}</Text>

                            <View style={{ flexDirection: 'row', alignItems: 'center', margin: 10 }}>
                                <TouchableOpacity onPress={() => this.selectPhotoTapped('1')}>
                                    <Card style={{
                                        borderRadius: 10,
                                        width: 100,
                                        margin: 5,
                                        height: 100,
                                        borderColor: 'white',
                                        borderWidth: 1 / PixelRatio.get(),
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        backgroundColor: 'white',
                                    }}>

                                        {this.state.ImageSource1 === null ? <Image source={require("../assets/plus(1).png")}
                                            style={{ width: 30, height: 30 }}></Image> :
                                            <Image style={{
                                                borderRadius: 10,
                                                width: 100,
                                                margin: 5,
                                                height: 100,
                                                borderColor: 'white',
                                                borderWidth: 1 / PixelRatio.get(),
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                backgroundColor: 'white',
                                            }} source={this.state.ImageSource1} />
                                        }

                                    </Card>
                                </TouchableOpacity>

                                {this.state.ImageSource2true === true && (
                                    <TouchableOpacity onPress={() => this.selectPhotoTapped('2')}>
                                        <Card style={{
                                            borderRadius: 10,
                                            width: 100,
                                            margin: 10,
                                            height: 100,
                                            borderColor: 'white',
                                            borderWidth: 1 / PixelRatio.get(),
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            backgroundColor: 'white',
                                        }}>

                                            {this.state.ImageSource2 === null ? <Image source={require("../assets/plus(1).png")}
                                                style={{ width: 30, height: 30 }}></Image> :
                                                <Image style={{
                                                    borderRadius: 10,
                                                    width: 100,
                                                    margin: 5,
                                                    height: 100,
                                                    borderColor: 'white',
                                                    borderWidth: 1 / PixelRatio.get(),
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    backgroundColor: 'white',
                                                }} source={this.state.ImageSource2} />
                                            }

                                        </Card>
                                    </TouchableOpacity>)}

                                {this.state.ImageSource3true === true && (
                                    <TouchableOpacity onPress={() => this.selectPhotoTapped('3')}>
                                        <Card style={{
                                            borderRadius: 10,
                                            width: 100,
                                            margin: 5,
                                            height: 100,
                                            borderColor: 'white',
                                            borderWidth: 1 / PixelRatio.get(),
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            backgroundColor: 'white',
                                        }}>

                                            {this.state.ImageSource3 === null ? <Image source={require("../assets/plus(1).png")}
                                                style={{ width: 30, height: 30 }}></Image> :
                                                <Image style={{
                                                    borderRadius: 10,
                                                    width: 100,
                                                    margin: 5,
                                                    height: 100,
                                                    borderColor: 'white',
                                                    borderWidth: 1 / PixelRatio.get(),
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    backgroundColor: 'white',
                                                }} source={this.state.ImageSource3} />
                                            }

                                        </Card>
                                    </TouchableOpacity>
                                )}
                            </View>
                        </View>)
                        }
                        <Text style={{ fontSize: 14, padding: 10, marginTop: 30 }}>{Strings.si_vous_prenez_text}</Text>
                        <Text style={{ fontSize: 14, fontWeight: 'bold', color: Strings.color_green_code, paddingLeft: 10, marginTop: 10 }}>{Strings.Paiement_par_text}</Text>
                        <View style={{ width: '100%', flexDirection: 'row', marginTop: 10, marginLeft: 15 }}>
                            <TouchableOpacity onPress={() => this.setState({ visa_radio: true, card_radio: false, reference_radio: false, select_cardErr: '' })} style={{ width: '8%', justifyContent: 'center', height: 30, alignItems: 'center' }}>
                                <View style={{ width: 20, height: 20, borderWidth: 1, borderRadius: 20 / 2, alignItems: 'center', justifyContent: 'center', borderColor: '#01A2C4' }}>
                                    {this.state.visa_radio === true && (<View style={{ width: 16, height: 16, borderRadius: 16 / 2, backgroundColor: '#01A2C4', alignItems: 'center', justifyContent: 'center' }}>
                                        <Image source={require("../assets/right.png")}
                                            style={{ width: 10, height: 10, }}
                                            resizeMode="contain" />
                                    </View>)}

                                </View>
                            </TouchableOpacity>
                            <View style={{ alignItems: 'center', marginLeft: 20, justifyContent: 'center' }}>
                                <Text style={{ fontSize: 14 }}>{Strings.visa_Text}</Text>
                            </View>
                        </View>
                        <View style={{ width: '100%', flexDirection: 'row', marginTop: 10, marginLeft: 15 }}>
                            <TouchableOpacity onPress={() => this.setState({ visa_radio: false, card_radio: true, reference_radio: false, select_cardErr: '' }) + Actions.push("AddCart")} style={{ width: '8%', justifyContent: 'center', height: 30, alignItems: 'center' }}>
                                <View style={{ width: 20, height: 20, borderWidth: 1, borderRadius: 20 / 2, alignItems: 'center', justifyContent: 'center', borderColor: '#01A2C4' }}>
                                    {this.state.card_radio === true && (<View style={{ width: 16, height: 16, borderRadius: 16 / 2, backgroundColor: '#01A2C4', alignItems: 'center', justifyContent: 'center' }}>
                                        <Image source={require("../assets/right.png")}
                                            style={{ width: 10, height: 10, }}
                                            resizeMode="contain" />
                                    </View>)}

                                </View>
                            </TouchableOpacity>
                            <View style={{ alignItems: 'center', marginLeft: 20, justifyContent: 'center' }}>
                                <Text style={{ fontSize: 14 }}>{Strings.other_card_text}</Text>
                            </View>
                        </View>
                        <View style={{ width: '100%', flexDirection: 'row', marginTop: 10, marginLeft: 15, marginBottom: 30 }}>
                            <TouchableOpacity onPress={() => this.setState({ visa_radio: false, card_radio: false, reference_radio: true, select_cardErr: '' })} style={{ width: '8%', justifyContent: 'center', height: 30, alignItems: 'center' }}>
                                <View style={{ width: 20, height: 20, borderWidth: 1, borderRadius: 20 / 2, alignItems: 'center', justifyContent: 'center', borderColor: '#01A2C4' }}>
                                    {this.state.reference_radio === true && (<View style={{ width: 16, height: 16, borderRadius: 16 / 2, backgroundColor: '#01A2C4', alignItems: 'center', justifyContent: 'center' }}>
                                        <Image source={require("../assets/right.png")}
                                            style={{ width: 10, height: 10, }}
                                            resizeMode="contain" />
                                    </View>)}

                                </View>
                            </TouchableOpacity>
                            <View style={{ alignItems: 'center', marginLeft: 20, justifyContent: 'center' }}>
                                <Text style={{ fontSize: 14 }}>{Strings.reference_text}</Text>
                            </View>
                        </View>


                        {!!this.state.select_cardErr && (
                            <Text style={{ color: 'red', marginLeft: 10, fontSize: 12 }}>{this.state.select_cardErr}</Text>
                        )}
                        <View style={{ width: '100%', alignItems: 'center', marginTop: 30, marginBottom: 30, flexDirection: 'row' }}>
                            <View style={{ width: '50%' }}>
                                <TouchableOpacity onPress={() => Actions.pop()} style={{ width: '90%', height: 40, borderRadius: 10, borderColor: '#01A2C4', borderWidth: 1, alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ fontSize: 16, color: Strings.color_green_code }}>{Strings.cancel_text}</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ width: '50%' }}>
                                <TouchableOpacity onPress={() => this.validation()} style={{ width: '100%', height: 40, borderRadius: 10, backgroundColor: '#01A2C4', alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ fontSize: 16, color: 'white' }}>{Strings.next_text}</Text>
                                </TouchableOpacity>
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
                    </View>
                </ScrollView>

                {/* 
                        <Text>
              Date: {this.state.chosenDate.toString().substr(4, 12)}
            </Text>
            */}
            </View>
        );
    }
}
