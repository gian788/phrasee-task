import PropTypes from 'prop-types';

const {
  shape, string, object, array,
} = PropTypes;

export const stateFetchedObject = shape({
  data: object,
  status: string,
});

export const stateFetchedArray = shape({
  data: array,
  status: string,
});
