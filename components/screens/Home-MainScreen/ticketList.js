import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { Data } from "../../ConectionToAsyncStorage.js"


export const TicketList = (props) => {
    const navigation = useNavigation();
    let data = new Data();
    const [ttickets, setTtickets] = useState(null)
    const [ticketIDs, setTticketIDs] = useState(null)

    const extractIDsFromTickets = obj => {
        const res = [];
        for(key in obj){
            res.push(key);
        };
        return res;
     };

    useFocusEffect(
        React.useCallback(() => {
            data.getTickets().then((result) => {
                delete(result.nextID)
                setTticketIDs(extractIDsFromTickets(result))
                setTtickets(Object.values(result))
            })
        }, [])
      );

    return <View  className=" m-2 ">
        {ttickets ?
        (ttickets.map((ticket, key) => (
            <TouchableOpacity onPress={() => navigation.navigate('Ticket Details', {data: ticket, id: ticketIDs[key]})} 
                className="w-full " key={key} activeOpacity={0.8}>
                <View className="bg-violet-200 m-1 rounded-lg pl-2 pb-1 border-2  border-gray-400" >
                    <Text style={ticketStyles.ticketTitle}>{ticket.title}</Text>
                    <Text style={ticketStyles.ticketDescription}>{ticket.decription}</Text>
                </View>
            </TouchableOpacity>
            ))): (
            <Text style={ticketStyles.ticketTitle}>Data is loading...</Text>)}
        </View>
  }

export const ticketStyles = StyleSheet.create({

    ticketTitle:{
        fontSize: 40,
        color: "#444444"
    },
    ticketDescription:{
        fontSize: 16,
        color: "#444444"
    }
  });


