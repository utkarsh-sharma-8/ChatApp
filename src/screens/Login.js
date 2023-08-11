import React,{useState} from 'react';
import {Text,View,TextInput,StyleSheet,TouchableOpacity,Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import uuid from'react-native-uuid';
import Loader from '../components/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Main from './Main';

const Login=()=>{
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [visible,setVisible]=useState(false)
    const navigation=useNavigation();
    const loginUser=()=>{
        setVisible(true);
        firestore().collection("users").where("email","==",email).get().then(res=>{
            setVisible(false);
            if(res.docs!==[]){
            console.log(JSON.stringify(res.docs[0].data()));
            gotoNext(res.docs[0].data().name,res.docs[0].data().email,res.docs[0].data().userId)
            }else{
                Alert.alert('user not Found');
            }
        })
        .catch(error=>{
            setVisible(false);
            console.log(error);
            Alert.alert('User not found');
        });
    };
const gotoNext=async(name,email,userId)=>{
    await AsyncStorage.setItem('NAME',name);
    await AsyncStorage.setItem('EMAIL',email);
    await AsyncStorage.setItem('USERID',userId);
    navigation.navigate("Main");
};
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>

            <TextInput placeholder='Enter Email'
             placeholderTextColor="black"
             style={[styles.input,{marginTop:100}]}
             value={email}
             onChangeText={text=>setEmail(text)}/>

            <TextInput placeholder='Enter Password'
            placeholderTextColor="black"
            style={[styles.input,{marginTop:10}]}
            secureTextEntry={true}
            value={password}
            onChangeText={text=>setPassword(text)}/>

            <TouchableOpacity style={styles.btn} onPress={()=>{loginUser()}}>
                <Text style={styles.btnText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{navigation.navigate('SignUp')}}>
                <Text style={styles.orLogin}>Or SignUp</Text>
            </TouchableOpacity>
            <Loader visible={visible}/>
        </View>
    );
};

export default Login;

const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white',
    },
    title:{
        fontSize: 30,
        color:'black',
        alignSelf:"center",
        marginTop:100,
        fontWeight:"bold",
    },
    input:{
        width:"90%",
        height:50,
        borderWidth:2,
        borderRadius:10,
        alignSelf:"center",
        paddingLeft:20,
    },
    btn:{
        width:"90%",
        alignItems:"center",
        marginTop:50,
        backgroundColor:"blue",
        height:50,
        alignSelf:"center",
        justifyContent:"center",
        borderRadius:20,
        borderWidth:1
    },
    btnText:{
        fontSize:20,
        alignSelf:"center",
        justifyContent:"center",
        color:"white",
    },
    orLogin:{
        alignSelf:'center',
        marginTop:50,
        fontSize:20,
        textDecorationLine:"underline",
    }
});