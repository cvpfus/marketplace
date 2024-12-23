/* eslint-disable react/prop-types */
export const ProductImage = ({ data }) => {
  return (
    <div className="w-full h-full">
      <img
        src={data.Image}
        alt={data.Name}
        className="w-full h-full object-contain"
      />
    </div>
  );
};
