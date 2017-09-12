import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks'

class AddBook extends Component{
  state = {
    query: "",
    result: []
  }

  /*componentWillUpdate(nextProps, nextState){
    if(this.state.query && (this.state.query !== nextState.query)){

    }
    console.log(this.state.result)
  }*/

  updateQuery = (query) => {
    this.setState({ query: query.trim() });
    this.props.onTextChange(query);
  }

  render(){
    const { result } = this.props
    const { query } = this.state

    if(query){
      console.log(query);
    }

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
          <ListBooks books={result}>
          </ListBooks>
        </div>
      </div>
    )
  }
}

export default AddBook
