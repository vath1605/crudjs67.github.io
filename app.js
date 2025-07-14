const stock = [];
const searchInput = document.getElementById("searchInput");
const nameInput = document.getElementById("nameInput");
const qtyInput = document.getElementById("qtyInput");
const priceInput = document.getElementById("priceInput");
const imageInput = document.getElementById("imageInput");
const addBtn = document.getElementById("addBtn");
const display = document.getElementById("display");
let editIndex = -1;
const displayStock = (stock) => {
  let output = "";
  if (stock.length == 0) {
    output = `
        <tr>
            <td colspan="7">
                <p class="text-secondary">No Product Found.</p>
            </td>
        </tr>
    `;
    display.innerHTML = output;
  } else {
    stock.map((val,index) => {
      if (
        val.name != null &&
        val.qty != null &&
        val.price != null &&
        val.image != null
      ) {
        output += `
        <tr>
        <td>${val.code}</td>
        <td>${val.name}</td>
        <td>${val.qty}</td>
        <td>${val.price} $</td>
        <td>${(val.price * val.qty).toFixed(2)} $</td>
        <td><img style="width: 50px;height: 50px;" src="${
          val.image
        }" alt=""></td>
        <td>
            <div class="container-fluid">
                <button type="button" data-bs-toggle="modal" data-bs-target="#viewProduct" onclick="viewProduct(${
                  val.code
                })" class="btn btn-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi mb-1 bi-eye" viewBox="0 0 16 16">
<path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
<path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
</svg>
                </button>
                <button type="button" onclick="updateProduct(${
                  index
                })" class="btn btn-warning">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
<path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
<path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
</svg>
                </button>
                <button type="button" onclick="deleteProduct(${
                  index
                })" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteProduct">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
<path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
</svg>
                </button>
            </div>
        </td>
    </tr>
    `;
      } else {
        output = `
        <tr>
            <td colspan="7">
                <p class="text-secondary">No Product Found.</p>
            </td>
        </tr>
    `;
      }
      display.innerHTML = output;
    });
  }
};
addBtn.onclick = () => {
  if(editIndex == -1){
      if (
      nameInput.value != "" &&
      qtyInput.value != "" &&
      priceInput.value != "" &&
      imageInput != "" &&
      imageInput.files.length > 0) {
      let imgFile = imageInput.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        let imgUrl = e.target.result;
        let product = {
          code: stock.length + 1,
          name: nameInput.value,
          qty: qtyInput.value,
          price: priceInput.value,
          image: imgUrl,
        };
        stock.push(product);
        displayStock(stock);
        nameInput.value = "";
        qtyInput.value = "";
        priceInput.value = "";
        imageInput.value = "";
      };
      reader.readAsDataURL(imgFile);
    } else {
      console.log("ERROR");
    }
  }else{
    if (imageInput.files.length > 0) {
      let img = imageInput.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        let imgUrl = e.target.result;
        let updatedProduct = {
          code: stock[editIndex].code,
          name: nameInput.value,
          qty: qtyInput.value,
          price: priceInput.value,
          image: imgUrl,
        };
        stock[editIndex] = updatedProduct;
        displayStock(stock);
      };
      reader.readAsDataURL(img);
    }else{
      let newPro = {
          code: stock[editIndex].code,
          name: nameInput.value,
          qty: qtyInput.value,
          price: priceInput.value,
          image: stock[editIndex].image,
        };
        stock[editIndex]=newPro;
        displayStock(stock);
        nameInput.value = "";
        qtyInput.value = "";
        priceInput.value = "";
        imageInput.value = "";
    }
    editIndex = -1;
    addBtn.textContent = "Save Product";
  }
};
document.addEventListener("DOMContentLoaded", displayStock(stock));
const viewProduct=(code)=>{
  let modal= document.getElementById('modal-body');
  stock.map(val=>{
    let output = "";
    let h1 = "";
    if(code === val.code){
      output+=`
        <div class="container py-4 d-flex justify-content-center">
                        <img class="w-50" src="${val.image}" alt="">
                    </div>
                    <div class="container d-flex justify-content-start px-2">
                        <table>
                            <tr>
                                <td>Code :</td>
                                <td>${val.code}</td>
                            </tr>
                            <tr>
                                <td>Name :</td>
                                <td>${val.name}</td>
                            </tr>
                            <tr>
                                <td>Price :</td>
                                <td>${val.price} $</td>
                            </tr>
                            <tr>
                                <td>QTY :</td>
                                <td>${val.qty} pcs</td>
                            </tr>
                            <tr>
                                <td>Payment :</td>
                                <td>${(val.price * val.qty).toFixed(2)} $</td>
                            </tr>
                        </table>
                    </div>
      `;
      document.getElementById('exampleModalLabel').innerHTML=val.name;
      modal.innerHTML = output;
    }
  })
}
const deleteProduct =(index)=>{
  const yesBtn = document.getElementById('yesBtn');
  const imgContainer = document.getElementById('imgContainer');
  let img = stock[index].image;
  imgContainer.innerHTML = `
    <img class="w-25" src="${img}" alt="">
  `;
  yesBtn.onclick=()=>{
    stock.splice(index,1);
    displayStock(stock);

    document.getElementById('noBtn').click();
  }
}
const updateProduct=(index)=>{
  let updatePro = stock[index];
  editIndex = index;
  nameInput.value = updatePro.name;
  qtyInput.value = updatePro.qty;
  priceInput.value = updatePro.price;
  addBtn.textContent="Update Product";
}
searchInput.oninput=(e)=>{
  let search = e.target.value;
  if(search != ''){
    let showPro = stock.filter(val=>
    val.name.includes(search)
  )
  displayStock(showPro);
  }else{
    displayStock(stock);
  }
}