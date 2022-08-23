import React, { useState } from 'react';
import { Button, SafeAreaView, StyleSheet, View, Text } from 'react-native';

import appsFlyer from 'react-native-appsflyer';

const appsFlyerConfig = { devKey: 'PzDgXnZAx86MZNrd7hJmXD', isDebug: true };
appsFlyer.initSdk(appsFlyerConfig, (response) => console.log('init response: ' + response), (error) => console.error('init error: ' + error));

const App = () => {
	const [message, setMessage] = useState();

	const selectRandomFromArray = (array) => {
		const randomIndex = Math.floor(Math.random() * array.length);
		return array[randomIndex];
	}

	const handleResponse = (response) => {
		setMessage(response);
		console.log('response: ' + response);
		setTimeout(() => setMessage(null), 2500);
	}

	const generateLog = () => {
		const eventNamesList = ['login', 'add_to_cart', 'purchase', 'add_to_wishlist', 'share', 'search', 'rate', 'open_app', 'logout', 'discard_cart'];
		const platformsList = ['android', 'ios', 'windows', 'macos', 'linux'];
		const usersList = ['kshitij', 'samrat', 'sankalp', 'parth', 'ishant', 'akhil', 'aryan', 'shashank', 'shalin', 'alou'];
		const isPro = [true, false];
		const appVersionsList = [2.0, 2.1, 3.0];

		const eventName = selectRandomFromArray(eventNamesList);
		const eventValues = { platform: selectRandomFromArray(platformsList), user: selectRandomFromArray(usersList), isProAccount: selectRandomFromArray(isPro), appVersion: selectRandomFromArray(appVersionsList) };

		appsFlyer.logEvent(eventName, eventValues, (response) => handleResponse(response), (error) => handleResponse(error));
	}

  	return (
    	<SafeAreaView style={styles.container}>
			<Button title="Generate Event Log" onPress={generateLog}/>
			{
				message && 
				<View style={styles.messageBox}>
					<Text style={styles.messageBoxText}>{message}</Text>
				</View>
			}
    	</SafeAreaView>
  	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},

	messageBox: {
		backgroundColor: '#000000',
		padding: 10,
		borderRadius: 4,

		justifyContent: 'center',
		alignItems: 'center',

		position: 'absolute',
		bottom: 32,
	},

	messageBoxText: {
		color: '#FFFFFF',
		fontSize: 16,
	},
});

export default App;
