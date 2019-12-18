import React, { Component } from "react";
import { Image, Alert, AsyncStorage, TouchableOpacity, ImageBackground, ScrollView } from "react-native";
import {
    Content,
    Text,
    List,
    ListItem,
    Icon,
    Container,
    Left,
    Right,
    Badge,
    View,
    Button

} from "native-base";
import { Actions } from "react-native-router-flux";
import strings from '../strings/strings'



class SideBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shadowOffsetWidth: 1,
            shadowRadius: 4,
            emailId: '',
            emailUser: '',
            name: '',
            ProfileImage: '',
            userid: '',
            userName: '',
            email: '',
            profileImage: '',
        };
    }


    render() {
        return (
            <Container>
                <Content
                    bounces={false}
                    style={{ flex: 1, }}>
                    <ScrollView>
                        <View style={{ alignItems: 'center' }}>
                            <Image source={require("../assets/image.png")}
                                style={{ height: 180, }}
                            />
                            <View style={{ width: 150, height: 150, backgroundColor: 'white', borderRadius: 150 / 2, marginTop: -120, alignItems: 'center', justifyContent: 'center' }}>
                                <Image source={require("../assets/images.jpeg")}
                                    style={{ width: 140, height: 140, borderRadius: 140 / 2 }}
                                />
                            </View>
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>John Smith</Text>
                            <Text style={{ fontSize: 14}}>johnsmith@gmail.com</Text>

                            <View style={{ width: '100%', flexDirection: 'column' }}>


                                <TouchableOpacity onPress={() => Actions.push("Profile")} style={{ marginTop: 30, height: 40, marginLeft: 25, flexDirection: 'row', alignItems: 'center' }}>
                                    <Image source={require("../assets/user-2.png")}
                                        style={{ width: 20, height: 20,
                                        resizeMode:'contain' }} ></Image>
                                    <Text style={{ fontSize: 16, marginLeft: 10, }}>{strings.profile_text}</Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => Actions.push("History")} style={{ marginTop: 10, height: 40, marginLeft: 25, flexDirection: 'row', alignItems: 'center' }}>
                                    <Image source={require("../assets/completed-tasks.png")}
                                        style={{ width: 20, height: 20,resizeMode:'contain' }} ></Image>
                                    <Text style={{ fontSize: 16, marginLeft: 10,  }}>{strings.history_text}</Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => Actions.push("Notifiaction")} style={{ marginTop: 10, height: 40, marginLeft: 25, flexDirection: 'row', alignItems: 'center' }}>
                                    <Image source={require("../assets/notification.png")}
                                        style={{ width: 20, height: 20,resizeMode:'contain' }} ></Image>
                                    <Text style={{ fontSize: 16, marginLeft: 10,  }}>{strings.notificatiin_text}</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={{ marginTop: 10, height: 40, marginLeft: 25, flexDirection: 'row', alignItems: 'center' }}>
                                    <Image source={require("../assets/rating.png")}
                                        style={{ width: 20, height: 20,resizeMode:'contain' }} ></Image>
                                    <Text style={{ fontSize: 16, marginLeft: 10,  }}>{strings.devenir_text}</Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => Actions.push("Support")} style={{ marginTop: 10, height: 40, marginLeft: 25, flexDirection: 'row', alignItems: 'center' }}>
                                    <Image source={require("../assets/user-2.png")}
                                        style={{ width: 20, height: 20,resizeMode:'contain' }} ></Image>
                                    <Text style={{ fontSize: 16, marginLeft: 10,  }}>{strings.a_propos_text}</Text>
                                </TouchableOpacity>

                                <TouchableOpacity  style={{ marginTop: 10, marginBottom: 40, height: 40, marginLeft: 25, flexDirection: 'row', alignItems: 'center' }}>
                                    <Image source={require("../assets/logout.png")}
                                        style={{ width: 20, height: 20, resizeMode:'contain'}} ></Image>
                                    <Text style={{ fontSize: 16, marginLeft: 10, }}>{strings.logout_text}</Text>
                                </TouchableOpacity>


                            </View>
                        </View>
                    </ScrollView>
                </Content>
            </Container>
        );
    }
}

export default SideBar