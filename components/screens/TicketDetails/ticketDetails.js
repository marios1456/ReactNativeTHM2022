import { ScrollView, View, Text, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SelectedTicketPics } from './SelectedTicketPicture';
import { Data } from '../../ConectionToAsyncStorage.js';
import { useState } from 'react';

export function TicketDetails({user}) {
  let data = new Data();
  const route  = useRoute();
  const [ticketData, setTicketData] = useState(route.params.data)
  const navigation = useNavigation();
  // Delete Process
  const ticketDeleteRequest = async () => {
    await data.deleteTicket(route.params.id);
    navigation.navigate('Ticket System');
  };

  const deleteAlert = () =>
    Alert.alert('Delete', 'Are you sure you want to delete the current tast?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {text: 'Yes', onPress: () => ticketDeleteRequest()},
    ]);

  const update = () =>{
    navigation.setOptions
    navigation.navigate('New Ticket', {ticketForUpdate: ticketData, setTicketData, id: route.params.id})
  }

  return (
    <ScrollView className="rounded-t-lg m-2 bg-violet-200 p-5 ">
      <View className="justify-center items-center">
        <Text className="h-9 text-4xl pl-1 ">{ticketData.title}</Text>
      </View>

      <Text className="  h-9 text-xl p-1  ">Description:</Text>
      <Text className="  text-lg p-1 mb-5 ">
        {ticketData.decription}
      </Text>

      <SelectedTicketPics pictureUris={ticketData.pictureUris} />

      <View className="  h-9 text-lg pl-1 mt-3 mb-2 ">
        <Text className="text-base">
          created by: {ticketData.author},{' '}
        </Text>
        <Text className="text-base">
          Importance: {ticketData.importance}
        </Text>
      </View>

      {user.admin && <TouchableOpacity
        className="bg-violet-950 rounded-lg mt-4 justify-center items-center  h-10 "
        onPress={deleteAlert}>
        <Text className="text-white ">Delete</Text>
      </TouchableOpacity>}

      <TouchableOpacity className="bg-violet-950 rounded-lg mt-2 mb-7 justify-center items-center h-10 "
        onPress={update}>
        <Text className="text-white ">Update</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
