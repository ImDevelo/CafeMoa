import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const LocationSelectionScreen = (navigator) =>{




    return ( 
    <View style ={styles.container}>
        <View style={styles.headerContainer}>

        </View>

        <View style={styles.contentContainer}>
          <View>

          </View>
        </View>
    </View>
    )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ddd",
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  headerContainer: {
    flex:1,
    backgroundColor:"red",
  },
  contentContainer: {
    flex:1,
    backgroundColor:"red",
  }

  




});

export default LocationSelectionScreen;
