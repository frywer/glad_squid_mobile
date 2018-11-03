import buffer from 'buffer';
import { AsyncStorage, Alert } from 'react-native';
import _ from 'lodash';

const authKey = 'auth';
const appUrl = 'app_url';

class AuthService {

  getAuthInfo(cb) {
    if (AsyncStorage.getItem('auth') && AsyncStorage.getItem('app_url')) {
      var authInfo = {
          header: {
              Authorization: 'Basic ' + AsyncStorage.getItem(authKey)
          }
      }
      return cb(null, authInfo);
    } else {
      return cb(true);
    }
  }

  login(creds, cb){
        var b = new buffer.Buffer(creds.username + ':' + creds.password);
        var encodedAuth = b.toString('base64');

        fetch('https://' + creds.app_url, {
            headers: {
                'Authorization' : 'Basic ' + encodedAuth
            }
        })
        .then((response)=> {
            if(response.status >= 200 && response.status < 300){
                return response;
            }
            throw {
                badCredentials: response.status == 401,
                unknownError: response.status != 401
            }
        })
        .then((results)=> {
            AsyncStorage.multiSet([
                [authKey, encodedAuth],
                [appUrl, creds.app_url],
                ['username', creds.username],
                ['password', creds.password]
            ], (err)=> {
                if(err){
                    throw err;
                }
                console.log(AsyncStorage.getAllKeys)
                return cb({success: true});
            })
        })
        .catch((err)=> {
            return cb(err);
        });
    }

    async logout(){
      console.log(await AsyncStorage.getItem('app_url'));
      try {
        await AsyncStorage.removeItem(authKey);
      } catch (error) {
        console.log('AsyncStorage error: ' + error.message);
      }
    }

}

module.exports = new AuthService();
