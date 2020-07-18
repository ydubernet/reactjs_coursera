import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, Breadcrumb, BreadcrumbItem,
         Button, ModalHeader, ModalBody, Modal, Label, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

import Loading from "./LoadingComponent";

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);

class CommentForm extends Component
{
    constructor(props) {
        super(props);

        this.state = {
          isModalOpen: false
        };

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        this.toggleModal();
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
    }

    render()
    {
        return(
            <div>
                <Modal isOpen={this.state.isModalOpen} toggle={this.state.toggleModal}>
                    <ModalHeader toggle={this.state.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="rating">Rating</Label>
                                <Control.select model=".rating" id="rating" name="rating"
                                    placeholder="Rating"
                                    className="form-control"
                                    defaultValue="1"
                                >
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </Control.select>   
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="name">Your Name</Label>
                                <Control.text model=".author" id="name" name="name"
                                    placeholder="Your Name"
                                    className="form-control"
                                    validators={{
                                        required,
                                        minLength: minLength(3),
                                        maxLength: maxLength(15)
                                    }}/>
                                <Errors className="text-danger"
                                        model=".name"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less',
                                        }}
                                />
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment">Comment</Label>
                                <Control.textarea model=".comment" id="comment" name="comment"
                                    placeholder="Comment"
                                    className="form-textarea"
                                    style={{height: 200, width: 200}}
                                />
                            </Row>
                            <Button type="submit" value="submit" color="primary">Submit</Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>

                <Button outline type="submit"
                    onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"></span> Submit Comment</Button>
            </div>
        );
    }
}

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

function RenderComments({comments, addComment, dishId}) {
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
            <CommentForm dishId={dishId} addComment={addComment}/>
        </div>
        );
        
    }
    else
        return(
            <div className="col">
                <CommentForm dishId={dishId} addComment={addComment}/>
            </div>          
        );      
}

    const DishDetail = (props) =>
    {
        if(props.isLoading){
            return(
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        }
        else if(props.errMess) {
            return(
                <div className="container">
                    <div className="row">
                        <h4>{props.errMess}</h4>
                    </div>
            </div>
            );
        }
        if(props.dish != null)
        {
            return (
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{props.dish.name}</h3>
                            <hr />
                        </div>                
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-5 m-1">
                            <RenderDish dish={props.dish} />
                        </div>
                        <div className="col-12 col-md-5 m-1">
                            <RenderComments comments={props.comments} 
                                addComment={props.addComment}
                                dishId={props.dish.id}
                            />
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