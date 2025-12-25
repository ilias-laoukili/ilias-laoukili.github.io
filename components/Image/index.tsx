
import ExportedImage from 'next-image-export-optimizer';
import type { ExportedImageProps } from 'next-image-export-optimizer';

// Drop-in replacement for Next.js Image for static export
const Image = (props: ExportedImageProps) => {
  return <ExportedImage {...props} />;
};

export default Image;
