import {
  View,
  StyleSheet,
  Text,
  Linking,
  Pressable,
  ImageBackground,
} from 'react-native'
import Weather from './Weather'
import Current from './Current'
import theme from '../theme'

const PlantData = () => {


  return (
    <View style={styles.flexContainer}>
      
      <View style={{ overflow: 'hidden' }}>
        <ImageBackground
          source={require('../../images/plant.jpg')}
          resizeMode="cover"
          style={styles.image}
          borderTopRightRadius={20}
        >
          <View style={styles.weatherAndEnergy}>
            <View style={styles.imageTopRow}>
              <Current />
              <Weather lat={65.0124} long={25.4682} />
            </View>
            <View style={styles.imageBottomRow}>
              <View style={styles.weatherIcon}>
                
              </View>

              <View style={styles.weatherTemp}>
                
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    </View>
  )
}

export default PlantData

const styles = StyleSheet.create({
  flexContainer: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.titleColors.backgroundColor,
    paddingTop: 20,
    paddingBottom: 20,
  },
  addressContainer: {
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: theme.chartColors.solarSold,
    borderRadius: 4,
    marginBottom: 10,
    alignSelf: 'center',
  },
  textStyle: {
    color: theme.titleColors.textColor,
    fontSize: theme.titleColors.fontSize,
    fontWeight: theme.titleColors.fontWeight,
  },
  addressText: {
    color: theme.addressColors.textColor,
    fontSize: theme.addressColors.fontSize,
    fontWeight: theme.addressColors.fontWeight,
    textDecorationLine: 'underline',
  },
  image: {
    width: 300,
    aspectRatio: 16 / 9,
    alignSelf: 'center',
    opacity: 0.8,
    borderWidth: 0,
    borderColor: theme.chartColors.solarUsed,
    borderTopRightRadius: 20,
  },
  weatherAndEnergy: {
    flex: 1,
    justifyContent: 'space-between',
  },
  imageTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  weatherIcon: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  weatherTemp: {
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: theme.chartColors.solarSold,
  },
  imageBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
})
