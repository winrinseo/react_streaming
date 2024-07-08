import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardText,
    CardTitle,
    CardImg,
    Button
  } from "reactstrap";

function StreamCardView(props){
    return (
        <>
        <Card style={{ width: '18rem' }}>
            <CardImg variant="top" src="holder.js/100px180" />
            <CardBody>
                <CardTitle>방송제목</CardTitle>
                <CardText>
                    이름
                </CardText>
                <Button size='sm' variant="primary">tag</Button>
            </CardBody>
        </Card>
        </>
    );
}

export default StreamCardView;