

import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router'; // Sử dụng Expo Router (nếu có)

const IndexPage = () => {
  const router = useRouter(); // Để sử dụng điều hướng

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chọn bài tập</Text>

      <Button
        title="Bài 1: Tìm kiếm Pokémon"
        onPress={() => router.push('/PokemonSearch')} // Dẫn tới trang Bài 1
      />
      <Button
        title="Bài 2: Màn hình khác"
        onPress={() => router.push('/bai2')} // Dẫn tới trang Bài 2
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: 'bold',
  },
});

export default IndexPage;
