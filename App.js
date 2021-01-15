import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import * as firebase from 'firebase';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import LandingScreen from './frontend/Components/Auth/Landing';
import RegisterScreen from './frontend/Components/Auth/Register';
import LoginScreen from './frontend/Components/Auth/Login';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './frontend/Components/redux/reducers';
import thunk from 'redux-thunk';
import MainScreen from './frontend/Components/Main';
import AddScreen from './frontend/Components/Main/Add';
import SaveScreen from './frontend/Components/Main/Save';
import Comments from './frontend/Components/Main/Comment';


const store = createStore(rootReducer, applyMiddleware(thunk))



// For firebase JS SDK v7.20.0 and later, measurementId is optional

const Api_Key = process.env.REACT_APP_API_KEY;

const firebaseConfig = {
  apiKey: {Api_Key},
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
  constructor(props) {
    super()
    this.state = {
      loaded: false,
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.setState({
          loggedIn: false,
          loaded: true,
        })
      } else {
        this.setState({
          loggedIn: true,
          loaded: true,
        })
      }
    })
  }
  render() {
    const { loggedIn, loaded } = this.state;
    if (!loaded) {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text>Loading</Text>
        </View>
      )
    }

    if (!loggedIn) {
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Landing">
            <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }

    return (
      <Provider store={store}>
        <NavigationContainer >
          <Stack.Navigator initialRouteName="Main">
            <Stack.Screen name="Main" component={MainScreen} />
            <Stack.Screen name="Add" component={AddScreen} navigation={this.props.navigation}/>
            <Stack.Screen name="Save" component={SaveScreen} navigation={this.props.navigation}/>
            <Stack.Screen name="Comment" component={Comments} navigation={this.props.navigation}/>
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    )
  }
}

export default App