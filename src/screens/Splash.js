import React,{useEffect} from 'react';
import {Text,View,StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Splash=()=>{
    const navigation=useNavigation();
    useEffect(()=>{
    setTimeout(()=>{
       checkLogin();
    },3000)
    },[]);
    const checkLogin=async()=>{
        const id=await AsyncStorage.getItem("USERID");
        if(id!==null){
        navigation.navigate("Main")
        }else{
            navigation.navigate("Login");
        }
    }
    return (
        <View style={styles.container}>
            <Text style={styles.logo}>{"Firebase Chat\nApp"}</Text>
        </View>
    );
};

export default Splash;


const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"purple",
        justifyContent:'center',
        alignItems:'center',
    },
    logo:{
        fontSize:30,
        color:'white',
        textAlign:'center',

    },
});