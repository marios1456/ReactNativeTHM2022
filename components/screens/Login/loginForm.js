import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Alert, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { Data } from "../../ConectionToAsyncStorage.js"

export const LoginForm =  ({user, setUser}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [timesPressedHiddenArea, setTimesPressedHiddenArea] = useState(0);

  let data = new Data();

  const signIn = async () => {
    setLoading(true);
    
    let myuser = {username:username, password: password}
    data.loginUser(myuser).then((result) => {
      if(result){
        setUser(result);
        Alert.alert("Success")
      }else{
        Alert.alert("The compination of Username and Password does not belong to a user")
      }
      setLoading(false);
    });
  };

  const signUp = async(admin) => {
    setLoading(true);

    let newUser = {username:username, password: password, admin:false};
    if (admin){
      newUser = {username:username, password: password, admin:true};
    }
    data.addUser(newUser).then((result) => {
      if (result) {
        Alert.alert("Success");
      } else {
        Alert.alert("User with this username already exists");
      }
      setLoading(false);
    });
  };

  return (
    <View style={{padding: 16}}>
      <TextInput
        style={newTicketForm.input}
        placeholder="Username"
        value={username}
        onChangeText={text => setUsername(text)}
      />
      <TextInput
        style={newTicketForm.input}
        placeholder="Passwort"
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry={true}
      />
      {loading ? <ActivityIndicator size={'large'} color={"#0000ff"}/>:
      <>
          <TouchableOpacity
            onPress={signIn}
            className="bg-violet-950 rounded-lg  mb-1 justify-center items-center h-10 ">
            <Text className="text-white text-lg font-medium ">Login</Text>
          </TouchableOpacity>        
          <TouchableOpacity
            onPress={() => signUp(false)}
            className="bg-violet-950 rounded-lg mb-1 mt-1 justify-center items-center h-10 ">
            <Text className="text-white text-lg font-medium ">Sign Up</Text>
          </TouchableOpacity>
          {(timesPressedHiddenArea > 6) && 
          <TouchableOpacity
            onPress={() => signUp(true)}
            className="bg-violet-950 rounded-lg   mt-1 justify-center items-center h-10 ">
            <Text className="text-white text-lg font-medium ">Sign Up as Admin</Text>
          </TouchableOpacity>
          }
      </>
      }
      <TouchableOpacity style={newTicketForm.hiddenButton} onPress={()=> setTimesPressedHiddenArea(timesPressedHiddenArea +1)}>
        <Text></Text>
      </TouchableOpacity>
    </View>
  );
};

  
  const newTicketForm = StyleSheet.create({
    input: {
      padding: 10,
      borderWidth: 2,
      borderColor: '#ccc',
      borderRadius: 7,
      fontSize: 16,
      color: '#333',
      marginBottom: 16
    },
    hiddenButton: {
      alignItems: 'center',
      padding: 10,
      height: "70%"
    }
  });
