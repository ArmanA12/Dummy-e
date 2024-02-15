import React from 'react'
import { useState, useEffect } from 'react'
import { useParams, useNavigate, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../store/productSlice';
import dummy from '../assets/dummy.png'
import Footer from './footer';

function ProductDetails() {
    const dispatch = useDispatch();
    const [data, setData] = useState({});
    const { id } = useParams();
    const [image, setImage] = useState(null);
    const [quanities, setQuanities] = useState(1);
    const productList = useSelector((state) => state.products.productList);
    const navigate = useNavigate();

    useEffect(() => {
        async function getProductDetails() {
            try {
                const response = await fetch(`https://dummyjson.com/products/${id}`)
                const responcedata = await response.json();
                setData(responcedata);
                setImage(responcedata.thumbnail);
            }
            catch (error) {
                console.log(error.message)
            }
        }
        getProductDetails();
    }, [])

    function handleChangeImage(item) {
        setImage(item)
    }

    // add product in store method 
    const handleAddProduct = (id, title, price, thumbnail, brand, discount) => {
        const newProduct = {
            id: id,
            name: title,
            price: price,
            thumbnail: thumbnail,
            brand: brand,
            discount: discount,
            quanities: quanities,
        };
        dispatch(addProduct(newProduct));
        setTimeout(() => {
            navigate('/orderprodect')
        }, 500)
    };
    const userID = localStorage.getItem('userId');
    const userName = localStorage.getItem('userName')
    const userName1 = userName?.indexOf('@');
    const userNameFinal = userName?.substring(0, userName1);

    return (
        <>
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
            <p>&nbsp;</p>
            <div style={{ display: 'flex', justifyContent: "center", alignItems: "center"}}>
                <div className='card-details'>
                    <div className='product-images'>
                        <div>
                            <img style={{ width: "100%", height: "330px", objectFit: "contain" }} src={image} alt="" />
                            <div className='small-image'>
                                {data.images?.map((item, index) => (
                                    <div key={index}>
                                        <img onClick={() => handleChangeImage(item)} src={item} alt="" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className='other-details'>
                        <div><h2>{data.title}</h2></div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <p style={{ fontSize: "22px" }}><strong>${data.price}</strong></p>
                            <p><strong>Rating : {data.rating}&nbsp;<i style={{ color: "#f0e130" }} class="fa fa-star"></i></strong></p>
                        </div>
                        <p style={{ background: "grey", width: "140px", borderRadius: "1px", padding: "6px", color: "#e1e7eb" }}>Discounts : {data.discountPercentage} %</p>
                        <p><strong>Discrptions : </strong>{data.description}</p>
                        <p><strong>Brand : </strong>{data.brand}</p>
                        <div className='fav-add'>
                            <div className='quantities'><div><i onClick={() => { setQuanities(quanities > 1 ? quanities - 1 : 1) }} class="fa fa-minus"></i></div><div className='quan-value'>{quanities}</div><div><i onClick={() => { setQuanities(quanities < 10 ? quanities + 1 : quanities) }} class="fa fa-plus"></i></div></div>
                            <div onClick={() => handleAddProduct(data.id, data.title, data.price, data.thumbnail, data.brand, data.discountPercentage)} style={{ fontSize: "15px", fontWeight: "600" }}><span> <i class="fa fa-shopping-cart"></i> Add to Card</span></div>
                            <div style={{ fontSize: "15px", fontWeight: "600" }}> <i class="fa fa-heart"></i> Add Favorite </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default ProductDetails