import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native'
import React, {useState,useEffect} from 'react'
import style from './profile.style'
import { StatusBar } from 'expo-status-bar'
import { COLORS } from '../constants'
import { AntDesign, MaterialCommunityIcons, SimpleLineIcons} from "@expo/vector-icons"


const Profile = ({navigation}) => {
  const [userData, setUserData] = useState(null)
  const [userLogin, setUserLogin] = useState(false)
 

const logout = () => {
  Alert.alert(
    "Logout",
    "Are you sure you want to logout",
    [
      {
        text: "Cancel", onPress: ()=> console.log("cancel pressed")
      },
      {
        text: "Continue", onPress: ()=> console.log("logout pressed")
      },
      {defaultIndex : 1 }
    ]
  )
}

const clearCache = () => {
  Alert.alert(
    "Clear Cache",
    "Are you sure you want to delete all saved data on your device",
    [
      {
        text: "Cancel", onPress: ()=> console.log("cancel clear cache")
      },
      {
        text: "Continue", onPress: ()=> console.log("clear cache pressed")
      },
      {defaultIndex : 1 }
    ]
  )
}

const deleteAccount = () => {
  Alert.alert(
    "Delete Account",
    "Are you sure you want to delete your account",
    [
      {
        text: "Cancel", onPress: ()=> console.log("cancel pressed")
      },
      {
        text: "Continue", onPress: ()=> console.log("delete account pressed")
      },
       {defaultIndex : 1 }
    ]
  )
}


  return (
     <View style={style.container}>
       <View style={style.container}>
          <StatusBar backgroundColor ={COLORS.li}/> 

         <View style={{width: '100%'}}>
          <Image
            source={require('../assets/images/space.jpg')}
            style={style.cover}
          />

         </View>
          <View style={style.profileContainer}>
          <Image
            source={require('../assets/images/profile.jpg')}
            style={style.profile}
          />
          <Text style={style.name}>
             {userLogin === true ? "Sofia" : "Please login into your account"}
          </Text>


           {userLogin === false ? (
             <TouchableOpacity onPress={()=>navigation.navigate('Login')}>
              <View style={style.loginBtn}>
                 <Text style={style.menuText}>L O G I N    </Text>
              </View>
             </TouchableOpacity>

           ):(
            <View style={style.loginBtn}>
                  <Text style={style.menuText}>fhjcn@dnd.com   </Text>
            </View>
           )}
          
          {userLogin === false ? (
             <View></View>

           ):(
            <View style={style.menuWrapper}>
              <TouchableOpacity onPress={()=> navigation.navigate('Favorites')}>
                 <View style={style.menuItem(0.2)}>
                  <MaterialCommunityIcons
                    name='heart-outline'
                    color={COLORS.primary}
                    size={24}
                  />
                  <Text style={style.menuText}>Favorites</Text>
                  </View>  
              </TouchableOpacity>

              <TouchableOpacity onPress={()=>navigation.navigate('Orders')}>
                 <View style={style.menuItem(0.2)}>
                  <MaterialCommunityIcons
                    name='truck-delivery-outline'
                    color={COLORS.primary}
                    size={24}
                  />
                  <Text style={style.menuText}>Orders</Text>
                  </View>  
              </TouchableOpacity>

              <TouchableOpacity onPress={()=>navigation.navigate('Cart')}>
                 <View style={style.menuItem(0.2)}>
                  <SimpleLineIcons
                    name='bag'
                    color={COLORS.primary}
                    size={24}
                  />
                  <Text style={style.menuText}>Cart</Text>
                  </View>  
              </TouchableOpacity>

              <TouchableOpacity onPress={()=> clearCache()}>
                 <View style={style.menuItem(0.2)}>
                  <MaterialCommunityIcons
                    name='cached'
                    color={COLORS.primary}
                    size={24}
                  />
                  <Text style={style.menuText}>Clear cache</Text>
                  </View>  
              </TouchableOpacity>

              <TouchableOpacity onPress={()=> deleteAccount()}>
                 <View style={style.menuItem(0.2)}>
                  <AntDesign
                    name='deleteuser'
                    color={COLORS.primary}
                    size={24}
                  />
                  <Text style={style.menuText}>Delete Account</Text>
                  </View>  
              </TouchableOpacity>


              <TouchableOpacity onPress={()=> logout()}>
                 <View style={style.menuItem(0.2)}>
                  <AntDesign
                    name='logout'
                    color={COLORS.primary}
                    size={24}
                  />
                  <Text style={style.menuText}>Logout</Text>
                  </View>  
              </TouchableOpacity>
              
            </View>
           )}






          </View>
       </View>
     </View>
     
  )
}

export default Profile

const styles = StyleSheet.create({})