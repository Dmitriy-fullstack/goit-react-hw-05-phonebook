import PropTypes from "prop-types";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { v4 as uuidv4 } from "uuid";
import style from "./contactList.module.css";

function ContactList({ contacts, onContactDelete }) {
  return (
    <TransitionGroup component="ul" className={style.list}>
      {contacts.map((contact) => {
        const { name, number, id } = contact;
        return (
          <CSSTransition key={id} timeout={250} classNames={style}>
            <li className={style.listItem}>
              <p className={style.listItemName}>
                {name}: {number}
              </p>
              <button
                className={style.deleteButton}
                type="button"
                onClick={() => onContactDelete(id)}
              >
                Delete
              </button>
            </li>
          </CSSTransition>
        );
      })}
    </TransitionGroup>
  );
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  onContactDelete: PropTypes.func,
};

export default ContactList;
