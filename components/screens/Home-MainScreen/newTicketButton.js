import {Text, StyleSheet, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';

export const NewTicketButton = props => {
  const navigation = useNavigation();
  return (
    <Pressable
      className=" bg-violet-950 rounded-lg justify-end items-center  m-4 "
      onPress={() => navigation.navigate('New Ticket')}>
      <Text className="text-white text-2xl">+</Text>
    </Pressable>
  );
};

