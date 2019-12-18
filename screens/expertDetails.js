import React from 'react';
import { StatusBar, Button, FlatList, ScrollView, PixelRatio, TextInput, View, ImageBackground, Text, Image, Dimensions, TouchableOpacity, Linking, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import styles from "../styles/styles";
import Strings from '../strings/strings'
import { Card } from 'native-base';
import { Rating, AirbnbRating } from 'react-native-elements';
import ConfirmRBSheet from "react-native-raw-bottom-sheet";
import TravailRBSheet from 'react-native-raw-bottom-sheet';
import StartRideRBSheet from 'react-native-raw-bottom-sheet';
import AcceptRBSheet from 'react-native-raw-bottom-sheet';
import ArriveRBSheet from 'react-native-raw-bottom-sheet';
import CancelRBSheet from 'react-native-raw-bottom-sheet';
import CaseRBSheet from 'react-native-raw-bottom-sheet';

export default class expertDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Att_radio: false,
            j_ai_radio: false,
            trauve_radio: false,
            fait_radio: false,
            autre_radio: false

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
                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{Strings.details_expert_text}</Text>
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
                        <AirbnbRating
                            showRating={false}
                            count={5}
                            color={Strings.color_green_code}
                            defaultRating={3}
                            size={15} />

                        <Text style={{ fontSize: 18, fontWeight: 'bold', padding: 5, marginTop: 30, color: Strings.color_green_code }}>{Strings.intervention_text}</Text>
                        <Text style={{ fontSize: 14, fontWeight: 'bold', color: Strings.color_green_code }}>De €29.78 jusqu'à €45.78 </Text>

                        <View style={{ width: '95%', marginTop: 30, }}>
                            <Text style={{ fontSize: 16, padding: 10 }}>{Strings.descripation_Personelle_text}</Text>
                            <View style={{ width: '95%', backgroundColor: 'white', borderRadius: 10, marginLeft: 10 }}>
                                <Text style={{ padding: 10 }}>{Strings.lorem_dolor_text}</Text>
                            </View>
                        </View>


                        <View style={{ width: '95%', marginTop: 30, flexDirection: 'row', marginBottom: 50 }}>
                            <View style={{ width: '50%', alignItems: 'center' }}>
                                <TouchableOpacity onPress={()=>Actions.push("Rating")} style={{ width: '90%', height: 40, borderRadius: 10, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ padding: 10, color: Strings.color_green_code }}>{Strings.Retour_text}</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ width: '50%', alignItems: 'center' }}>
                                <TouchableOpacity onPress={() => this.ConfirmRBSheet.open()} style={{ width: '90%', height: 40, borderRadius: 10, backgroundColor: Strings.color_green_code, alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ padding: 10, color: 'white' }}>{Strings.selectionnerr_text}</Text>

                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>

                    <ConfirmRBSheet
                        ref={ref => { this.ConfirmRBSheet = ref; }}
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
                            <View style={{ width: '90%', height: 350, backgroundColor: 'white', borderRadius: 10, alignItems: 'center' }}>
                                <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 20, padding: 10, textAlign: 'center' }}>{Strings.voter_command_text}</Text>
                                <View style={{ width: '100%', borderWidth: 0.5, borderColor: 'black', marginTop: 10 }}></View>

                                <Text style={{ fontSize: 14, marginTop: 10, padding: 10, }}>{Strings.lorem_dolor_text}</Text>

                                <View style={{ width: '100%', flexDirection: 'row' }}>
                                    <View style={{ width: '60%', alignItems: 'center' }}>
                                        <TouchableOpacity onPress={() => this.ConfirmRBSheet.close() + this.CancelRBSheet.open()} style={{ width: '95%', height: 40, backgroundColor: 'red', borderRadius: 10, marginTop: 20, alignItems: 'center', justifyContent: 'center' }}>
                                            <Text style={{ color: 'white' }}>{Strings.annuler_la_text}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ width: '40%', alignItems: 'center' }}>
                                        <TouchableOpacity onPress={() => this.ConfirmRBSheet.close() + this.TravailRBSheet.open()} style={{ width: '90%', height: 40, backgroundColor: Strings.color_green_code, borderRadius: 10, marginTop: 20, alignItems: 'center', justifyContent: 'center' }}>
                                            <Text style={{ fontSize: 16, color: 'white' }}>{Strings.next_text}</Text>
                                        </TouchableOpacity>
                                    </View>

                                </View>

                            </View>
                        </View>
                    </ConfirmRBSheet>

                    <TravailRBSheet
                        ref={ref => { this.TravailRBSheet = ref; }}
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
                            <View style={{ width: '98%', height: 450, backgroundColor: 'white', borderRadius: 10, alignItems: 'center' }}>
                                <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 20, padding: 10, textAlign: 'center' }}>{Strings.estimation_text}</Text>
                                <View style={{ width: '100%', borderWidth: 0.5, borderColor: 'black', marginTop: 10 }}></View>

                                <Text style={{ fontSize: 14, marginTop: 20, textAlign: 'center' }}>{Strings.l_expert_text}</Text>

                                <View style={{ width: '100%', flexDirection: 'row', marginTop: 10 }}>
                                    <View style={{ width: '50%', }}>
                                        <Text style={{ ontSize: 14, color: Strings.color_green_code, padding: 10 }}>{Strings.temps_text}</Text>
                                    </View>
                                    <View style={{ width: '50%', }}>
                                        <Text style={{ ontSize: 14, color: 'black', padding: 10 }}>1 Heure ou Travail</Text>
                                    </View>
                                </View>

                                <View style={{ width: '100%', flexDirection: 'row', }}>
                                    <View style={{ width: '50%', }}>
                                        <Text style={{ ontSize: 14, color: Strings.color_green_code, padding: 10 }}>{Strings.cout_traval_text}</Text>
                                    </View>
                                    <View style={{ width: '50%', }}>
                                        <Text style={{ ontSize: 14, color: 'black', padding: 10 }}>[€] 9</Text>
                                    </View>
                                </View>
                                <View style={{ width: '100%', flexDirection: 'row', }}>
                                    <View style={{ width: '50%', }}>
                                        <Text style={{ ontSize: 14, color: Strings.color_green_code, padding: 10 }}>{Strings.cout_du_materiel_text}</Text>
                                    </View>
                                    <View style={{ width: '50%', }}>
                                        <Text style={{ ontSize: 14, color: 'black', padding: 10 }}>[€] 14</Text>
                                    </View>
                                </View>
                                <View style={{ width: '100%', flexDirection: 'row', }}>
                                    <View style={{ width: '50%', }}>
                                        <Text style={{ ontSize: 14, color: Strings.color_green_code, padding: 10 }}>{Strings.frais_de_text}</Text>
                                    </View>
                                    <View style={{ width: '50%', }}>
                                        <Text style={{ ontSize: 14, color: 'black', padding: 10 }}>[€] 15</Text>
                                    </View>
                                </View>
                                <View style={{ width: '100%', flexDirection: 'row', }}>
                                    <View style={{ width: '50%', }}>
                                        <Text style={{ ontSize: 14, color: Strings.color_green_code, padding: 10 }}>{Strings.cout_total_text}</Text>
                                    </View>
                                    <View style={{ width: '50%', }}>
                                        <Text style={{ ontSize: 14, color: 'black', padding: 10 }}>[€] 25</Text>
                                    </View>
                                </View>
                                <View style={{ width: '100%', flexDirection: 'row', marginTop: 30 }}>
                                    <View style={{ width: '60%', alignItems: 'center' }}>
                                        <TouchableOpacity onPress={() => this.TravailRBSheet.close() + this.CancelRBSheet.open()} style={{ width: '95%', height: 40, backgroundColor: 'red', borderRadius: 10, marginTop: 20, alignItems: 'center', justifyContent: 'center' }}>
                                            <Text style={{ color: 'white' }}>{Strings.annuler_la_text}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ width: '40%', alignItems: 'center' }}>
                                        <TouchableOpacity onPress={() => this.TravailRBSheet.close() + this.StartRideRBSheet.open()} style={{ width: '90%', height: 40, backgroundColor: Strings.color_green_code, borderRadius: 10, marginTop: 20, alignItems: 'center', justifyContent: 'center' }}>
                                            <Text style={{ fontSize: 16, color: 'white' }}>{Strings.accepter_text}</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </TravailRBSheet>


                    <StartRideRBSheet
                        ref={ref => { this.StartRideRBSheet = ref; }}
                        height={500}
                        duration={200}
                        closeOnPressMask={false}
                        customStyles={{
                            container: {
                                alignItems: "center",
                                borderRadius: 10,
                                backgroundColor: 'transparent'
                            }
                        }}>
                        <View style={{ flexDirection: 'column', width: '90%', height: '100%', borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
                            <View style={{ width: '90%', height: 250, backgroundColor: 'white', borderRadius: 10, alignItems: 'center' }}>
                                <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 20, padding: 10, textAlign: 'center' }}>{Strings.votre_expert_text}</Text>
                                <View style={{ width: '100%', borderWidth: 0.5, borderColor: 'black', marginTop: 10 }}></View>
                                <Text style={{ fontSize: 14, marginTop: 10, padding: 10, }}>{Strings.est_sur_text}</Text>
                                <View style={{ width: '100%', alignItems: 'center' }}>
                                    <TouchableOpacity onPress={() => this.StartRideRBSheet.close() + this.AcceptRBSheet.open()} style={{ width: '50%', height: 40, backgroundColor: Strings.color_green_code, borderRadius: 10, marginTop: 20, alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={{ fontSize: 16, color: 'white' }}>{"Ok"}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </StartRideRBSheet>

                    <AcceptRBSheet
                        ref={ref => { this.AcceptRBSheet = ref; }}
                        height={500}
                        duration={200}
                        closeOnPressMask={false}
                        customStyles={{
                            container: {
                                alignItems: "center",
                                borderRadius: 10,
                                backgroundColor: 'transparent'
                            }
                        }}>
                        <View style={{ flexDirection: 'column', width: '90%', height: '100%', borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
                            <View style={{ width: '90%', height: 350, backgroundColor: 'white', borderRadius: 10, alignItems: 'center' }}>
                                <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 20, padding: 10, textAlign: 'center' }}>{Strings.votre_route_text}</Text>
                                <View style={{ width: '100%', borderWidth: 0.5, borderColor: 'black', marginTop: 10 }}></View>
                                <Image source={require("../assets/technical-support.png")}
                                    style={{ width: 100, height: 100, marginTop: 10 }}
                                    resizeMode="contain" />
                                <Text style={{ fontSize: 14, marginTop: 10, padding: 10, }}>{Strings.vos_remerciements_text}</Text>
                                <View style={{ width: '100%', alignItems: 'center' }}>
                                    <TouchableOpacity onPress={() => this.AcceptRBSheet.close() + this.ArriveRBSheet.open()} style={{ width: '50%', height: 40, backgroundColor: Strings.color_green_code, borderRadius: 10, marginTop: 20, alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={{ fontSize: 16, color: 'white' }}>{Strings.next_text}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </AcceptRBSheet>

                    <ArriveRBSheet
                        ref={ref => { this.ArriveRBSheet = ref; }}
                        height={500}
                        duration={200}
                        closeOnPressMask={false}
                        customStyles={{
                            container: {
                                alignItems: "center",
                                borderRadius: 10,
                                backgroundColor: 'transparent'
                            }
                        }}>
                        <View style={{ flexDirection: 'column', width: '90%', height: '100%', borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
                            <View style={{ width: '90%', height: 200, backgroundColor: 'white', borderRadius: 10, alignItems: 'center' }}>
                                <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 20, padding: 10, textAlign: 'center' }}>{Strings.l_expert_arrive_text}</Text>
                                <View style={{ width: '100%', borderWidth: 0.5, borderColor: 'black', marginTop: 10 }}></View>

                                <Text style={{ fontSize: 18, marginTop: 10, padding: 10, }}>{Strings.votre_arrive_text}</Text>
                                <View style={{ width: '100%', alignItems: 'center' }}>
                                    <TouchableOpacity onPress={() => this.ArriveRBSheet.close() + this.CaseRBSheet.open()} style={{ width: '50%', height: 40, backgroundColor: Strings.color_green_code, borderRadius: 10, marginTop: 20, alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={{ fontSize: 16, color: 'white' }}>{"OK"}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </ArriveRBSheet>


                    <CancelRBSheet
                        ref={ref => { this.CancelRBSheet = ref; }}
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
                            <View style={{ width: '95%', height: 450, backgroundColor: 'white', borderRadius: 10, alignItems: 'center' }}>
                                <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 20, padding: 10, textAlign: 'center' }}>{Strings.annuler_la_text}</Text>
                                <View style={{ width: '100%', borderWidth: 0.5, borderColor: 'black', marginTop: 10 }}></View>
                                <View style={{ width: '100%', marginTop: 10, }}>
                                    <Text style={{ fontSize: 16, padding: 10, }}>{Strings.etse_vous_text}</Text>
                                    <View style={{ flexDirection: 'row' }}>
                                        <TouchableOpacity onPress={() => this.setState({ Att_radio: true, j_ai_radio: false, trauve_radio: false, fait_radio: false, autre_radio: false })} style={{ width: '15%', height: 40, alignItems: 'center', justifyContent: 'center' }}>
                                            <View style={{ width: 20, height: 20, borderWidth: 1, borderRadius: 20 / 2, alignItems: 'center', justifyContent: 'center', borderColor: '#01A2C4' }}>
                                                {this.state.Att_radio === true && (<View style={{ width: 16, height: 16, borderRadius: 16 / 2, backgroundColor: '#01A2C4', alignItems: 'center', justifyContent: 'center' }}>
                                                    <Image source={require("../assets/right.png")}
                                                        style={{ width: 10, height: 10, }}
                                                        resizeMode="contain" />
                                                </View>)}
                                            </View>
                                        </TouchableOpacity>
                                        <View style={{ width: '85%', height: 40, justifyContent: 'center' }}>
                                            <Text style={{ fontSize: 14 }}>{Strings.attendre_trop_text}</Text>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                        <TouchableOpacity onPress={() => this.setState({ Att_radio: false, j_ai_radio: true, trauve_radio: false, fait_radio: false, autre_radio: false })} style={{ width: '15%', height: 40, alignItems: 'center', justifyContent: 'center' }}>
                                            <View style={{ width: 20, height: 20, borderWidth: 1, borderRadius: 20 / 2, alignItems: 'center', justifyContent: 'center', borderColor: '#01A2C4' }}>
                                                {this.state.j_ai_radio === true && (<View style={{ width: 16, height: 16, borderRadius: 16 / 2, backgroundColor: '#01A2C4', alignItems: 'center', justifyContent: 'center' }}>
                                                    <Image source={require("../assets/right.png")}
                                                        style={{ width: 10, height: 10, }}
                                                        resizeMode="contain" />
                                                </View>)}
                                            </View>
                                        </TouchableOpacity>
                                        <View style={{ width: '85%', height: 40, justifyContent: 'center' }}>
                                            <Text style={{ fontSize: 14 }}>{Strings.j_ai_text}</Text>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                        <TouchableOpacity onPress={() => this.setState({ Att_radio: false, j_ai_radio: false, trauve_radio: true, fait_radio: false, autre_radio: false })} style={{ width: '15%', height: 40, alignItems: 'center', justifyContent: 'center' }}>
                                            <View style={{ width: 20, height: 20, borderWidth: 1, borderRadius: 20 / 2, alignItems: 'center', justifyContent: 'center', borderColor: '#01A2C4' }}>
                                                {this.state.trauve_radio === true && (<View style={{ width: 16, height: 16, borderRadius: 16 / 2, backgroundColor: '#01A2C4', alignItems: 'center', justifyContent: 'center' }}>
                                                    <Image source={require("../assets/right.png")}
                                                        style={{ width: 10, height: 10, }}
                                                        resizeMode="contain" />
                                                </View>)}
                                            </View>
                                        </TouchableOpacity>
                                        <View style={{ width: '85%', height: 40, justifyContent: 'center' }}>
                                            <Text style={{ fontSize: 14 }}>{Strings.j_ai_trouve_text}</Text>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                        <TouchableOpacity onPress={() => this.setState({ Att_radio: false, j_ai_radio: false, trauve_radio: false, fait_radio: true, autre_radio: false })} style={{ width: '15%', height: 40, alignItems: 'center', justifyContent: 'center' }}>
                                            <View style={{ width: 20, height: 20, borderWidth: 1, borderRadius: 20 / 2, alignItems: 'center', justifyContent: 'center', borderColor: '#01A2C4' }}>
                                                {this.state.fait_radio === true && (<View style={{ width: 16, height: 16, borderRadius: 16 / 2, backgroundColor: '#01A2C4', alignItems: 'center', justifyContent: 'center' }}>
                                                    <Image source={require("../assets/right.png")}
                                                        style={{ width: 10, height: 10, }}
                                                        resizeMode="contain" />
                                                </View>)}
                                            </View>
                                        </TouchableOpacity>
                                        <View style={{ width: '85%', height: 40, justifyContent: 'center' }}>
                                            <Text style={{ fontSize: 14 }}>{Strings.j_ai_fait_text}</Text>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                        <TouchableOpacity onPress={() => this.setState({ Att_radio: false, j_ai_radio: false, trauve_radio: false, fait_radio: false, autre_radio: true })} style={{ width: '15%', height: 40, alignItems: 'center', justifyContent: 'center' }}>
                                            <View style={{ width: 20, height: 20, borderWidth: 1, borderRadius: 20 / 2, alignItems: 'center', justifyContent: 'center', borderColor: '#01A2C4' }}>
                                                {this.state.autre_radio === true && (<View style={{ width: 16, height: 16, borderRadius: 16 / 2, backgroundColor: '#01A2C4', alignItems: 'center', justifyContent: 'center' }}>
                                                    <Image source={require("../assets/right.png")}
                                                        style={{ width: 10, height: 10, }}
                                                        resizeMode="contain" />
                                                </View>)}
                                            </View>
                                        </TouchableOpacity>
                                        <View style={{ width: '85%', height: 40, justifyContent: 'center' }}>
                                            <Text style={{ fontSize: 14 }}>{Strings.autre_text}</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={{ width: '100%', flexDirection: 'row' }}>
                                    <View style={{ width: '60%', alignItems: 'center' }}>
                                        <TouchableOpacity onPress={() => this.CancelRBSheet.close()} style={{ width: '95%', height: 40, backgroundColor: 'red', borderRadius: 10, marginTop: 20, alignItems: 'center', justifyContent: 'center' }}>
                                            <Text style={{ color: 'white' }}>{Strings.annuler_la_text}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ width: '40%', alignItems: 'center' }}>
                                        <TouchableOpacity onPress={() => this.CancelRBSheet.close()} style={{ width: '90%', height: 40, backgroundColor: Strings.color_green_code, borderRadius: 10, marginTop: 20, alignItems: 'center', justifyContent: 'center' }}>
                                            <Text style={{ fontSize: 16, color: 'white' }}>{Strings.next_text}</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </CancelRBSheet>


                    <CaseRBSheet
                        ref={ref => { this.CaseRBSheet = ref; }}
                        height={500}
                        duration={200}
                        closeOnPressMask={false}
                        customStyles={{
                            container: {
                                alignItems: "center",
                                borderRadius: 10,
                                backgroundColor: 'transparent'
                            }
                        }}>
                        <View style={{ flexDirection: 'column', width: '90%', height: '100%', borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
                            <View style={{ width: '95%', height: 350, backgroundColor: 'white', borderRadius: 10, alignItems: 'center' }}>
                                <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 20, padding: 10, textAlign: 'center' }}>{Strings.penalite_text}</Text>
                                <View style={{ width: '100%', borderWidth: 0.5, borderColor: 'black', marginTop: 10 }}></View>

                                <Text style={{ fontSize: 18, marginTop: 10, padding: 10, }}>{Strings.vous_avez_text}</Text>
                                <View style={{ width: '100%', alignItems: 'center',flexDirection:'column' }}>
                                    <Text style={{fontSize:18,color:Strings.color_green_code,fontWeight:'bold',marginTop:20}}> € 25 </Text>
                                    <TouchableOpacity onPress={() => this.CaseRBSheet.close()} style={{ width: '50%', height: 40, backgroundColor: Strings.color_green_code, borderRadius: 10, marginTop: 40, alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={{ fontSize: 16, color: 'white' }}>{"OK"}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </CaseRBSheet>


                </ScrollView>
            </View>
        );
    }
}
