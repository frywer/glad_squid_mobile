
import React, { Component } from 'react';
import { AppRegistry, View, Text, StyleSheet, ActivityIndicator, TouchableHighlight } from 'react-native';
import Login from './Login';
import AuthService from './AuthService';

export default class GladSquidTest extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoggedIn: false,
      checkingAuth: true
    }
    this.onLogin = this.onLogin.bind(this);
    // this.componentDidMount = this.componentDidMount.bind(this);
  }
  componentDidMount(){
    AuthService.getAuthInfo((err, authInfo)=> {
      this.setState({
        checkingAuth: false,
        isLoggedIn: authInfo != null
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
         <View style={styles.container}>
           <Text style={styles.welcome}>Logged In</Text>

           <TouchableHighlight onPress={this.onLogout.bind(this)} style={styles.button}>
             <Text style={styles.buttonText}>
               Log out
             </Text>
           </TouchableHighlight>

         </View>
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
    console.log('in onLogin start')
    this.setState({isLoggedIn: true})
  }


}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
