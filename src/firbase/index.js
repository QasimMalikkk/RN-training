
import { firebase } from "@react-native-firebase/firestore"

export const writeData = async ({collection,data}) => {
    console.log("writeData function called");

    try {
      await firebase.firestore().collection(collection).add(data);
      console.log("Data successfully written!");
    } catch (error) {
      console.log("Error writing data:", error.message);
    }
  };


// export default writeData