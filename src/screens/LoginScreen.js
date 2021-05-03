import React from 'react';
import {
    View,
    StyleSheet,
    Image,
    Text,
    Alert,
    TouchableOpacity,
    TextInput
} from 'react-native';
import {
    useForm,
    Controller
} from 'react-hook-form';

import colours from "../../config/colours";

function LoginScreen(props) {
    const { control, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);

    return (
        <View style={styles.background}>
            <Image style={styles.logo} source={require("../../assets/logo.png")} />
            <View>
                <Controller
                    control = {control}
                    render = { ({ field: { onChange, onBlur, value } }) => (
                        <TextInput 
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={value => onChange(value)}
                            value={value}
                        />
                    )}
                    name="email"
                    rules={{ required: true}}
                    defaultValue=""
                />
                {errors.email && <Text>This is required.</Text>}

                <Controller
                    control = {control}
                    render = { ({ field: { onChange, onBlur, value } }) => (
                        <TextInput 
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={value => onChange(value)}
                            value={value}
                        />
                    )}
                    name="password"
                    rules={{ required: true}}
                    defaultValue=""
                />
                {errors.password && <Text>This is required.</Text>}
            </View>
            <TouchableOpacity style={styles.loginButton} onPress={handleSubmit(onSubmit)}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: colours.background,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    loginButton: {
        width: '100%',
        height: 70,
        backgroundColor: colours.primary,
        justifyContent: "center"
    },
    logo: {
        width: 195,
        height: 195,
        position: 'absolute',
        top: 120
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        textTransform: 'uppercase'
    }
})

export default LoginScreen;