import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  TouchableOpacity, 
  Image,
  ActivityIndicator,
  Alert 
} from 'react-native';
import { useLazyGetPokemonByNameQuery } from './pokemonApi';

const PokemonSearch = () => {
  const [pokemonName, setPokemonName] = useState('');
  const [getPokemon, { data: pokemon, isLoading, error, isError }] = useLazyGetPokemonByNameQuery();

  const handleSearch = () => {
    if (pokemonName.trim()) {
      console.log('Searching for Pokémon:', pokemonName.toLowerCase());
  
      getPokemon(pokemonName.toLowerCase())
        .unwrap()
        .then(data => {
          console.log('Pokémon found:', data);
        })
        .catch(err => {
          console.error('Error fetching Pokémon:', err);
          Alert.alert('API Error', JSON.stringify(err));
        });
    } else {
      Alert.alert('Input Error', 'Please enter a Pokémon name.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thông tin pokemon</Text>
      
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="ivysaur"
          value={pokemonName}
          onChangeText={setPokemonName}
        />
        
        <TouchableOpacity 
          style={styles.searchButton} 
          onPress={handleSearch}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>Tìm kiếm pokemon</Text>
        </TouchableOpacity>
      </View>

      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FFA500" />
        </View>
      )}

      {isError && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            Không tìm thấy pokemon. Vui lòng thử lại!
          </Text>
          <Text style={styles.errorDetails}>
            {JSON.stringify(error)} {/* Hiển thị chi tiết lỗi */}
          </Text>
        </View>
      )}

      {pokemon && (
        <View style={styles.resultContainer}>
          <Image 
            source={{ uri: pokemon.image }} 
            style={styles.pokemonImage}
          />
          
          <View style={styles.infoContainer}>
            <Text style={styles.pokemonName}>{pokemon.name}</Text>
            <Text style={styles.pokemonType}>Type: {pokemon.type}</Text>
            <Text style={styles.sectionTitle}>Abilities:</Text>
            {pokemon.abilities && pokemon.abilities.map((ability, index) => (
              <Text key={index} style={styles.abilityText}>
                • {ability}
              </Text>
            ))}
            <Text style={styles.pokemonStats}>Height: {pokemon.height}</Text>
            <Text style={styles.pokemonStats}>Weight: {pokemon.weight}</Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  searchContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    fontSize: 16,
  },
  searchButton: {
    backgroundColor: '#FFA500',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  loadingContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  errorContainer: {
    marginTop: 20,
    padding: 16,
    backgroundColor: '#ffebee',
    borderRadius: 8,
  },
  errorText: {
    color: '#d32f2f',
    textAlign: 'center',
    marginBottom: 8,
  },
  errorDetails: {
    fontSize: 12,
    color: '#888',
  },
  resultContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  pokemonImage: {
    width: 150,
    height: 150,
    marginBottom: 16,
  },
  infoContainer: {
    width: '100%',
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  pokemonName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  pokemonType: {
    fontSize: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  abilityText: {
    fontSize: 14,
    marginLeft: 8,
    marginBottom: 4,
  },
  pokemonStats: {
    fontSize: 14,
    marginTop: 4,
  },
});

export default PokemonSearch;
