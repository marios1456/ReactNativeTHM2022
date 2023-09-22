import React, {useState} from 'react';
import {
  TouchableOpacity,
  Text,
  TextInput,
  Alert,
  ScrollView,
  View,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useRoute } from '@react-navigation/native';
import { Camera } from './Camera.js';
import { Data } from '../../ConectionToAsyncStorage.js';

export const NewTicketForm = ({user, setUser}) => {
  const route  = useRoute();
  const [title, setTitle] = useState(route.params ? (route.params.ticketForUpdate.title) : (""));
  const [decription, setDecription] = useState(route.params ? (route.params.ticketForUpdate.decription) : (""));
  const [importance, setImportance] = useState(route.params ? (route.params.ticketForUpdate.importance) : ('Normal'));
  const [pictureUris, setPictureUris] = useState(route.params ? (route.params.ticketForUpdate.pictureUris) : ([]));

  let data = new Data();

  const handleSubmit = async() => {
    if (title.trim() === '') {
      Alert.alert('Error', 'Please fillout atleast the title field');
    } else if (route.params === undefined || route.params === null) {
      let newTicket = {
        title: title,
        decription: decription,
        importance: importance,
        pictureUris: pictureUris,
        author: user.username,
      };
      data.addTicket(newTicket);
      Alert.alert('Success');
    } else {
      let updatedTicket = {
        title: title,
        decription: decription,
        importance: importance,
        pictureUris: pictureUris,
        author: user.username,
      };
      await data.updateTicket(route.params.id, updatedTicket);
      route.params.setTicketData(updatedTicket)
      Alert.alert('Success');
    }
  };

  return (
    <ScrollView className="p-2 bg-gray-100">
      <TextInput
        className="m-1 pl-4 text-base border-2 rounded-lg text-black border-gray-300"
        placeholder="Title "
        placeholderTextColor={'black'}
        value={title}
        onChangeText={text => setTitle(text)}
      />
      <TextInput
        multiline
        className=" m-1 pl-4 text-base border-2 rounded-lg text-black border-gray-300"
        placeholder="Problem description"
        placeholderTextColor={'black'}
        value={decription}
        onChangeText={text => setDecription(text)}
      />
      <View className=" m-1 text-base border-2 rounded-lg border-gray-300">
        <Picker
          selectedValue={importance}
          onValueChange={itemValue => setImportance(itemValue)}>
          <Picker.Item label="Very Important" value="Very Important" />
          <Picker.Item label="Important" value="Important" />
          <Picker.Item label="Normal" value="Normal" />
        </Picker>
      </View>

      <Camera pictureUris={pictureUris} setPictureUris={setPictureUris} />

      <TouchableOpacity
        onPress={handleSubmit}
        className="bg-violet-950 rounded-lg  mb-8 justify-center items-center h-10 ml-2 mr-2">
        <Text className="text-white text-lg font-medium ">Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

