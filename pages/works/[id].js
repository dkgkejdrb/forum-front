import { useRouter } from "next/router";
import { Layout, Space, Menu, Carousel, Card } from 'antd';
import { EyeOutlined, SmileOutlined, MessageOutlined } from "@ant-design/icons";
import { useEffect, useMemo, useState, useRef } from 'react';
import Image from "next/image";
import logo from "/public/main.png";
import { connectDB } from '../api/MongoClient';
import axios from "axios";
import { debounce } from 'lodash';
import Link from 'next/link';

export async function getServerSideProps() {
    let client = await connectDB;
    let db = client.db('forum');
    let result = await db.collection('mywork').find().toArray();
    return {
      props: {
        result: JSON.parse(JSON.stringify(result))
      }
    }
  }

const Works = (result) => {
    // 작품 id: router.query.id
    const router = useRouter();

    const { Header, Footer, Content } = Layout;
    const { Meta } = Card;

const headerStyle = {
    textAlign: 'center',
    color: '#fff',
    height: 74,
    paddingInline: 50,
    lineHeight: '64px',
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottom: "1px solid #ececec",
    width: "100%"
  };
  const contentStyle = {
    minHeight: 800,
    color: '#fff',
    display: 'flex',
    justifyContent: 'center',
    paddingBottom: 48
  };
  const footerStyle = {
    display: "flex",
    justifyContent: "flex-end",
    height: 65,
    textAlign: 'center',
    fontWeight: '700',
    color: '#858585',
    backgroundColor: '#fff',
    borderTop: '1px solid #ececec'
  };
  const carouselStyle = {
    margin: 0,
    width: 220, 
    height: 230
  };
  const CarouselDownStyleTitle = {
    fontSize: 17,
    fontWeight: 600,
    color: "white",
    letterSpacing: "-.4px"
  }
  const CarouselDownStyleCnt = {
    fontSize: 13,
    color: "white",
    opacity: 0.7
  }

  const [current, setCurrent] = useState('myWork');
    
  const onClickMenu = (e) => {
      setCurrent(e.key);
  };

  const items = [
    {
      label: "작품",
      key: "myWork",
    },
    {
      label: "About",
      key: "about",
    },
  ];

  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };

  
  // 스크롤 위치 가져오기
  const [position, setPosition] = useState(0);
  // const onScroll = () => {
  //   setPosition(window.scrollY);
  //   console.log(window.scrollY);
  // }
  const onScroll = debounce(()=>{
    setPosition(window.scrollY);
    console.log(window.scrollY);
  }, 1000)
  // 디바운스 연속된 이벤트중 가장 마지막 이벤트(시간 설정할 수 있음)를 실행


return (
<>
<Space
        direction="vertical"
        style={{
          width: "100%",
        }}
        size={[0, 48]}
      >
        <Layout>
          <Header style={headerStyle}>
            <div style={{ width: 1248, display: "flex" }}>
              <Image
                src={logo}
                alt=""
                width={60}
                height={60}
                style={{ borderRadius: "50%" }}
              />
              <div
                style={{
                  color: "#111",
                  letterSpacing: "-.3px",
                  fontWeight: "bold",
                  marginLeft: 24,
                }}
              >
                밍끄 (Mink_EJJ)
              </div>
              <Menu
                mode="horizontal"
                onClick={onClickMenu}
                selectedKeys={[current]}
                items={items}
                style={{
                  color: "#777",
                  marginLeft: 65,
                  width: 245,
                  fontWeight: 600,
                }}
              />
            </div>
          </Header>
          <Content style={contentStyle}>
            <div style={{ width: 1248 }}>
                <div dangerouslySetInnerHTML={{ __html: result.result[0].htmlText }}></div>
            </div>
          </Content>
          <Footer style={footerStyle}>
            <div>새벽 밤, 나의 마음 속 그림을 읽어드립니다.  @밍끄 (Mink_EJJ)</div>
          </Footer>
        </Layout>
      </Space>
</>

);
    
}

export default Works;