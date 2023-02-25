const wrapper = document.querySelector(".wrapper")
inputside = wrapper.querySelector(".input")
inputField = inputside.querySelector("input")
inputTxt = document.querySelector(".inputtxt")
LocationBtn = inputside.querySelector("button")
let ApiKey = "390f4e9b19b598c27c20627f2b613eae"
details = document.querySelector(".details")
humid = document.querySelector(".humid")
detailsIcon = document.querySelector(".details img")
Icon = document.getElementById("i")
inputX = document.querySelector(".inputx")
cancel = document.querySelector(".cancel")
search = document.querySelector(".search")

let api

function openLocation(){
    wrapper.classList.add("openWrapper")
}

function openLocation2(){
    search.classList.add("openS")
}

function closeLocation2(){
    search.classList.remove("openS")
}


inputField.addEventListener("keyup",e =>{
    if(e.key == "Enter" && inputField.value != "") {
        requestApi(inputField.value)
    }

})

inputX.addEventListener("keyup",e =>{
    if(e.key == "Enter" && inputX.value != "") {
        requestApi(inputX.value)
    }

})

function requestApi(city){
    api =`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${ApiKey}`
   showWeather()
}

LocationBtn.addEventListener("click",()=>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onSuccess , onError)
    }else{
        alert("Your Browser does not support location")
    }
})

function onSuccess(position){
    const {longitude, latitude} = position.coords
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${ApiKey}`
    showWeather()
}

function onError(error){
    console.log(error)
}

function showWeather(){
    fetch(api).then(response => response.json()).then(result => weatherDetails(result)).catch((error)=>{console.log(error)})
    inputTxt.classList.add("pending")
    inputTxt.innerText = "Getting weather details.."
}

function weatherDetails(info){

    if(info.cod == "404"){
        inputTxt.innerText = `${inputField.value} is not a valid city!`
        inputTxt.style.background ="#f8d7da"
        inputTxt.style.border ="1px solid #721c24"
    }else{
        const city = info.city
        const country =info.sys.country
        const {description, id} =info.weather[0]
        const {feels_like,humidity,temp} =info.main
        const {lon, lat} =info.coord

        wrapper.querySelector(".numb").innerText = Math.floor(temp)
        wrapper.querySelector(".city").innerText = `${city}, ${country}`
        wrapper.querySelector(".temp").innerText = description
        wrapper.querySelector("h2").innerText = Math.floor(feels_like)
        wrapper.querySelector("h3").innerText = humidity
        wrapper.querySelector(".longg").innerText = Math.floor(lon)
        wrapper.querySelector(".lat").innerText = Math.floor(lat)
        

        if(id ==800){
            detailsIcon.src="suuny.png"
        }else if(id >=200 & id<=232){
            detailsIcon.src="thunderstorm.png"
        }else if(id >= 600 & id <=622){
            detailsIcon.src="snow.png"
        }else if(id >=701 & id <=781){
            detailsIcon.src="fog.png"
        }else if(id >=801 & id <=804){
            detailsIcon.src="suuny.png"
        }
        else if((id >=300 & id <=321) || (id >=500 & id <=531)){
            detailsIcon.src="rain.png"
        }

        details.classList.add("open")
        inputTxt.classList.remove("pending")
    }
    console.log(info)
    }

    Icon.addEventListener("click",()=>{
        details.remove()
    })