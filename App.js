import Sound from 'react-native-sound';
import {LogBox} from 'react-native';
LogBox.ignoreLogs(['Setting a timer']);
import Icon from 'react-native-vector-icons/FontAwesome';

import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  ScrollView,
  Pressable,
  Modal,
} from 'react-native';

import {
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const alarmSound = new Sound('daybreak.mp3', Sound.MAIN_BUNDLE, () => {});

alarmSound.setVolume(0.9);
alarmSound.release();

const myIcon = <Icon name="bell" size={30} color="black" />;

const App: () => React$Node = () => {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleString());
  const [wakeUpMinutes, setWakeUpMinutes] = useState(-1);
  const [modalVisible, setModalVisible] = useState(false);

  const createMinutes = () => {
    let minutes = [];
    for (let i = 1; i < 60; i++) {
      minutes.push(
        <Pressable
          key={i}
          onPress={() => {
            setWakeUpMinutes(i);
          }}
          style={i % 2 === 0 ? styles.pressable1 : styles.pressable2}>
          <Text style={styles.pressableText}>{i}</Text>
        </Pressable>,
      );
    }
    return minutes;
  };

  // function addZero(time) {
  //   return time < 10 ? '0' + time : time;
  // }

  // const date = new Date();
  // const thisHour = date.getHours();
  // const thisFormattedHour = thisHour > 12 ? thisHour - 12 : thisHour;
  // const thisMinute = date.getMinutes();
  // var ampm = date.getHours() < 12 ? 'AM' : 'PM';
  // const latestTime =
  //   addZero(thisFormattedHour) + ':' + addZero(thisMinute) + ' ' + ampm;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleString());
      setWakeUpMinutes(wakeUpMinutes - 1);
    }, 60000);
    return () => clearInterval(interval);
  }, [wakeUpMinutes]);

  useEffect(() => {
    const totalWakeUpMilliseconds = wakeUpMinutes * 60000;
    console.log(totalWakeUpMilliseconds);
    if (totalWakeUpMilliseconds === 0) {
      setModalVisible(true);
      alarmSound.play();
    }
  }, [wakeUpMinutes]);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View style={styles.header}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}> Alarm</Text>
            {myIcon}
          </View>
        </View>
        <View style={styles.body}>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Current time</Text>
            <Text style={styles.sectionDescription}>{currentTime}</Text>
          </View>
          <View style={styles.sectionContainer}>
            {wakeUpMinutes > 0 && (
              <Text style={styles.sectionDescription}>
                Alarm set for{' '}
                {wakeUpMinutes >= 1
                  ? wakeUpMinutes + ' minute from now'
                  : ' minutes from now'}
              </Text>
            )}
          </View>
          {!modalVisible && (
            <ScrollView
              centerContent="true"
              contentContainerStyle={styles.contentContainer}>
              <View style={styles.sectionContainer}>
                <View style={styles.scrollViewInner}>{createMinutes()}</View>
              </View>
            </ScrollView>
          )}
          <View style={styles.sectionContainer}>
            <View style={styles.columnsContainer}>
              <View>
                {modalVisible && (
                  <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                      Alert.alert('Modal has been closed.');
                      setModalVisible(!modalVisible);
                    }}>
                    <View style={styles.centeredView}>
                      <View style={styles.modalView}>
                        <Text style={styles.modalText}>WAKE UP!</Text>
                        <Pressable
                          style={[styles.button, styles.buttonClose]}
                          onPress={() => {
                            setModalVisible(!modalVisible);
                            alarmSound.stop();
                          }}>
                          <Text style={styles.textStyle}>OK</Text>
                        </Pressable>
                      </View>
                    </View>
                  </Modal>
                )}
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  view: {
    flexGrow: 1,
    backgroundColor: 'grey',
  },

  header: {
    paddingBottom: 24,
  },
  headerTitle: {
    fontSize: 40,
    fontWeight: '600',
    color: 'black',
    textAlign: 'center',
    marginRight: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 32,
    paddingHorizontal: 24,
  },
  body: {
    backgroundColor: 'lightgrey',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 32,
    fontWeight: '600',
    color: 'black',
    textAlign: 'center',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  scrollViewInner: {
    flexDirection: 'column',
  },
  pressable1: {
    backgroundColor: 'darkcyan',
    padding: 15,
  },
  pressable2: {
    backgroundColor: 'cornflowerblue',
    padding: 15,
  },
  pressableText: {
    color: 'white',
    fontSize: 30,
    marginLeft: 25,
    borderBottomColor: 'grey',
  },
  contentContainer: {
    flexGrow: 1,
  },
  highlight: {
    fontWeight: '700',
  },
  columnsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  column: {
    width: '30%',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default App;
