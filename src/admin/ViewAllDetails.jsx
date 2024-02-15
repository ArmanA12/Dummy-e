import React from 'react'
import Dummy from '../assets/dummy.png'
import { useState, useEffect, Suspense } from 'react';
import { Client, Storage, Databases, ID, Query } from "appwrite";
import { NavLink } from 'react-router-dom';
import Loading from '../component/Loading';


function ViewAllDetails() {

  const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('6572b1f0d2dacd3909ac');

  const storage = new Storage(client);
  const databases = new Databases(client);

  const userName = localStorage.getItem('userName');
  const userID = localStorage.getItem('userId')
  const [uploadedFile, setUploadedFile] = useState(null);
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('');
  const [brandName, setBrandName] = useState('');
  const [price, setPrice] = useState('');
  const [discount, setDiscount] = useState('');
  const [discriptions, setDiscriptions] = useState('');
  const [product, setProduct] = useState([]);
  const [file, setFile] = useState(null)
  const [showHide, setShowhide] = useState(false)
  const [image, setImage] = useState('')
  const [document, setDocument] = useState('');
  const [showLoader, setShowloader] = useState(false);
  const [showDeleteCard, setShowDeleteCard] = useState(false);
  const [deleteParams, setDeleteParams] = useState({ productID: null, imageID: null });


  // get all products
  useEffect(() => {
    async function getAllProduct() {
      try {
        const response = await databases.listDocuments('6573f9c378124f54aea0', '65744e9fe4c9af1527a5', [Query.equal('userID', userID)])
        setProduct(response.documents);
        console.log(response)
      }
      catch (error) {
        console.log(error.message)
      }
    }
    getAllProduct()
  }, [])
   // setting all data in state for updating file
  function handleUpdate(index) {
    setShowhide(!showHide)
    setProductName(product[index].productName);
    setBrandName(product[index].brandName);
    setCategory(product[index].category);
    setPrice(product[index].price);
    setDiscount(product[index].discount);
    setDiscriptions(product[index].discriptions);
    setImage(product[index].imageID)
    setDocument(product[index].$id)
  }
  // function for take image 
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
        file,
      )
      if (response) {
        await storage.deleteFile('65744b252eefab9b080d', image);
      }
      handleUpdateProduct(response.$id)
    }
    catch (error) {
      console.log(error.message)
    }
  }


  async function handleUpdateProduct(imageID) {
    try {
      const response = databases.updateDocument(
        '6573f9c378124f54aea0',
        '65744e9fe4c9af1527a5',
        document,
        { userID, imageID, productName, category, brandName, price, discount, discriptions }
      )
      console.log(response)
      if (response) {
        setShowloader(false)
        window.location.reload();
      }
    }
    catch (error) {
      console.log(error.message)
    }
  }

  function handleCencel() {
    setShowhide(false)
  }

  if (showLoader) {
    return (
      <div className='loading'>
        <Loading />
      </div>
    )
  }

  if (showDeleteCard) {
    return (
      <div className='delete-card-container'>
        <div>
          <center>  <p><i style={{fontSize:"26px"}} class="fa fa-warning"></i></p>
          <h4>If you want to delete click </h4>
          </center>
          
          <button style={{ background: "#FF3D67", color: "#fff" }} onClick={() => handleDelete()}>Delete Product</button>
          <button style={{ background: "#049a59" }} onClick={() => setShowDeleteCard(false)}>Cancel</button>
        </div>
      </div>
    )
  }
  function handleDeleteShow(productID, imageID) {
    setShowDeleteCard(true)
    setDeleteParams({ productID, imageID });
  }
  function handleDelete() {
    const { productID, imageID } = deleteParams;
    if (productID !== null && imageID !== null) {
      deleteProductData(productID, imageID);
    }
  }

  async function deleteProductData(productID, imageID) {
    setShowloader(true)
    try {
      const file = await storage.deleteFile('65744b252eefab9b080d', imageID)
      const document = await databases.deleteDocument('6573f9c378124f54aea0', '65744e9fe4c9af1527a5', productID)
      if (file && document) {
        setShowloader(false)
        window.location.reload();
      }
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
          <NavLink to='/viewallproduct'><div style={{ background: "#0676c0", color: "#fff" }} > <i style={{ color: "#fff" }} class="fa fa-folder-open-o"></i><p>View All Products</p></div></NavLink>
          <NavLink to='/admin'><div> <i class="fa fa-edit"></i><p>Add New Product</p></div></NavLink>
          <NavLink to='/analysis'> <div> <i class="fa fa-line-chart"></i><p>View Analysis</p></div></NavLink>
          <div> <i class="fa fa-gear"></i><p>Settings</p></div>
          <div> <i class="fa fa-eye"></i><p>Privacy Policy </p></div>
        </div>
        <div style={{ marginTop: "10px", width: "80%", display: 'flex', alignItems: "center", flexDirection: "column" }}>
          <br />
          <div style={{ fontSize: "22px", paddingBottom: "10px", fontWeight: "700", paddingTop: "10px" }}>Your All Product is Here</div>
          {
            product ? (
              <div className='add-product-form' style={{ width: '100%' }}>
                {product.map((item, index) => (
                  <div style={{ marginTop: '0px' }} key={index} className='admin-product-container'>
                    <div className='admin-product-info-div'>
                      <img src={storage.getFilePreview('65744b252eefab9b080d', item.imageID)} alt='' />
                      <div>
                        <div><strong>Name : </strong>{item.productName}</div>
                        <div><strong>Brand : </strong>{item.brandName}</div>
                        <div><strong>Category : </strong>{item.category}</div>
                        <div><strong>Price : </strong>${item.price}</div>
                        <div><strong>Discounts : </strong><strike>{item.discount}</strike>%</div>
                        <div><strong>About Items : </strong>{item.discriptions}</div>
                      </div>
                    </div>
                    <div>
                      <div onClick={() => handleUpdate(index)} className='delete-update'>Edit Product</div><br />
                      <div style={{ background: '#651717' }} onClick={() => handleDeleteShow(item.$id, item.imageID)} className='delete-update'>Delete Product </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : 'loading...'
          }

        </div>
      </div>
      <div >
        {showHide ? (
          <div className='formforupdate'>
            <form onSubmit={handleUpload}>
              <div style={{ position: "relative", background: "transparent" }}><input style={{ height: "180px", background: "transparent" }} onChange={handleFileChange} type="file" />
                <div className='image-update'><img src={uploadedFile ? uploadedFile : storage.getFilePreview('65744b252eefab9b080d', image)} alt="" /></div>
              </div>
              <div><input onChange={(e) => setProductName(e.target.value)} value={productName} type="text" placeholder='Product Name' required /></div>
              <div>
                <input onChange={(e) => setCategory(e.target.value)} value={category} type="text" placeholder='Category' required />
              </div>
              <div><input onChange={(e) => setBrandName(e.target.value)} value={brandName} type="text" placeholder='Brand Name' required /></div>
              <div>
                <input onChange={(e) => setPrice(e.target.value)} value={price} type="text" placeholder='Price' required />
              </div>
              <div><input onChange={(e) => setDiscount(e.target.value)} value={discount} type="text" placeholder='Discounts in %' required /></div>
              <div>
                <textarea onChange={(e) => setDiscriptions(e.target.value)} value={discriptions} style={{ height: "90px" }} name="" id="" placeholder='Discriptions' required></textarea>
              </div>
              <div style={{ width: "98%" }}><button style={{ background: "#008ae6", color: "#fff", cursor: "pointer" }} type='submit'>Update Product</button></div>
              <div style={{ width: "98%" }}><button onClick={() => handleCencel()} style={{ background: "#049a59", color: "#fff", cursor: "pointer" }}>Cancel</button></div>
            </form>
          </div>
        ) : ''}
      </div>

    </>
  )
}

export default ViewAllDetails