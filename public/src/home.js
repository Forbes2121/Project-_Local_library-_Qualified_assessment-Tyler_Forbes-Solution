//helper function to get the length of an array
function getLength(arr) {
  return arr.length;
}

//return a number that represents the # of book objects inside of the array
function getTotalBooksCount(books) {
  return getLength(books);
}

//return a number that represents the # of account objects inside of the given array
function getTotalAccountsCount(accounts) {
  return getLength(accounts);
}

//return the number of books currently with returned === false
function getBooksBorrowedCount(books) {
  let count = 0;
  books.forEach((book) => {
    if (!book.borrows[0].returned) count++
  })
  return count;
}

//return an array with 5 or less objects that gives most common genres and a count of them
function getMostCommonGenres(books) {
  //first create an array of just objects with a genre
  const genres = books.map((book) => book.genre);
  const countGenre = [];

  //map over the genres and check to see if the genre already exists in my created countGenre array
  genres.map((genre) => {
    const indexLocation = countGenre.findIndex((element) => element.name === genre);

    //if the genre exists, just add 1 to the count
    if (indexLocation >= 0) {
      countGenre[indexLocation].count++;
    }
    //if genre doesn't exist, then add it in and make the count set to 1
    else {
      countGenre.push({name: genre, count: 1});
    }
  });
  
  //sort the array from largest count to smallest
  countGenre.sort((a, b) => b.count - a.count);

  //return just 5 max objects in my array
  return countGenre.slice(0,5);
}

//return an array of 5 objects or less showing most popular book names and their count ranked
function getMostPopularBooks(books) {
  //add a new count property to each book based on the borrows array
  books.forEach((book) => {
    book.count = book.borrows.length;
  })
  //create an array from books of just the titles and counts
  const titleAndCount = books.map(({title, count}) => ({title, count}));
  //had to changed the 'title' to 'name' per the instruction output
  titleAndCount.forEach((instance) => {
    instance.name = instance.title;
    delete instance.title;})
  //sorted by count
  titleAndCount.sort((a, b) => b.count - a.count);
  //return just the 5 most popular
  return titleAndCount.slice(0,5);
}

//return an array of 5 or less objects that have author name and count based on the amount of book borrows by author
function getMostPopularAuthors(books, authors) {
  // loop through the author array
  let popularAuthorArray = authors.map(a => {
    //filter the books and then reduce it to a sum of all matching books with the length of borrows array
    a.count = books.filter(b => b.authorId === a.id).reduce((b, a) => b + (a.borrows && a.borrows.length || 0), 0);
    //add a new property called name that gives author's first/last names
    a.name = `${a.name.first} ${a.name.last}`;
    //no need for the id anymore, remove it
    delete a.id
    return a})
  popularAuthorArray.sort((a, b) => b.count - a.count)
  
 return popularAuthorArray.slice(0, 5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
