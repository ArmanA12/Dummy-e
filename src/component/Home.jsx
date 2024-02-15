import React from 'react'
import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom';
import dummy from '../assets/dummy.png'
import a from '../assets/1.jpg'
import b from '../assets/2.jpg'
import c from '../assets/3.jpg'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useSelector } from 'react-redux';
import Footer from './footer';




function Home() {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');
    const [isFixed, setIsFixed] = useState(false);
    const[showHide, setShowHide] = useState(false)
    const productList = useSelector((state) => state.products.productList);
    function handleSaerch(e) {
        setSearch(e.target.value);
    }
    useEffect(() => {
        function handleScroll() {
            if (window.scrollY > 0) {
                setIsFixed(true);
            } else {
                setIsFixed(false);
            }
        }
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    useEffect(() => {
        async function getProductData() {
            try {
                const responseData = await fetch('https://dummyjson.com/products');
                const data = await responseData.json();
                setData(data.products)
                console.log(data)
            }
            catch (error) {
                console.log(error.message);
            }
        }
        getProductData();
    }, [])
    const filteredData = data.filter((item) => {
        const lowerCaseSearch = search.toLowerCase();
        const lowerCaseTitle = item.title.toLowerCase();
        const lowerCaseDescription = item.description.toLowerCase();
        const lowerCaseCategory = item.category.toLowerCase();

        return (
            lowerCaseTitle.includes(lowerCaseSearch) ||
            lowerCaseDescription.includes(lowerCaseSearch) ||
            lowerCaseCategory.includes(lowerCaseSearch)
        );
    });


    const settings = {
        // Slick Slider settings go here
        dots: true,
        infinite: true,
        speed: 1500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,       // Enable autoplay
        autoplaySpeed: 3000,
    };

    const headerStyle = {
        position: isFixed ? 'fixed' : 'static',
        top: 0,
        left: 0,
        width: '95%',
        color: '#fff',
        backdropFilter: isFixed ? 'blur(28px)' : 'none',
        zIndex: isFixed ? 100 : 'auto',
        background: 'rgba(255,255,255,0.01)',
        overflow: "hidden",
    };
    const userID = localStorage.getItem('userId');
    const userName = localStorage.getItem('userName')
    const userName1 = userName?.indexOf('@');
    const userNameFinal = userName?.substring(0, userName1);
  



    return (
        <>
            <div className='header' style={headerStyle}>
                <div className='inner-header'>
                    <div><img style={{ width: "200px" }} src={dummy} alt="" /></div>
                    <input type="text" placeholder='Quick search' value={search} onChange={handleSaerch} />
                </div>
                <div className='inner-header inner-h-s' style={{display:showHide?'none':'flex'}}>
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
                    <div>
                    <input className='mobile-search' type="text" placeholder='Quick search' value={search} onChange={handleSaerch} />
                    </div>
                </div>
            </div>
            <div onClick={()=> setShowHide(!showHide)} className='navigation'>{showHide? <i class="fa fa-bars"></i> : <i class="fa fa-close"></i>}</div>
            <div className='home-slider' style={{ display: search ? 'none ' : 'block' }}>
                <Slider {...settings} >
                    <img src={a} alt="" />
                    <img src={b} alt="" />
                    <img src={c} alt="" />
                </Slider>
            </div>
            <center>
                <div className='before-product' style={{ display: search ? 'none' : 'block' }}>
                    <div style={{ color: "grey" }}><strong>COOL STUFF</strong></div>
                    <div style={{ fontSize: "22px", fontWeight: "700" }}>ALL TRENDING AND NEW PRODUCTS</div>
                    <div style={{ color: "grey" }}>Dignissimos asperiores vitae velit veniam totam fuga molestias accusamus alias autem provident. Odit ab aliquam dolor eius</div>
                </div>
            </center>
            <p>&nbsp;</p>
            <div className='card-container' >
                {filteredData?.map((item, index) => (
                    <div className='card' key={index}>
                        <NavLink to={`/products/${item.id}`}>
                            <img src={item.thumbnail} alt={index} loading='lazy' />
                            <div style={{ fontSize: "16px", fontWeight: "600" }} className='price-rating'>{item.title}</div>
                            <div className='price-rating'>
                                <div><strong style={{ color: "#417eaa" }}>Price : ${item.price}</strong></div>
                                <div style={{ color: "#417eaa" }}>Rating : {item.rating}</div>
                            </div>
                            <div className='title-add'>
                                <div><strong style={{ fontSize: "14px" }}>View Details</strong></div>
                                <div><i class="fa fa-heart"></i></div>
                            </div>
                        </NavLink>
                    </div>
                ))}
            </div>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <center>
                <div className='before-product'>
                    <div style={{ color: "grey" }}><strong>SEE PRODUCT  </strong></div>
                    <div style={{ fontSize: "22px", fontWeight: "700" }}>PRODUCTS CATEGORY</div>
                    <div style={{ color: "grey" }}>Dignissimos asperiores vitae velit veniam totam fuga molestias accusamus alias autem provident. Odit ab aliquam dolor eius</div>
                </div>
            </center>

            <div className='category'>
                <div className='category-card'>
                    <img src={data[1]?.thumbnail} alt="" />
                    <div>Electronics</div>
                    <div><NavLink to="/electronic">View More...</NavLink></div>
                </div>
                <div className='category-card'>
                    <img src={data[18]?.thumbnail} alt="" />
                    <div>Beauty & Skinn Care</div>
                    <div><NavLink to='/beautyandskincare'>View More...</NavLink></div>
                </div>
                <div className='category-card'>
                    <img src={data[21]?.thumbnail} alt="" />
                    <div>{data[21]?.category}</div>
                    <div><NavLink to='/groceries'>View More...</NavLink></div>
                </div>
                <div className='category-card'>
                    <img src={data[26]?.thumbnail} alt="" />
                    <div>Others Alls</div>
                    <div><NavLink to='/othersalls'>View More...</NavLink></div>
                </div>
            </div>
            <br /><br />
            <Footer />
        </>
    )
}

export default Home