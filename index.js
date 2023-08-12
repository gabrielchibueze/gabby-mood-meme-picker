import { catsData } from "/data.js"

const emotionsContainer = document.getElementById("emotions-container")
const checkGifsOnly = document.getElementById("gifsOnly")
const getImageBtn = document.getElementById('get-image-btn')
const modalPopup = document.getElementById('modal-popup')
const closeModalBtn = document.getElementById('close-modal-btn')
const emotionModalPopup = document.getElementById('emotion-modal-popup')
const emotionOutcome = document.getElementById('emotion-outcome')

emotionsContainer.addEventListener('change', radioHighlight)
getImageBtn.addEventListener("click", renderCat)
closeModalBtn.addEventListener('click', closeModal)


function radioHighlight(e) {
    const highlightRadio = document.getElementsByClassName("emotion-display")
    for (let radio of highlightRadio){
        radio.classList.remove("highlight")
    }
    document.getElementById(e.target.id).parentElement.classList.add("highlight")
}

function closeModal (){
    modalPopup.style.display = "none"
}


function renderCat(){
    const catEmotion = getSingleObjectOfCat()
        // emotionOutcome.textContent = `
        // You feel ${catEmotion.emotionTags}
        // `
    emotionModalPopup.innerHTML  = `
        <img
        src="./images/${catEmotion.image}"
        class="cats"
        alt="${catEmotion.alt}"
        >
    `

    modalPopup.style.display ="flex"
}

function getSingleObjectOfCat (){
    const singleCatEmotion = getMatchingCatEmotionfromEmotionSelected()
    if(singleCatEmotion.length <= 1){
        return singleCatEmotion[0]
    }
    else {
        const randomNumber = Math.floor(Math.random() * singleCatEmotion.length)
        return singleCatEmotion[randomNumber]
    }
}

function getMatchingCatEmotionfromEmotionSelected(){
    if(document.querySelector('input[type="radio"]:checked')){
        const selectedEmotion = document.querySelector('input[type="radio"]:checked').value
        const isGifOnly = checkGifsOnly.checked

        const arrayOfMatchingCats = catsData.filter(function(cat){
            if(isGifOnly){
                    return cat.emotionTags.includes(selectedEmotion) && cat.isGif
            }
            else{
                return cat.emotionTags.includes(selectedEmotion)
            }
        })
        return arrayOfMatchingCats
    }
}




function selectEmotion (cats){
    const allEmotions = listofEmotionTags(cats)
    let emotionRadio = ""
    for (let emotion of allEmotions){
        emotionRadio += `
            <div>
                <p class="emotion-display">
                    <label for="${emotion}">
                    ${emotion}
                    </label>
                    <input
                    type="radio"
                    id="${emotion}"
                    value="${emotion}"
                    name="emotions">
                </p>
            </div>
        `
    }
    emotionsContainer.innerHTML = emotionRadio
}
selectEmotion(catsData)

function listofEmotionTags(cats) {
    const emotionsArray = []
    for (let cat of cats){
        for (let emotion of cat.emotionTags){
            if(!emotionsArray.includes(emotion)){
                emotionsArray.push(emotion)
            }
        }
    }
    return emotionsArray
}
