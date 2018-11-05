import React, { Component } from 'react';
import { AppRegistry, Text, View, FlatList, StyleSheet} from 'react-native';
import AuthService from './AuthService';
import { Card, ListItem, Button, Icon } from 'react-native-elements'

const users = [
 {
    name: 'brynn'
 },{
    name: 'aaa'
 }
]


class CustomEntity extends Component {
  constructor(props){
    super(props);

    this.state = {
      customEntities: []
    }
  }

  componentDidMount(){
    this.fetchCustomEntitites();
  }

  fetchCustomEntitites(){
    AuthService.getAuthInfo((auth, app_url)=> {
      var url = 'https://' + app_url + '/custom_tables/' + this.props.customTableID + '.json'
      console.log(url);
      fetch(url, {
          headers: {
              'Authorization' : 'Basic ' + auth
          }
      })
      .then((response)=> response.json())
      .then((responseData)=> {
        this.setState({customEntities: responseData.custom_entities})
      })

    })
  }

  render() {
    return(
       <FlatList data={this.state.customEntities}
          renderItem={({item})=> (
            <Card title={item.name} key={item.custom_entity_id}>
              {
               Object.entries(item).map(([key, value], j) => {
                 if(key !== 'custom_entity_id' && key !== 'custom_entity_name'){
                   return (
                     <View key={j} style={styles.user}>
                       <Text style={styles.name}>{key}:{value.toString()}</Text>
                     </View>
                   );
                 }
               })
              }
             </Card>
           )}
         keyExtractor={(item, index) => index.toString()}
        />
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


export default CustomEntity;
