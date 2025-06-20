import { Image } from 'expo-image';
import { ActivityIndicator, Button, KeyboardAvoidingView, StyleSheet, TextInput } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { FirebaseError } from '@firebase/util';
import auth from '@react-native-firebase/auth';
import { useState } from 'react';

export default function HomeScreen() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const signUp = async () => {
    setLoading(true);
    try {
      await auth().createUserWithEmailAndPassword(email, password);
      alert('Check your email for verification');
    } catch (e: any) {
      const err = e as FirebaseError;
      alert('Registration failed: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async () => {
    setLoading(true);
    try {
      await auth().signInWithEmailAndPassword(email, password);
      alert('Check your email for verification');
    } catch (e: any) {
      const err = e as FirebaseError;
      alert('Sign In failed: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>

      <ThemedView>
        <KeyboardAvoidingView behavior='padding'>
          <TextInput
            style={{ color: "#ffffff" }}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            autoCapitalize="none"
            keyboardType="email-address" />

          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            secureTextEntry
            autoCapitalize="none"
            style={{ marginTop: 8, color: "#ffffff"  }} />

          {
            loading ? (
              <ActivityIndicator
                size="large"
                color="#0000ff"
                style={{ marginTop: 16 }}
              />) : <><Button
                title="Login"
                onPress={signIn}
                disabled={loading}
              />

              <Button
                title="Create Account"
                onPress={signUp}
                disabled={loading}
              /></>
            
            }


        </KeyboardAvoidingView>
      </ThemedView>

    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
