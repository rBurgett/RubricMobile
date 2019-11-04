export const handleError = err => {
  console.error(err);
};

export const makeBookmarkKey = (chapter, book) => `${book}_${chapter}`;
