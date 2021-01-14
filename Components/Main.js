import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import{ bindActionCreators } from 'redux';
import { fetchUser, fetchUserPosts } from '../redux/actions/index';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import {MaterialCommunityIcons} from 'react-native-vector-icons';
import FeedScreen from './Main/Feed';
import ProfileScreen from './Main/Profile';
import AddScreen from './Main/Add';
import SearchScreen from './main/Search';
import firebase from 'firebase';



const Tab = createMaterialBottomTabNavigator();

export class Main extends Component {
    componentDidMount(){
        this.props.fetchUser();
    }
    render() {
        function MyTabs() {
        return (
        <Tab.Navigator>
            <Tab.Screen name="Feed" component={FeedScreen} 
             options={{
                 tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="magnify" color={color} size={26} />
                 ),
             }}/>
            <Tab.Screen name="Search" component={SearchScreen} navigation={this.props.navigation}
             options={{
                 tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="home" color={color} size={26} />
                 ),
             }}/>

            <Tab.Screen name="Add" component={AddScreen} 
             listeners={({ navigation }) => ({
                 tabPress: event => {
                     event.preventDefault();
                     navigation.navigate("Add")
                 }
             })}
             options={{
                 tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="plus-box" color={color} size={26} />
                 ),
             }}/>
            <Tab.Screen name="Profile" component={ProfileScreen} 
             listeners={({ navigation }) => ({
                tabPress: event => {
                    event.preventDefault();
                    navigation.navigate("Profile", {uid: firebase.auth().currentUser.uid})
                }})}
             options={{
                 tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="account-circle" color={color} size={26} />
                 ),
             }}/>
            
        </Tab.Navigator>
        )
    }
}
}

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser
})

const mapDispatchProps = ( dispatch ) => bindActionCreators({ fetchUser, fetchUserPosts }, dispatch)

export default connect(mapStateToProps, mapDispatchProps)(Main);
