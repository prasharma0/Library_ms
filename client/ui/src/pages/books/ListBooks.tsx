import { Table, Button, Modal, Input, Select } from "antd";
import Cookies from "js-cookie";
import axios from "axios";
import React, { useEffect, useState } from "react";
import CustomBereadcrumb from "../../components/CustomBereadcrumb";
import MainComponent from "../../components/MainComponent";
import TitleComponent from "../../components/TitleComponent";
import ButtonComponent from "../../components/ButtonComponent";
const { Option } = Select;

interface ICategory {
  _id: string;
  genre: string;
}
interface IBook {
  _id?: string;
  author: string;
  title: string;
  status: boolean;
  category?: ICategory;
}

const ListBooks = () => {
  const [books, setBooks] = useState([] as IBook[]);
  const [newBook, setNewBook] = useState({} as IBook);
  const [showModal, setShowModal] = useState(false as boolean);
  const [categories, setCategories] = useState([] as ICategory[]);
  const [newCat, setNewCat] = useState("" as string);

  axios.defaults.headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${Cookies.get("access_token")}`,
  };

  const getAllBooks = async () => {
    const response = await axios.get("http://localhost:5000/api/books");
    setBooks(response.data.data); 
  };

  const getAllCategories = async () => {
    const response = await axios.get("http://localhost:5000/api/genre");
    setCategories(response.data.data);
  };

  const handleInputChange = (event: any) => {
    event.persist();
    setNewBook({ 
      ...newBook,
      [event.target.name]: event.target.value,
    });
  };

  const handleFormSubmit = async () => {
    let tempBook = { ...newBook, category: newCat };
    const response = newBook._id 
      ? await axios.patch(
          `http://localhost:5000/api/books/${newBook._id}`,
          tempBook 
        )
      : await axios.post("http://localhost:5000/api/books", tempBook); 

    setShowModal(false);
    getAllBooks();
  };

  const handleBookEdit = async (id: string) => {
    console.log("Handle Book Edit");
    if (id.length < 1) {
      return;
    }
    const response = await axios.get(`http://localhost:5000/api/books/${id}`);
    setNewBook(response.data.data);
    setNewCat(response.data.data.category);
    setShowModal(true);
  };
  const handleCancel = () => {
    setNewBook({
      title: "",
      author: "",
      category: { _id: "", genre: "" },
      status: true,
    });
    setShowModal(false);
  };
  const handleBookDelete = async (id: string) => {
    const response = await axios.delete(
      `http://localhost:5000/api/books/${id}`
    );
    getAllBooks();
  };

  const handleCategoryChange = (value: string) => {
    setNewCat(value);
  };

  const bookColumns = [
    { title: "Book Title", dataIndex: "title", key: "title" },
    {
      title: "Book Author",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "Genre",
      dataIndex: "category",
      key: "category",
      render: (category: ICategory) => category.genre,
    },
    {
      title: "Operations",
      dataIndex: "_id",
      key: "_id",
      render: (_id: string) => (
        <div className="operation-wrapper">
          <ButtonComponent
            onClick={() => {
              handleBookEdit(_id);
            }}
            type="primary"
            btnText="Edit"
          />

          <ButtonComponent
            onClick={() => {
              handleBookDelete(_id);
            }}
            danger
            type="primary"
            btnText="Delete"
          />
        </div>
      ),
    },
  ];

  const handleClickAddButton = (event: any) => {
    event.persist();
    setNewBook({} as IBook);
    setShowModal(true);
  };

  useEffect(() => {
    getAllBooks();
    getAllCategories();
  }, []);

  return (
    <MainComponent>
      <CustomBereadcrumb items={["Books"]} />
      <TitleComponent
        title="Book List"
        addButton="Add Book"
        addBtnClickFunction={handleClickAddButton}
      />
      <Table dataSource={books} columns={bookColumns} />
      <br />
      <Modal 
        title={newBook._id ? "Edit Book" : "Add Book"}
        visible={showModal}
        onOk={handleFormSubmit}
        onCancel={handleCancel}
      >
        {console.log(newBook)}
        <div className="modal-form">
          <Input
            onChange={handleInputChange}
            value={newBook.title}
            type="text"
            name="title"
            placeholder="Enter Book Name"
          />
          <Input
            onChange={handleInputChange}
            value={newBook.author}
            type="text"
            name="author"
            placeholder="Enter Author Name"
          />
          <Select
            defaultValue={newCat}
            style={{ width: 120 }}
            onChange={handleCategoryChange}
          >
            {categories.map((category, index) => (
              <Option name={newBook.category} key={index} value={category._id}>
                {category.genre}
              </Option>
            ))}
          </Select>
        </div>
      </Modal>
    </MainComponent>
  );
};

export default ListBooks;
