import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  PermissionsAndroid,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

export const Camera = ({pictureUris, setPictureUris}) => {
  let options = {
    saveToPhotos: true,
    mediaType: 'photo',
  };

  const openCamera = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      const result = await launchCamera(options);
      setPictureUris([...pictureUris, result.assets[0].uri]);
    }
  };

  const openGallery = async () => {
    const result = await launchImageLibrary(options);
    setPictureUris([...pictureUris, result.assets[0].uri]);
  };

  return (
    <View className="w-full items-center">
      <View className="flex flex-row">
        <TouchableOpacity
          onPress={openCamera}
          className=" bg-violet-950 h-10 w-44 rounded-lg justify-center items-center m-3  ">
          <Text className="text-white font-medium text-base">Open Camera</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={openGallery}
          className=" bg-violet-950 h-10 w-44 rounded-lg justify-center items-center m-3  ">
          <Text className="text-white font-medium text-base">Open Gallery</Text>
        </TouchableOpacity>
      </View>
      <View>
        {pictureUris.map((pic, index) =>
          pic !== '' ? (
            <Image
              className="h-44 w-44 mt-5 mb-5 "
              source={{uri: pic}}
              key={pic}
            />
          ) : null,
        )}
      </View>
    </View>
  );
};
