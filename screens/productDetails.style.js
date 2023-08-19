import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../constants';

const styles = StyleSheet.create({
     container: {
        flex: 1,
        backgroundColor: COLORS.lightWhite,
     },
     upperRow: {
       marginHorizontal: 20,
       marginTop: 44,
       flexDirection: "row",
       justifyContent: "space-between",
       alignItems: "center",
       position: "absolute",
       width: SIZES.width -44,
       zIndex: 999
     },
     image: {
        aspectRatio: 1,
        resizeMode: "cover"
     },
     details: {
         marginTop: -SIZES.large,
         backgroundColor: COLORS.lightWhite,
         width: SIZES.width,
         borderTopLeftRadius: SIZES.medium,
         borderTopRightRadius: SIZES.medium,

     },
     cartRow: {
        paddingBottom: SIZES.xSmall,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: SIZES.width,   
     },
     cartBtn: {
        width: SIZES.width*0.7,
        backgroundColor: COLORS.black,
        padding: SIZES.xSmall -4,
        borderRadius: SIZES.large,
        marginLeft: 12
     },
     titleRow: {
         marginHorizontal: 20,
         paddingBottom: SIZES.xSmall,
         flexDirection: "row",
         justifyContent: "space-between",
         alignItems: "center",
         width: -44,
         marginTop: 20
     },
     ratingRow: {
        paddingBottom: SIZES.small,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: -15,
        marginTop: -5
     },
     rating: {
        marginTop: SIZES.xSmall ,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        marginHorizontal: SIZES.large

     },
     ratingText: {
      color: COLORS.gray,
      fontFamily: "medium",
      paddingHorizontal: SIZES.xSmall,
     },
     descriptionWrapper: {
      marginTop: SIZES.large -13,
      marginHorizontal: SIZES.large
     },
     description: {
       fontFamily: "medium",
       fontSize: SIZES.large 
     },
     descText: {
       fontFamily: "regular",
       fontSize: SIZES.small +1,
       textAlign: "justify",
       marginBottom: SIZES.small
     },
     location: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: COLORS.secondary,
        marginRight: SIZES.small,
        marginLeft: SIZES.small,
        padding: 7,
        borderRadius: SIZES.large 
     },
     cartTitle: {
        marginLeft: SIZES.small,
        fontFamily: "semibold",
        fontSize: SIZES.medium,
        color: COLORS.lightWhite
     },
     title: {
      fontFamily: "bold",
      fontSize: SIZES.large,
     },
     price: {
        paddingHorizontal: 10,
        fontFamily: "semibold",
        fontSize: SIZES.large
     },
     priceWrapper: {
        backgroundColor: COLORS.secondary,
        borderRadius: SIZES.large
     },
     addCart: {
      width:37,
      height: 37,
      borderRadius: 50,
      margin: SIZES.medium,
      backgroundColor: COLORS.black,
      alignItems: 'center',
      justifyContent: 'center'
     },

})

export default styles

