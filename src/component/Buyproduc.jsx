import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import dummy from '../assets/dummy.png'
import { NavLink } from 'react-router-dom';
import { deleteProduct } from '../store/productSlice';
import Footer from './footer';

function Buyproduc() {
    const productList = useSelector((state) => state.products.productList);
    console.log(productList);
    var totalGrand = 0;
    var totalQuantities = 0;
    productList.map((product) => {
        { totalGrand = totalGrand + product.price }
        { totalQuantities = totalQuantities + product.quanities }
    })

    const dispatch = useDispatch();
    const handleDeleteProduct = (productId) => {
        dispatch(deleteProduct(productId));
    };
    const userID = localStorage.getItem('userId');
    const userName = localStorage.getItem('userName')
    const userName1 = userName?.indexOf('@');
    const userNameFinal = userName?.substring(0, userName1);


    return (
       <>
       <div>
            <div className='header' style={{ borderBottom: "1px solid #f3f3f3" }} >
                <div className='inner-header'>
                    <div><img style={{ width: "200px" }} src={dummy} alt="" /></div>
                </div>
                <div className='inner-header'>
                    {userID ? (
                        <>
                            <NavLink to='/userprofile'><div className='user-logo'><div><i class="fa fa-user-circle-o"></i></div><div>&nbsp;{userNameFinal}</div></div></NavLink>
                        </>
                    )
                        : (<>
                            <div><strong><NavLink to="/login">Login</NavLink></strong></div>
                            <div><strong> <NavLink to="/signup">SignUp</NavLink></strong></div>
                        </>)}
                    <NavLink to="/orderprodect">
                        <div className='bag'><strong> <i class="fa fa-shopping-cart"></i></strong>
                            <div className='bag-notifications'>{productList.length}</div>
                        </div>
                    </NavLink>
                </div>
            </div>
            <h2 className='bag-head'>My Bag : ({productList.length} Item)</h2>
            {productList.length > 0 ? (
                <div className='my-bag'>
                    {productList.map((product) => (
                        <div className='bag-container'>
                            <div style={{ display: "flex", gap: "20px" }}>
                                <div><img src={product.thumbnail} alt="" /></div>
                                <div className='about-product'>
                                    <div><strong>Product Name : {product.name}</strong></div>
                                    <div><strong>Brand Name : {product.brand}</strong></div>
                                    <div><strong>Quantities : {product.quanities}</strong></div>
                                </div>
                            </div>
                            <div>
                                <div><strong>Price : ${product.price}</strong></div>
                                <div>Discount : {product.discount} %</div>
                                <div><strong style={{ background: "#6c5702", padding: "4px", borderRadius: "2px", color: "#fff" }}>Total : ${product.quanities * product.price} </strong></div>
                                <div style={{ display: "flex", gap: "20px" }}>
                                    <div onClick={() => handleDeleteProduct(product.id)} style={{ color: "#008ae6 " }}><i class="fa fa-trash-o"></i>&nbsp;Delete</div>
                                    <div style={{ color: "#008ae6 " }}><i class="fa fa-heart-o"></i>&nbsp;Add Favorite</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div>
                    <br /><br />
                    <p className='bag-head'><strong>Your Bag is empty</strong> . <br /> <NavLink to='/othersalls'>Click Here</NavLink>  to explore new and trending</p>
                </div>
            )}
            <div className='grandbox'>
                <div className='grandbox-div'><div>Grand Total</div><div>${totalGrand}</div> </div>
                <div className='grandbox-div'><div>Totel Items</div><div>{productList.length}</div></div>
                <div className='grandbox-div'><div>Total Quantities</div><div>  {totalQuantities}</div></div>
                <div className='grandbox-div'><div>Delivery Fee</div><div><strike>free</strike></div></div>
                <div style={{ fontWeight: "600", cursor: "pointer", textAlign: "center", marginTop: "20px", border: "1px solid grey", color: "#000", padding: "6px" }}> <NavLink to='/othersalls'>Add More...</NavLink> </div>
                <div style={{ fontWeight: "600", cursor: "pointer", textAlign: "center", background: "#000", marginTop: "10px", color: "#fff", padding: "6px" }}>Buy Now</div>
            </div>    
        </div>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <Footer />
       </>
    )
}

export default Buyproduc