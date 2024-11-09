import { getPhotos } from "apiService/photos";
import { Button, Form, Loader, PhotosGallery, Text } from "components";
import ImageModal from "components/ImageModal/ImageModal";
import { useEffect, useState } from "react";

export const Photos = () => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [isLoad, setIsLoad] = useState(false);
  const [isError, setIsError] = useState(null);
  const [images, setImages] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalSrc, setModalSrc] = useState("");
  const [modalAlt, setModalAlt] = useState("");
  useEffect(() => {
    if (!query) {
      return;
    }
    const fetchImages = async () => {
      setIsLoad(true);
      try {
        const { total_results, photos, per_page } = await getPhotos(
          query,
          page
        );
        if (photos.length === 0) {
          return setIsEmpty(true);
        }
        setImages((prevImage) => [...prevImage, ...photos]);
        setIsVisible(page < Math.ceil(total_results / per_page));
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
    setImages([]);
    setPage(1);
    setIsError(null);
    setIsEmpty(false);
    setIsVisible(false);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const openModal = (src, alt) => {
    setIsOpen(true);
    setModalSrc(src);
    setModalAlt(alt);
  };
  const closeModal = () => {
    setIsOpen(false);
    setModalSrc("");
    setModalAlt("");
  };

  return (
    <>
      <Form onSubmit={handleSubmit} />

      {images.length > 0 && (
        <PhotosGallery images={images} openModal={openModal} />
      )}
      {isVisible && !isLoad && images.length > 0 && (
        <Button onClick={handleLoadMore} disabled={isLoad}>
          {isLoad ? "Loading" : "LoadMore"}
        </Button>
      )}
      {!images.length && !isEmpty && (
        <Text textAlign="center">Let`s begin search 🔎</Text>
      )}
      {isLoad && <Loader />}
      {isError && (
        <Text textAlign="center">❌ Something went wrong - {error}</Text>
      )}
      {isEmpty && (
        <Text textAlign="center">Sorry. There are no images ... 😭</Text>
      )}
      <ImageModal
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        src={modalSrc}
        alt={modalAlt}
      />
    </>
  );
};
