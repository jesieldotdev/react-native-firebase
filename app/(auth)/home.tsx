import { getApp } from '@react-native-firebase/app';
import { FirebaseAuthTypes, getAuth } from '@react-native-firebase/auth';
import { useEffect, useState } from "react";
import { Button, Image, Text, View } from "react-native";

const Page = () => {
    const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

    useEffect(() => {
        const app = getApp();
        const authInstance = getAuth(app);
        const subscriber = authInstance.onAuthStateChanged(setUser);
        return subscriber;
    }, []);

    const handleSignOut = () => {
        const app = getApp();
        const authInstance = getAuth(app);
        authInstance.signOut();
    };

    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#1D3D47', // Dark background color
            padding: 20,
        }}>
            <Text style={{
                color: '#FFF',
            }}>Welcome back {user?.email}</Text>
            <Text style={{
                color: '#FFF',
            }}>{user?.displayName}</Text>
            
            {
                user?.photoURL ? (
                    <Image
                        source={{ uri: user.photoURL }}
                        style={{ width: 100, height: 100, borderRadius: 50, marginTop: 10 }}
                    />
                ) : (
                    <Text style={{ color: '#FFF', marginTop: 10 }}>No profile picture</Text>
                )
            }

            <Button
                title="Sign Out"
                onPress={handleSignOut} />
        </View>
    )
}

export default Page;