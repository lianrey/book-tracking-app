import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ListBooks extends Component{
  static propTypes = {
    books: PropTypes.array.isRequired,
    onUpdateBookShelf: PropTypes.func.isRequired,
    title: PropTypes.string,
    olWrapperClass: PropTypes.string.isRequired
	}

  render(){
    const { books, onUpdateBookShelf, title } = this.props

    return(
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="{olWrapperClass}">
          <ol className="books-grid">
            { books.map((book) => (
              <li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${(typeof book.imageLinks !== "undefined") ? book.imageLinks.smallThumbnail : ""}")` }}></div>
                    <div className="book-shelf-changer">
                      <select value={(typeof book.shelf !== 'undefined') ? book.shelf : ''} onChange={(event) => onUpdateBookShelf(book, event.target.value)}>
                        <option value="none" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="">None</option>
                      </select>
                    </div>
                  </div>
                  <div className="book-title">{book.title}</div>
                  <div className="book-authors">{book.authors}</div>
                </div>
              </li>
            )) }
          </ol>
        </div>
      </div>
    )
  }
}

export default ListBooks
