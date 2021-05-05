import React from "react";
import { Dimensions } from "react-native";
import { View, Image, Alert, KeyboardAvoidingView } from "react-native";
import { Button, Input, Icon } from "react-native-elements";

import colours from "../../config/colours";

import AppController from "../controllers/AppController";

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [passwordHidden, setPasswordHidden] = React.useState(true);

    async function handleSubmit() {
        try {
            await AppController.userController.signIn(email, password);
            navigation.navigate("Home");
        } catch (error) {
            Alert.alert("Log In Error", error.message);
        }
    }

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
                    style={{ backgroundColor: colours.grey }}
                    label={"EMAIL"}
                    placeholder={"email@provider.com"}
                    value={email}
                    onChangeText={(value) => setEmail(value)}
                    autoCapitalize={"none"}
                />
                <Input
                    style={{ backgroundColor: colours.grey }}
                    label={"PASSWORD"}
                    placeholder={"MyPassword"}
                    value={password}
                    onChangeText={(value) => setPassword(value)}
                    secureTextEntry={passwordHidden}
                    rightIcon={
                        <Icon
                            type="material"
                            name={
                                passwordHidden ? "visibility" : "visibility-off"
                            }
                            onPress={() => setPasswordHidden(!passwordHidden)}
                        />
                    }
                />
            </KeyboardAvoidingView>
            <Button
                containerStyle={{ margin: 16 }}
                buttonStyle={{
                    backgroundColor: colours.primary,
                }}
                onPress={handleSubmit}
                titleStyle={{
                    fontSize: 20,
                    color: "white",
                }}
                title={"LOG IN"}
            />
        </View>
    );
}
