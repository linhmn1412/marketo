import { products } from './arrayProduct.js';

let checkUpDown
let checkColor

$(".categories").click(function () {
  $(this).siblings(".dropdown-categories").fadeToggle();
  if (checkUpDown === undefined || checkUpDown === true) {
    $(".down").addClass("active-up");
    checkUpDown = false;
  }
  else {
    $(".down").removeClass("active-up");
    checkUpDown = true;
  }
})

$(".category a").click(function () {
  $(this).siblings(".dropdown-category").fadeToggle();
  if (checkColor === undefined || checkColor === true) {
    $(this).css("color", "#1f73d3")
    checkColor = false;
  }
  else {
    $(this).css("color", "#7b7b7b")
    checkColor = true;
  }
})

// click btn-home xs-sm-md
$(".btn-home").click(function (e) {
  e.preventDefault()
  $(".review-menu-icon").css("animation", "moveLeftToRight100 1s forwards");
  $(".show-review-menu-icon ").show();
})

//close review menu btn-home
$(".btn-close").click(function () {
  $(".review-menu-icon").css("animation", "moveLeftToRight100_back 1s forwards");
  setTimeout(
    function () {
      $(".show-review-menu-icon").hide();
    }, 1000);
})

// click btn-cart to show shopping cart
$(".btn-cart").click(function (e) {
  e.preventDefault()
  $(".shopping-cart-content ").css("animation", "moveRightToLeft100 1s forwards");
  $('.bg-black-cart').css({'opacity':'0.9','transition':'all 1s'});
  $(".show-shopping-cart").show();
})

//click btn-close-cart to close shopping cart
$(".btn-close-cart").click(function () {
  $(".shopping-cart-content").css("animation", "moveRightToLeft100_back 1s forwards");
  $('.bg-black-cart').css({'opacity':'0','transition':'all 1s'});
  setTimeout(
    function () {
      $(".show-shopping-cart").hide();
    }, 1000);
})

//click outside
$(document).click(function (event) {
    var $target = $(event.target);
    //click outside to close review menu btn-home
    if ($target.closest('.menu-icon-content').length === 0 && $target.closest('.show-review-menu-icon').length !== 0 &&
      $('.show-review-menu-icon').is(":visible")) {
      $(".review-menu-icon").css("animation", "moveLeftToRight100_back 1s forwards");
      setTimeout(
        function () {
          $(".show-review-menu-icon").hide();
        }, 1000);
    }
  
    //click outside to close search result
    if($target.closest('.form-input-search').length === 0  && $target.closest('.search-result').length === 0 && 
    $('.search-result').is(":visible")){
      $('.search-result').hide()
    }
  
    //click outside to close shopping cart
    if ($target.closest('.btn-cart').length === 0 && $target.closest('.bg-black-cart').length !== 0 &&
      $('.show-shopping-cart').is(":visible")) {
        $(".shopping-cart-content").css("animation", "moveRightToLeft100_back 1s forwards");
        $('.bg-black-cart').css({'opacity':'0','transition':'all 1s'});
        setTimeout(
          function () {
            $(".show-shopping-cart").hide();
          }, 1000);
    }
  });

  $(".dropdown-category-list li").click(function () {
    $(".category-text").text($(this).text());
    $(".dropdown-category").hide();
    $(".category a").css("color", "#7b7b7b")
    checkColor = true
  })

$(document).ready( function(){
    //back to top 
  $('#backtop').click(function () {
    $('html, body').animate({
      scrollTop: 0
    }, 2000);
  })

  //search name product
 $('.input-search').keyup(function () {
  const valueSearch = $('.input-search input').val();
  const categogySearch = $(".category-text").text();
  if (valueSearch) {
    if (categogySearch.includes('All Categories')) {
      const tmp = products.filter((val) => {
        return val.productName.toUpperCase().includes(valueSearch.toUpperCase())
      })
      listSearch.splice(0,listSearch.length)
      listSearch.push(...tmp)
    } else {
      const tmp = products.filter((val) => {
        return val.categories.includes(categogySearch)
      }).filter((val1) => {
        return val1.productName.toUpperCase().includes(valueSearch.toUpperCase())
      })
      listSearch.splice(0,listSearch.length)
      listSearch.push(...tmp)
    }
    if (listSearch.length === 0) {
      $('.search-result').hide()
      $('.no-result').show()
    } else {
      $('.no-result').hide()
      $('.search-result').show()
      $('.list-products-search').html(renderProductSearch(listSearch, valueSearch).slice(0,6))
      localStorage.setItem("listSearch", JSON.stringify(listSearch))
      localStorage.setItem("keySearch", valueSearch)
    }
  }
  else {
    $('.search-result').hide()
    $('.no-result').hide()
  }
})
})

