import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

class DishDetail extends Component {
    renderComments (dish){
        let div = "";
        let commentComponent = [];
        if (dish != null ) {
            dish.map((comment) => {
                commentComponent.push(
                    <li className="list-group">
                        <span className="mb-3">{comment.comment}</span>
                        <span className="mb-3">--{comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</span>
                    </li>
                )
            });

            div = (
                <div>
                    <h4>Comments</h4>
                    <ul className="list-unstyled">
                        {commentComponent}
                    </ul>
                </div>
            );
        }
        return( <div>{ div }</div> );
    }
    render() {
        let div = "";
        if (this.props.dish != null ) {
            div = (
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-5 m-1">
                            <Card>
                                <CardImg width="100%" src = { this.props.dish.image } alt = { this.props.dish.name } />
                                <CardBody>
                                    <CardTitle>{ this.props.dish.name }</CardTitle>
                                    <CardText>{ this.props.dish.description }</CardText>
                                </CardBody>
                            </Card>
                        </div>
                        <div className="col-12 col-md-5 m-1">
                            {this.renderComments(this.props.dish.comments)}
                        </div>
                    </div>
                </div>
            );
        }
        return( <div>{ div }</div> )
    }
}

export default DishDetail;