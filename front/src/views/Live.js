import { current } from "@reduxjs/toolkit";
import { useEffect, useRef, useState } from "react";
import { debounce } from 'lodash';
import Ratio from "react-ratio"

import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardTitle,
    Row,
    Col,
  } from "reactstrap";


  function Live(){
    
    var videoSrc = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
    var videoRef = useRef();
    var videoParentRef = useRef();
    var updateSize = debounce(() => {
        videoRef.current.width = videoParentRef.current?.offsetWidth
        videoRef.current.height = videoParentRef.current?.offsetHeight
    } , 50)
    
    useEffect(() => {
        updateSize()
        /* 화면 크기가 변경 될 때마다 함수 실행 */
        window.addEventListener("resize", updateSize);
        return () => window.removeEventListener("resize", updateSize);
      }, []);

    return(
        <>
        <div className="content" style={{ width:"100%" , height:"100%"}}>
            <Row>
                <p>라이브 방소오옹</p>
                
            </Row>
            <Row>
                <Col sm={9}>
                    <div ref={videoParentRef} style={{backgroundColor:"blue"}} >
                        <Ratio ratio = { 16/9 }>
                            <video ref={videoRef} controls> 
                                <source src={videoSrc}></source>
                            </video>
                        </Ratio>
                    </div>
                </Col>
                <Col sm={3}>
                    <div style={{backgroundColor:"skyblue"}}>
                        <p>채팅창</p>
                    </div>
                </Col>
            </Row>
        </div>
        </>
    );
  }

  export default Live;