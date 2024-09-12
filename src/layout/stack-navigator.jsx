import { createStackNavigator } from "@react-navigation/stack"
import Home from "../screens/home"
import SignUp from "../auth/sign-up"
import SignIn from "../auth/sign-in"
import { getAuth } from "@react-native-firebase/auth"

const Stack = createStackNavigator()
const auth = getAuth()
const user = auth.currentUser

const StackNavigator = () => {
    return (
        <Stack.Navigator initialRouteName={user ? ("Home") : ("SignIn")}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="SignIn" component={SignIn} />
        </Stack.Navigator>
    )
}

export default StackNavigator