const btnSlidesEl = document.querySelectorAll(".btn-slide");
const slidesEl = document.querySelector(".slider-container");
const btnDotsEL = document.querySelector(".btn-dots");

let curIndex = 0,
    lastIndex = 0;

btnSlidesEl.forEach((btnSlides) => {
    btnSlides.addEventListener("click", function () {
        const self = this;
        const activeSlide = slidesEl.querySelector(".active-slide");
        curIndex = [...slidesEl.children].indexOf(activeSlide);
        lastIndex = slidesEl.children.length - 1;

        setNextPrevSlide(curIndex, nextIndex);
    });
});

btnDotsEL.addEventListener("click", function (e) {
    if (e.target.classList.value === "btn-dot") {
        const curDot = btnDotsEL.querySelector(".active-dot");
        
        curIndex = [...btnDotsEL.children].indexOf(curDot);
        nextIndex = [...btnDotsEL.children].indexOf(e.target);

        setNextPrevSlide(curIndex, nextIndex);
    }
});

function setNextPrevSlide(curIndex, nextIndex) {
    slidesEl.children[curIndex].classList.remove("active-slide");
    btnDotsEL.children[curIndex].classList.remove("active-dot");

    slidesEl.children[nextIndex].classList.add("active-slide");
    btnDotsEL.children[nextIndex].classList.add("active-dot");
}
