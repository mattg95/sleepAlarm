/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  SectionList,
  TouchableWithoutFeedback,
} from 'react-native';

import {
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const App: () => React$Node = () => {
  let minutes = [{title: 'minutes', data: []}];
  let hours = [{hours: 'minutes', data: []}];
  const [state, setState] = useState({hours: 0, minutes: 0});
  for (let i = 0; i < 60; i++) {
    minutes[0].data.push({key: i.toString()});
  }
  for (let i = 0; i < 12; i++) {
    hours[0].data.push({key: i.toString() + ' am'});
  }
  for (let i = 1; i < 12; i++) {
    hours[0].data.push({key: i.toString() + ' pm'});
  }

  const date = new Date();

  const thisHour = date.getHours();

  const thisFormattedHour = thisHour > 12 ? thisHour - 12 : thisHour;

  const thisMinute = date.getMinutes();

  var ampm = date.getHours() < 12 ? 'AM' : 'PM';

  if (state.hour === thisHour && state.minute === thisMinute) {
    console.log('ALARM');
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
              {thisFormattedHour + ':' + thisMinute + ' ' + ampm}
            </Text>
          </View>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionDescription}>{state.hours}</Text>
          </View>

          <View style={styles.sectionContainer}>
            <View style={styles.columnsContainer}>
              <View style={styles.column}>
                <ScrollView>
                  <SectionList
                    sections={hours}
                    keyExtractor={(item, index) => item + index}
                    renderItem={({item}) => (
                      <TouchableWithoutFeedback>
                        <Text
                          style={styles.item}
                          onPress={() => {
                            setState({...state, hours: item.key});
                          }}>
                          {item.key}
                        </Text>
                      </TouchableWithoutFeedback>
                    )}
                  />
                </ScrollView>
                <View style={styles.column}>
                  <SectionList
                    sections={minutes}
                    scrollEnabled={true}
                    renderItem={({item}) => (
                      <TouchableWithoutFeedback
                        onPress={() => {
                          setState({...state, minutes: item.key});
                        }}>
                        <Text style={styles.item}>{item.key}</Text>
                      </TouchableWithoutFeedback>
                    )}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
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
  // columnsContainer: {
  //   // flex: 1,
  //   flexDirection: 'row',
  //   flexWrap: 'wrap',
  //   alignItems: 'flex-start',
  // },
  // column: {
  //   width: '30%',
  // },
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
