import Sound from 'react-native-sound';
import {LogBox} from 'react-native';
LogBox.ignoreLogs(['Setting a timer']);

import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  ScrollView,
  Pressable,
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

const App: () => React$Node = () => {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleString());
  const [wakeUpMinute, setWakeUpMinute] = useState(0);
  const [wakeUpHour, setWakeUpHour] = useState(0);

  const createMinutes = () => {
    let minutes = [];
    for (let i = 0; i < 60; i++) {
      minutes.push(
        <Pressable
          key={i}
          onPress={() => {
            setWakeUpMinute(i);
          }}>
          <Text>{i}</Text>
        </Pressable>,
      );
    }
    return minutes;
  };

  const createHours = () => {
    let hours = [];
    for (let i = 0; i < 12; i++) {
      hours.push(
        <Pressable
          key={i}
          onPress={() => {
            setWakeUpHour(i);
          }}>
          <Text>{i}</Text>
        </Pressable>,
      );
    }
    return hours;
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
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const totalWakeUpMilliseconds = (wakeUpHour * 60 + wakeUpMinute) * 60000;
    if (totalWakeUpMilliseconds > 0) {
      let alarm = setInterval(() => {
        alert('WAKE UP');
        alarmSound.play();
      }, totalWakeUpMilliseconds);
      return () => {
        clearTimeout(alarm);
      };
    }
  }, [wakeUpHour, wakeUpMinute]);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View style={styles.header}>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Alarm</Text>
          </View>
        </View>
        <View style={styles.body}>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Current time:</Text>
            <Text style={styles.sectionDescription}>{currentTime}</Text>
          </View>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>
              Set your alarm to go off in:
            </Text>

            <Text style={styles.sectionDescription}>
              {wakeUpHour + ' hours and  ' + wakeUpMinute + ' minutes'}
            </Text>
          </View>

          <View style={styles.sectionContainer}>
            <View style={styles.columnsContainer}>
              <View style={styles.column}>
                <ScrollView>{createHours()}</ScrollView>
              </View>
              <View>
                <ScrollView>{createMinutes()}</ScrollView>
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
  },
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  header: {
    paddingBottom: 24,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
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
});

export default App;
