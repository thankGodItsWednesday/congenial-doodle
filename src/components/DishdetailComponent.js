import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Row, Label, Col, Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';
import Moment from 'moment';

    
    function RenderDish(dish) {
        /* console.log("renderDish is invoked, value of this is : ");
        console.log(this);
        console.log(dish);
        console.log(dish.image);
        console.log(dish.name);
        console.log(dish.description); */
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

    class CommentForm extends Component {
        constructor(props) {
            super(props);

            this.state = {
                isModalOpen: false,
                rating: '',
                author: '',
                comment: '',
                touched: {
                    rating: false,
                    author: false,
                    comment: false
                }
            };

            this.handleInputChange = this.handleInputChange.bind(this);
            this.toggleModal = this.toggleModal.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
            this.handleBlur = this.handleBlur.bind(this);
            
            
        }

        handleBlur = (field) => (evt) => {
            this.setState({
                touched: { ...this.state.touched, [field]: true }
            });
            console.log("handleBlur invoked : ");
            console.log(field);
            console.log(this.state.touched);
        }
        
        handleInputChange(event) {
            const target = event.target;
            const value = target.type === 'checkbox' ? target.checked : target.value;
            const name = target.name;
        
            this.setState({
              [name]: value
            });
        }
    
        toggleModal() {
            console.log("Modal toggled: ");
            console.log(this);
            console.log(this.state);
            console.log(this.state.isModalOpen);
            this.setState({
                isModalOpen: !this.state.isModalOpen
            });
        }
        handleSubmit(values) {
            this.toggleModal();
            console.log('Current State is: ' + JSON.stringify(values));
            alert('Current State is: ' + JSON.stringify(values));
            // event.preventDefault();
        }
       
        render() {
    
            const required = (val) => val && val.length;
            const maxLength = (len) => (val) => !(val) || (val.length <= len)
            const minLength = (len) => (val) => !(val) || (val.length >= len)
        
        return(
            <div>
                <Button outline onClick={this.toggleModal} id="CommentButton">
                    <span className='fa fa-pencil fa-lg'></span> Submit Comments
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="rating" md={10}>Rating</Label>
                                <Col md={{size: 10, offset: 0}}>
                                    <Control.select model=".rating" name='rating'
                                        className='form-control'>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </Control.select>                                
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="author" md={10}>Your Name</Label>
                                    <Col md={10}>
                                        <Control.text model=".author" id='author' name='author'
                                            placeholder='Your Name'
                                            className="form-control" 
                                            validators={{
                                                required, minLength: minLength(3), maxLength: maxLength(15)
                                            }}
                                            /> 
                                        <Errors 
                                            className='text-danger' 
                                            model=".author" 
                                            show="touched"
                                                messages={{
                                                            required: " Required ",
                                                            minLength: " Must be greater than 2 characters ",
                                                            maxLength: " Must not exceed 15 characters "
                                                        }}/>
                                    </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment" md={10}>Comment</Label>
                                    <Col md={10}>
                                        <Control.textarea model='.comment' id='comment' name='comment'
                                                        rows="6" className='form-control' />
                                    </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size: 10, offset: 0}}>
                                    <Button type='submit' color='primary'>
                                        Submit Comment
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

    function RenderComments(comments){
       /*  console.log("renderComments is invoked, value of this is : ");
        console.log(comments); */
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
                    <div>
                    <CommentForm />
                </div>  
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