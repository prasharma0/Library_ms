import { Input, Modal, Select, Table } from "antd";
import { Option } from "antd/lib/mentions";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ButtonComponent from "../../components/ButtonComponent";
import CustomBereadcrumb from "../../components/CustomBereadcrumb";
import MainComponent from "../../components/MainComponent";
import TitleComponent from "../../components/TitleComponent";
import Cookies from "js-cookie";

interface ICategory {
  _id: string;
  genre: string;
}

interface IHistory { 
  _id?: string;
  type: string;
  member: string; 
  book: string;
}

interface IBook {
  _id?: string;
  author: string;
  title: string;
  status: boolean;
  category?: ICategory;
}

interface IMembers {
  _id: string;
  fullName: string;
  membership: string;
}

const HistoryList = () => {
  const [histories, setHistories] = useState([] as IHistory[]);
  const [newHistory, setNewHistory] = useState({} as IHistory);
  const [showModal, setShowModal] = useState(false as boolean);
  const [books, setBooks] = useState([] as IBook[]);
  const [members, setMembers] = useState([] as IMembers[]);

  const [newBook, setNewBook] = useState("" as string);
  const [newMember, setNewMember] = useState("" as string);

  axios.defaults.headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${Cookies.get("access_token")}`,  
  }; 

  const getAllHistories = async () => { 
    const response = await axios.get("http://localhost:5000/api/history"); 
    setHistories(response.data.data);  
  };

  const handleHistoryChange = (event: any) => {
    event.persist(); 
    setNewHistory({
      ...newHistory,
      [event.target.name]: event.target.value, 
    });  
  };

  const handleFormSubmit = async () => {
    const response = await axios.post(
      "http://localhost:5000/api/history", 
      newHistory
    );
    console.log("data",response);
    setShowModal(false);
    getAllHistories();
  };

  const handleHistoryEdit = async (id: string) => {
    console.log("Handle hisstory Edit");
    const response = await axios.get(`http://localhost:5000/api/history/${id}`); 
    setNewHistory(response.data.data); 
    setShowModal(true);  
  };

  const handleCancel = () => {
    setNewHistory({
      type: "",
      member: "",
      book: "",
    });
    setShowModal(false);
  }; 

  const historyColumns = [
    {
      title: "Book Title",
      dataIndex: "book",
      key: "title",
    },
    {
      title: "Full Name",
      dataIndex: "member",
      key: "fullName",
    },
    {
      title: "Type",
      dataIndex: "newHistory",
      key: "type",
    },
    {
      title: "Operations",
      dataIndex: "_id",
      key: "_id",
      render: (_id: string) => (  
        <div className="operation-wrapper">
          <ButtonComponent
            onClick={() => {
              handleHistoryEdit(_id);
            }}
            type="primary"
            btnText="Edit"
          />

          {/* <ButtonComponent
            onClick={() => {
              handleBookDelete(_id);
            }}
            danger
            type="primary"
            btnText="Delete"
          /> */}
        </div>
      ),
    },
  ];

  const getAllBooks = async () => {
    const response = await axios.get("http://localhost:5000/api/books");
    setBooks(response.data.data);
  };

  const getAllMembers = async () => {
    const response = await axios.get("http://localhost:5000/api/member");
    setMembers(response.data.data);
  };

  const handleBookChange = (value: string) => { 
    setNewBook(value);
  };

  const handleMemberChange = (value: string) => {
    setNewMember(value);
  };

  const handleTypeChange = (value: string) => {
    setNewMember(value);
  };

  const handleClickAddButton = (event: any) => {
    event.persist();
    setShowModal(true);
    getAllBooks(); 
   
    
    
  };

  useEffect(() => { 
    getAllHistories();
    getAllMembers();
    getAllBooks(); 
  }, []);

  return (
    <MainComponent>
      <CustomBereadcrumb items={["Histories"]} />
      <TitleComponent
        title="Histories"
        addButton="Add History" 
        addBtnClickFunction={handleClickAddButton}
      />
      <Table dataSource={histories} columns={historyColumns} />
      <br />
      <Modal 
        title={newHistory._id ? "Edit History" : "Add history"}
        visible={showModal}
        onOk={handleFormSubmit}
        onCancel={handleCancel}
      >
        {console.log(newHistory)}
        <div className="modal-form">
          <label>Book Title :</label>
          <Select
            defaultValue={newBook}
            style={{ width: 120 }}
            onChange={handleBookChange} 
            value={newHistory.book}
          >
            {books.map((book, index) => (
              <Option key={String(index)} value={book._id}>
                {book.title}
              </Option>
            ))}
          </Select>
          <br />
          <label>Member Name :</label>
          <Select
            defaultValue={newMember} 
            style={{ width: 120 }}
            onChange={handleMemberChange}
            value={newHistory.member} 
          >
            {members.map((member, index) => (
              <Option key={String(index)} value={member._id}>
                {member.fullName} 
              </Option>
            ))}
          </Select>

          <Select
            defaultValue="Borrow"
            style={{ width: "100%" }}
            onChange={handleTypeChange}
            value={newHistory.type}
          >
            <Option value="Borrow">Borrow</Option>
            <Option value="Return">Return</Option>
          </Select>
        </div>
      </Modal>
    </MainComponent>
  );
};

export default HistoryList;
