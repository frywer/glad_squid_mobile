
import React, { Component } from 'react';
import { AppRegistry, View, Text, StyleSheet, ActivityIndicator, TouchableHighlight, AsyncStorage } from 'react-native';
import Login from './Login';
import Home from './Home';
import AuthService from './AuthService';


export default class GladSquidTest extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoggedIn: false,
      checkingAuth: true
    }
    this.onLogin = this.onLogin.bind(this);
  }
  componentDidMount(){
    AuthService.getAuthInfo((auth, app_url)=> {
      this.setState({
        checkingAuth: false,
        isLoggedIn: auth && app_url
      })
    })
  }
  render() {
     if (this.state.checkingAuth) {
       return(
         <View style={styles.container}>
            <ActivityIndicator style={{opacity: this.state.checkingAuth ? 1.0 : 0.0}} size="large" color="#0000ff" />
         </View>
       )
     }

     if (this.state.isLoggedIn) {
       return (
          <Home onLogout={this.onLogout}/>
       )
     } else {
       return(
         <Login onLogin={this.onLogin} />
       )
     }

  }

  onLogout(){
    AuthService.logout()
    this.setState({isLoggedIn: false})
  }

  onLogin() {
    this.setState({isLoggedIn: true})
  }
}

var styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});
