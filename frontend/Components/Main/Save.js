import React, { useState } from 'react';
import { View, TextInput, Image, Button } from 'react-native';
import firebase from 'firebase'
import { NavigationContainer } from '@react-navigation/native';
require("firebase/firestore")
require("firebase/firebase-storage")

export default function Save(props, navigation) {
    const [caption, setCaption] = useState("")
    const uploadImage = async () => {
        const uri = props.route.params.image;
        
        const childPath = `post/${firebase.auth().currentUser.uid}/${math.random().toString(36)}`;

        const response = await fetch(uri);
        
        const blob = await response.blob();
        
        const task = firebase.storage().ref().child(childPath).put(blob)
        
        const taskProgress = snapshot => {
            console.log(snapshot)
        }

        const taskCompleted = () => {
            snapshot.ref.getDownloadURL().then((snapshot) => {
            savePostData(snapshot)
            })
        }

        const taskError = snapshot => {
            console.log(snapshot)
        }

        task.on("state_changed", taskProgress, taskError, taskCompleted,);
    }

    const savePostData = (downloadURL) => {

        firebase.firestore().collection("posts").doc(firebase.auth().currentUser.uid).collection("userPosts")
        .add({
            downloadURL,
            caption,
            likesCount: 0,
            creation: firebase.firestore.FieldValue.serverTimeStamp()
        }).then((function () {
            navigation.popToTop()
        }))
    }

    return (
        <View style={{flex: 1}}>
            <Image source={{uri: props.route.params.image}} />
            <TextInput
                placeholder = "write a caption"
                onChangeText={ (caption) => setCaption(caption) }
            />
            <Button title="Save" onPress={() => uploadImage()}/>
        </View>
    )
}
