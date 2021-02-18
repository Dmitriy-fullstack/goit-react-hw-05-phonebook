import React, { Component } from "react";
import { CSSTransition } from "react-transition-group";
import ContactForm from "./Components/ContactForm/ContactForm";
import ContactList from "./Components/ContactList/ContactList";
import Filter from "./Components/Filter/Filter";
import { v4 as uuidv4 } from "uuid";
import swal from "sweetalert";
import style from "./phonebook.module.css";
import Message from "./Components/Message/Message";

class Phonebook extends Component {
  state = {
    contacts: [],
    filter: "",
    name: "",
    number: "",
    error: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }
  }
  componentDidMount() {
    const contacts = localStorage.getItem("contacts");
    const parsedContacts = JSON.parse(contacts);
    this.setState({ contacts: parsedContacts });
  }

  onSubmitHendler = (data) => {
    const newContacts = {
      number: data.number,
      name: data.name,
      id: uuidv4(),
    };

    if (
      this.state.contacts.find(
        ({ name }) => name.toLowerCase() === data.name.toLowerCase()
      )
    ) {
      this.setState({ error: true });
      setTimeout(() => {
        this.setState({ error: false });
      }, 2500);

      return;
    }
    if (data.name === "") {
      swal("Enter concact name, please!");
      return;
    }
    if (data.number === "") {
      swal("Enter concact phone, please!");
      return;
    }
    this.setState(({ contacts }) => {
      return { contacts: [...contacts, newContacts] };
    });
  };

  onFilterHendler = (data) => {
    this.setState({ filter: data });
  };
  getVisibleContacts = () => {
    const { contacts, filter } = this.state;

    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  contactDelete = (id) => {
    this.setState({
      contacts: this.state.contacts.filter((contact) => contact.id !== id),
    });
  };

  render() {
    const visibleContacts = this.getVisibleContacts();

    return (
      <div className={style.wrapper}>
        <CSSTransition
          in={true}
          appear={true}
          timeout={500}
          classNames={style}
          unmountOnExit
        >
          <h1 className={style.title}>Phonebook</h1>
        </CSSTransition>
        <div className={style.formSearch}>
          <ContactForm onSubmit={this.onSubmitHendler} />
        </div>
        <CSSTransition
          in={this.state.contacts.length > 0}
          timeout={250}
          classNames={style}
          unmountOnExit
        >
          <Filter
            value={this.state.filter}
            onChangeFilter={this.onFilterHendler}
          />
        </CSSTransition>
        <CSSTransition
          in={visibleContacts.length > 0}
          timeout={250}
          classNames={style}
          unmountOnExit
        >
          <h2>Contacts</h2>
        </CSSTransition>

        <CSSTransition
          in={visibleContacts.length > 0}
          timeout={250}
          classNames={style}
          unmountOnExit
        >
          <ContactList
            contacts={visibleContacts}
            onContactDelete={this.contactDelete}
          />
        </CSSTransition>
        <CSSTransition
          in={visibleContacts.length <= 0}
          timeout={250}
          classNames={style}
          unmountOnExit
        >
          <p className={style.warning}>Enter data, please</p>
        </CSSTransition>
        <CSSTransition
          in={this.state.error === true}
          timeout={250}
          classNames={style}
          unmountOnExit
        >
          <Message />
        </CSSTransition>
      </div>
    );
  }
}

export default Phonebook;
