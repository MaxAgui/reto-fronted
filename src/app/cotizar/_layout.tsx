import Footer from '@/src/components/Footer';
import { Slot } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const LayoutCotizar = () => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Slot />
      </View>

      <Footer />
    </View>
  );
};

export default LayoutCotizar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});