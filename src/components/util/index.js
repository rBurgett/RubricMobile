export const handleError = err => {
  console.error(err);
};

export const makeBookmarkKey = (book, chapter) => `${book}_${chapter}`;
