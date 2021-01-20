import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Image, KeyboardAvoidingView, ScrollView, Modal } from 'react-native'
import db from './config'
import firebase from 'firebase'

export default class Welcome_Screen extends Component {
    constructor() {
        super();
        this.state = {
            emailID: "",
            password: "",
            firstName: "",
            lastName: "",
            address: "",
            confirmPassword: "",
            isModalVisible: false,
        }
    }

    showModal = () => {
        return (<Modal animationType="fade" transparent={false}
            visible={this.state.isModalVisible} >
            <View>
                 <ScrollView>
                      <KeyboardAvoidingView>
                           <Text>
                        Registration
                        </Text>
                        <TextInput style={styles.formTextInput}
                            placeholder={"First Name"} maxLength={8} onChangeText={(text) => {
                            this.setState({ firstName: text, });
                        }} />
                        <TextInput style={styles.formTextInput}
                            placeholder={"Contact"} maxLength={10} keyboardType={"numeric"} onChangeText={(text) => {
                                this.setState({ contact: text, });
                            }} /> <TextInput style={styles.formTextInput}
                            placeholder={"Address"} multiline={true} onChangeText={(text) => {
                                this.setState({ address: text, });
                            }} />
                        <TextInput style={styles.formTextInput}
                            placeholder={"Email Id"} keyboardType={"email-address"} onChangeText={(text) => {
                                this.setState({ emailId: text, });
                            }} /> <TextInput style={styles.formTextInput}
                            placeholder={"Password"} secureTextEntry={true} onChangeText={(text) => {
                                this.setState({ password: text, });
                            }} />
                        <TextInput style={styles.formTextInput}
                            placeholder={"Confirm Password"} secureTextEntry={true} onChangeText={(text) => {
                                this.setState({ confirmPassword: text, });
                            }} />
                        <View style={styles.modalBackButton}>
                            <TouchableOpacity style={styles.registerButton} onPress={() => {
                                this.userSignUp(this.state.emailId.trim(), this.state.password, this.state.confirmPassword);
                            }} >
                                <Text style={styles.registerButton}>
                                    Register
                                    </Text>
                            </TouchableOpacity>
                            <View style={styles.modalBackButton}>
                                <TouchableOpacity style={styles.cancelButton} onPress={() => {
                                    this.setState({ isModalVisible: false, });
                                }} >
                                    <Text style={{ color: "#ff5722" }}>
                                        Go Back
                                        </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                </ScrollView>
            </View>
        </Modal>);
    };

    userSignUp = async (emailID, password, confirmPassword) => {
        if (password != confirmPassword) {
            return (
                Alert.alert("Password And Confirmed Password Do Not Match")
            )
        } else {
            firebase.auth().createUserWithEmailAndPassword(emailID, password)
                .then(() => {
                    db.collection("users").add({ first_name: this.state.firstName, last_name: this.state.lastName, contact: this.state.contact, username: this.state.emailId, address: this.state.address, });
                    return Alert.alert('userAddedSucessfully', "", [{ text: "OK", onPress: () => this.setState({ isModalVisible: false})}])
                })
                .catch(function (error) {
                    var errorCode = error.code
                    var errorMessage = error.message
                    return Alert.alert(errorMessage)
                })
        }
    }

    userLogin = async (emailID, password) => {
        firebase.auth().signInWithEmailAndPassword(emailID, password)
            .then(() => {
            return Alert.alert('loginSucessfull')
            })
            .catch(function (error) {
                var errorCode = error.code
                var errorMessage = error.message
                return Alert.alert(errorMessage)
        })
    }
    render(){
        return (
            <View style={styles.container}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    {this.showModal()}
                </View>
                <View>
                    <Text style = {styles.title}>
                        Book-Santa
                  </Text>
                </View>
                <View>
            <TextInput style = {styles.loginBox} placeholder = "abc@example.com" keyboardType = 'email-address' onChangeText = {() => {
                this.setState({emailID: text})
                    }} />
                     <TextInput style = {styles.loginBox} placeholder = "Enter Password" secureTextEntry = {true} onChangeText = {() => {
                this.setState({password: text})
                    }} />
                    <TouchableOpacity style={styles.button, { marginBottom: 20, marginTop: 20 }} onPress={() => {
                        this.userLogin(this.state.emailID, this.state.password)
                    }}>
                       <Text style={styles.buttonText}>
                            Log-In
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => {
                        //this.userSignUp(this.state.emailID, this.state.password)
                        this.setState({isModalVisible:true})
                    }}> 
                        <Text style={styles.buttonText}>
                            Sign-Up
                      </Text>
                    </TouchableOpacity>
                </View>
                
</View>
     )
    }
}