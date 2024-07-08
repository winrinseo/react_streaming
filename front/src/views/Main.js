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

function Main(){

    return (
        <div className="content">
            <Row>
                <StreamCardView/>
                <StreamCardView/>
                <StreamCardView/>
            </Row>
        </div>
    );
}

export default Main;