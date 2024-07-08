import { useEffect, useRef, useState } from "react";



import Video from "components/Video"

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
    
    var streamKey = 'mystream';
    var [activeStream , setActiveStream] = useState(false);


    const checkStreamExists = async () => {
        try {
          const response = await fetch(`http://localhost:8888/api/check-stream?streamKey=${streamKey}`);
          const data = await response.json();
          console.log(data)
          setActiveStream(data['exists']);
        } catch (error) {
          console.error('Error checking stream existence:', error);
          setActiveStream(false);
        }
        
      };

      useEffect(() => {
        // 주기적으로 스트림 존재 여부 확인
        checkStreamExists();
        const interval = setInterval(checkStreamExists, 5000);

        return () => {
            clearInterval(interval);
        }
      }, []);
    

    return(
        <>
        <div className="content" style={{ width:"100%" , height:"100%"}}>
            <Row>
                <p>{activeStream ? '방송중' : '방송 꺼짐'}</p>
                
            </Row>
            <Row>
                <Col sm={9}>  
                    <Video id={streamKey} activeStream={activeStream}/>    
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