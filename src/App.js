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
    this.getAll();
  }

  getAll = () => {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    });
  }

  searchBook = (query) => {
    if(query.length > 0){
      BooksAPI.search(query, 20).then((books) => {
        if(typeof books !== "undefined" && books.length > 0){
          this.setState({ result: books })
        }
      });
    }
    else{
      this.setState({ result: []});
    }
  }

  updateBook = (book, shelf) =>{
    if(shelf){
      BooksAPI.update(book, shelf).then((books) => {
        this.getAll();
      });
    }
  }

  render() {
    return (
      <div className="app">
        <Route path="/add" render={(history) => (
          <AddBook onTextChange={this.searchBook} result={this.state.result} onUpdateBookShelf={this.updateBook}>
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
                    <ListBooks books={this.state.books.filter((book) => book.shelf === "currentlyReading")}
                      onUpdateBookShelf={this.updateBook}>
                    </ListBooks>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ListBooks books={this.state.books.filter((book) => book.shelf === "wantToRead")}
                      onUpdateBookShelf={this.updateBook}>
                    </ListBooks>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ListBooks books={this.state.books.filter((book) => book.shelf === "read")}
                      onUpdateBookShelf={this.updateBook}>
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
