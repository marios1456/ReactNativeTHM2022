import {Image, Text, View, TouchableOpacity} from 'react-native';

export const Header = ({user, setUser}) => {
  return (
    <View className="bg-violet-950 h-16 rounded-b-lg flex flex-row">
      <Text className="text-4xl text-white p-2 mt-1 ">Ticket System</Text>
      { user && 
        <TouchableOpacity className="m-3"  onPress={() => setUser(null)}>
          <Image
            className="w-10  h-10 ml-28  "
            source={require('./Images/logout2.png')}></Image>
        </TouchableOpacity>
      }
    </View>
  );
};
