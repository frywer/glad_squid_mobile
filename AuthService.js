import buffer from 'buffer';
import { AsyncStorage, Alert } from 'react-native';

const authKey = 'auth';
const appUrl = 'app_url';

class AuthService {

  getAuthInfo(cb) {
    AsyncStorage.multiGet(['auth', 'app_url'], (err, val)=> {
        if(err){
            return cb(err);
        }

        if(!val){
            return cb();
        }

        const authValue = val[0][1]
        const appUrlVal = val[1][1]

        return cb(authValue, appUrlVal);
    });
  }

  appUrlValue() {
    AsyncStorage.getItem('app_url').then((value) => {
      return value;
      }, (error) => {
      console.log(error)
    });
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
      try {
        await AsyncStorage.removeItem(authKey);
      } catch (error) {
        console.log('AsyncStorage error: ' + error.message);
      }
    }

    _retrieveAppUrl = async () => {
      try {
        const value = await AsyncStorage.getItem('app_url');
        if (value !== null) {
          console.log('+' + value);
          return value;
        }
      } catch (error) {
        console.log(error);
      }
    }

    _retrieveAuth = async () => {
      try {
        const value = await AsyncStorage.getItem('auth');
        if (value !== null) {
          console.log(value);
          return value;
        }
      } catch (error) {
        console.log(error);
      }
    }

}

module.exports = new AuthService();
