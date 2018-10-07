import React from 'react';
import {Card,CardImg,CardText,CardBody,CardTitle, Breadcrumb, BreadcrumbItem} from 'reactstrap';

import { Link } from 'react-router-dom';

    function RenderComments ({comment}){
        let div = "";
        if (comment != null ) {
            const commentComponent = comment.map((comment) => {
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
                            <RenderComments comment = { props.comments } />
                        </div>
                    </div>
                </div>
            );
        }
        return( <div>{ div }</div> )
    }



export default DishDetail;