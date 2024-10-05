const loadAllphones = async(status,searchText)=>{
    document.getElementById('spiner').style.display='none';
    // document.getElementById('phone-container').style.display='';
    // document.getElementById('showAll-Contaier').style.display='';
    console.log(searchText)
    
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText?searchText:'iphone'}`);
    const data = await res.json();
    if(status){
        displayAllPhone(data.data);
    }else{
        displayAllPhone(data.data.slice(0,6));
    }
    
}


const displayAllPhone = (phones) =>{
    const phoneContainer = document.getElementById('phone-container');
    document.getElementById('phone-container').style.display='';
    document.getElementById('showAll-Contaier').style.display='';
    phoneContainer.innerHTML='';
    phones.forEach(phone => {
        const {brand,phone_name,slug,image}=phone;
        const div =document.createElement('div');
        div.classList = 'card shadow-md';
        div.innerHTML =`
            <figure>
                <img
                src=${image}
                alt="Shoes" />
            </figure>
            <div class="card-body">
                <h2 class="card-title">${brand}</h2>
                <p>${slug}</p>
                <div class="card-actions justify-center">
                    <button onclick="phoneDetails('${slug}')" class="btn btn-primary">Show Details</button>
                </div>
            </div>
        `;
        phoneContainer.appendChild(div);
    });
}

const handleSearch = () =>{
    document.getElementById('spiner').style.display='block';
    document.getElementById('phone-container').style.display='none';
    document.getElementById('showAll-Contaier').style.display='none';
    const searchText = document.getElementById('Search-box').value;

    setTimeout( function (){
        loadAllphones(false,searchText);
    }, 2000);
}

const handleShowAll = () =>{
    loadAllphones(true)
}

const phoneDetails = async(slugs) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${slugs}`);
    const data =await res.json();
    console.log(data.data)
    const {brand,name, image,slug}= data.data;

    const modelContainer = document.getElementById('modal-container');
    modelContainer.innerHTML = `
        <dialog id="my_modal_1" class="modal">
    
    <div class="max-w-7xl modal-box mx-auto px-4 sm:px-6 lg:px-8 mt-6">
      <div class="flex flex-col md:flex-row -mx-4">
        <div class="md:flex-1 px-4">
          <div  class="h-64 md:h-80 rounded-lg bg-gray-100 mb-4 flex items-center justify-center">
             <img
                src=${image}
                alt=${brand} />
          </div>
        
        </div>
        <div class="md:flex-1 px-4">
          <h2 class="mb-2 leading-tight tracking-tight font-bold text-gray-800 text-2xl md:text-3xl">${name}</h2>
          <p class="text-gray-500 text-sm">By <a href="#" class="text-indigo-600 hover:underline">${brand}</a></p>
    
          <div class="flex items-center space-x-4 my-4">
            <div>
              <div class="rounded-lg bg-gray-100 flex py-2 px-3">
                <span class="text-indigo-400 mr-1 mt-1">$</span>
                <span class="font-bold text-indigo-600 text-3xl">25</span>
              </div>
            </div>
            <div class="flex-1">
              <p class="text-green-500 text-xl font-semibold">Save 12%</p>
              <p class="text-gray-400 text-sm">Inclusive of all Taxes.</p>
            </div>
          </div>
    
          <p class="text-gray-500">Lorem ipsum, dolor sit, amet consectetur adipisicing elit. Vitae exercitationem porro saepe ea harum corrupti vero id laudantium enim, libero blanditiis expedita cupiditate a est.</p>
    
          <div class="flex py-4 space-x-4">
            <div class="relative">
              <div class="text-center left-0 pt-2 right-0 absolute block text-xs uppercase text-gray-400 tracking-wide font-semibold">Qty</div>
              <select class="cursor-pointer appearance-none rounded-xl border border-gray-200 pl-4 pr-8 h-14 flex items-end pb-1">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
    
              <svg class="w-5 h-5 text-gray-400 absolute right-0 bottom-0 mb-2 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
              </svg>
            </div>
    
            <button type="button" class="h-14 px-6 py-2 font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      <div class="modal-action ">
        <form method="dialog">
          <button class="btn bg-red-500 text-white">Close</button>
        </form>
      </div>
    </div>
  </dialog>
    `;

    my_modal_1.showModal();
}

loadAllphones(false,'iphone');