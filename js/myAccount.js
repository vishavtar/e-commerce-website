const shopping_address_01 = document.getElementById("shopping_address_01");
const shopping_address_02 = document.getElementById("shopping_address_02");
const changeAddress = document.getElementById("changeAddress");
const saveAddress = document.getElementById("saveAddress");
const show_Shopping_Address01 = document.getElementById("show_Shopping_Address01");
const show_Shopping_Address02 = document.getElementById("show_Shopping_Address02");

const post_shopping_address = {
    address_1:"",
    address_2:""
};

function showAddressOnAccount(){
    getUserDetailsLocale();
    shopping_address_01.value=store_local_user_details.address_1;
    show_Shopping_Address01.innerText=store_local_user_details.address_1;
    shopping_address_02.value=store_local_user_details.address_2;
    show_Shopping_Address02.innerText=store_local_user_details.address_2;
}

function changeAddressFun(){
    showAddressOnAccount()
    saveAddress.style.display="none";
    shopping_address_01.disabled=true;
    shopping_address_02.disabled=true;
    changeAddress.addEventListener("click",()=>{
        saveAddress.style.display="inline-block";
        changeAddress.style.display="none";
        shopping_address_01.disabled=false;
        shopping_address_02.disabled=false;
        shopping_address_01.addEventListener("focus",()=>{
            shopping_address_01.value="";
        })
        shopping_address_02.addEventListener("focus",()=>{
            shopping_address_02.value="";
        })
        
        if(shopping_address_01.value && shopping_address_02.value){
            saveAddress.addEventListener("click",()=>{
                
                post_shopping_address.address_1=shopping_address_01.value;
                post_shopping_address.address_2=shopping_address_02.value;
                
                const updatedaddressData = JSON.stringify(post_shopping_address);
                console.log("llll",updatedaddressData);
                callApi("profile", "POST", updatedaddressData, true)
                .then((results) => {
                    
                    if(results.status == "success"){
                        let ud = new Promise((resolve,reject)=>{
                            fetchProfileDetails();
                        })
                        showAddressOnAccount();
                        shopping_address_01.disabled=true;
                        shopping_address_02.disabled=true;
                        console.log("after fixes",store_local_user_details);
                    }
                })
            })}
            
        })
    }
    changeAddressFun();