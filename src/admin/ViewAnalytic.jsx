import React from 'react'
import Dummy from '../assets/dummy.png'
import { useState } from 'react';
import { Client, Storage, Databases, ID } from "appwrite";
import { NavLink } from 'react-router-dom';
import Chart1 from '../charts/Chart1';


function ViewAnalytic() {

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

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setUploadedFile(URL.createObjectURL(e.target.files[0]));
    }
    const handleUpload = async (e) => {
        e.preventDefault();
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
                {
                    userID, imageID, productName, category, brandName, price, discount, discriptions
                }
            )
            console.log(response)
        }
        catch (error) {
            console.log(error.message)
        }
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
                    <NavLink to='/viewallproduct'><div > <i class="fa fa-folder-open-o"></i><p>View All Products</p></div></NavLink>
                    <NavLink to='/admin'><div> <i class="fa fa-edit"></i><p>Add New Product</p></div></NavLink>
                    <NavLink to='/analysis'> <div style={{ background: "#0676c0", color: "#fff" }} > <i style={{ color: "#fff" }} class="fa fa-line-chart"></i><p>View Analysis</p></div></NavLink>
                    <div> <i class="fa fa-gear"></i><p>Settings</p></div>
                    <div> <i class="fa fa-eye"></i><p>Privacy Policy </p></div>

                </div>
                <div style={{ width: "80%", display: 'flex', alignItems: "center", flexDirection: "column" }}>
                    <div style={{ fontSize: "18px", fontWeight: "700", paddingTop: "10px" }}>View your Products Analytics</div>
                    <div className='add-product-form'>
                         <Chart1 />
                    </div>
                </div>
            </div>


        </>
    )
}

export default ViewAnalytic