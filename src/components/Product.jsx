import React from 'react'
import { NavLink } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_LATEST_PRODUCTS } from '../config';

import DATA from '../Data';


const Product = () => {
  const { loading, error, data } = useQuery(GET_LATEST_PRODUCTS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  const details = data.products.edges;
  console.log(details);

    const cardItem = (item) => {
        return (
            <div class="card my-5 py-4" key={item.node.id} style={{width: "18rem"}}>
                <img src={item.node.images[0]?.url} class="card-img-top" alt={item.node.name}/>
                    <div class="card-body text-center">
                        <h5 class="card-title">{item.node.name}</h5>
                        <p className="lead">₹{item.node.pricing.priceRange?.start.gross.amount}</p>
                        <NavLink to={`/products/${item.node.id}`} class="btn btn-outline-primary">Buy Now</NavLink>
                    </div>
</div>
                );
    }

                return (
                <div>
                    <div className="container py-5">
                        <div className="row">
                            <div className="col-12 text-center">
                                <h1>Product</h1>
                                <hr />
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="row justify-content-around">
                            {details.map(cardItem)}
                        </div>
                    </div>
                </div>
                )
}

export default Product
