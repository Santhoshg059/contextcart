
import React, { useContext, useState } from 'react';
import { UserContext } from '../utils/DashContext';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function Dashboard() {
  const { user, setUser, price, setPrice } = useContext(UserContext);
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleCart = (productId) => {
    const updatedUser = user.map((product) => {
      if (product.id === productId && product.stock > 0) {
        return { ...product, add: product.add + 1, stock: product.stock - 1 };
      }
      return product;
    });

    setUser(updatedUser);
    const selectedProduct = updatedUser.find((product) => product.id === productId);
    if (selectedProduct) {
      setPrice(price + selectedProduct.price);
    }
  };

  const handleRemove = (productId) => {
    const updatedUser = user.map((product) => {
      if (product.id === productId && product.add > 0) {
        return { ...product, add: product.add - 1, stock: product.stock + 1 };
      }
      return product;
    });

    setUser(updatedUser);
    const selectedProduct = updatedUser.find((product) => product.id === productId);
    if (selectedProduct && selectedProduct.add > 0) {
      setPrice(price - selectedProduct.price);
    }
  };

  const calculateTotalPrice = (productId) => {
    const selectedProduct = user.find((product) => product.id === productId);
    if (selectedProduct) {
      return selectedProduct.add * selectedProduct.price;
    }
    return 0;
  };
  
  
    
    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        afterChange: (index) => setCurrentSlide(index),
      };
    
      const thumbnailSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        focusOnSelect: true,
        responsive: [
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 3,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 2,
            },
          },
        ],
      };
    
  return <>
  
  <div className='heading'><h2>Cart app</h2></div> 
  {user.map((product, index)=>(
    <div className='cart' key={index}>
    <div className='imgdiv'>
    <Slider {...sliderSettings} className='slider' initialSlide={currentSlide}>
              {product.thumbnail && (
                <div key={-1}>
                  <img src={product.thumbnail} alt={`Product ${index + 1} - Thumbnail`} />
                </div>
              )}
              {product.images && (
                product.images.map((image, imgIndex) => (
                  <div key={imgIndex}>
                    <img src={image} alt={`Product ${index + 1} - Image ${imgIndex + 1}`} />
                  </div>
                ))
              )}
            </Slider>   
             <div className='prd'>
  <h3>{product.title}</h3>
  <div>
  <h4>Deatils</h4>
  <p>{product.description}</p>
  <h4>Brand : {product.brand}</h4>
  <h4>Category : {product.category}</h4>
  </div>
  
  </div>
  <div className='pricediv'>
  <div className='ratingdiv'>
   <h4>Rating⭐</h4>
   <h5 className='ratnum'>{product.rating}</h5>
  </div>
  <div className='pricenum'>Price 💵 ${product.price}.00</div>
  <div className='offerdiv'>Offer {product.discountPercentage}</div>
  <div className='stockdiv'>Available stock {product.stock}</div>
  <div className='addtodiv'>
    <h3 className='qntdiv'>{product.add}</h3>
    <button onClick={() => handleCart(product.id)}>Add to cart</button>
    <br></br>
    <button  onClick={() => handleRemove(product.id)}>Remove from Cart</button>
  </div>
  </div>
    </div>
    <div className='downdiv'>
    <div className='later'></div>
    <div className='totalpricediv'>
  <div className='tpdiv'>Total Price ${calculateTotalPrice(product.id)}.00</div>
</div>

    </div>
  
  </div>
))}
  </>
}

export default Dashboard