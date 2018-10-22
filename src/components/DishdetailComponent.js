import React, { Component } from 'react';
import {Card,CardImg,CardText,CardBody,CardTitle, Breadcrumb, BreadcrumbItem, Row, Label, Col, Button, Modal, ModalHeader, ModalBody} from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';

import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);

class CommentForm extends Component {
    constructor (props) {
        super (props);
        this.state = {
            isModalOpen: false
        };
        this.toggleModal = this.toggleModal.bind(this);
    }

    handleSubmit (values){
        /* this.toggleModal(); */
        console.log(values)
        this.props.postComment(this.props.dishId, values.rating, values.name, values.comment);
    }

    toggleModal (){
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    render(){
        return (
            <React.Fragment>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Col md={12}>
                                    <Label htmlFor="rating">Rating</Label>
                                    <Control.select model=".rating" name="rating" className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={12}>
                                    <Label htmlFor="name">Your Name</Label>
                                    <Control.text model=".name" id="name" name="name" placeholder="Your Name" className="form-control"
                                    validators={{
                                        required, minLength: minLength(3), maxLength: maxLength(15)
                                    }}/>
                                    <Errors className="text-danger" model= ".name" show="touched" messages={{
                                        required:'Required ',
                                        minLength: 'Must be greater than 2 characters',
                                        maxLength: 'Must be 15 characters or less'
                                    }}/>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={12}>
                                    <Label htmlFor="comment">Comment</Label>
                                    <Control.textarea model=".comment" id="comment" name="comment" rows="6" className="form-control"/>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={12}>
                                    <Button type="submit" color="primary" >
                                        Send
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
                <Button outline onClick={this.toggleModal}>
                    <span className = "fa fa-pencil fa-lg"></span> Submit Comment
                </Button>
            </React.Fragment>
        );
    }
}

    function RenderComments ({comment, postComment, dishId}){
        let div = "";
        if (comment != null ) {
            const commentComponent = comment.map((comment) => {
                return(
                    <Fade in>
                        <li className="list-group" key={comment.id}>
                            <span className="mb-3">{comment.comment}</span>
                            <span className="mb-3">--{comment.author}, {new Intl.DateTimeFormat('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: '2-digit'
                            }).format(new Date(Date.parse(comment.date)))}</span>
                        </li>
                    </Fade>
                )
            });

            div = (
                <div>
                    <h4>Comments</h4>
                    <ul className="list-unstyled">
                        <Stagger in>
                            {commentComponent}
                            <CommentForm dishId={dishId} postComment={postComment}/>
                        </Stagger>
                    </ul>
                </div>
            );
        }
        return( <div>{ div }</div> );
    }
    
    function RenderDish({dish}) {
        return (
            <FadeTransform in
                transformProps = {{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
                <Card>
                    <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name }</CardTitle>
                        <CardText>{ dish.description }</CardText>
                    </CardBody>
                </Card>
            </FadeTransform>
        );
    }

    const DishDetail = (props) => {
        let div = "";
        if (props.isLoading) {
            return (
                <div className="container" >
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        }else if (props.errMess){
            return (
                <div className="container" >
                    <div className="row">
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }else if (props.dish != null ) {
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
                            <RenderComments comment = { props.comments }
                                postComment={props.postComment}
                                dishId={props.dish.id}/>
                        </div>
                    </div>
                </div>
            );
        }
        return( <div>{ div }</div> )
    }



export default DishDetail;