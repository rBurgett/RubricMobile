import { actions } from '../constants';

const getInitialState = () => ({});

export default (state = getInitialState(), { type, payload }) => {
  switch(type) {
    default:
      return state;
  }
};
