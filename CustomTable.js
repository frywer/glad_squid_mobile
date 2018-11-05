import React, { Component } from 'react';
import { AppRegistry, Text, View, FlatList, StyleSheet} from 'react-native';
import AuthService from './AuthService';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import TabBar from "react-native-underline-tabbar";
import CustomEntity from './CustomEntity';

const Page = ({label}) => (
  <CustomEntity customTableID={label} />
);

class CustomTable extends Component {
  constructor(props){
    super(props);

    this.state = {
      customTables: []
    }
  }

  componentDidMount(){
    this.fetchCustomTables();
  }

  fetchCustomTables(){
    AuthService.getAuthInfo((auth, app_url)=> {
      var url = 'https://' + app_url + '/custom_tables.json'

      fetch(url, {
          headers: {
              'Authorization' : 'Basic ' + auth
          }
      })
      .then((response)=> response.json())
      .then((responseData)=> {
        this.setState({customTables: responseData.custom_tables})
      })

    })
  }

  render() {
    return(
      <View style={styles.container}>
        <ScrollableTabView
            tabBarActiveTextColor="#9565a1"
            renderTabBar={() => <TabBar underlineColor="#9565a1" />}>
            {
              this.state.customTables.map((ct, i)=>(
                  <Page tabLabel={{label: ct.name, badge: ct.entities_count}} label={ct.id} key={ct.id} />
              ))
            }
        </ScrollableTabView>
      </View>
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


export default CustomTable;
