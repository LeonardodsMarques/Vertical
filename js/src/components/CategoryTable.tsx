import React, { useState, useEffect } from "react";
import { fetchCategories, deleteCategory } from "../services/api";
import CategoryModalForm from "./CategoryModalForm";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";

type Category = {
  id?: number;
  title: string;
  description: string;
};

const CategoryTable: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<
    Category | undefined
  >();
  const [deleteAnchor, setDeleteAnchor] = useState<HTMLButtonElement | null>(
    null
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (categoryId: number) => {
    try {
      console.log(`Deleting category with ID: ${categoryId}`);
      await deleteCategory(categoryId);
      setCategories((prevCategories) =>
        prevCategories.filter((category) => category.id !== categoryId)
      );
      setDeleteAnchor(null);
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const handleUpdate = (category: Category) => {
    setSelectedCategory(category);
    setShowModal(true);
  };

  const handleCreate = () => {
    setSelectedCategory(undefined);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <Button variant="contained" onClick={handleCreate}>
        Add New Category
      </Button>
      {showModal && (
        <CategoryModalForm
          category={selectedCategory}
          onClose={handleCloseModal}
          isUpdateMode={!!selectedCategory}
        />
      )}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell>{category.id}</TableCell>
                <TableCell>{category.title}</TableCell>
                <TableCell>{category.description}</TableCell>
                <TableCell>
                  <Button
                    onClick={(event) => setDeleteAnchor(event.currentTarget)}
                  >
                    Delete
                  </Button>
                  <Popover
                    open={deleteAnchor !== null}
                    anchorEl={deleteAnchor}
                    onClose={() => setDeleteAnchor(null)}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                  >
                    <Typography sx={{ p: 2 }}>
                      Are you sure you want to delete this category?
                    </Typography>
                    <Button
                      onClick={() => handleDelete(category.id!)}
                      color="error"
                    >
                      Confirm
                    </Button>
                  </Popover>
                  <Button onClick={() => handleUpdate(category)}>Update</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CategoryTable;
