import StackNavigator from "./src/layout/stack-navigator"
import { NavigationContainer } from "@react-navigation/native"
import { StatusBar } from "react-native"
import { SafeAreaProvider } from "react-native-safe-area-context"

const App = () => {

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar hidden />
        <StackNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  )
}

export default App