//get data from local storage
const listSearchLocalStorage = localStorage.getItem("listSearch")
//convert data to array
const listSearch = listSearchLocalStorage ? JSON.parse(listSearchLocalStorage) : []

$('.form-input-search').on("click",'.btn-search', function(e){
  e.preventDefault()
  const valueSearch = $('.input-search input').val();
  const categogySearch = $(".category-text").text();
  if (valueSearch) {
    if (categogySearch.includes('All Categories')) {
      const tmp = products.filter((val) => {
        return val.productName.toUpperCase().includes(valueSearch.toUpperCase())
      })
      listSearch.splice(0,listSearch.length)
      listSearch.push(...tmp)
    } else {
      const tmp = products.filter((val) => {
        return val.categories.includes(categogySearch)
      }).filter((val1) => {
        return val1.productName.toUpperCase().includes(valueSearch.toUpperCase())
      })
      listSearch.splice(0,listSearch.length)
      listSearch.push(...tmp)
    }
  }else {
    if (categogySearch.includes('All Categories')) {
      listSearch.splice(0,listSearch.length)
      listSearch.push(...products)
    } else {
      const tmp = products.filter((val) => {
        return val.categories.includes(categogySearch)
      })
      listSearch.splice(0,listSearch.length)
  
      listSearch.push(...tmp)
    }
  }
  if (listSearch.length === 0) {
    $('.search-result').hide()
    $('.no-result').show()
  } else {
    $('.no-result').hide()
    $('.search-result').show()
    $('.list-products-search').html(renderProductSearch(listSearch,valueSearch).slice(0,6))
  }
  localStorage.setItem("listSearch", JSON.stringify(listSearch))
  localStorage.setItem("keySearch", valueSearch)
})
  
function renderProductSearch(arr = [],keySearch) {
  let rs = [];
  const regex = new RegExp(keySearch, 'gi')
  arr.map((val) => {
    let name = val.productName.replace(regex,(match)=> {
      return `<span style="color: red">${match}</span>`
    })
    rs.push(`
          <li class="product-item flex col-xs-6 col-sm-6">
                  <a id="${val.id}" class="product-item__left btn-product" href="./product/">
                  <img width="65" height="65" src="${val.image}" alt="" />
                </a>
                <div class="product-item__right pd-left-right-20">
                  <a id="${val.id}" class="name-product btn-product" href="./product/">${name}</a>
                  <span class="old-price">${val.price}</span>
                  <span class="new-price">${val.discountPrice}</span>
                </div></li>`)

    
  })
  return rs
}

  //format currency
const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2
})



//get data from local storage
  const listCartLocalStorage = localStorage.getItem("listCart")
//convert data to array
  const listCart = listCartLocalStorage ? JSON.parse(listCartLocalStorage) : []
  if(listCart.length === 0){
    $('.list-products-cart').html(`<li><p>No products in the cart.</p><li>`)
    $('.cart-footer').hide()

  }
  else {
    const num = listCart.reduce((acc,val)=> {
      return acc + val.quantity
    },0)
    const subTotal = listCart.reduce((acc,val)=> {
      return acc + val.quantity*(+val.discountPrice.slice(1))
    },0)
    $('.cart-num').text(num)
    loadListProductsCart(listCart)
    $('.cart-footer').show()
    $('.total-price').text(formatter.format(subTotal))
    
  }
  
  $(document).ready(function(e){
    //remove product of list cart
    $('.list-products-cart').on("click",'.btn-remove',function(){
    const id_product = +$(this).attr('id')
    const product = listCart.find((val) => val.id === id_product)
    const idx = listCart.findIndex((val) => val.id === id_product);
    const num = +$('.cart-num').text()
    $('.cart-num').text(num - +product.quantity)
    const subTotal = +$('.total-price').text().slice(1).split(',').join('') - (+product.discountPrice.slice(1))*product.quantity
    $('.total-price').text(formatter.format(subTotal))
    listCart.splice(idx,1)
    if(listCart.length === 0){
      $('.list-products-cart').html(`<li><p>No products in the cart.</p><li>`)
      $('.cart-footer').hide()
    }
    else {
      loadListProductsCart(listCart)
    }
    localStorage.setItem("listCart",JSON.stringify(listCart))
    })

    //get data from local storage
    const productLocalStorage = localStorage.getItem("product")
    //convert data to array
    const reviewProduct = productLocalStorage ? JSON.parse(productLocalStorage) : {}
    $('.name-product-link').text(reviewProduct.productName)
    document.title = reviewProduct.productName + ' - Marketo'
    // click image and name product to show review product 
    $(document).on("click",'.btn-product',function(){
        const id_product = +$(this).attr('id')
        const reviewProduct = products.find((val) => val.id === id_product)
        //save data to local storage
        localStorage.setItem("product",JSON.stringify(reviewProduct))
    })
})
  

  //load list products to shopping cart icon
