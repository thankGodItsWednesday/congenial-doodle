import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle } from 'reactstrap';
import Moment from 'moment';

    

class Dishdetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDish: null
        };
    }

    renderDish(dish) {
       /*  console.log("renderDish is invoked, value of this is : ");
        console.log(this);
        console.log(dish);
        console.log(dish.image);
        console.log(dish.name);
        console.log(dish.description); */
        if (dish != null)
            return(
                <Card>
                    <CardImg top src={dish.image} alt={dish.name} />
                    <CardBody>
                      <CardTitle>{dish.name}</CardTitle>
                      <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            );
        else
            return(
                <div></div>
            );
    }

    renderComments(comments){
       /*  console.log("renderDish is invoked, value of this is : ");
        console.log(this);
        console.log(comments); */
        if (comments != null) {
            const dishComments = comments.map((comment) => {        
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

    render() {
        const dish = this.props.dish;
        if (dish != null)
            return(
            <div className='container'>
                <div className='row'>
                    <div className='col-12'>
                        <h3>{dish.name}</h3>
                         <hr />
                    </div>
                </div>          
                <div className='row'>
                    <div className='col-12 col-md-5 m-1'>
                        {this.renderDish(dish)}
                    </div>
                    <div className='col-12 col-md-5 m-1'>
                        {this.renderComments(this.props.dish.comments)}
                    </div>
                </div>
            </div>
        );
        else
            return(
                <div></div>
            )
    }

    

}

export default Dishdetail;