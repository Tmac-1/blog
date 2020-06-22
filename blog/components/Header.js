import React, { useState, useEffect } from "react";
import Link from "next/link";
import Router from 'next/router'
import "../static/style/components/header.css";
import { Row, Col, Menu } from "antd";
import {
  HomeOutlined,
  VideoCameraAddOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import axios from "axios";
import servicePath from "../config/apiUrl";

const Header = (props) => {
  const [navArray, setNavArray] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(servicePath.getTypeInfo).then((res) => {
        setNavArray(res.data.data);
        // return res.data.data;
      });
    //   setNavArray(result);
    };
    fetchData();
  }, []);
//   console.log("navArray", navArray);
    //跳转到列表页
    const handleClick = (e)=>{
        if(e.key==1){
            Router.push('/index')
        }else{
            Router.push('/list?id='+e.key)
        }
    }
  return (
    <div className="header">
      <Row type="flex" justify="center">
        <Col xs={24} sm={24} md={10} lg={15} xl={12}>
          <span className="header-logo">Tmac-1</span>
          <span className="header-txt">白马长枪依旧在。</span>
        </Col>

        <Col className="memu-div" xs={0} sm={0} md={14} lg={8} xl={6}>
          <Menu mode="horizontal"  onClick={handleClick}>
            {navArray.map((item,index) => 
                <Menu.Item key={item.id}>
                {item.icon == "home" && <HomeOutlined />}
                {item.icon == "video" && <VideoCameraAddOutlined />}
                {item.icon == "life" && <SmileOutlined />}
                {item.typeName}
                </Menu.Item>
            )}
          </Menu>
        </Col>
      </Row>
    </div>
  );
};

export default Header;
