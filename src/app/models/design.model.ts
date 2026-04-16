export interface Design {

  id: string;
  name: string;
  price: number;
  imageUrl: string;

  arModel?: {
    modelUrl: string;
    textureUrl: string;
  };

}