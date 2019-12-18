import React from 'react';
import { StatusBar, Button, ScrollView, PixelRatio, TextInput, View, ImageBackground, Text, Image, Dimensions, TouchableOpacity, Linking, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import DateTimePicker from "react-native-modal-datetime-picker";
import styles from "../styles/styles";
import Strings from '../strings/strings'
import { DatePicker } from "native-base";
import ImagePicker from 'react-native-image-picker';


const { width, height } = Dimensions.get("window");


export default class createReservation extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            chosenDate: '',
            time: "",
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
        };
        this.setDate = this.setDate.bind(this);
    }
    setDate(newDate) {
        this.setState({ chosenDate: newDate });
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
                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{Strings.createReservation_text}</Text>
                    </View>
                </View>
                <ScrollView>
                    <View style={{ flex: 1, flexDirection: 'column', margin: 10 }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', padding: 10, }}>{Strings.je_souhaite_text}</Text>
                        <View style={{ width: '100%', flexDirection: 'row', height: 50 }} >
                            <View style={{ width: '50%', justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>
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
                            </View>
                            <View style={{ width: '50%', justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>
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
                            </View>
                        </View>

                        <Text style={{ fontSize: 14, padding: 10, marginTop: 20 }}>{Strings.Aidez_nous_text}</Text>
                        <Text style={{ fontSize: 14, fontWeight: 'bold', color: Strings.color_green_code, paddingLeft: 10, }}>{Strings.wait_aduio_photo_text}</Text>

                        <Text style={{ fontSize: 14, fontWeight: 'bold', padding: 10, marginTop: 20 }}>{Strings.dites_nous_text}</Text>
                        <View style={{ width: '100%', backgroundColor: 'white', borderRadius: 10 }}>
                            <TextInput
                                multiline={true}
                                placeholder="type"
                                style={{ width: '100%', padding: 10 }}>

                            </TextInput>
                        </View>

                        <View style={{ marginTop: 30, width: '100%', flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={require("../assets/microphone.png")}
                                style={{ width: 30, height: 30, }}
                                resizeMode="contain" />
                            <Text style={{ fontSize: 14, fontWeight: 'bold', paddingLeft: 10, }}>{Strings.start_recording_text}</Text>
                        </View>

                        <Text style={{ fontSize: 14, fontWeight: 'bold', color: Strings.color_green_code, paddingLeft: 10, marginTop: 30 }}>{Strings.Ajouter_une_photo_text}</Text>


                        <View style={{ flexDirection: 'row', alignItems: 'center', margin: 10 }}>
                            <TouchableOpacity onPress={() => this.selectPhotoTapped('1')}>
                                <View style={{
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

                                </View>
                            </TouchableOpacity>

                            {this.state.ImageSource2true === true && (
                                <TouchableOpacity onPress={() => this.selectPhotoTapped('2')}>
                                    <View style={{
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

                                    </View>
                                </TouchableOpacity>)}

                            {this.state.ImageSource3true === true && (
                                <TouchableOpacity onPress={() => this.selectPhotoTapped('3')}>
                                    <View style={{
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

                                    </View>
                                </TouchableOpacity>
                            )}





                        </View>
                        <Text style={{ fontSize: 14, padding: 10, }}>{Strings.si_vous_prenez_text}</Text>
                        <Text style={{ fontSize: 14, fontWeight: 'bold', color: Strings.color_green_code, paddingLeft: 10, marginTop: 10 }}>{Strings.Paiement_par_text}</Text>
                        <View style={{ width: '100%', flexDirection: 'row', marginTop: 10, marginLeft: 15 }}>
                            <TouchableOpacity onPress={() => this.setState({visa_radio: true, card_radio: false, reference_radio: false })} style={{ width: '8%', justifyContent: 'center',height:30,alignItems:'center' }}>
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
                            <TouchableOpacity onPress={() => this.setState({ visa_radio: false, card_radio: true, reference_radio: false }) +Actions.push("AddCart")} style={{ width: '8%', justifyContent: 'center',height:30,alignItems:'center' }}>
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
                        <View style={{ width: '100%', flexDirection: 'row', marginTop: 10, marginLeft: 15,marginBottom:30 }}>
                            <TouchableOpacity onPress={() => this.setState({ visa_radio: false, card_radio: false, reference_radio: true })} style={{ width: '8%', justifyContent: 'center',height:30,alignItems:'center' }}>
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
