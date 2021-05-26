import React from "react";
import { View, Image, Alert, KeyboardAvoidingView, Dimensions } from "react-native";
import { Button, Input, Icon } from "react-native-elements";

import colours from "../../config/colours";

import AppService from "../services/AppService";

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [passwordHidden, setPasswordHidden] = React.useState(true);

    async function handleSubmit() {
        try {
            await AppService.userController.signIn(email, password);
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
                    leftIcon={
                        <Icon
                            name='email'
                            size={24}
                            color={colours.primary}
                        />
                    }
                    style={{ backgroundColor: 'lavender', borderRadius: 10, marginRight: 24 }}
                    labelStyle={{ marginBottom: 5 }}
                    label={"EMAIL"}
                    placeholder={" email@provider.com"}
                    value={email}
                    onChangeText={(value) => setEmail(value)}
                    autoCapitalize={"none"}

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
                    labelStyle={{ marginBottom: 5 }}
                    value={password}
                    onChangeText={(value) => setPassword(value)}
                    secureTextEntry={passwordHidden}
                    rightIcon={
                        <Icon
                            type="material"
                            color='lavender'
                            name={
                                passwordHidden ? "visibility" : "visibility-off"
                            }
                            onPress={() => setPasswordHidden(!passwordHidden)}
                        />
                    }
                />
            </KeyboardAvoidingView>
            <Button
                containerStyle={{ margin: 50, width: 'auto', height: 'auto' }}
                buttonStyle={{
                    backgroundColor: colours.primary,
                    borderRadius: 30,
                }}
                onPress={handleSubmit}
                titleStyle={{
                    fontSize: 20,
                    color: "white",
                    fontWeight: 'bold'
                }}
                title={"LOG IN"}
            />
        </View>
    );
}
