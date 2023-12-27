/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  NativeModules,
  NativeEventEmitter,
  Button,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {add} from 'test-module';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

// console.log(NativeModules.Counter);
// NativeModules.Counter.increment(value => {
//   console.log('the count is ' + value);
// });
// console.log(NativeModules.Counter.getConstants());

const CounterEvents = new NativeEventEmitter(NativeModules.Counter);

function Section({children, title}: SectionProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}
const a = add(1, 1);
a.then(b => console.log('module', b));

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [count, setCount] = useState(0);
  useEffect(() => {
    CounterEvents.addListener('onIncrement', result => {
      console.log('onIncrement received', result);
      setCount(result);
    });
    CounterEvents.addListener('onDecrement', result => {
      console.log('onDecrement received', result);
      setCount(result);
    });

    return () => {
      CounterEvents.removeAllListeners('onIncrement');
      CounterEvents.removeAllListeners('onDecrement');
    };
  }, []);

  const increment = () => {
    NativeModules.Counter.increment(result => {
      console.log(result);
    });
  };

  const decrement = async () => {
    try {
      var result = await NativeModules.Counter.decrement();
      console.log(result);
    } catch (e) {
      console.log(e.message, e.code);
    }
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Button title="Increase Count" onPress={increment} />
          <Button title="Decrease Count" onPress={decrement} />
          <Section title="這裡是 NativeModule 的 Counter 資訊">
            <Text>{count}</Text>
          </Section>
          <Section title="Step One">
            Edit <Text style={styles.highlight}>App.tsx</Text> to change this
            screen and then come back to see your edits.
          </Section>
          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section>
          <LearnMoreLinks />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
