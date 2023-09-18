import { StyleSheet, Text,Image, TouchableOpacity, View, ActivityIndicator, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, SIZES } from "../constants";
import { Ionicons, SimpleLineIcons } from '@expo/vector-icons';
import styles from './cart.style';
import fetchCart from '../hook/fetchCart';
import { FlatList } from 'react-native-gesture-handler';
import CartTile from '../components/cart/cartTile'

const Cart = ({navigation}) => {
  const  {data, loading, error, refetch} = fetchCart();
  const [selected, setSelected] = useState(null);
  const [select, setSelect] = useState(false);
  console.log(selected);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleRow}>
      <TouchableOpacity onPress={()=> navigation.goBack()}>
        <Ionicons
        name='chevron-back-circle'
        size={30}
        color={COLORS.primary}
        />
      </TouchableOpacity>
       <Text style={styles.titletxt}>Cart</Text>
      </View>

      {loading ? (
      <ActivityIndicator/>)
      : (
      <FlatList
       data={data}
       keyExtractor={(item) => item._id}
       renderItem={({item}) => (
        <CartTile
         item={item} 
         onPress={()=>{
          setSelect(!select),setSelected(item)
        }}
         select={select}
         />
       )} 
      />
      )}

      {select === false ? (<View></View>)
      : (
      <Button title={'Checkout'}
      isValid={select}
      onPress={()=> {}}
      />)}

     </SafeAreaView>
  )
}

export default Cart

