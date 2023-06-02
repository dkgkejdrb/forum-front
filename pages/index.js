import { Layout, Space, Menu, Carousel, Card } from 'antd';
import { EyeOutlined, SmileOutlined, MessageOutlined } from "@ant-design/icons";
import { useEffect, useMemo, useState, useRef } from 'react';
import Image from "next/image";
import logo from "/public/main.png";
import { connectDB } from './api/MongoClient';
import { useRouter } from "next/router";
import axios from "axios";
import thumbIllust from "/public/thumbIllust1.png";
import thumbPhoto from "/public/thumbPhoto1.jpg";
import thumbDrawing from "/public/thumbDrawing1.jpg";
import thumbDesign from "/public/thumbDesign1.png";
import thumbCalli from "/public/thumbCalli1.jpg";
import thumbAni from "/public/thumbAni1.jpg";
import thumbEtc from "/public/thumbEtc1.jpg";
import uuid from 'react-uuid';
import dynamic from 'next/dynamic';
import { debounce } from 'lodash';

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

const CardAvatar = () => {
  return(
    <Image alt="" style={{marginTop: 2, width: 25, height: 25, borderRadius: "50%"}} src={logo} />
  );
}

export default function Home(result) {
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

  // 중요, 일러스트, 사진, 회화, 디자인, 캘리그라피, 애니메이션, 기타 배열
  const [arrIllust, setArrIllust] = useState([]);
  const [arrPhoto, setArrPhoto] = useState([]);
  const [arrDrawing, setArrDrawing] = useState([]);
  const [arrDesign, setArrDesign] = useState([]);
  const [arrCalli, setArrCalli] = useState([]);
  const [arrAni, setArrAni] = useState([]);
  const [arrEtc, setArrEtc] = useState([]);
  // 전체 작품 리스트
  const worksList= result.result.reverse();

  useEffect(()=>{
    let _arrIllust = [];  let _arrPhoto = []; let _arrDrawing = [];
    let _arrDesign = [];  let _arrCalli = []; let _arrAni = [];
    let _arrEtc = [];

    result.result.forEach((row)=>{
      console.log(row);
      const _category = row.category;
      switch(_category) {
        case "일러스트":
          _arrIllust.push(row);
          break;
        case "사진":
          _arrPhoto.push(row);
          break;
        case "회화":
          _arrDrawing.push(row);
          break;
        case "디자인":
          _arrDesign.push(row);
          break;
        case "캘리그라피":
          _arrCalli.push(row);
          break;
        case "애니메이션":
          _arrAni.push(row);
          break;
        case "기타":
          _arrEtc.push(row);
          break;
      }
      setArrIllust(_arrIllust);
      setArrPhoto(_arrPhoto);
      setArrDrawing(_arrDrawing);
      setArrDesign(_arrDesign);
      setArrCalli(_arrCalli);
      setArrAni(_arrAni);
      setArrEtc(_arrEtc);
    })
  },[])
  
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

  // useEffect(()=>{
  //   const timer = setInterval(() => { 
  //     window.addEventListener("scroll", onScroll);
  //   }, 1000)
  //   return() => {
  //     clearInterval(timer);
  //     window.removeEventListener("scroll", onScroll);
  //   }
  // }, [])
  // useEffect(()=>{
  //     window.addEventListener("scroll", onScroll);
  //   return() => {
  //     window.removeEventListener("scroll", onScroll);
  //   }
  // }, [])

  ///////////////////////////////

  ///////////////////////////////


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
              <div style={{ display: "flex", color: "black" }}>
                <h3>Category</h3>
              </div>
              <Carousel
                arrows
                dots={false}
                slidesToShow={5}
                afterChange={onChange}
              >
                <div>
                  <div style={carouselStyle}>
                    <Image src={thumbIllust} alt="220/170(5.8/4.5)" />
                    <div
                      style={{
                        display: "flex",
                        height: 60,
                        justifyContent: "space-around",
                        alignItems: "center",
                        backgroundColor: "#f07006",
                      }}
                    >
                      <div style={CarouselDownStyleTitle}>일러스트</div>
                      <div style={CarouselDownStyleCnt}>{arrIllust.length}</div>
                    </div>
                  </div>
                </div>
                <div>
                  <div style={carouselStyle}>
                    <Image src={thumbPhoto} alt="220/170(5.8/4.5)" />
                    <div
                      style={{
                        display: "flex",
                        height: 60,
                        justifyContent: "space-around",
                        alignItems: "center",
                        backgroundColor: "#fbe187",
                      }}
                    >
                      <div style={CarouselDownStyleTitle}>사진</div>
                      <div style={CarouselDownStyleCnt}>{arrPhoto.length}</div>
                    </div>
                  </div>
                </div>
                <div>
                  <div style={carouselStyle}>
                    <Image src={thumbDrawing} alt="220/170(5.8/4.5)" />
                    <div
                      style={{
                        display: "flex",
                        height: 60,
                        justifyContent: "space-around",
                        alignItems: "center",
                        backgroundColor: "#f5bf19",
                      }}
                    >
                      <div style={CarouselDownStyleTitle}>회화</div>
                      <div style={CarouselDownStyleCnt}>
                        {arrDrawing.length}
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div style={carouselStyle}>
                    <Image src={thumbDesign} alt="220/170(5.8/4.5)" />
                    <div
                      style={{
                        display: "flex",
                        height: 60,
                        justifyContent: "space-around",
                        alignItems: "center",
                        backgroundColor: "#c2acb1",
                      }}
                    >
                      <div style={CarouselDownStyleTitle}>디자인</div>
                      <div style={CarouselDownStyleCnt}>{arrDesign.length}</div>
                    </div>
                  </div>
                </div>
                <div>
                  <div style={carouselStyle}>
                    <Image src={thumbCalli} alt="220/170(5.8/4.5)" />
                    <div
                      style={{
                        display: "flex",
                        height: 60,
                        justifyContent: "space-around",
                        alignItems: "center",
                        backgroundColor: "#a4a9a8",
                      }}
                    >
                      <div style={CarouselDownStyleTitle}>캘리그라피</div>
                      <div style={CarouselDownStyleCnt}>{arrCalli.length}</div>
                    </div>
                  </div>
                </div>
                <div>
                  <div style={carouselStyle}>
                    <Image src={thumbAni} alt="220/170(5.8/4.5)" />
                    <div
                      style={{
                        display: "flex",
                        height: 60,
                        justifyContent: "space-around",
                        alignItems: "center",
                        backgroundColor: "#bdafa5",
                      }}
                    >
                      <div style={CarouselDownStyleTitle}>애니메이션</div>
                      <div style={CarouselDownStyleCnt}>{arrAni.length}</div>
                    </div>
                  </div>
                </div>
                <div>
                  <div style={carouselStyle}>
                    <Image src={thumbEtc} alt="220/170(5.8/4.5)" />
                    <div
                      style={{
                        display: "flex",
                        height: 60,
                        justifyContent: "space-around",
                        alignItems: "center",
                        backgroundColor: "#cbbee2",
                      }}
                    >
                      <div style={CarouselDownStyleTitle}>기타</div>
                      <div style={CarouselDownStyleCnt}>{arrEtc.length}</div>
                    </div>
                  </div>
                </div>
              </Carousel>
              {/* Artwork */}
              <div style={{ width: "100%" }}>
                <div style={{ width: 1248 }}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      color: "black",
                      width: "100%",
                      justifyContent: "flex-start",
                    }}
                  >
                    <h3>Artwork</h3>
                    <div
                      className="container"
                      style={{
                        width: "100%",
                        minHeight: 120,
                        display: "grid",
                        gridTemplateColumns:
                          "repeat(auto-fill, minmax(300px, auto))",
                        // gridAutoRows: "repeat(auto-fill, minmax(300px, auto))",
                        rowGap: 10,
                      }}
                    >
                      {worksList.map((work) => {
                        return (
                          <div key={uuid()} className="item">
                            <Card
                              hoverable
                              style={{
                                width: 300
                              }}
                              cover={<img alt="example" src={work.thumbnail} />}
                            >
                              <Meta style={{ height: 30 }} title={work.title}></Meta>
                              <div style={{ marginTop: 5, marginBottom: 10, height: 30, display: "flex" }}>
                                <CardAvatar />
                                <div style={{ paddingLeft: 2, display: "flex", alignItems: "center", fontSize: 13, color: "#aaa" }}>
                                  <div>밍끄</div>
                                  <div>&#183;</div>
                                  <div>mink_ejj</div>
                                </div>
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  fontSize: 15,
                                  paddingTop: 10,
                                  borderTop: "1px solid #ececec",
                                  width: 298,
                                  position: "relative",
                                  right: 23
                                }}
                              >
                                <div style={{width: "100%", display: "flex", justifyContent: "flex-end", alignItems: "center", paddingRight: 24,  fontSize: 13, color: "#aaa" }}>
                                  <div style={{marginRight: 151}}>{work.date}</div>
                                  <EyeOutlined />
                                  <div style={{marginLeft: 6}}>{45}</div>
                                </div>
                              </div>
                            </Card>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
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