import { TouchableOpacity, Text, View,Image } from 'react-native'
import React from 'react'
import styles from './productCardView.style'
import {Ionicons} from "@expo/vector-icons"
import { COLORS } from '../../constants'
import { useNavigation } from '@react-navigation/native'

const ProductCardView = () => {
    const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate("ProductDetails")}>
        <View style={styles.container}>
           <View style={styles.imagesContainer}>
            <Image
            source={{uri:"https://www.missafir.com/wp-content/uploads/2022/11/renk-min-scaled.jpg"}}
            style={styles.image}
            />
           </View>
           <View style={styles.details}>
           <Text style={styles.title} numberOfLines={1}>Product hsgsdh</Text>
           <Text style={styles.supplier} numberOfLines={1}>Product</Text>
           <Text style={styles.price}>$2500</Text>
           </View>
           <TouchableOpacity style={styles.addBtn}>
                <Ionicons name="add-circle" size={35} color={COLORS.primary} />
           </TouchableOpacity>
        </View>
    </TouchableOpacity>
  )
}

export default ProductCardView