function loadListProductsCart(arr = []){
  let rs =''
  arr.map((val)=> {
      rs += `
      <li class="product-item flex pd-10 ">
      <a id="${val.id}" class="product-item__left pd-10 btn-product" href="/marketo/product/">
      <img width="65" height="60" src="${val.image}" alt="" />
    </a>
    <div class="product-item__right">
      <div class="product-infor pd-10">
        <a id="${val.id}" class="name-product btn-product" href="/marketo/product/">${val.productName}</a>
      <span class="quantity-product">${val.quantity}</span>
      <span>x</span>
      <span class="price">${val.discountPrice}</span>
      </div>
      <div class="remove-product">
        <button id="${val.id}" class="btn-remove"><i class="fa-solid fa-xmark"></i></button>
      </div>
    </div>
  </li>`
    })
  $('.list-products-cart').html(rs)
}
  
//get data from local storage
const WishListLocalStorage = localStorage.getItem("wishList")
//convert data to array
const wishList = WishListLocalStorage ? JSON.parse(WishListLocalStorage) : []

let check_clickWishList = false
localStorage.setItem("check_WishList",check_clickWishList)

const num = wishList.reduce((acc,val)=> {
  return acc + 1
},0)
$('.wishlist-num').text(num)

//get data from local storage
const productLocalStorage = localStorage.getItem("product")
//convert data to array
const reviewProduct = productLocalStorage ? JSON.parse(productLocalStorage) : {}
loadReviewProduct(reviewProduct)
if(reviewProduct.price !== ''){
  $('.onsale').show()
}
wishList.map((val) =>{
  if(val.id === reviewProduct.id){
    $('.disable').hide()
  }
})

//show product reviews by star rating
function renderRated(rated) {
    let tmp = "";
    if (rated === 0) return '';
    else {
      if (Number.isInteger(rated)) {
        if (rated === 5) {
          for (let i = 0; i < 5; i++) {
            tmp += `<i class="fa-solid fa-star"></i>`;
          }
        }
        else {
          for (let i = 0; i < rated; i++) {
            tmp += `<i class="fa-solid fa-star"></i>`;
          }
          for (let i = 0; i < 5 - rated; i++) {
            tmp += `<i class="fa-regular fa-star"></i>`;
          }
        }
      }
      else {
        for (let i = 0; i < Math.floor(rated); i++) {
          tmp += `<i class="fa-solid fa-star"></i>`;
        }
        tmp += `<i class="fa-regular fa-star-half-stroke"></i>`
        for (let i = 0; i < 5 - Math.ceil(rated); i++) {
          tmp += `<i class="fa-regular fa-star"></i>`;
        }
      }
    }
    return tmp
  }

  function renderCategory(arr=[]){
    let rs = []
    arr.map((val)=>{
        rs.push(`<a class="btn-category" href="#">${val}</a>, `)
    })
    return rs.join('')
  }
