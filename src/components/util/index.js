import React from 'react';
import { StyleSheet } from 'react-native';
import Text from '../shared/text';

export const handleError = err => {
  console.error(err);
};

export const makeBookmarkKey = (book, chapter) => `${book}_${chapter}`;

export const prepText = (textStyle = {}) => (p, i, arr) => {
  const bPatt = /^(.*?)<([bi])>(.*?)<\/[bi]>(.*)$/;
  const prepped = [];
  if(bPatt.test(p)) {
    while(bPatt.test(p)) {
      const matches = p.match(bPatt);
      prepped.push(<Text key={`${i + 1}_${prepped.length + 1}`} style={textStyle}>{matches[1]}</Text>);
      prepped.push(<Text key={`${i + 1}_${prepped.length + 1}`} style={[matches[2] === 'b' ? styles.bold : styles.italic, textStyle]}>{matches[3]}</Text>);
      p = matches[4];
    }
    prepped.push(<Text key={`${i + 1}_${prepped.length + 1}`} style={textStyle}>{p}</Text>);
  } else {
    prepped.push(<Text key={`${i + 1}_${prepped.length + 1}`} style={textStyle}>{p}</Text>);
  }
  return i < arr.length - 1 ? [...prepped, '\n\n'] : prepped;
};

const styles = StyleSheet.create({
  bold: {
    fontWeight: 'bold'
  },
  italic: {
    fontStyle: 'italic'
  }
});
