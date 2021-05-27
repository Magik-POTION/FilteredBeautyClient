import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
    View,
    Image,
    Dimensions,
    Alert,
    KeyboardAvoidingView,
} from "react-native";

import { Button, Input, Icon } from "react-native-elements";

import colours from "../../config/colours";
import AppService from "../services/AppService";

export default function SignupScreen() {
    const navigation = useNavigation();
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [passwordHidden, setpasswordHidden] = React.useState(true);

    const handleSubmit = async () => {
        try {
            await AppService.userController.signUp(email, password);
            navigation.navigate("Search")
            navigation.navigate("Profile");
        } catch (error) {
            Alert.alert("Sign Up Error", error.message);
        }
    };

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: colours.background,
            }}
        >
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Image
                    style={{
                        width: Dimensions.get("window").width * 0.5,
                        height: Dimensions.get("window").width * 0.5,
                    }}
                    source={require("../../assets/logo.png")}
                />
            </View>
            <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
                <Input
                    leftIcon={
                        <Icon
                            name='email'
                            size={24}
                            color={colours.primary}
                        />
                    }
                    style={{ backgroundColor: 'lavender', borderRadius: 10, marginRight: 24 }}
                    label={"EMAIL"}
                    placeholder={" email@provider.com"}
                    value={email}
                    onChangeText={(value) => setEmail(value)}
                    autoCapitalize={"none"}
                    keyboardType={"email-address"}
                />
                <Input
                    leftIcon={
                        <Icon
                            name='lock'
                            size={24}
                            color={colours.primary}
                        />
                    }
                    style={{ backgroundColor: 'lavender', borderRadius: 10, }}
                    label={"PASSWORD"}
                    placeholder={" MyPassword"}
                    keyboardType={"visible-password"}
                    value={password}
                    onChangeText={(value) => setPassword(value)}
                    secureTextEntry={passwordHidden}
                    rightIcon={
                        <Icon
                            color='lavender'
                            type={"material"}
                            name={
                                passwordHidden ? "visibility" : "visibility-off"
                            }
                            onPress={() => setpasswordHidden(!passwordHidden)}
                        />
                    }
                />
            </KeyboardAvoidingView>
            <Button
                containerStyle={{ margin: 50, width: 'auto', height: 'auto' }}
                buttonStyle={{
                    backgroundColor: colours.primary,
                    padding: 15,
                    borderRadius: 30,
                }}
                onPress={handleSubmit}
                titleStyle={{
                    fontSize: 20,
                    color: "white",
                }}
                title={"SIGN UP"}
            />
        </View>
    );
}
