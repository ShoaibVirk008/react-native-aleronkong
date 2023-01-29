import React, { Component } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import Navigation from './src/navigation'
import AppleMusic from './src/screens/practice/AppleMusic';
import { Provider } from 'react-redux';
import store from './src/services/store';
import { RootSiblingParent } from 'react-native-root-siblings';
import persistStore from 'redux-persist/es/persistStore'
import { PersistGate } from 'redux-persist/es/integration/react'
let persistor = persistStore(store)

export default function App() {
  return (
    // <Navigation />
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <RootSiblingParent>
          <Navigation />
        </RootSiblingParent>
      </PersistGate>
    </Provider>
  )
}