import { encode } from 'blurhash';

export const generateBlurhash = (imageFile: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    img.onload = () => {
      // Resize canvas for blurhash (smaller is faster)
      const maxSize = 64;
      const ratio = Math.min(maxSize / img.width, maxSize / img.height);
      canvas.width = Math.floor(img.width * ratio);
      canvas.height = Math.floor(img.height * ratio);

      ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);

      const imageData = ctx?.getImageData(0, 0, canvas.width, canvas.height);
      if (imageData) {
        try {
          const blurhash = encode(
            imageData.data,
            canvas.width,
            canvas.height,
            4,
            4
          );
          resolve(blurhash);
        } catch (error) {
          reject(new Error('Failed to generate blurhash'));
        }
      } else {
        reject(new Error('Failed to get image data'));
      }
    };

    img.onerror = () => reject(new Error('Failed to load image'));
    img.crossOrigin = 'anonymous';
    img.src = URL.createObjectURL(imageFile);
  });
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const isValidImageFile = (file: File): boolean => {
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  const maxSize = 8 * 1024 * 1024; // 8MB
  return validTypes.includes(file.type) && file.size <= maxSize;
};
