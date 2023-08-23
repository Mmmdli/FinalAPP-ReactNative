import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, {useState,useEffect} from 'react'
import style from './profile.style'
import { StatusBar } from 'expo-status-bar'
import { COLORS } from '../constants'


const Profile = () => {
  const [userData, setUserData] = useState(null)
  const [userLogin, setUserLogin] = useState(true)
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
             {userLogin === true ? "Zivar" : "Please login into your account"}
          </Text>
           {userLogin === false ? (
             <TouchableOpacity>
              <View style={style.loginBtn}>
                 <Text style={style.menuText}>L O G I N    </Text>
              </View>
             </TouchableOpacity>

           ):(
            <View style={style.loginBtn}>
                  <Text style={style.menuText}>fhjcn@dnd.com   </Text>
            </View>
           ) 
          
           }

          </View>
       </View>
     </View>
     
  )
}

export default Profile

const styles = StyleSheet.create({})