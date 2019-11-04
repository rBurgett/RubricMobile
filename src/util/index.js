import { getBook as bible } from '../modules/bible';

const chapterPatt = /^([^-]+?)\s(\d+)$/;
const multipleChapterPatt = /^([^-]+?)\s(\d+)-(\d+)$/;
const versePatt = /^([^-]+?)\s(\d+):(\d+)-(\d+)$/;
const singleVersePatt = /^([^-]+?)\s(\d+):(\d+)$/;
const chapterVersePatt = /^([^-]+?)\s(\d+):(\d+)-(\d+):(\d+)$/;

const books = {};

export const getChapterText = (book, chapter) => {
  if(book === 'Psalm') book = 'Psalms';
  let bookData;
  if(books[book]) {
    bookData = books[book];
  } else {
    bookData = bible[book]();
    books[book] = bookData;
  }
  const chapterData = bookData[chapter - 1];
  const paragraphsObj = chapterData
    .reduce((obj, { p, t }, i) => {
      if(obj[p]) {
        obj[p] = [
          ...obj[p],
          [chapter, i + 1, t]
        ];
      } else {
        obj[p] = [
          [chapter, i + 1, t]
        ];
      }
      return obj;
    }, {});
  return Object.keys(paragraphsObj)
    .map(key => paragraphsObj[key]);
};

const getVerseText = (book, chapter, verse) => {
  if(book === 'Psalm') book = 'Psalms';
  let bookData;
  if(books[book]) {
    bookData = books[book];
  } else {
    bookData = bible[book]();
    books[book] = bookData;
  }
  const chapterData = bookData[chapter - 1];
  return [
    [
      [chapter, verse, chapterData[Number(verse) - 1]]
    ]
  ];
};

const getVerseRange = (book, chapter, startVerse, endVerse) => {
  if(book === 'Psalm') book = 'Psalms';
  let bookData;
  if(books[book]) {
    bookData = books[book];
  } else {
    bookData = bible[book]();
    books[book] = bookData;
  }
  const chapterData = bookData[chapter - 1];
  if(!endVerse) endVerse = chapterData.length;
  const paragraphsObj = {};
  for(let i = 0; i < chapterData.length; i++) {
    const v = i + 1;
    if(v < startVerse || v > endVerse) continue;
    const { p, t } = chapterData[i];
    if(paragraphsObj[p]) {
      paragraphsObj[p] = [
        ...paragraphsObj[p],
        [chapter, i + 1, t]
      ];
    } else {
      paragraphsObj[p] = [
        [chapter, i + 1, t]
      ];
    }
  }
  return Object.keys(paragraphsObj)
    .map(key => paragraphsObj[key]);
};

const getMultipleVerseText = (book, chapter, startVerse, endVerse) => {
  return getVerseRange(book, chapter, startVerse, endVerse);
};

export const getPassageText = passage => {
  if(chapterPatt.test(passage)) {
    const matches = passage.match(chapterPatt);
    const book = matches[1];
    const chapter = Number(matches[2]);
    return getChapterText(book, chapter);
  } else if(multipleChapterPatt.test(passage)) {
    const matches = passage.match(multipleChapterPatt);
    const book = matches[1];
    const startChapter = matches[2];
    const endChapter = matches[3];
    let texts = [];
    for(let c = Number(startChapter); c < Number(endChapter) + 1; c++) {
      texts = texts.concat(getChapterText(book, c));
    }
    return texts;
  } else if(singleVersePatt.test(passage)) {
    const matches = passage.match(singleVersePatt);
    const book = matches[1];
    const chapter = Number(matches[2]);
    const verse = Number(matches[3]);
    return getVerseText(book, chapter, verse);
  } else if(versePatt.test(passage)) {
    const matches = passage.match(versePatt);
    const book = matches[1];
    const chapter = Number(matches[2]);
    const startVerse = Number(matches[3]);
    const endVerse = Number(matches[4]);
    return getMultipleVerseText(book, chapter, startVerse, endVerse);
  } else if(chapterVersePatt.test(passage)) {
    const matches = passage.match(chapterVersePatt);
    const book = matches[1];
    const startChapter = Number(matches[2]);
    const startVerse = Number(matches[3]);
    const endChapter = Number(matches[4]);
    const endVerse = Number(matches[5]);
    let text = [];
    for(let c = startChapter; c < endChapter + 1; c++) {
      if(c === startChapter) {
        text = text.concat(getVerseRange(book, c, startVerse));
      } else if(c === endChapter) {
        text = text.concat(getVerseRange(book, c, 1, endVerse));
      } else {
        text = text.concat(getVerseRange(book, c, 1));
      }
    }
    return text;
  } else {
    throw new Error(`Unable to parse ${passage}`);
  }
};

