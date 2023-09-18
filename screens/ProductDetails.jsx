import {
  Text,
  TouchableOpacity,
  View,
  Image,
  SafeAreaView,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import {
  Fontisto,
  Ionicons,
  MaterialCommunityIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import styles from "./productDetails.style";
import { COLORS, SIZES } from "../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import WebView from "react-native-webview";
// import AddToCart from '../hook/AddToCart'

const ProductDetails = ({ navigation }) => {
  const route = useRoute();
  const { item } = route.params;
  const [count, setCount] = useState(1);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [favorites, setFavorites] = useState(1);
  const [paymentUrl, setPaymentUrl] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  useEffect(() => {
    AsyncStorage.getItem("favorites")
    .then((res) => {
      const favorites = JSON.parse(res) || []; // Parse the stored favorites or initialize as an empty array if it doesn't exist
      const isItemLiked = favorites.some((i) => item._id === i._id); // Check if the item with the given ID exists in favorites
  
      setIsLiked(isItemLiked); // Set the isLiked state based on whether the item is in favorites
    })
    .catch((error) => {
      console.error("Error checking if item is liked:", error);
    });
  
    checkUser();
    checkFavorites();
  }, []);

  const checkUser = async () => {
    try {
      const id = AsyncStorage.getItem("id");
      if (id !== null) {
        setIsLoggedIn(true);
        console.log(isLoggedIn);
      } else {
        console.log("user not logged in");
      }
    } catch (error) {}
  };

  const createCheckOut = async () => {
    const id = await AsyncStorage.getItem("id");

    const response = await fetch("", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        userId: JSON.parse(id),
        cartItems: [
          {
            name: item.title,
            id: item._id,
            price: item.price,
            cartQuantity: count,
          },
        ],
      }),
    });
    const { url } = await response.json();
    setPaymentUrl(url);
  };

  const onNavigationStateChange = (webViewState) => {
    const { url } = webViewState;
    if (url && url.include("checkout-success")) {
      Alert.alert(
        "Payment Successful",
        "You can go ahead and check your order status",
        [
          {
            text: "Back",
            onPress: () => navigation.navigate("Bottom Navigation"),
          },
          {
            text: "Continue",
            onPress: () => navigation.navigate("Orders"),
          },
          { defaultIndex: 1 },
        ]
      );
    } else if (url && url.include("cancel")) {
      Alert.alert("Payment failed", "Please retry to make the payment", [
        {
          text: "Back",
          onPress: () => navigation.navigate("Bottom Navigation"),
        },
        {
          text: "Retry",
          onPress: () => navigation.goBack(),
        },
        { defaultIndex: 1 },
      ]);
    }
  };

  const addToFavorites = async () => {
    try {
      const favorites =
        (await JSON.parse(await AsyncStorage.getItem("favorites"))) || [];
      console.log(favorites);
      const existItemIndex = favorites.findIndex((fav) => fav._id === item._id);

      if (existItemIndex !== -1) {
        // If the item exists in favorites, remove it
        favorites.splice(existItemIndex, 1);
        setIsLiked(false)
      } else {
        // If the item doesn't exist in favorites, add it
        favorites.push(item);
        setIsLiked(true)

      }

      await AsyncStorage.setItem("favorites", JSON.stringify(favorites));
    } catch (error) {
      console.error("Error adding to favorites:", error);
    }
  };

  const handlePress = () => {
    if (isLoggedIn === false) {
      navigation.navigate("Login");
    } else {
      addToFavorites();
    }
  };

  const handleBuy = () => {
    if (isLoggedIn === false) {
      navigation.navigate("Login");
    } else {
      createCheckOut();
    }
  };

  const handleCart = () => {
    if (isLoggedIn === false) {
      navigation.navigate("Login");
    } else {
      AddToCart(item._id, count);
    }
  };

  const checkFavorites = async () => {
    const id = await AsyncStorage.getItem("id");
    const favoritesId = `favorites${JSON.parse(id)}`;

    console.log(favoritesId);

    try {
      const favoritesObj = await AsyncStorage.getItem(favoritesId);
      if (favoritesObj !== null) {
        const favorites = JSON.parse(favoritesObj);

        if (favorites[item._id]) {
          setFavorites(true);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const AddToCart = async (itemId, quantity) => {
    const token = await AsyncStorage.getItem("token");
    const endpoint = "http://172.16.0.56/api/carts";
    console.log(token);
    const data = {
      cartItem: itemId,
      quantity: quantity,
    };

    const headers = {
      "Content-Type": "application/json",
      token: "Bearer " + JSON.parse(token),
    };
    await axios
      .post(endpoint, data, { headers })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <View style={styles.container}>
      {paymentUrl ? (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
          <WebView
            source={{ uri: paymentUrl }}
            onNavigationStateChange={onNavigationStateChange}
          />
        </SafeAreaView>
      ) : (
        <View style={styles.container}>
          <View style={styles.upperRow}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="chevron-back-circle" size={30} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handlePress()}>
              <Ionicons
                name={isLiked ? "heart" : "heart-outline"}
                size={30}
                color={COLORS.primary}
              />
            </TouchableOpacity>
          </View>
          <Image
            source={{
              uri: item.imageUrl,
            }}
            style={styles.image}
          />
          <View style={styles.details}>
            <View style={styles.titleRow}>
              <Text style={styles.title}>{item.title}</Text>
              <View style={styles.priceWrapper}>
                <Text style={styles.price}>{item.price}</Text>
              </View>
            </View>

            <View style={styles.ratingRow}>
              <View style={styles.rating}>
                {[1, 2, 3, 4, 5].map((index) => (
                  <Ionicons key={index} name="star" size={24} color={"gold"} />
                ))}
                <Text style={styles.ratingText}> (4.9)</Text>
              </View>

              <View style={styles.rating}>
                <TouchableOpacity onPress={() => increment()}>
                  <SimpleLineIcons name="plus" size={20} />
                </TouchableOpacity>
                <Text style={styles.ratingText}>{count}</Text>
                <TouchableOpacity onPress={() => decrement()}>
                  <SimpleLineIcons name="minus" size={20} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.descriptionWrapper}>
              <Text style={styles.description}>Description</Text>
              <Text style={styles.descText}>{item.description}</Text>
            </View>

            <View style={{ marginBottom: SIZES.small }}>
              <View style={styles.location}>
                <View style={{ flexDirection: "row" }}>
                  <Ionicons name="location-outline" size={22} />
                  <Text> {item.product_location}</Text>
                </View>

                <View style={{ flexDirection: "row" }}>
                  <MaterialCommunityIcons
                    name="truck-delivery-outline"
                    size={22}
                  />
                  <Text> Free Delivery </Text>
                </View>
              </View>
            </View>
            <View style={styles.cartRow}>
              <TouchableOpacity
                onPress={() => handleBuy()}
                style={styles.cartBtn}
              >
                <Text style={styles.cartTitle}> BUY NOW</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => handleCart()}
                style={styles.addCart}
              >
                <Fontisto
                  name="shopping-bag"
                  size={23}
                  color={COLORS.lightWhite}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default ProductDetails;
