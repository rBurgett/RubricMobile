class Progress {

  // async storage key
  key = '';

  // morning prayer
  mp = false;

  // daily reading
  dr = false;

  // noon prayer
  np = false;

  // early evening prayer
  ee = false;

  // end of day prayer
  eod = false;

  constructor(data = {}) {
    Object.assign(this, data);
  }

  set(changes = {}) {
    return new Progress({
      ...this,
      ...changes
    });
  }

}

export default Progress;
