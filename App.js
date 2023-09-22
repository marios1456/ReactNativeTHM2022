import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import { LoginForm } from './components/screens/Login/loginForm';
import { HomeScreen }  from "./components/screens/Home-MainScreen/HomeScreen.js";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TicketDetails } from "./components/screens/TicketDetails/ticketDetails.js";
import { NewTicketForm } from './components/screens/NewTicket/newTicketForm.js';
import { Header } from './components/header.js';
const InsideStack = createNativeStackNavigator();

const Stack = createStackNavigator();
export default function App() {
  const [user, setUser] = useState(null);
  

  useEffect(()=>{
    console.log(user);

  }, [user])

  return (
    <NavigationContainer >
      <Header user={user} setUser ={setUser}/>
      <Stack.Navigator  screenOptions={{headerLeft: null, headerShown: false}} initialRouteName='Login' >
        {user ? (  
        <Stack.Group >
          <InsideStack.Screen name="Ticket System" component={HomeScreen} 
            options={{
              cardStyle: {backgroundColor: 'white'},
              animationEnabled: true,
              cardOverlayEnabled: true,
              }}/>
            <InsideStack.Screen name="Ticket Details"  children={() => <TicketDetails user={user} />}
            options={{
              cardStyle: {backgroundColor: 'white'},
              animationEnabled: true,
              cardOverlayEnabled: true,
            }}/>
            <InsideStack.Screen name="New Ticket" children={() => <NewTicketForm user={user} setUser={setUser} />}
            options={{
              cardStyle: {backgroundColor: 'white'},
              animationEnabled: true,
              cardOverlayEnabled: true,
            }}/>
        </Stack.Group>   
        ) : (
        <Stack.Screen name="Login" children={() => <LoginForm user={user} setUser={setUser} />}  
        // initialParams={{ user: user }}
        options={{
          cardStyle: {backgroundColor: 'white'},
          animationEnabled: true,
          cardOverlayEnabled: true,            
          }}/>)}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
