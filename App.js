
import React, { Component } from 'react';
import { AppRegistry, View, Text, StyleSheet, ActivityIndicator, TouchableHighlight } from 'react-native';
import Login from './Login';
import AuthService from './AuthService';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import TabBar from "react-native-underline-tabbar";
import NavTabBar from 'react-native-nav-tabbar';

const Page = ({label}) => (
    <View style={styles.container}>
      <Text style={styles.welcome}>
        {label}
      </Text>
      <Text style={styles.instructions}>
        To get started, edit index.ios.js
      </Text>
      <Text style={styles.instructions}>
        Press Cmd+R to reload,{'\n'}
        Cmd+D or shake for dev menu
      </Text>
    </View>
);

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



          <NavTabBar>
    <NavTabBar.Item
        title="Home"
    >
        <View style={styles.container}>
        <ScrollableTabView
            tabBarActiveTextColor="#9565a1"
            renderTabBar={() => <TabBar underlineColor="#9565a1" />}>
          <Page tabLabel={{label: "Page #1"}} label="Page #1"/>
          <Page tabLabel={{label: "Page #2 aka Long!", badge: 3}} label="Page #2 aka Long!"/>
          <Page tabLabel={{label: "Page #3"}} label="Page #3"/>
          <Page tabLabel={{label: "Page #4 aka Page"}} label="Page #4 aka Page"/>
          <Page tabLabel={{label: "Page #5"}} label="Page #5"/>
        </ScrollableTabView>
        </View>
    </NavTabBar.Item>
    <NavTabBar.Item>
        <View style={styles.textContent}>
            <Text style={{fontSize: 18}}>Friends</Text>
        </View>
    </NavTabBar.Item>
    <NavTabBar.Item
        title="Settigs"
    >
        <View style={styles.container}>
        <TouchableHighlight onPress={this.onLogout.bind(this)} style={styles.button}>
          <Text style={styles.buttonText}>
            Log out
          </Text>
        </TouchableHighlight>
        </View>
  </NavTabBar.Item>
</NavTabBar>








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
    paddingTop: 20,
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
