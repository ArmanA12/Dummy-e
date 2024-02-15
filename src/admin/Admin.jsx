import React from 'react'
import Dummy from '../assets/dummy.png'
import { useState } from 'react';
import { Client, Storage, Databases, ID } from "appwrite";
import { NavLink, useNavigate} from 'react-router-dom';
import Loading from '../component/Loading';


function Admin() {
    const navigate = useNavigate();

    const client = new Client()
        .setEndpoint('https://cloud.appwrite.io/v1')
        .setProject('6572b1f0d2dacd3909ac');

    const storage = new Storage(client);

    const userName = localStorage.getItem('userName');
    const [file, setFile] = useState(null)
    const userID = localStorage.getItem('userId')
    const [uploadedFile, setUploadedFile] = useState(null);
    const [productName, setProductName] = useState('');
    const [category, setCategory] = useState('');
    const [brandName, setBrandName] = useState('');
    const [price, setPrice] = useState('');
    const [discount, setDiscount] = useState('');
    const [discriptions, setDiscriptions] = useState('');
    const [showLoader, setShowloader] = useState(false);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setUploadedFile(URL.createObjectURL(e.target.files[0]));
    }
    const handleUpload = async (e) => {
        e.preventDefault();
        setShowloader(true)
        try {
            const response = await storage.createFile(
                '65744b252eefab9b080d',
                ID.unique(),
                file
            )
            console.log(response)
            handleAddProduct(response.$id)
        }
        catch (error) {
            console.log(error.message)
        }
    }

    const databases = new Databases(client);
    async function handleAddProduct(imageID) {
        try {
            const response = databases.createDocument(
                '6573f9c378124f54aea0',
                '65744e9fe4c9af1527a5',
                ID.unique(),
                {userID, imageID, productName, category, brandName, price, discount, discriptions})
            if(response){
                setShowloader(false);
                navigate('/viewallproduct')
            }
        }
        catch (error) {
            console.log(error.message)
        }
    }

    if (showLoader) {
        return (<div className='loading'><Loading /></div>)
    }

    return (
        <>
            <div className='admin'>
                <div><img style={{ width: "150px" }} src={Dummy} alt="" /></div>
                <div>

                    <p style={{
                        fontSize: "25px", textTransform: "capitalize", fontWeight: "600", background: "black", color: "#fff", width: "40px", height: "40px", display: "flex", justifyContent: "center",
                        alignItems: "center", borderRadius: "50%"
                    }}>{userName?.charAt(0)}</p>
                    <div></div>
                </div>
            </div>
            <div className='admin-second'>
                <div className='admin-nav'>
                    <NavLink to='/viewallproduct'><div> <i class="fa fa-folder-open-o"></i><p>View All Products</p></div></NavLink>
                    <NavLink to='/admin'><div style={{ background: "#0676c0", color: "#fff" }}> <i style={{ color: "#fff" }} class="fa fa-edit"></i><p>Add New Product</p></div></NavLink>
                    <NavLink to='/analysis'> <div> <i class="fa fa-line-chart"></i><p>View Analysis</p></div></NavLink>
                    <div> <i class="fa fa-gear"></i><p>Settings</p></div>
                    <div> <i class="fa fa-eye"></i><p>Privacy Policy </p></div>
                </div>
                <div className='add-form-container' style={{ width: "80%", display: 'flex', alignItems: "center", flexDirection: "column" }}>
                    <div style={{ fontSize: "18px", fontWeight: "700", paddingTop: "10px" }}>Add New Product</div>
                    <div className='add-product-form'>

                        <form onSubmit={handleUpload}>
                            <div><input onChange={handleFileChange} type="file" required /></div>
                            <div><input onChange={(e) => setProductName(e.target.value)} type="text" placeholder='Product Name' required /></div>
                            <div>
                                <input onChange={(e) => setCategory(e.target.value)} type="text" placeholder='Category' required />
                            </div>
                            <div><input onChange={(e) => setBrandName(e.target.value)} type="text" placeholder='Brand Name' required /></div>
                            <div>
                                <input onChange={(e) => setPrice(e.target.value)} type="text" placeholder='Price' required />
                            </div>
                            <div><input onChange={(e) => setDiscount(e.target.value)} type="text" placeholder='Discounts in %' required /></div>
                            <div>
                                <textarea onChange={(e) => setDiscriptions(e.target.value)} style={{ height: "90px" }} name="" id="" placeholder='Discriptions' required></textarea>
                            </div>
                            <div><button type='submit'>Add Product</button></div>
                        </form>
                    </div>
                </div>
            </div>


        </>
    )
}

export default Admin
