import Sound from 'react-native-sound';
import {LogBox} from 'react-native';
import {configureStore} from '@reduxjs/toolkit';

import {useSelector, Provider, useDispatch} from 'react-redux';

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
  Image,
} from 'react-native';

LogBox.ignoreLogs(['Setting a timer']);

const alarmSound = new Sound('daybreak.mp3', Sound.MAIN_BUNDLE, () => {});

alarmSound.setVolume(0.9);

const getTime = () => {
  const addZero = (time) => {
    return time < 10 ? '0' + time : time;
  };
  const date = new Date();
  const thisHour = date.getHours();
  const thisFormattedHour = thisHour > 12 ? thisHour - 12 : thisHour;
  const ampm = thisHour < 12 ? 'AM' : 'PM';
  const thisMinute = date.getMinutes();
  return addZero(thisFormattedHour) + ':' + addZero(thisMinute) + ' ' + ampm;
};

const initialState = {
  secondsTillAlarm: 0,
  modalVisible: false,
  isAlarmSet: false,
  currentTime: getTime(),
};

function alarmReducer(state = initialState, action) {
  //reducer
  if (action.type === 'secondsTillAlarm/decrement') {
    return {
      ...state,
      secondsTillAlarm: state.secondsTillAlarm - 1,
    };
  }
  if (action.type === 'secondsTillAlarm/setSecondsTillAlarm') {
    return {
      ...state,
      secondsTillAlarm: action.payload * 60,
    };
  }
  if (action.type === 'modalVisible/showModal') {
    return {
      ...state,
      modalVisible: action.payload,
    };
  }
  if (action.type === 'time/setCurrentTime') {
    return {
      ...state,
      time: getTime(),
    };
  }
  if (action.type === 'isAlarmSet/setAlarm') {
    return {
      ...state,
      isAlarmSet: action.payload,
    };
  }
  return state;
}

export const store = configureStore({reducer: alarmReducer});

const decrement = () => {
  return {
    type: 'secondsTillAlarm/decrement',
  };
};

const setSecondsTillAlarm = (seconds) => {
  return {
    type: 'secondsTillAlarm/setSecondsTillAlarm',
    payload: seconds,
  };
};

const setModalVisible = (bool) => {
  return {
    type: 'modalVisible/setModalVisible',
    payload: bool,
  };
};

const setAlarm = (bool) => {
  return {
    type: 'isAlarmSet/setAlarm',
    payload: bool,
  };
};

const setCurrentTime = () => {
  return {
    type: 'time/setTime',
  };
};

