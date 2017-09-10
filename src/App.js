import React from 'react'
import { Route, Link } from 'react-router-dom'
import ListBooks from './ListBooks'
import AddBook from './AddBook'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount(){
    BooksAPI.getAll().then((books) => {
      console.dir(books);
      this.setState({ books })
    });
  }

  render() {
    return (
      <div className="app">
        <Route path="/add" render={() => (
          <AddBook>
          </AddBook>
        )}/>
        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <ListBooks title="Currently Reading" books={this.state.books.filter((book) => book.shelf === "currentlyReading")}>
                </ListBooks>
                <ListBooks title="Want to Read" books={this.state.books.filter((book) => book.shelf === "wantToRead")}>
                </ListBooks>
                <ListBooks title="Read" books={this.state.books.filter((book) => book.shelf === "read")}>
                </ListBooks>
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
