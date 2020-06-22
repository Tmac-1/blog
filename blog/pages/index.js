import React, { useState } from "react";
import Head from "next/head";
import Link from 'next/link';
import { Row, Col, List } from "antd";
import Header from "../components/Header";
import { CalendarOutlined,VideoCameraOutlined,FireOutlined } from '@ant-design/icons';
import Author from '../components/Author';
import Advert from '../components/Advert';
import Footer from '../components/Footer';
import '../static/style/pages/index.css';
import axios from 'axios';
import  servicePath  from '../config/apiUrl'
import marked from 'marked'
import hljs from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css';

const Home = (props) => {
  // console.log('props',props)
  const [ mylist , setMylist ] = useState(props.data)
  const renderer = new marked.Renderer();
  marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
    sanitize:false,
    xhtml: false,
    highlight: function (code) {
            return hljs.highlightAuto(code).value;
    }
  }); 
  return (
    <div className="container">
      <Head>
        <title>Tmac-1</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <Header />
        <Row className="comm-main" type="flex" justify="center">
          <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
            <div>
              <List
                header={<div>最新日志</div>}
                itemLayout="vertical"
                dataSource={mylist}
                renderItem={(item) => (
                  <List.Item>
                    <div className="list-title">
                      <Link href={{pathname:'detailed',query:{id:item.id}}}>
                          <a>{item.title}</a>
                      </Link>
                    </div>
                    <div className="list-icon">
                      <span>
                         <CalendarOutlined /> {item.addTime}
                      </span>
                      <span>
                         <VideoCameraOutlined /> {item.typeName}
                      </span>
                      <span>
                         <FireOutlined /> {item.view_count}人
                      </span>
                    </div>
                    <div className="list-context"
                     dangerouslySetInnerHTML={{__html:marked(item.introduce)}} 
                    >
                    </div>
                  </List.Item>
                )}
              />
            </div>
          </Col>
          <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
             <Author/>
             <Advert/>
          </Col>
        </Row>
        <Footer/>
      </div>
    </div>
  );
};

Home.getInitialProps = async ()=>{
  let promise = new Promise((resolve)=>{
    axios(servicePath.getArticleList).then((res)=>{
      // console.log('res',res.data)
      resolve(res.data)
    })
  }) 
  return await promise
}

export default Home;
