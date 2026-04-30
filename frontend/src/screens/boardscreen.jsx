import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import AppIntroSlider from 'react-native-app-intro-slider';
import { COLORS } from '../const/colors';


const { width } = Dimensions.get('window');

const slides = [
  {
    key: '1',
    title: 'Welcome to Our App!',
    text: 'Discover unique products make your life easier.',
    image: require('../assets/images/store.png'),
    colors: {
        backgroundColor: '#F2F5F8',
        textColor: '#000',
    },
  },
  {
    key: '2',
    title: 'Browse thousands of product in one place',
    text: 'Browse by item brand category or by your favourite eshop.',
    image: require('../assets/images/shopp.png'),
    colors: {
       backgroundColor: '#F2F5F8',
       textColor: '#000',
    },
  },
  {
    key: '3',
    title: 'Choose your preferred payment method',
    text: 'Choose mobile online money, visa or cash on delivery.',
    image: require('../assets/images/payment.png'),
    colors: {
      backgroundColor: '#F2F5F8',
      textColor: '#000',
    },
  },
    {
    key: '4',
    title: 'Confirm your order and await delivery',
    text: 'Choose from wide a range or deliver options eshop, pickup point or at doorstep.',
    image: require('../assets/images/order.png'),
    colors: {
      backgroundColor: '#F2F5F8',
      textColor: '#000',
    },
  },

];

const BoardScreen = ({ navigation }) => {
  const _renderItem = ({ item }) => {
    return (
      <View
        style={[
          styles.slide,
          {
            backgroundColor: item.colors.backgroundColor,
          },
        ]}
      >
        <Image
          source={ item.image }
          style={styles.image}
        />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.text}>{item.text}</Text>
      </View>
    );
  };

  const _renderNextButton = () => {
    return (
      <View style={styles.button}>
        <Text style={styles.buttonText}>Next</Text>
      </View>
    );
  };

  const _renderDoneButton = () => {
    return (
      <View style={styles.doneButton}>
        <Text style={styles.doneButtonText}>Done</Text>
      </View>
    );
  };

  const _renderSkipButton = () => {
    return (
      <View style={styles.skipButton}>
        <Text style={styles.skipButtonText}>Skip</Text>
      </View>
    );
  };

  const onSlideChange = (index) => {
    console.log('slide changed', index);
  };

  const onDone = () => {
    navigation.replace('login'); // Navigate to main app
  };

  const onSkip = () => {
    navigation.replace('login'); // Navigate to main app
  };

  return (
    <AppIntroSlider
      data={slides}
      renderItem={_renderItem}
      renderDoneButton={_renderDoneButton}
      renderNextButton={_renderNextButton}
      renderSkipButton={_renderSkipButton}
      onSlideChange={onSlideChange}
      onDone={onDone}
      onSkip={onSkip}
      showSkipButton={true}
      showNextButton={true}
      showDoneButton={true}
      bottomButton
      activeDotStyle={styles.activeDot}
      inactiveDotStyle={styles.inactiveDot}
      dotStyle={styles.dot}
    />
  );
};

const styles = StyleSheet.create({
  slide: {
    flex: 0.75,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scale(40),
    paddingVertical: verticalScale(40),
  },
  image: {
    width: scale(300),
    height: verticalScale(300),
    marginBottom: verticalScale(10),
    resizeMode: "contain",
  },
  title: {
    fontSize: moderateScale(29),
    fontWeight: 'bold',
    color: COLORS.navy,
    textAlign: 'center',
    marginBottom: verticalScale(15),
  },
  text: {
    fontSize: moderateScale(15),
    color: COLORS.dark,
    textAlign: 'center',
    lineHeight: verticalScale(24),
  },
  button: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: scale(24),
    paddingVertical: verticalScale(12),
    borderRadius: moderateScale(25),
  },
  buttonText: {
    color: '#000',
    fontSize: moderateScale(16),
    fontWeight: '600',
  },
  doneButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: scale(32),
    paddingVertical: verticalScale(14),
    borderRadius: moderateScale(25),
  },
  doneButtonText: {
    color: '#000',
    fontSize: moderateScale(16),
    fontWeight: '600',
  },
  skipButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(10),
    borderRadius: moderateScale(20),
  },
  skipButtonText: {
    color: '#000',
    fontSize: moderateScale(14),
    fontWeight: '500',
    
  },
  dot: {
    backgroundColor: '#000',
    width: scale(8),
    height: verticalScale(8),
    borderRadius: moderateScale(4),
    marginLeft: scale(3),
    marginRight: scale(3),
    marginTop: verticalScale(3),
    marginBottom: verticalScale(3),
  },
  activeDot: {
    backgroundColor: '#FFFFFF',
    width: scale(12),
    height: verticalScale(12),
  },
  inactiveDot: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
});

export default BoardScreen;