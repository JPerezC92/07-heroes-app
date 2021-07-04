interface IImage {
  __esModule: boolean;
  default: string;
}

export const dynamicImportImg = async (imageId: string) => {
  const image: IImage = await import(`../assets/heroes/${imageId}.jpg`);
  return image.default;
};
