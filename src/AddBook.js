import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks'

class AddBook extends Component{
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
          <ListBooks books={result} onUpdateBookShelf={ onUpdateBookShelf }>
          </ListBooks>
        </div>
      </div>
    )
  }
}

export default AddBook
