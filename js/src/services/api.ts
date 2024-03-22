import axios from 'axios';
const API_URL = 'http://localhost:3000/categories';

export const fetchCategories = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

export const createCategory = async (category: { title: string; description: string }) => {
  try {
    await axios.post(API_URL, category);
  } catch (error) {
    console.error('Error creating category:', error);
  }
};

export const updateCategory = async (id: number, category: { title: string; description: string }) => {
  try {
    await axios.put(`${API_URL}/${id}`, category);
  } catch (error) {
    console.error('Error updating category:', error);
  }
};

export const deleteCategory = async (id: number) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error('Error deleting category:', error);
  }
};
