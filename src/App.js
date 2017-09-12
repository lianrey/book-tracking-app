import React from 'react'
import { Route, Link } from 'react-router-dom'
import ListBooks from './ListBooks'
import AddBook from './AddBook'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: [],
    result: []
  }

  componentDidMount(){
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    });
  }

  searchBook = (query) => {
    BooksAPI.search(query, 20).then((books) => {
      if(books.length > 0){
        this.setState({ result: books })
      }
    });
  }

  render() {
    return (
      <div className="app">
        <Route path="/add" render={() => (
          <AddBook onTextChange={this.searchBook} result={this.state.result}>
          </AddBook>
        )}/>
        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <ListBooks books={this.state.books.filter((book) => book.shelf === "currentlyReading")}>
                    </ListBooks>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ListBooks books={this.state.books.filter((book) => book.shelf === "wantToRead")}>
                    </ListBooks>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ListBooks books={this.state.books.filter((book) => book.shelf === "read")}>
                    </ListBooks>
                  </div>
                </div>
              </div>
            </div>
            <div className="open-search">
              <Link to="/add"></Link>
            </div>
          </div>
        )}/>
      </div>
    )
  }
}

export default BooksApp
