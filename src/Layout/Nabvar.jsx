import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {message, Modal} from 'antd';
import { UserOutlined } from '@ant-design/icons';

export const Nabvar = () => {
  const Navigate = useNavigate();
  const [loginuser,setuser] = useState('');
  const [showModal,setShowModal] = useState(false);
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem('user'));
    if(user){
      setuser(user);
    }
  },[])

  const logoutHandler = () =>{
    localStorage.removeItem('user');
    Navigate('/login');
    message.success("Logout Successful");
  }
  return (
    <nav>
      <ul className="flex border-b-2 border-gray-400 w-full h-[10vh] justify-around items-center">
        <li>
          <Link to="/">Home</Link>
        </li>
        <div className="userside flex">
          <ul className="flex gap-5">
          <li>
            {loginuser && <UserOutlined  onClick={()=>{setShowModal(true)}}/>}
            <Modal 
            title={`Username: ${loginuser.name}`}
            open={showModal}
            onCancel={() => {
            setShowModal(false);
          }}
          footer={false}
        ></Modal>
        </li>
        <li>
          <button onClick={logoutHandler}>Logout</button>
        </li>
          </ul>
        </div>
        
      </ul>
    </nav>
  )
}
