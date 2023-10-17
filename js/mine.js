var productNameInp=document.getElementById("productName");
var productCategoryInp=document.getElementById("productCategory");
var productPriceInp=document.getElementById("productPrice");
var productDescriptionInp=document.getElementById("productDescription");
var tbody=document.getElementById("tbody");
var searchInp=document.getElementById("searchInp");
var updateProducts=document.getElementById("updateProducts");
var addProducts=document.getElementById("addProducts");
var globalIndex; //to save index from updateForm() to saveUpdateProduct()
updateProducts.style.display="none" //hide update button
// var productList=[]; //array
// var productList=localStorage.getItem('productData');//string
if(localStorage.getItem('productData') != null)
{
    var productList=JSON.parse(localStorage.getItem('productData'));//string to array of object
    // console.log(productList);//test
    displayProduct();
}
else
{
    var productList=[]; //new array for new client
}
//creat operation
function addProduct()
{
//enter value by user
var product ={ //object
    productName : productNameInp.value,
    productCategory:productCategoryInp.value,
    productPrice:productPriceInp.value,
    productDescription:productDescriptionInp.value,

};
productList.push(product);

// console.log(JSON.stringify(productList)); //test
localStorage.setItem('productData',JSON.stringify(productList)); //make localStorage
// console.log(product); //test
// console.log(productList); //test
displayProduct();
cleanForm(); //hosting
}
//clean operation
function cleanForm()
{
    productNameInp.value = '' //empty input
    productCategoryInp.value = '' //empty input
    productPriceInp.value = '' //empty input
    productDescriptionInp.value = '' //empty input

}
//retrive operation
function displayProduct()
{
    var trs = '' ;
    for(var i = 0 ; i<productList.length ; i++)
    {
      trs+=  `<tr>
        <td>${i}</td>
        <td>${productList[i].productName}</td>
        <td>${productList[i].productCategory}</td>
        <td>${productList[i].productPrice}</td>
        <td>${productList[i].productDescription}</td>
     
        <td>
            <button class="btn bg-warning" onclick='updateForm(${i})'>
                <i><i class="fas fa-edit"></i></i>
            </button>
        </td>
        <td>
            <button class="btn bg-danger" onclick='deleteProduct(${i})' >
                 <i class="fa fa-trash" ></i>
            </button>
        </td>
    </tr>`
    }
    // console.log(trs); //test
    tbody.innerHTML=trs;
    
}
//search opration
function search()
{
    // console.log('hhhh'); //test
    //  console.log(searchInp.value); // search input value 
    var trs = '' ;
    for(var i = 0 ; i<productList.length ; i++)
    {
        // if(searchInp.value == productList[i].productName)
        // if( productList[i].productName.includes(searchInp.value))
        if(productList[i].productPrice.includes(searchInp.value) || productList[i].productCategory.toLowerCase().includes(searchInp.value.toLowerCase()) ||productList[i].productName.toLowerCase().includes(searchInp.value.toLowerCase())|| productList[i].productDescription.toLowerCase().includes(searchInp.value.toLowerCase()))
    { 
         trs+=  `<tr>
        <td>${i}</td>
        <td>${productList[i].productName.replace(searchInp.value.toLowerCase(),'<span >'+searchInp.value.toLowerCase()+'</span>')}</td>
        <td>${productList[i].productCategory.replace(searchInp.value.toLowerCase(),'<span>'+searchInp.value.toLowerCase()+'</span>')}</td>
        <td>${productList[i].productPrice.replace(searchInp.value,'<span>'+searchInp.value+'</span>')}</td>
        <td>${productList[i].productDescription.replace(searchInp.value.toLowerCase(),'<span>'+searchInp.value.toLowerCase()+'</span>')}</td>
     
        <td>
            <button class="btn bg-warning" >
                <i><i class="fas fa-edit"></i></i>
            </button>
        </td>
        <td>
            <button class="btn bg-danger" >
                 <i class="fa fa-trash" ></i>
            </button>
        </td>
    </tr>`
}

    }
    tbody.innerHTML=trs;




}
//delete opration
function deleteProduct(deleteIndex)
{
    // alert("hhhh");//test
    // alert(index);
    productList.splice(deleteIndex,1);
    localStorage.setItem('productData',JSON.stringify(productList));
    displayProduct();
    // console.log(productList);
}
//update opration
function updateForm(updateIndex)
{
    globalIndex=updateIndex; 
//  alert(upIndex);//test

productNameInp.value=productList[updateIndex].productName;
productCategoryInp.value=productList[updateIndex].productCategory;
productPriceInp.value=productList[updateIndex].productPrice;
productDescriptionInp.value=productList[updateIndex].productDescription;
addProducts.style.display="none"; //hide add button
updateProducts.style.display="inline-block" //show update button

}

//saveUpdate opration
function saveUpdateProduct()
{
productList[globalIndex].productName =productNameInp.value;
productList[globalIndex].productCategory =productCategoryInp.value;
productList[globalIndex].productPrice =productPriceInp.value;
productList[globalIndex].productDescription =productDescriptionInp.value;
displayProduct();//to refresh table
localStorage.setItem('productData',JSON.stringify(productList)); //to save new data in local storage
// console.log(globalIndex); //test
cleanForm(); //to clear input
updateProducts.style.display="none"; //hide update button
addProducts.style.display="inline-block" //show add button

}





