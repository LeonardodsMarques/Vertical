import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";

import { updateCategory, createCategory } from "../services/api";

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "white",
  boxShadow: 24,
  p: 4,
};

type Category = {
  id?: number;
  title: string;
  description: string;
};

type Props = {
  category?: Category;
  onClose: () => void;
  isUpdateMode: boolean; 
};

const CategoryModalForm: React.FC<Props> = ({ category, onClose, isUpdateMode }) => {
  const [formData, setFormData] = useState<Category>({
    title: category ? category.title : '',
    description: category ? category.description : '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isUpdateMode && category) {
        await updateCategory(category.id!, formData);
      } else {
        await createCategory(formData);
      }
      onClose();
    } catch (error) {
      console.error("Error updating/creating category:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Modal
      open={true}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          textAlign="center"
          mb={3}
        >
          {isUpdateMode ? "Update Category" : "Create Category"}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            variant="outlined"
            multiline
            rows={4}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            {isUpdateMode ? "Update" : "Create"}
          </Button>
          <Button
            onClick={onClose}
            variant="outlined"
            color="secondary"
            fullWidth
          >
            Cancel
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default CategoryModalForm;
