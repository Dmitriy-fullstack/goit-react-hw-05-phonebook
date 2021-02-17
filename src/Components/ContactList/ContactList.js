import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import style from "./contactList.module.css";

function ContactList({ contacts, onContactDelete }) {
  return (
    <>
      <h2>Contacts</h2>
      <ul className={style.list}>
        {contacts.map((contact) => {
          const { name, number, id } = contact;
          return (
            <li className={style.listItem} key={uuidv4()}>
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
          );
        })}
      </ul>
    </>
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
