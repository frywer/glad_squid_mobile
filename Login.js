import React, { Component } from 'react';
import buffer from 'buffer';
import { AppRegistry, Text, View, StyleSheet, Image,
  TextInput, TouchableHighlight, ActivityIndicator, AsyncStorage } from 'react-native';
import AuthService from './AuthService';

class Login extends Component {
  constructor(props){
    super(props);

    this.state = {
      showProgress: false,
      app_url: null
    }
  }

  render() {
    var errorCtrl = <View />;

    if (!this.state.success && this.state.badCredentials) {
      errorCtrl = <Text style={styles.error}>
         User name or password is not correct.
      </Text>
    }

    if (!this.state.success && this.state.unknowError) {
      errorCtrl = <Text style={styles.error}>
         Something went wrong. Please try again later.
      </Text>
    }

    return (
      <View style={styles.container}>
        <Image style={styles.logo} source={require('./assets/logo.png')} />
        <Text style={styles.heading}>GladSquid</Text>
        {errorCtrl}

        <TextInput onChangeText={(text) => this.setState({app_url: text})}
          style={styles.input}
          value={this.state.app_url}
          placeholder="Application URL" />

        <TextInput onChangeText={(text) => this.setState({username: text})}
          style={styles.input}
          placeholder="User name" />

        <TextInput onChangeText={(text) => this.setState({password: text})}
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true} />

        <TouchableHighlight onPress={this.onLoginPressed.bind(this)} style={styles.button}>
          <Text style={styles.buttonText}>
            Log in
          </Text>
        </TouchableHighlight>

        <ActivityIndicator style={{opacity: this.state.showProgress ? 1.0 : 0.0, marginTop: 20}} size="large" color="#0000ff" />
      </View>
    );
  }

  onLoginPressed(){
    this.setState({showProgress: true});
    var authService = require('./AuthService');
    authService.login({
      username: this.state.username,
      password: this.state.password,
      app_url: this.state.app_url
    }, (results)=> {
      this.setState(Object.assign({showProgress: false}, results))
      if (results.success && this.props.onLogin){
        this.props.onLogin();
      } else {
        this.setState({unknowError: true})
      }
    })

  }
}

var styles = StyleSheet.create({
  container: {
      backgroundColor: '#F5FCFF',
      paddingTop: 40,
      padding: 10,
      alignItems: 'center',
      flex: 1
  },
  logo: {
    width: 110,
    height: 60
  },
  heading: {
    fontSize: 40,
    marginTop: 10,
    color: '#a8a8a8'
  },
  input: {
    height: 70,
    marginTop: 10,
    padding: 4,
    fontSize: 18,
    alignSelf: 'stretch'
  },
  button: {
    height: 70,
    backgroundColor: '#9565a1',
    alignSelf: 'stretch',
    marginTop: 20,
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 23,
    color: "#FFF",
    alignSelf: 'center'
  },
  error: {
    color: 'red'
  }
});

export default Login;
