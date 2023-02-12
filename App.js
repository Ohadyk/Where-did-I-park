import { Text, View } from "react-native";
import { useEffect } from "react";
import SplashScreen from "react-native-splash-screen";

const App = () => {

    useEffect(() => {
        SplashScreen.hide();
    }, [])

    return(
        <View style={{display: 'flex', alignItems: 'center'}}>
            <Text style={{color: 'black', fontSize: 30}}>Init App</Text>
        </View>
    )
}

export default App;
