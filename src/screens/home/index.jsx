import { getAuth } from "@react-native-firebase/auth"
import { Button, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { firebase } from "@react-native-firebase/firestore"
import { useEffect, useState } from "react"
import ScreenWrapper from "../../components/screen-wrapper"

const Home = ({ navigation }) => {
    const [users, setUsers] = useState([])
    const [name, setName] = useState("")
    const [age, setAge] = useState("")
    const auth = getAuth()

    // Set up real-time listener for Users collection
    useEffect(() => {
        const unsubscribe = firebase.firestore().collection('Users').onSnapshot(snapshot => {
            const usersData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setUsers(usersData);
        }, error => {
            console.error("Error fetching users data:", error);
        });

        // Clean up listener on component unmount
        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        await auth.signOut()
        navigation.navigate({ name: "SignIn" })
    }

    const handleSubmit = async () => {
        try {
            await firebase.firestore().collection("Users").add({
                name: name,
                age: age,
            });
            setName(""); // Reset input fields
            setAge("");
            console.log("Data successfully written!");
        } catch (error) {
            console.log("Error writing data:", error.message);
        }
    };

    const handleUpdate = async (id) => {
        try {
            await firebase.firestore().collection("Users").doc(id).update({
                name: "Updated Name",
            });
            console.log("Data successfully updated!");
        } catch (error) {
            console.log("Error updating data:", error.message);
        }
    }

    const handleDelete = async (id) => {
        try {
            await firebase.firestore().collection("Users").doc(id).delete();
            console.log("Data successfully deleted!");
        } catch (error) {
            console.log("Error deleting data:", error.message);
        }
    }

    return (
        <ScreenWrapper>
            <Button title="Logout" onPress={handleLogout} />
            <Text style={styles.heading}>Users 👤</Text>
            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    placeholderTextColor={"black"}
                    onChangeText={text => setName(text)}
                    value={name}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Age"
                    placeholderTextColor={"black"}
                    onChangeText={text => setAge(text)}
                    value={age}
                />
                <TouchableOpacity style={styles.buttonContainer} onPress={handleSubmit}>
                    <Text style={styles.button}>Add User</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.container}>
                <FlatList
                    data={users}
                    renderItem={({ item }) =>
                        <View style={styles.box}>
                            <Text style={styles.name}>{item.name}</Text>
                            <Text style={styles.age}>{item.age}</Text>
                            <View style={{ flexDirection: "row" }}>
                                <Button title="Update" onPress={() => handleUpdate(item.id)} />
                                <Button title="Delete" onPress={() => handleDelete(item.id)} />
                            </View>
                        </View>
                    }
                    keyExtractor={item => item.id}
                />
            </View>
        </ScreenWrapper>
    )
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderColor: "black",
        borderRadius: 10,
        color: "black"
    },
    form: {
        backgroundColor: "white",
        margin: 20,
        borderRadius: 20,
        padding: 40,
        gap: 8,
    },
    button: {
        color: "white",
        textAlign: 'center'
    },
    buttonContainer: {
        backgroundColor: "black",
        borderRadius: 10,
        padding: 10,
        width: 80,
        alignSelf: "center",
    },
    heading: {
        fontSize: 40,
        color: "black",
        textAlign: "center",
        fontWeight: "700"
    },
    box: {
        height: 100,
        width: 150,
        backgroundColor: "grey",
        gap: 5,
        margin: 10,
        padding: 10
    },
    name: {
        fontSize: 20,
        color: "white"
    },
    age: {
        fontSize: 20,
        color: "white"
    },
    container: {
        height: 500
    }
})

export default Home
