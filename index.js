/**
 * @format
 */

import '@react-native-firebase/app'
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { firebase } from '@react-native-firebase/firestore';
import { firebase as authFirebase } from '@react-native-firebase/auth';

// console.log(firebase)
// console.log(authFirebase)

AppRegistry.registerComponent(appName, () => App);
