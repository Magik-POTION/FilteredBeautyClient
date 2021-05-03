import React from 'react';
import {
    View,
    StyleSheet,
    Image,
    Text,
    TouchableOpacity,
    TextInput
} from 'react-native';
import { Formik } from 'formik';

import colours from "../../config/colours";

function LoginScreen(props) {

    return (
        <View style={styles.background}>
            <Formik
                intialValues={{ username: '', password: ''}}
                onSubmit={(values) => {
                    console.log(values);
                }}
            >
                {(props) => (
                    <View>
                        <TextInput
                            placeholder="email@email.com"
                            onChangeText={props.handleChange('username')}
                            value={props.values.username}
                        />
                        <TextInput
                            placeholder="password"
                            onChangeText={props.handleChange('password')}
                            value={props.values.password}
                        />
                        <TouchableOpacity style={styles.loginButton} onPress={() => props.handleSubmit}>
                            <Text style={styles.buttonText}>Login</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </Formik>
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