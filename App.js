import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import { StyleSheet, Text, View, Button, Alert, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const KomponenPilihGambar = () => {
  const [uri, setUri] = useState("");

  const bukaPilihGambar = async () => {
    const izinHasil = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (!izinHasil.granted) {
      Alert.alert("Izin Diperlukan", "Anda perlu mengaktifkan izin untuk mengakses galeri foto.");
      return;
    }

    const respons = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    console.log("Respons Pilih Gambar:", respons);
    tanganiRespons(respons);
  };

  const bukaKamera = async () => {
    const izinHasil = await ImagePicker.requestCameraPermissionsAsync();

    if (!izinHasil.granted) {
      Alert.alert("Izin Diperlukan", "Anda perlu mengaktifkan izin untuk mengakses kamera.");
      return;
    }

    const respons = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    console.log("Respons Kamera:", respons);
    tanganiRespons(respons);
  };

  const tanganiRespons = (respons) => {
    if (respons.canceled) {
      console.log("Pengguna membatalkan pemilihan gambar");
    } else if (respons.assets && respons.assets.length > 0) {
      const imageUri = respons.assets[0].uri;
      setUri(imageUri);
      console.log("URI Gambar:", imageUri);
    } else {
      console.log("Tidak ada URI gambar ditemukan dalam respons");
      Alert.alert("Error", "Gagal mengambil URI gambar.");
    }
  };

  const simpanKeGaleri = async () => {
    if (!uri) {
      Alert.alert("Tidak ada gambar untuk disimpan", "Harap ambil atau pilih gambar terlebih dahulu.");
      return;
    }

    const izinMediaLibrary = await MediaLibrary.requestPermissionsAsync();
    if (!izinMediaLibrary.granted) {
      Alert.alert("Izin Diperlukan", "Anda perlu mengaktifkan izin untuk menyimpan gambar ke galeri.");
      return;
    }

    try {
      const asset = await MediaLibrary.createAssetAsync(uri);
      await MediaLibrary.createAlbumAsync("Kamera Roll", asset, false);
      Alert.alert("Gambar Disimpan!", "Gambar telah disimpan ke Galeri Anda.");
      console.log("Gambar disimpan ke Galeri:", asset.uri);
    } catch (error) {
      console.error("Error menyimpan gambar:", error);
      Alert.alert("Error Menyimpan", "Gagal menyimpan gambar.");
    }
  };

  return (
    <View style={styles.container}>
      <Text>Nayla Mutiara Salsabila Bastari - 00000075205</Text>
      <Button title="Buka Kamera" onPress={bukaKamera} color="#1E90FF" />
      <Button title="Buka Galeri" onPress={bukaPilihGambar} color="#1E90FF" />
      
      {uri ? (
        <>
          <Image source={{ uri }} style={styles.image} />
          <Button title="Simpan Gambar" onPress={simpanKeGaleri} color="#1E90FF" />
        </>
      ) : (
        <Text>Tidak ada gambar yang dipilih</Text>
      )}

      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
    borderRadius: 10,
  },
});

export default KomponenPilihGambar;
