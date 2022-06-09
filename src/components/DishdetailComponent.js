import React from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import Moment from 'moment';

    
    function RenderDish(dish) {
        console.log("renderDish is invoked, value of this is : ");
        console.log(this);
        console.log(dish);
        console.log(dish.image);
        console.log(dish.name);
        console.log(dish.description);
        if (dish != null)
            return(
                <Card>
                    <CardImg top src={dish.dish.image} alt={dish.dish.name} />
                    <CardBody>
                      <CardTitle>{dish.dish.name}</CardTitle>
                      <CardText>{dish.dish.description}</CardText>
                    </CardBody>
                </Card>
            );
        else
            return(
                <div></div>
            );
    }

    function RenderComments(comments){
        console.log("renderComments is invoked, value of this is : ");
        console.log(comments);
        if (comments != null) {
            const dishComments = comments.comments.map((comment) => {        
            return (
                <div key={comment.id}>
                 <p >{comment.comment}<br />
                -- {comment.author} , {Moment(comment.date).format('MMMM Do YYYY')} </p>
                </div>                       
                    )
            });        
        return(
            <div>
                <div>
                    <h4>Comments</h4>
                    <ul className='list-unstyled'>
                        <li>{dishComments}</li>
                    </ul>
                </div> 
            </div>         
        );
        }
        else
            return(
             <div></div>
        );
    };        

    const DishDetail = (props) => {
        const dish = props.dish;
        /* console.log(props);
        console.log(props.dish);
        console.log(dish);
        console.log(props.dish);
        console.log(props.comments.comments); */
        if (dish != null)
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
                    <RenderComments comments={props.comments} />
                </div>
            </div>
            </div>
        );
        else
            return(
                <div></div>
            )
    }

    


export default DishDetail;