import { getPhotos } from "apiService/photos";
import { Form, Text } from "components";
import { useEffect, useState } from "react";

export const Photos = () => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [isLoad, setIsLoad] = useState(false);
  const [isError, setIsError] = useState(null);
  const [images, setImages] = useState([]);
  useEffect(() => {
    if (!query) {
      return;
    }
    const fetchImages = async () => {
      setIsLoad(true);
      try {
        const data = await getPhotos(query, page);
        console.log(data);
      } catch (error) {
        setIsError(error);
      } finally {
        setIsLoad(false);
      }
    };
    fetchImages();
  }, [query, page]);
  const handleSubmit = (value) => {
    setQuery(value);
  };

  return (
    <>
      <Form onSubmit={handleSubmit} />
      <Text textAlign="center">Let`s begin search 🔎</Text>
    </>
  );
};
