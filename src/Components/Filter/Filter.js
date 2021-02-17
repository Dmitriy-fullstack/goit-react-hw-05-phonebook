import { Component } from "react";
import PropTypes from "prop-types";
import style from "./filter.module.css";
import shortid from "shortid";

export default class Filter extends Component {
  state = {
    filter: "",
  };

  filterInputId = shortid.generate();

  render() {
    return (
      <div className={style.wrapper}>
        <label htmlFor={this.filterInputId}>Find contacts by name:</label>
        <input
          className={style.filter}
          type="text"
          id={this.filterInputId}
          name="filter"
          value={this.props.value}
          onChange={(e) => this.props.onChangeFilter(e.target.value)}
        />
      </div>
    );
  }
}

Filter.propTypes = {
  filter: PropTypes.string,
};