function loadReviewProduct(product = {}){
    let rs = ''
    
    rs +=`
        <div class="product-img">
        <img src="${product.image}" alt="">
        <div class="onsale"><span>Sale!</span></div>
    </div>
    <div class="product-info">
        <h2 class="name-product mg-bottom-10">${product.productName}</h2>
        <p class="category mg-bottom-20">Category: ${renderCategory(product.categories)}</p>
        <div id="rated-${product.id}" class="rated-product mg-bottom-20">
        ${renderRated(product.rate)}
        </div>
        <p class="describe">
            Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.
        </p>
        <p class="old-price">${product.price}</p>
        <p class="new-price">${product.discountPrice}</p>
        <p class="stocks"><span>30</span> in stocks</p>
        <form action="#" class="flex">
            <div class="quantity">
                <input type="button" value="-" class="btn-decre" id="#input-${product.id}">
                <input type="number" value="1" id="input-${product.id}">
                <input type="button" value="+" class="btn-incre" id="#input-${product.id}">
            </div>
            <a href="#" id="${product.id}" class="btn-add">Add to cart</a>
        </form>
        <div class="wishlist-compare">
            <a id="${product.id}" class="btn-wishlist" href=""><i class="fa-solid fa-heart"></i><i class="fa-regular fa-heart disable"></i></a>
        </div>
    </div>
        `
   $('.review-product').html(rs)
}

//add product to cart
$(document).ready(function(){
    $(".review-product").on("click",'.btn-incre',function(){
        const id = $(this).attr('id')
        const num = +$(id).val()+1
        $(id).val(num) 
        
      })
      $(".review-product").on("click",'.btn-decre',function(){
        const id = $(this).attr('id')
        if(+$(id).val() === 1) return
        const num = +$(id).val()-1
        $(id).val(num)
      })
    $(".review-product").on("click",'.btn-add',function(e){
        e.preventDefault()
        $(".shopping-cart-content ").css("animation", "moveRightToLeft100 1s forwards");
        $('.bg-black-cart').css({'opacity':'0.9','transition':'all 1s'});
        $(".show-shopping-cart").show();
        setTimeout(function(){
            $(".shopping-cart-content").css("animation", "moveRightToLeft100_back 1s forwards");
            $('.bg-black-cart').css({'opacity':'0','transition':'all 1s'});
            setTimeout(
              function () {
                $(".show-shopping-cart").hide();
              }, 1000);
        },2000)
        if(listCart.length === 0){
          $('.cart-footer').show()
        }
        const id_input = '#input-'+reviewProduct.id
        const quantity = +$(id_input).val()
        //update quantity of cart
        const num = +$('.cart-num').text()
        $('.cart-num').text(num + quantity)
        //get id to push product into array
        const idx = listCart.findIndex((val) => val.id === reviewProduct.id)
          if(idx === -1) {
            listCart.push({...reviewProduct, "quantity": quantity})
            const subTotal = +$('.total-price').text().slice(1).split(',').join('') + (+reviewProduct.discountPrice.slice(1).split(',').join(''))*quantity
            $('.total-price').text(formatter.format(subTotal))
          }
          else {
            listCart[idx].quantity += quantity
            const subTotal = +$('.total-price').text().slice(1).split(',').join('') + (+reviewProduct.discountPrice.slice(1).split(',').join(''))*quantity
            $('.total-price').text(formatter.format(subTotal))
          }
        //Show products added
        loadListProductsCart(listCart)
        //save data to local storage
        localStorage.setItem("listCart",JSON.stringify(listCart))
      
      })

      $(".review-product").on("click",'.btn-wishlist',function(e){
        //get id to push product into array
        if($(this).attr('href') === ""){
         e.preventDefault()
         check_clickWishList = true
        const id_product = +$(this).attr('id')
        const idx = wishList.findIndex((val) => val.id === id_product);
        if(idx === -1) {
          $('.disable').hide()
         $('.show-success p').text(`Product has been successfully added to wishlist`)
         $('.show-success').show()
         setTimeout(function(){
           $('.show-success').hide()
         },2500)
         wishList.push({...reviewProduct})
         $(this).attr("href","/marketo/wishlist/")
           //update quantity of wishlist
         const num = +$('.wishlist-num').text()
         $('.wishlist-num').text(num + 1)
           //save data to local storage
         localStorage.setItem("wishList",JSON.stringify(wishList))
         }
         else {
           $('.noted-suscces').css("background-color","#007bff")
           $('.show-success p').text(`The product is already in your wishlist!`)
           $('.show-success').show()
           setTimeout(function(){
             $('.show-success').hide()
           },2500)
           $(this).attr("href","/marketo/wishlist/")
         }
         localStorage.setItem("check_WishList",check_clickWishList)
       }
     })
})
