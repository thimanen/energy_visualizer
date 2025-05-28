import {
  View,
  StyleSheet,
  Text,
  Linking,
  Pressable,
  ImageBackground,
} from 'react-native'
import theme from '../theme'

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
    opacity: 0.7,
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
    alignItems: 'center',
  },
  weatherIcon: {
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: theme.chartColors.solarSold,
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

const PlantData = () => {
  const openInGoogleMaps = async () => {
    const url =
      'https://www.google.com/maps/place/Hevosmiehentie+19,+90420+Oulu/'
    const supported = await Linking.canOpenURL(url)
    if (supported) {
      await Linking.openURL(url)
    }
  }

  return (
    <View style={styles.flexContainer}>
      <Pressable onPress={openInGoogleMaps}>
        <View style={styles.addressContainer}>
          <Text style={styles.addressText}>Hevosmiehentie 19, Oulu</Text>
        </View>
      </Pressable>
      <View style={{ overflow: 'hidden' }}>
        <ImageBackground
          source={require('../../images/plant.jpg')}
          resizeMode="cover"
          style={styles.image}
          borderTopRightRadius={20}
        >
          <View style={styles.weatherAndEnergy}>
            <View style={styles.imageTopRow}>
              <View style={styles.weatherIcon}>
                <Text>ICON</Text>
              </View>

              <View style={styles.weatherTemp}>
                <Text>TEMP</Text>
              </View>
            </View>
            <View style={styles.imageBottomRow}>
              <View style={styles.weatherIcon}>
                <Text>This month</Text>
              </View>

              <View style={styles.weatherTemp}>
                <Text>All time</Text>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    </View>
  )
}

export default PlantData
