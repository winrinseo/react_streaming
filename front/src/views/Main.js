/* 메인페이지 */
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardTitle,
    Row,
    Col,
  } from "reactstrap";

import StreamCardView from "components/StreamCardView";

const streamData = [
    {
        id: 'mystream',
        title: '방송 시작',
        name: '서우린',
        tag : ['game' , 'chat']
    },
    {
        id: 'mystream',
        title: '우잉',
        name: '우웅',
        tag : ['game' , 'chat']
    },
    {
        id: 'mystream',
        title: 'ㅋㅋㅋㅋㅋ',
        name: '묘가지',
        tag : ['game' , 'chat']
    },
];

function Main(){

    return (
        <div className="content">
            <Row>

                {
                    streamData.map((data) => (
                        <Col>
                            <StreamCardView {...data}/>
                        </Col>
                    ))
                }
                
                
            </Row>
        </div>
    );
}

export default Main;