import React, { Component } from 'react';
import { View, Button, TextInput } from 'react-native';
import firebase from 'firebase';

export default class Login extends Component {
    constructor(props){
        super(props);

        this.state = {
            email: '',
            password: '',
        }
        this.onSignIn = this.onSignIn.bind(this)
    }
    onSignIn() {
        const { email, password} = this.state;
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then((result) => {
            console.log(result)
        })
        .catch((error) => {
            console.log(error)
        })
    }
    render() {
        return (
            <View>
                {/* <TextInput 
                    placeholder="Name"
                    onChangeText={(name) => this.setState({ name })}
                /> */}
                <TextInput 
                    placeholder="Email"
                    onChangeText={(email) => this.setState({ email })}
                />
                <TextInput 
                    placeholder="Password"
                    secureTextEntry={true}
                    onChangeText={(password) => this.setState({ password })}
                />
                <Button
                    onPress={() => this.onSignIn()}
                    title="Sign in"
                />
                    
            </View>
        )
    }
}
