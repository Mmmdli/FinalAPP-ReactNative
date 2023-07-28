import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SliderBox } from "react-native-image-slider-box";
import { COLORS } from '../../constants';

const Carousel = () => {
    const slides = [
     "https://images.squarespace-cdn.com/content/v1/58412fc9b3db2b11ba9398df/1639645106731-Y84BUSA53AUWCCTL9GQY/patrick-perkins-3wylDrjxH-E-unsplash.jpg?format=1000w",
      "https://www.missafir.com/wp-content/uploads/2022/11/renk-min-scaled.jpg",
      "https://izunex.com/wp-content/uploads/2020/11/izunex-oturma-odasi-tasarimlari-01-min.jpg",

    ]
  return (
    <View style={styles.carouselContainer}>
     <SliderBox images={slides}
     dotColor={COLORS.primary}
     inactiveDotColor = {COLORS.secondary}
     ImageComponentStyle = {{borderRadius: 15, width: "93%",marginTop:15}}
      autoplay
     circleLoop
     />
    </View>
  )
}

export default Carousel

const styles = StyleSheet.create({
    carouselContainer: {
        flex:1,
        alignItems:"center"
    }
})