import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import * as firebase from 'firebase';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LandingScreen from './Components/Auth/Landing';
import RegisterScreen from './Components/Auth/Register';
import LoginScreen from './Components/Auth/Login';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './redux/reducers';
import thunk from 'redux-thunk';
import MainScreen from './Components/Main';
import AddScreen from './Components/Main/Add';


const store = createStore(rootReducer, applyMiddleware(thunk))



// For firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyCltKUa7EMcaadri0C6r32PwGhSZWFHVPQ",
  authDomain: "instagram-clone-267e4.firebaseapp.com",
  projectId: "instagram-clone-267e4",
  storageBucket: "instagram-clone-267e4.appspot.com",
  messagingSenderId: "688232540986",
  appId: "1:688232540986:web:da856cca92ea175e4bbe03",
  measurementId: "G-8YQG3RVT9L"
};

if(firebase.apps.length === 0){
  firebase.initializeApp(firebaseConfig)
};

const Stack = createStackNavigator();
export class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      loaded: false,
    }
  }

  componentDidMount(){
    firebase.auth().onAuthStateChanged((user) => {
      if(!user){
        this.setState({
          loggedIn: false,
          loaded: true,
        })
      }else {
        this.setState({
          loggedIn: true,
          loaded: true,
        })
      }
    })
  }
  render() {
    const { loggedIn, loaded } = this.state;
    if(!loaded){
      return(
        <View style = {{ flex: 1, justifyContent: 'center'}}>
          <Text>
            Loading
          </Text>
        </View>
      )
    }
    if(!loggedIn){
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Landing">
            <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="Register" component={RegisterScreen}/>
            <Stack.Screen name="Login" component={LoginScreen}/>
          </Stack.Navigator>
        </NavigationContainer>
      );
    }
    return(
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Main">
            <Stack.Screen name="Main" component={MainScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="Add" component={AddScreen}/>
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    )
}}

export default App;
