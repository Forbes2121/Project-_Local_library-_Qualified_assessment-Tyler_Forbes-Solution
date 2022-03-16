//the function name gave this one away, use find to return an author object based on id
function findAuthorById(authors, id) {
  return authors.find((author => author.id === id));
}

//find a book by id, similar to the author
function findBookById(books, id) {
  return books.find(book => book.id === id);
}

//take a books array and separate them into a checked out and returned array, then combine them into a single array
function partitionBooksByBorrowedStatus(books) {
  let checkedOut = [];
  let fullyReturned = [];
  books.forEach((book) => {
    (book.borrows[0].returned) ? fullyReturned.push(book) : checkedOut.push(book)})
  return [checkedOut, fullyReturned];
}

//return an array with 10 or fewer account objects that represent the id's in borrows
//also add the 'returned' value in borrows to the account objects
function getBorrowersForBook(book, accounts) {
  //initialize our ultimate array that we'll return
  let result = [];

  let borrowedArr = book.borrows;  

  //loop through each borrow and search for where account id and borrow id match
  //push that found account to our result array after we add the new property 'returned'
  borrowedArr.forEach((borrow)=>{
    let acc = accounts.find((account) => account.id === borrow.id);
    let obj = acc;
    obj.returned =  borrow.returned;
    result.push(obj);
  })

  //return 10 or less values from that result array
  return result.slice(0,10);
}


module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
