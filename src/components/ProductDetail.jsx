import React from 'react'
import { useParams } from 'react-router-dom'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItem, delItem } from '../redux/actions/index'
import { GET_PRODCUCT_DETAILS_BY_ID } from "../config";
import { useQuery } from "@apollo/client";
import AgoraUIKit from "agora-react-uikit";

const ProductDetail = () => {
const [videoCall, setVideoCall] = useState(true);
const rtcProps = {
    appId: "0a41282530d4431baace34af264893f7",
    channel: "testing",
    token: "007eJxTYFg62SMmZOG8iM/LuT1M3xcHCa0TVDCufyJ0ou1agoFAxm0FBoNEE0MjCyNTY4MUExNjw6TExORUY5PENCMzEwtL4zTzFccEUxsCGRlmsDxgZGRgZGABYhCfCUwyg0kWMMnOUJJaXJKZl87AAABLBiFf",
};


    const [cartBtn, setCartBtn] = useState("Add to Cart")
    const { id } = useParams();
    const dispatch = useDispatch(); // Move useDispatch here

    const { loading, error, data } = useQuery(GET_PRODCUCT_DETAILS_BY_ID, {
        variables: { id },
    });

    const product = data?.product || {};
    console.log(product);
// const description = JSON.parse(product?.descriptionJson );
// const text = description?.blocks[0]?.data?.text || '';
// console.log(text);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
const callbacks = {
    EndCall: () => setVideoCall(false),
};
    const handleCart = (product) => {
        if (cartBtn === "Add to Cart") {
            dispatch(addItem(product))
            setCartBtn("Remove from Cart")
        }
        else{
            dispatch(delItem(product))
            setCartBtn("Add to Cart")
        }
    }

    return (
        <>
            <div className="container my-5 py-3">
                <div className="row">
                    <div className="col-md-6 d-flex justify-content-center mx-auto product">
                            <img src={product.images[0]?.url} alt={product.name} height="400px" />
                    </div>
                    <div className="col-md-6 d-flex flex-column justify-content-center">
                        <h1 className="display-5 fw-bold">{product.name}</h1>
                        <hr />
                        <h2 className="my-4">₹{product.pricing.priceRange?.start.gross.amount}</h2>
                        <p className="lead">Taupe and red saree
Ethnic motifs printed saree with printed border 

The saree comes with an unstitched blouse piece
The blouse worn by the model might be for modelling purpose only. Check the image of the blouse piece to understand how the actual blouse piece looks like.</p> {/* Render the extracted text */}
                        <button onClick={()=>handleCart(product)} className="btn btn-outline-primary my-5">{cartBtn}</button>
                    </div>
                      {
                          videoCall && <div style={{ display: "flex", width: "100vw", height: "100vh" }}>
                          (<AgoraUIKit rtcProps={rtcProps} callbacks={callbacks} />)
                          </div>
                      }
                </div>

            </div>

        </>
    )



}

export default ProductDetail;
