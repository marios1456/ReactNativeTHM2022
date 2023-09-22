import { Dimensions, SafeAreaView, View } from "react-native"
import { Carousel } from "react-native-snap-carousel";
import FastImage from "react-native-fast-image";
import { useState } from 'react';
import React from 'react'


export const SelectedTicketPics = (props) => {
    const isCarousel = React.useRef(null)

    const splitKeyValue = obj => {
        const res = [];
        for(key in obj){
            res.push({
                [key]: obj[key] 
            });
        };
        return res;
     };

    let [images, setImages]= useState(splitKeyValue(Object.assign({}, props.pictureUris)))

    return (
    <SafeAreaView style={{alignItems:"center", alignContent:"center"}}>
        <Carousel
                data={images}
                renderItem={({item, index}) =>{
                    return (<View style={{alignItems:"center", alignContent:"center"}}>
                            <FastImage
                            source={{ uri: item[index] }}
                            style={{width: "80%", height:400}}/>
                        </View>)
                }}
                sliderWidth={Dimensions.get("screen").width}
                itemWidth={400}
            />

    </SafeAreaView>)
}