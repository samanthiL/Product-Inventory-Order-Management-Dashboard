import axios from "axios";
import type { Product } from "../store/productSlice";

const API_URL = "http://localhost:3001/products";

// Get all products
export const getProducts = async (): Promise<Product[]> => {
  const response = await axios.get<Product[]>(API_URL);
  return response.data;
};

// Get product by ID
export const getProductById = async (id: string): Promise<Product> => {
  const response = await axios.get<Product>(`${API_URL}/${id}`);
  return response.data;
};

// Update product
export const updateProduct = async (
  product: Product
): Promise<Product> => {
  const response = await axios.put<Product>(
    `${API_URL}/${product.id}`,
    product
  );
  return response.data;
};
