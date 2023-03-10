// change navbar style on scroll
window.addEventListener('scroll', () => {
    document.querySelector('nav')
        .classList.toggle('window-scroll', window.scrollY > 0) /*this value of 0 is about the pixels we have to 
                                                                 scroll down so the navbar changes*/
})

//show, hide faq answer
const faqs = document.querySelectorAll('.faq');

faqs.forEach(faq => {
    faq.addEventListener('click', () => {
        faq.classList.toggle('open');

        const icon = faq.querySelector('faq__icon i')
        if (icon.className = 'uil uil - plus') {
            icon.className = 'uil uil-minus';
        }
        else {
            icon.className = 'uil uil-plus';
        }

    })
})
