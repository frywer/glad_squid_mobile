
import React, { Component } from 'react';
import { AppRegistry, Text, View, StyleSheet,
  TouchableHighlight, ActivityIndicator } from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import NavTabBar from 'react-native-nav-tabbar';
import CustomTable from './CustomTable';

class Home extends Component {
  render() {
    return(
      <NavTabBar>
        <NavTabBar.Item title="Home">
          <CustomTable />
        </NavTabBar.Item>

        <NavTabBar.Item>
          <View style={styles.textContent}>
            <Text style={{fontSize: 18}}>Friends</Text>
          </View>
        </NavTabBar.Item>

        <NavTabBar.Item title="Settigs">
          <View style={styles.container}>
            <TouchableHighlight onPress={this.props.onLogout.bind(this)} style={styles.button}>
              <Text style={styles.buttonText}>
                Log out
              </Text>
            </TouchableHighlight>
          </View>
        </NavTabBar.Item>
      </NavTabBar>
    )
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

export default Home;
