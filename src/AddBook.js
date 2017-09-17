import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ListBooks from './ListBooks'
import PropTypes from 'prop-types'

class AddBook extends Component {
  static propTypes = {
    result: PropTypes.array.isRequired,
    onTextChange: PropTypes.func.isRequired,
    onUpdateBookShelf: PropTypes.func.isRequired
	}

  state = {
    query: "",
    result: []
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim() });
    this.props.onTextChange(query);
  }

  render(){
    const { result, onUpdateBookShelf } = this.props
    const { query } = this.state

    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/"></Link>
          <div className="search-books-input-wrapper">
            <input type="text" value={query}
              onChange={(event) => this.updateQuery(event.target.value)}
              placeholder="Search by title or author"
            />
          </div>
        </div>
        <div className="search-books-results">
          <ListBooks books={result} onUpdateBookShelf={onUpdateBookShelf}>
          </ListBooks>
        </div>
      </div>
    )
  }
}

export default AddBook
