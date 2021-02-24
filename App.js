/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

// import Sound from 'react-native-sound';

import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';

import {
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

// const sound = new Sound('http://sounds.com/some-sound', null, (error) => {
//   if (error) {
//     // do something
//   }

//   // play when loaded
//   sound.play();
// });

const App: () => React$Node = () => {
  let minutes = [];
  let hours = [];
  const [state, setState] = useState({hours: 0, minutes: 0, status: ''});
  for (let i = 0; i < 60; i++) {
    minutes.push({key: i.toString()});
  }
  for (let i = 0; i < 12; i++) {
    hours.push({key: i.toString() + ' am'});
  }
  for (let i = 1; i < 12; i++) {
    hours.push({key: i.toString() + ' pm'});
  }

  function addZero(time) {
    return time < 10 ? '0' + time : time;
  }

  const date = new Date();

  const thisHour = date.getHours();

  const thisFormattedHour = thisHour > 12 ? thisHour - 12 : thisHour;

  const thisMinute = date.getMinutes();

  var ampm = date.getHours() < 12 ? 'AM' : 'PM';

  if (state.hour === thisHour && state.minute === thisMinute) {
    setState({...state, status: 'WAKE UP!'});
    alert('ALARM');
  }
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
            <Text style={styles.sectionDescription}>Set your alarm </Text>
            <Text style={styles.sectionDescription}>
              {addZero(thisFormattedHour) +
                ':' +
                addZero(thisMinute) +
                ' ' +
                ampm}
            </Text>
          </View>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionDescription}>
              {state.hours + ' ' + state.minutes}
            </Text>
            <Text style={styles.sectionTitle}>{state.status}</Text>
          </View>

          <View style={styles.sectionContainer}>
            <View style={styles.columnsContainer}>
              <View style={styles.column}>
                <ScrollView>
                  {hours.map((hour, i) => {
                    return (
                      <TouchableWithoutFeedback
                        onPress={() => {
                          setState({...state, hours: hour.key});
                        }}
                        key={i}>
                        <Text>{hour.key}</Text>
                      </TouchableWithoutFeedback>
                    );
                  })}
                </ScrollView>
              </View>
              <View>
                <ScrollView>
                  {minutes.map((minute) => {
                    return (
                      <TouchableWithoutFeedback>
                        <Text
                          onPress={() => {
                            setState({...state, minutes: minute.key});
                          }}>
                          {minute.key}
                        </Text>
                      </TouchableWithoutFeedback>
                    );
                  })}
                </ScrollView>
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
