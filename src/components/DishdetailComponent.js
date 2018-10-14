import React, { Component } from 'react';
import {Card,CardImg,CardText,CardBody,CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Label, Col, Row} from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';

import { Link } from 'react-router-dom';
const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false
        };
        this.toggleModal = this.toggleModal.bind(this);
    }

    handleSubmit(values) {
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
    }

     toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }
     render() {
        return (
             <div>
            <Button outline color="secondary"  onClick={this.toggleModal}>
                <span className="fa fa-pencil fa-lg"></span> Submit Comment
            </Button>
             <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader>Submit Comment</ModalHeader>
                <ModalBody>
                    <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                        <Row className="form-group">
                            <Label htmlFor="rating" className="ml-3">Rating</Label>
                                <Col md={12}>
                                    <Control.select model=".rating" id="rating" name="rating"
                                        className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>    
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="yourname" className="ml-3">Your Name</Label>
                                <Col md={12}>
                                    <Control.text model=".yourname" id="yourname"
                                        name="yourname" placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                         />
                                    <Errors
                                        className="text-danger"
                                        model=".yourname"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                     />
                                   
                                </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="yourname" className="ml-3">Comment</Label>
                                <Col md={12}>
                                    <Control.textarea model=".comment" id="comment"
                                        name="comment" placeholder="Comment"
                                        rows="6" className="form-control" />
                                </Col>
                        </Row>
                        <Row className="form-group">
                            <Col>
                                <Button type="submit" color="primary">
                                Submit
                                </Button>
                            </Col>
                        </Row>
                    </LocalForm>
                </ModalBody>
            </Modal>
            </div>
        );
    }
}
    function RenderComments ({comments, addComment, dishId}){
        let div = "";
        if (comments != null ) {
            const commentComponent = comments.map((comment) => {
                return(
                    <li className="list-group" key={comment.id}>
                        <span className="mb-3">{comment.comment}</span>
                        <span className="mb-3">--{comment.author}, {new Intl.DateTimeFormat('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: '2-digit'
                        }).format(new Date(Date.parse(comment.date)))}</span>
                    </li>
                )
            });

            div = (
                <div>
                    <h4>Comments</h4>
                    <ul className="list-unstyled">
                        {commentComponent}
                        <CommentForm dishId={dishId} addComment={addComment} />
                    </ul>
                </div>
            );
        }
        return( <div>{ div }</div> );
    }
    
    function RenderDish({dish}) {
        return (
            <Card>
                <CardImg width="100%" src = { dish.image } alt = { dish.name } />
                <CardBody>
                    <CardTitle>{dish.name }</CardTitle>
                    <CardText>{ dish.description }</CardText>
                </CardBody>
            </Card>
        );
    }

    const DishDetail = (props) => {
        let div = "";
        if (props.dish != null ) {
            div = (
                <div className="container">
                    <div className = "row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to = '/menu'>Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className = "col-12">
                            <h3>{props.dish.name}</h3>
                            <hr />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-5 m-1">
                            <RenderDish dish = {props.dish} />
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
        return( <div>{ div }</div> )
    }


export default  DishDetail;