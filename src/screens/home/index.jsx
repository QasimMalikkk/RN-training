import { getAuth } from "@react-native-firebase/auth"
import { Button, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { firebase } from "@react-native-firebase/firestore"
import { useEffect, useState } from "react"

const Home = ({ navigation }) => {
    const [users, setUsers] = useState()
    const [name, setName] = useState()
    const [age, setAge] = useState()
    const auth = getAuth()

    const getUsersData = async () => {
        try {
            const snapshot = await firebase.firestore().collection('Users').get();
            const usersData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setUsers(usersData);
            console.log("This is the data", usersData);
        } catch (error) {
            console.error("Error fetching users data:", error);
        }
    };


    useEffect(() => {
        getUsersData()
    }, [])


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
            console.log("Data successfully written!");
        } catch (error) {
            console.log("Error writing data:", error.message);
        }
    };
    return (
        <View>
            <Button title="Logout" onPress={handleLogout} />
            <Text style={styles.heading}>Users 👤</Text>
            <View style={styles.form}>
                <TextInput style={styles.input} placeholder="Name" placeholderTextColor={"black"} onChangeText={text => setName(text)} value={name} />
                <TextInput style={styles.input} placeholder="Age" placeholderTextColor={"black"} onChangeText={text => setAge(text)} value={age} />
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
                        </View>
                    }
                    keyExtractor={item => item.id}
                />
            </View>
            {/* {users.map((us, index) => {
                return (
                    <View style={{ height: 200, width: 200, backgroundColor: "black" }}>
                        <Text style={{ color: "white", fontSize: 20 }}>{us.name}</Text>
                    </View>
                )
            })} */}
        </View>
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
        width: 100,
        backgroundColor: "black",
        gap: 5
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