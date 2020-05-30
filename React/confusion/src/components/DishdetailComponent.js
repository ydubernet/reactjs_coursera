import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody,  CardTitle, ListGroup } from 'reactstrap';

class DishDetail extends Component {

  constructor(props) {
      super(props);
      //console.log('ctor props:', props)

      this.state = {
          dish: []
      }
  }

  componentWillReceiveProps(nextProps) {
    //console.log('componentWillReceiveProps props:', nextProps)
    this.setState({ dish: nextProps.dish });  
  }

  renderDish(dish) {
      if (dish != null)
          return(
              <div className="col-12 col-md-5 m-1">
                <Card>
                    <CardImg width="100%" src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardText>{dish.name}</CardText>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
              </div>
          );
      else
          return(
              <div className="col"></div>
          );
  }

  renderComments(comments) {
    if(comments != null && comments.length > 0)
    {
       return(
        <div className="col-12 col-md-5 m-1">
            <div><h4>Comments</h4></div>
            <div>
                <ul className="list-unstyled">
                    {
                        comments.map((c) => 
                        {
                            return(
                                <li key={c.id}>
                                    <p>{c.comment}</p>
                                    <p>{c.author} , {new Date(c.date).toLocaleDateString()}</p>
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

  render() {
      return (
          <div className="container">
            <div className="row">
                {this.renderDish(this.state.dish)}
                {this.renderComments(this.state.dish.comments)}
            </div>
          </div>
      );
  }
}

export default DishDetail;