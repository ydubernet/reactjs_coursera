import React from 'react';
import { Card, CardImg, CardText, CardBody } from 'reactstrap';

function RenderDish({dish}) {
    return(
        <Card>
            <CardImg width="100%" src={dish.image} alt={dish.name} />
            <CardBody>
                <CardText>{dish.name}</CardText>
                <CardText>{dish.description}</CardText>
            </CardBody>
        </Card>
    );
}

function RenderComments({comments}) {
    if(comments != null && comments.length > 0)
    {
        return(
        <div>
            <div><h4>Comments</h4></div>
            <div>
                <ul className="list-unstyled">
                    {
                        comments.map((c) => 
                        {
                            return(
                                <li key={c.id}>
                                    <p>{c.comment}</p>
                                    <p>{c.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(c.date)))}</p>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
        );
    }
    else
        return(
            <div className="col"></div>
        );
}

    const DishDetail = (props) =>
    {
        if(props.dish != null)
        {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-5 m-1">
                            <RenderDish dish={props.dish} />
                        </div>
                        <div className="col-12 col-md-5 m-1">
                            <RenderComments comments={props.dish.comments} />
                        </div>
                    </div>
                </div>
            );
        }
        else
        {
            return(
                <div></div>
            )
        }
    };


export default DishDetail;