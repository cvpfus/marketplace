/* eslint-disable react/prop-types */
export const ProductNameRenderer = ({ value }) => {
  return <span>{value ?? "[Product Deleted]"}</span>;
};
