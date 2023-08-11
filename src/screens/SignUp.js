import React,{useState} from 'react';
import {Text,View,TextInput,StyleSheet,TouchableOpacity,Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import uuid from'react-native-uuid';

const SignUp=()=>{
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [mobile,setMobile]=useState('');
    const [password,setPassword]=useState('');
    const [confirmPassword,setConfirmPassword]=useState('');
    const navigation=useNavigation();

const registerUser=()=>{
    const userId=uuid.v4()
        firestore().collection("users").doc(userId).set({
            name:name,
            email:email,
            password:password,
            mobile:mobile,
            userId:userId,
        }).then(res=>{
            console.log("User Created");
            navigation.navigate("Login");
        }).catch(error=>{
            console.log(error);
        });
    };
    const validate=()=>{
        let isValid=true;
        if(name==""){
            isValid=false;
        }
        if(email==""){
            isValid=false;
        }
        if(mobile==""){
            isValid=false;
        }
        if(password==""){
            isValid=false;
        }
        if(confirmPassword==""){
            isValid=false;
        }
        if(confirmPassword!==password){
            isValid=false;
        }
        return isValid;
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>SignUp</Text>
            <TextInput placeholder='Enter Name'
            placeholderTextColor="black"
            value={name}
            onChangeText={text=>setName(text)}
            style={[styles.input,{marginTop:50}]}/>

            <TextInput placeholder='Enter Email'
             placeholderTextColor="black"
             style={[styles.input,{marginTop:10}]}
             value={email}
             onChangeText={text=>setEmail(text)}/>

            <TextInput placeholder='Enter Mobile No.'
            placeholderTextColor="black"
            style={[styles.input,{marginTop:10}]}
            keyboardType={'number-pad'}
            value={mobile}
            onChangeText={text=>setMobile(text)}/>

            <TextInput placeholder='Enter Password'
            placeholderTextColor="black"
            style={[styles.input,{marginTop:10}]}
            secureTextEntry={true}
            value={password}
            onChangeText={text=>setPassword(text)}/>

            <TextInput placeholder='Confirm Password'
            placeholderTextColor="black"
            style={[styles.input,{marginTop:10}]}
            secureTextEntry={true}
            value={confirmPassword}
            onChangeText={text=>setConfirmPassword(text)}
            />

            <TouchableOpacity style={styles.btn} onPress={()=>{
                if(validate()){
                    registerUser();
                }else{
                    Alert.alert("Please Enter correct Data");
                }
            }}>
                <Text style={styles.btnText}>Signup</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{navigation.navigate('Login')}}>
                <Text style={styles.orLogin}>Or Login</Text>
            </TouchableOpacity>
        </View>
    );
};

export default SignUp;

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