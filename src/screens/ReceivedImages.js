import easyDB from 'easy-db-react-native';
import React, { useEffect, useState } from 'react';
import { Button, Image, View } from 'react-native';
const {select} = easyDB();

export default function ReceivedImages({}) {
  const [images, setImages] = useState([]);

  const getImages = async () => {
    const images = await select('images');
    const objArrayImages = Object.keys(images).map(key => {
      return {id: key, src: images[key]};
    });
    return setImages(objArrayImages);
  };

  useEffect(() => {
    getImages().then();
    return () => {};
  }, []);

  return (
    <>
      <Button title="Refresh" onPress={async () => await getImages()} />
      <View style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
        {images.map(image => (
          <Image
            style={{
              height: 100,
              width: 100,
            }}
            key={image.id}
            source={{uri: image.src}}
          />
        ))}
      </View>
    </>
  );
}
