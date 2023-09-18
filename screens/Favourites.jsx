import {
  SafeAreaView,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./favorites.style";
import { COLORS, SIZES } from "../constants";
import { Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import { FlatList } from "react-native-gesture-handler";

const Favourites = ({ navigation }) => {
  const [favData, setFavData] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem("favorites")
      .then((res) => {
        const favorites = JSON.parse(res) || []; // Parse the stored favorites or initialize as an empty array if it doesn't exist
        setFavData(favorites);
      })
      .catch((error) => {
        console.error("Error checking if item is liked:", error);
      });
  }, []);

  const checkFavorites = async () => {
    const id = await AsyncStorage.getItem("id");
    const favoritesId = `favorites${JSON.parse(id)}`;

    try {
      const favoritesObj = await AsyncStorage.getItem(favoritesId);
      if (favoritesObj !== null) {
        const favorites = JSON.parse(favoritesObj);
        const favList = Object.values(favorites);
        setFavData(favList);
        console.log(favList.length);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteFavorites = async (productId) => {
    try {
      const favorites = await AsyncStorage.getItem("favorites");
      let favoritesArray = JSON.parse(favorites) || [];

      // Find the index of the item to be deleted
      const indexToDelete = favoritesArray.findIndex(
        (item) => item._id === productId
      );

      if (indexToDelete !== -1) {
        // Remove the item from the favorites array
        favoritesArray.splice(indexToDelete, 1);

        // Update AsyncStorage with the updated favorites array
        await AsyncStorage.setItem("favorites", JSON.stringify(favoritesArray));

        // Update the state to reflect the changes
        setFavData(favoritesArray);
      }
    } catch (error) {
      console.error("Error deleting favorite:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name="chevron-back-circle"
            size={30}
            color={COLORS.primary}
          />
        </TouchableOpacity>
        <Text style={styles.titletxt}>Favorites</Text>
      </View>

      <FlatList
        data={favData}
        renderItem={({ item }) => (
          <View style={styles.favContainer}>
            <View style={styles.imageContainer}>
              <Image source={{ uri: item.imageUrl }} style={styles.image} />
            </View>

            <View style={styles.textContainer}>
              <Text style={styles.fav}>{item.title}</Text>
              <Text style={styles.supplier}>{item.supplier}</Text>
              <Text style={styles.supplier}>{item.price}</Text>
            </View>
            <TouchableOpacity onPress={() => deleteFavorites(item._id)}>
              <SimpleLineIcons name="trash" size={24} color={COLORS.red} />
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>
  );
};

export default Favourites;
