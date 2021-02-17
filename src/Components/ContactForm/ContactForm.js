import React, { Component } from 'react'
import PropTypes from 'prop-types';
import style from './contactForm.module.css';
import shortid from 'shortid';


export default class ContactForm extends Component {
   state = {
    name: '',
    number: '',
    contacts: []
}

nameInputId = shortid.generate();
numberInputId = shortid.generate();

handleChange = event => {
       const {name, value} = event.currentTarget
       this.setState({[name]: value})
   }

   handleSubmit = e => {
        e.preventDefault();
        this.props.onSubmit(this.state);
        this.handleClearState();
        
    }

   handleClearState = () => {
       this.setState({name:'', number:''})
   }

    render() {
        return (
            <div>
                <form className={style.form} onSubmit={this.handleSubmit}> 
                    <label className={style.labelName} htmlFor={this.nameInputId}>Name:</label>
                    <input className={style.inputName} type='text' name='name' value={this.state.name} id={this.nameInputId}  onChange={this.handleChange}/> 

                    <label className={style.labelName} htmlFor={this.numberInputId}>Telephone number:</label>
                    <input className={style.inputName} type='text' name='number' value={this.state.number} id={this.numberInputId}  onChange={this.handleChange}/> 

                    <button className={style.buttonAdd} type='submit'>Add contact</button>
                </form> 
            </div>
        )
    }
}
ContactForm.propTypes ={

    contacts: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            number: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired
        })
    )
    
}