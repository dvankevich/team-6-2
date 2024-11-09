import { GridItem } from "..";
import s from "./PhotosGalleryItem.module.css";
export const PhotosGalleryItem = ({ alt, avg_color, src, openModal }) => {
  return (
    <GridItem>
      <div
        className={s.thumb}
        style={{ backgroundColor: avg_color, borderColor: avg_color }}
      >
        <img
          onClick={() => openModal(src.large, alt)}
          src={src.large}
          alt={alt}
        />
      </div>
    </GridItem>
  );
};
