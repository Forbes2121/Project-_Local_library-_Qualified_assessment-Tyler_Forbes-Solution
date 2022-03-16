
//return an account object that has the matching ID to the one given
function findAccountById(accounts, id) {
  const found = accounts.find((person) => person.id === id);
  return found;
}

//takes in all accounts and sorts alphabetically by last name
function sortAccountsByLastName(accounts) {
  accounts.sort((personA, personB) => personA.name.last.toLowerCase() < personB.name.last.toLowerCase() ? -1 : 1);
  return accounts;
}

//looks at an account and sees how many times the account ID appears in any book's 'borrows' array
function getTotalNumberOfBorrows(account, books) {
  const uniqueId = account.id;
  let counter = 0;
  books.forEach((book) => {
    for (let i = 0; i < book.borrows.length; i++) {
      if (book.borrows[i].id === uniqueId) {
        counter++;
      }
    }
  })
  return counter;
}

/*takes in an account and checks to see the books currently checked out, 
and then returns an array with those books and authors*/
function getBooksPossessedByAccount(account, books, authors) {
  const uniqueId = account.id;
  
  //get just the books they have out in an array
  const checkedOut = books.filter((book) => book.borrows.some(borrow => !borrow.returned && borrow.id === uniqueId));
  
  //add in the author property to that books array
  checkedOut.forEach((book) => book.author = authors.find((author) => book.authorId === author.id))
  
  //return the completed array
  return checkedOut;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