const App: () => React$Node = () => {
  const dispatch = useDispatch(); // Works!
  const selectTime = (state) => state.currentTime;
  const currentTime = useSelector(selectTime);

  const selectIsAlarmSet = (state) => state.isAlarmSet;
  const isAlarmSet = selectIsAlarmSet(store.getState());

  const selectSecondsTillAlarm = (state) => state.secondsTillAlarm;
  const secondsTillAlarm = selectSecondsTillAlarm(store.getState());

  const selectModalVisible = (state) => state.modalVisible;
  const modalVisible = selectModalVisible(store.getState());

  useEffect(() => {
    if (isAlarmSet && secondsTillAlarm === 0) {
      store.dispatch(setAlarm(false));
      store.dispatch(setModalVisible(true));
      alarmSound.play();
      alarmSound.setNumberOfLoops(-1);
    }
    const interval = setInterval(() => {
      console.log('hi');
      console.log(store.getState());
      store.dispatch(setCurrentTime());
      isAlarmSet && store.dispatch(decrement());
    }, 1000);
    return () => clearInterval(interval);
  }, [currentTime, secondsTillAlarm, isAlarmSet]);

  const createMinutes = () => {
    let minutes = [];
    for (let i = 1; i < 60; i++) {
      minutes.push(
        <Pressable
          key={i}
          onPress={() => {
            store.dispatch(setAlarm(true));
            store.dispatch(setSecondsTillAlarm(i));
          }}
          style={i % 2 === 0 ? styles.pressable1 : styles.pressable2}>
          <Text style={styles.pressableText}>{i}</Text>
        </Pressable>,
      );
    }
    return minutes;
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.header}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}> Alarm</Text>
            <Image
              source={require('./assets/alarm.png')}
              style={styles.icon}></Image>
          </View>
        </View>
        <View style={styles.body}>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Current time</Text>
            <Text style={styles.currentTime}>{currentTime}</Text>
          </View>
          <View style={styles.alarmContainer}>
            {isAlarmSet && (
              <View>
                <Text style={styles.alarmDescription}>
                  {Math.ceil(secondsTillAlarm / 60) >= 1
                    ? Math.ceil(secondsTillAlarm / 60) + ' minute from now'
                    : ' minutes from now'}
                </Text>
                <Pressable
                  onPress={() => {
                    store.dispatch(setAlarm(false));
                  }}>
                  <Text style={styles.cancelButton}>Cancel</Text>
                </Pressable>
              </View>
            )}
            {!isAlarmSet && (
              <View style={styles.sectionContainer}>
                <Text style={styles.alarmTitle}>Set Alarm for:</Text>
              </View>
            )}
          </View>
          {!modalVisible && (
            <View style={styles.scrollViewContainer}>
              <View style={styles.scrollViewScroller}>
                <ScrollView
                  centerContent="true"
                  contentContainerStyle={styles.contentContainer}>
                  <View style={styles.scrollViewInner}>{createMinutes()}</View>
                </ScrollView>
              </View>
              <Text style={styles.scrollViewDescription}>Minutes from now</Text>
            </View>
          )}
          <View style={styles.sectionContainer}>
            <View style={styles.columnsContainer}>
              <View>
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalVisible}>
                  <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                      <Text style={styles.modalText}>WAKE UP!</Text>
                      <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => {
                          store.dispatch(setModalVisible(false));
                          alarmSound.stop();
                        }}>
                        <Text style={styles.buttonText}>OK</Text>
                      </Pressable>
                    </View>
                  </View>
                </Modal>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

const AppWrapper = () => {
  const store = createStore(rootReducer);

  return (
    <Provider store={store}>
      {' '}
      // Set context
      <App /> // Now App has access to context
    </Provider>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  header: {
    paddingBottom: 24,
    flex: 1,
  },
  headerTitle: {
    fontSize: 58,
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
  icon: {
    width: 50,
    height: 50,
  },
  body: {
    backgroundColor: 'lightgrey',
    flex: 6,
  },
  alarmContainer: {
    flex: 1,
    marginBottom: 12,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 36,
    fontWeight: '600',
    color: 'black',
    textAlign: 'center',
  },
  alarmTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: 'black',
    textAlign: 'center',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: 'grey',
  },
  currentTime: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    textAlign: 'center',
  },
  alarmDescription: {
    marginTop: 8,
    fontSize: 22,
    fontWeight: '400',
    color: 'red',
    textAlign: 'center',
  },
  cancelButton: {
    backgroundColor: 'red',
    marginTop: 16,
    marginHorizontal: 24,
    borderRadius: 20,
    padding: 10,
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 24,
  },

  scrollViewInner: {
    flexDirection: 'column',
    flex: 1,
    paddingHorizontal: 24,
  },
  scrollViewContainer: {
    flex: 3,
    flexDirection: 'row',
  },
  scrollViewScroller: {
    flex: 1,
  },
  scrollViewDescription: {
    flex: 1,
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: 'grey',
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
    textAlign: 'center',
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
    color: 'grey',
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
    position: 'absolute',
    top: 200,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 85,
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
    borderRadius: 40,
    padding: 70,
    elevation: 2,
    fontSize: 32,
  },

  buttonClose: {
    backgroundColor: 'lightgreen',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 32,
  },
  modalText: {
    marginBottom: 55,
    fontSize: 32,
    textAlign: 'center',
  },
});

export default App;
