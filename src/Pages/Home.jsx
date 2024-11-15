import React, { useEffect, useState } from "react";
import { Form, Input, message, Modal, Select, Table, DatePicker } from "antd";
import { Layout } from "../Layout/Layout";
import { v4 as uuidv4 } from "uuid";
import {
  EditOutlined,
  AreaChartOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import moment from "moment";
import { Analytics } from "../Components/Analytics";
import "./home.css";

export const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [allTransaction, setTransaction] = useState([]);
  const [freq, setFreq] = useState("30");
  const { RangePicker } = DatePicker;
  const [CustomDate, setCustomDate] = useState([]);
  const [type, setType] = useState("all");
  const [edit, setEdit] = useState(null);
  const [View, setView] = useState("table");
  const [update, setupdate] = useState(true)
  const [form] = Form.useForm();

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "0",
      render: (text) => <span>{moment(text).format("DD-MM-YYYY")}</span>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "1",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "2",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "3",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "4",
    },
    {
      title: "Reference No",
      dataIndex: "reference",
    },
    {
      title: "Actions",
      render: (text, record) => (
        <div className="flex justify-around w-[3rem]">
          <EditOutlined
            onClick={() => {
              setupdate(false)
              setEdit(record);
              setShowModal(true);
              form.setFieldsValue(record);
            }}
          />
        </div>
      ),
    },
  ];
  const getT = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const res = await fetch("https://expense-management-oj0z.onrender.com/get", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user, freq, CustomDate, type }),
      });
      const r = await res.json();
      const transactions = r.map((transaction) => ({
        ...transaction,
        key: uuidv4(),
      }));
      setTransaction(transactions);
    } catch (error) {}
  };

  useEffect(() => {
    const getTransaction = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const res = await fetch("https://expense-management-oj0z.onrender.com/get", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user, freq, CustomDate, type }),
        });
        const r = await res.json();
        const transactions = r.map((transaction) => ({
          ...transaction,
          key: uuidv4(),
        }));
        setTransaction(transactions);
      } catch (error) {}
    };
    getTransaction();
  }, [freq, CustomDate, type]);


  const handleSubmit = async (value) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if(update){
        const res = await fetch("https://expense-management-oj0z.onrender.com/add", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...value, user }),
        });
        message.success("Transaction added");
        await res.json();
        setShowModal(false);
        form.resetFields();
      }
      else{
        const res = await fetch("https://expense-management-oj0z.onrender.com/edit", {method: "PUT", headers: {"Content-Type": "application/json"}, body: JSON.stringify({...value, user})})
        await res.json()
        message.success("Transaction Updated")
        setShowModal(false)
      }
      getT();
    } catch (err) {
    }
  };

  return (
    <Layout>
      <div className="container w-full">
        <div className="filter m-auto flex w-[100vw] justify-between py-5 px-8">
          <div className="flex items-center">
            <Select value={freq} onChange={(values) => setFreq(values)}>
              <Select.Option value="7">Last 1 Week</Select.Option>
              <Select.Option value="30">Last 30 Days</Select.Option>
              <Select.Option value="365">Last 1 Year</Select.Option>
              <Select.Option value="custom">Custom</Select.Option>
            </Select>
            {freq === "custom" && (
              <RangePicker
                value={CustomDate}
                onChange={(values) => {
                  setCustomDate(values);
                }}
              />
            )}
          </div>
          <div className="flex w-[10%] items-center">
            <Select
              className="w-[100%]"
              value={type}
              onChange={(values) => setType(values)}
            >
              <Select.Option value="all">All</Select.Option>
              <Select.Option value="Income">Income</Select.Option>
              <Select.Option value="Expense">Expense</Select.Option>
            </Select>
          </div>
          <div className="analytics gap-2 text-2xl flex items-center">
            <UnorderedListOutlined onClick={() => setView("table")} />
            <AreaChartOutlined onClick={() => setView("graph")} />
          </div>
          <div className="Add Button">
            <button
              className="flex m-auto items-center group cursor-pointer outline-none hover:rotate-90 duration-300"
              onClick={() => {
                setShowModal(true);
                setEdit(null);
                form.resetFields();
              }}
            >
              <svg
                className="stroke-teal-500 fill-none group-active:stroke-teal-200 group-active:fill-teal-600 group-active:duration-0 duration-300"
                viewBox="0 0 24 24"
                height="50px"
                width="50px"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeWidth="1.5"
                  d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                ></path>
                <path strokeWidth="1.5" d="M8 12H16"></path>
                <path strokeWidth="1.5" d="M12 16V8"></path>
              </svg>
            </button>
          </div>
        </div>
        <Modal
          title={edit ? "Edit Transaction" : "Add Transaction"}
          open={showModal}
          onCancel={() => {
            setShowModal(false);
          }}
          footer={false}
        >
          <Form form={form} layout="vertical" onFinish={handleSubmit}>
            <Form.Item label="Amount" name="amount">
              <Input type="text" />
            </Form.Item>
            <Form.Item label="Type" name="type">
              <Select>
                <Select.Option value="Income">Income</Select.Option>
                <Select.Option value="Expense">Expense</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Category" name="category">
              <Select>
                <Select.Option value="Salary">Salary</Select.Option>
                <Select.Option value="Fee">Fee</Select.Option>
                <Select.Option value="Food">Food</Select.Option>
                <Select.Option value="Bills">Bills</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label={`Reference No (Unique)`} name="reference">
              <Input type="text" />
            </Form.Item>
            <Form.Item label="Description (Optional)" name="description">
              <Input type="text" />
            </Form.Item>
            <Form.Item label="Date" name="date">
              <Input type="date" />
            </Form.Item>
            <div className="flex justify-end">
              <button type="submit">Save</button>
            </div>
          </Form>
        </Modal>
        <div className="content glass w-[100vw] p-8 ">
          {View === "table" ? (
            <Table columns={columns} dataSource={allTransaction} />
          ) : (
            <Analytics allTransaction={allTransaction} />
          )}
        </div>
      </div>
    </Layout>
  );
};
