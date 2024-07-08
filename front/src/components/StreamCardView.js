import { useNavigate } from "react-router-dom";
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
    const navigate = useNavigate();
    const goToLive = () => {
        navigate(`/live/${props.id}`)
    }
    return (
        <>
        <Card style={{ width: '18rem' }} onClick={()=>goToLive()}>
            <CardImg variant="top" src="holder.js/100px180" />
            <CardBody>
                <CardTitle>{props.title}</CardTitle>
                <CardText>
                    {props.name}
                </CardText>
                {
                    props.tag.map( (data , i) => (
                        <Button size='sm' variant="primary" key={i}>{data}</Button>
                    ))
                }
                
            </CardBody>
        </Card>
        </>
    );
}

export default StreamCardView;