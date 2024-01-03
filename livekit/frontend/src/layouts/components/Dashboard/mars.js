import React from 'react';
import {
  ProductImage01,
  ProductImage02,
  ProductImage03,
  ProductImage04,
  ProductImage05,
  ProductImage06,
  ProductImage07,
  ProductImage08,
} from '../assets';

const Description =
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae molestiae qui maiores voluptas nam incidunt quos excepturi minus modi in!';

const productCart = [
  {
    id: 1,
    name: 'Product Name',
    description: Description,
    // size: "Small",
    size: '50ml',
    image: ProductImage01,
  },
  {
    id: 2,
    name: 'Product Name',
    description: Description,
    size: '100ml',
    image: ProductImage02,
  },
  {
    id: 3,
    name: 'Product Name',
    description: Description,
    size: '150ml',
    image: ProductImage03,
  },
  {
    id: 4,
    name: 'Product Name',
    description: Description,
    size: '200ml',
    image: ProductImage04,
  },

  {
    id: 5,
    name: 'Product Name',
    description: Description,
    size: '250ml',
    image: ProductImage05,
  },

  {
    id: 6,
    name: 'Product Name',
    description: Description,
    size: '300ml',
    image: ProductImage06,
  },

  {
    id: 7,
    name: 'Product Name',
    description: Description,
    size: '350ml',
    image: ProductImage07,
  },

  {
    id: 8,
    name: 'Product Name',
    description: Description,
    size: '400ml',
    image: ProductImage08,
  },
];

const ProductsPage = () => {
  return (
    <div className="mt-32">
      <h1
        className="text-center font-Lato text-2xl font-bold
         "
      >
        Products and Services
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 px-6 mx-4 mt-10 ">
        {productCart.map((product) => (
          <div key={product.id} className="p-6 border-2 rounded-xl shadow-md">
            <img src={product.image} alt={product.name} width={300} />
            <h2 className="mt-4 font-Lato font-bold ">{product.name}</h2>
            <p className="mt-4 font-Inter">{product.description}</p>
            <p className=" font-Lato font-medium mt-4 text-lg">{product.size}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
