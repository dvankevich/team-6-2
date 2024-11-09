import { Grid, PhotosGalleryItem } from "..";

export const PhotosGallery = ({ images, openModal }) => {
  return (
    <Grid>
      {images.map(({ alt, id, avg_color, src }) => (
        <PhotosGalleryItem
          openModal={openModal}
          key={id}
          alt={alt}
          avg_color={avg_color}
          src={src}
        />
      ))}
    </Grid>
  );
};
