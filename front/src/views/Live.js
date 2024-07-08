import { current } from "@reduxjs/toolkit";
import { useEffect, useRef, useState } from "react";
import { debounce } from 'lodash';
import Ratio from "react-ratio"

import flvjs from 'flv.js';

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
    
    var videoSrc = 'http://localhost:8000/live/mystream.flv';

    var [activeStream , setActiveStream] = useState(false);
    var videoRef = useRef();
    var videoParentRef = useRef();
    var flvPlayerRef = useRef();
    const updateSize = debounce(() => {
        videoRef.current.width = videoParentRef.current?.offsetWidth
        videoRef.current.height = videoParentRef.current?.offsetHeight
    } , 50)

    const checkStreamExists = async () => {
        try {
          const response = await fetch(`http://localhost:8888/api/check-stream?streamKey=mystream`);
          const data = await response.json();
          setActiveStream(data['exists']);
        } catch (error) {
          console.error('Error checking stream existence:', error);
          setActiveStream(false);
        }
        console.log(activeStream)
      };
    
    useEffect(() => {
        updateSize()
        /* 화면 크기가 변경 될 때마다 함수 실행 */
        window.addEventListener("resize", updateSize);
        
        // 주기적으로 스트림 존재 여부 확인
        checkStreamExists();
        const interval = setInterval(checkStreamExists, 5000);

        return () => {
            window.removeEventListener("resize", updateSize);
            clearInterval(interval);
        }
      }, []);

      useEffect(() => {
        if (flvjs.isSupported()) {
          const flvPlayer = flvjs.createPlayer({
            type: 'flv',
            url: videoSrc
          });
          flvPlayerRef.current = flvPlayer;
          flvPlayer.attachMediaElement(videoRef.current);
          flvPlayer.load();
          videoRef.current.muted = true;
        //   flvPlayer.play();

          flvPlayer.on(flvjs.Events.LOADED_METADATA, () => {
            flvPlayer.play().catch(error => {
              console.error('Error attempting to play', error);
            });
          });

          flvPlayer.on(flvjs.Events.ERROR, (errorType, errorDetail) => {
            console.error('FLV.js error:', errorType, errorDetail);
            // setError('Stream not available');
          });

        }

        return () => {
            if (flvPlayerRef.current) {
              flvPlayerRef.current.destroy();
            }
        };
        
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
                            <video ref={videoRef} controls muted autoPlay/>
                            
                            
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