function Slider(sliderIndex, options) {
    this.sliderIndex = sliderIndex;
    this.options = options || {}

    this.sliderItems = document.querySelectorAll('.slider__item');
    this.sliderArrow = document.querySelectorAll('.slider__arrow');
    this.sliderDots = document.querySelector('.slider__dots');

    console.log(this);

    this.controlClick()
}
// определение индекса слайда (и точек), int или dec в зависимости от выбранной стрелки или точки
function changeSlideIndex(sliderArrowIndex, sliderIndex) {
    return () => {
        // sliderIndex - индекс слайда и кнопки
        if (sliderIndex !== undefined) {
            this.sliderIndex = sliderIndex
        } else {
            // индекс кнопки
            switch (sliderArrowIndex) {
                case 0:
                    this.sliderIndex = this.sliderIndex - 1;
                    // стрелка назад
                    break;
                case 1:
                    this.sliderIndex = this.sliderIndex + 1;
                    // стрелка вперед
                    break;
            }
        }
        this.sliderAnimation()
    }
}
// действие при нажатии на стрелку или точку
function controlClick() {
    const { sliderItems, sliderArrow } = this
    for (let i = 0; i < sliderArrow.length; i++) {
        sliderArrow[i].addEventListener('click', this.changeSlideIndex(i));
    }

    for (let i = 0; i < sliderItems.length; i++) {
        this.dots(i);
    }
}
// добавление точек с блоками
function dots(index) {
    const dotItem = document.createElement('div')
    dotItem.classList.add('slider__dot');
    dotItem.addEventListener('click', this.changeSlideIndex(null, index))

    return this.sliderDots.appendChild(dotItem);
}
// перелистывание слайдера
function sliderAnimation() {
    const { sliderItems, sliderIndex, sliderDots, options: { fade = true } } = this

    const dotItem = sliderDots.children

    // если с повторением
    if (sliderIndex < 0) {
        this.sliderIndex = sliderItems.length - 1;
    }
    if (sliderIndex > sliderItems.length - 1) {
        this.sliderIndex = 0;
    }

    //если без повторения
    // if (sliderIndex < 0) {
    //     this.sliderIndex = 0;
    // }
    // if (sliderIndex > sliderItems.length - 1) {
    //     this.sliderIndex = sliderItems.length - 1;
    // }

    if (fade == false) {

        //блок, который мы двигаем
        const sliderLink = document.querySelector('.slider__list');
        sliderLink.classList.add('fade-off');
        // высота контейнера в зависимости от высоты контента слайда
        let sliderItemContent;
        const sliderContainer = document.querySelector('.slider__container');

        for (let i = 0; i < sliderItems.length; i++) {
            sliderItems[i].classList.add('fade-off-item');
            sliderItemContent = sliderItems[this.sliderIndex].querySelector('.slider__item_content');
        }

        // длина сдвига
        sliderItems[this.sliderIndex].style.width = sliderItems[0].clientWidth;

        //свдиг
        sliderLink.style.left = `-${sliderItems[0].clientWidth * this.sliderIndex}px`
        sliderContainer.style.height = sliderItemContent.clientHeight + 'px'
        sliderItems[this.sliderIndex].style.height = sliderContainer.style.height

        console.log(sliderItems[this.sliderIndex].clientWidth)

    }
    // удаление модификатора, чтобы он не оставался после изменения индекса
    for (let i = 0; i < dotItem.length; i++) {
        dotItem[i].classList.remove('slider__dot_active');
    }
    // добавление модификатора
    dotItem[this.sliderIndex].classList.add('slider__dot_active')
}

Slider(0, { fade: false })