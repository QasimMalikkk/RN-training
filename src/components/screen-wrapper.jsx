import { StyleSheet, View } from "react-native"

const ScreenWrapper = ({ children }) => {
    return (
        <View style={styles.wrapper}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: "black"
    }
})
export default ScreenWrapper