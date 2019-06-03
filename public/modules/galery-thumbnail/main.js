(function(w) {
    w.thumbnail = function() {

        var gBody = document.body
        var gMain = tag('div')
        ins(gBody, gMain)

        var page = 1
        var items = 14
        var galeryContainer = gMain
        var target = document.getElementById('img-thumbnail')
        var targetValue = document.getElementById('img-thumbnail-value')

        var gCont = tag('galery-container')
        gCont.style.display = 'none'
        var gModal = tag('galery-modal')
        var gList = tag('galery-row')
        var gModalClose = tag('galery-close')
        var gModalCloseTxt = txt('X')

        var buttonPrev = tag('galery-button galery-button-prev', 'button')
        var buttonPrevTxt = txt('<')
        var buttonNext = tag('galery-button galery-button-next', 'button')
        var buttonNextTxt = txt('>')

        gModalClose.addEventListener('click', function(event) {
            event.target.parentNode.parentNode.style.display = 'none'
        })

        ins(galeryContainer, gCont)
        ins(gCont, gModal)
        ins(gModal, gList)
        ins(gModal, gModalClose)
        ins(gModalClose, gModalCloseTxt)

        ins(buttonPrev, buttonPrevTxt)
        ins(buttonNext, buttonNextTxt)
        ins(gModal, buttonPrev)
        ins(gModal, buttonNext)

        buttonNext.addEventListener('click', function() {
            page = page + 1
            getImageItems(page, items)
        }, false)

        buttonPrev.addEventListener('click', function() {
            page = page - 1
            getImageItems(page, items)
        }, false)

        var insertImageInEditor = function(event) {
            event.preventDefault();
            var img = event.target.dataset.src
            target.src = img
            targetValue.value = img
            galeryContainer.querySelector('.galery-container').style.display = "none";
        }

        var getImageItems = function(p, i) {
            var gListClean = dac(gList)
            fetch('/cemese/galery/json?page=' + p + '&items=' + i, { method: 'get' }).then(function(result) {
                result.json().then(function(data) {
                    data.data.forEach(function(element) {
                        var gCard = tag('galery-card')
                        var gCardImg = tagImg(element.thumbnail)
                        var gBtnMin = tag('galery-card-btn galery-card-btn-min', 'button')
                        var gBtnMed = tag('galery-card-btn galery-card-btn-med', 'button')
                        var gBtnOriginal = tag('galery-card-btn galery-card-btn-original', 'button')

                        ins(gCard, gCardImg)
                        ins(gListClean, gCard)

                        ins(gBtnMin, txt('t'))
                        ins(gBtnMed, txt('m'))
                        ins(gBtnOriginal, txt('o'))
                        ins(gCard, gBtnMin)
                            //ins(gCard, gBtnMed)
                            //ins(gCard, gBtnOriginal)

                        var gTagName = tag('input', 'input')
                        gTagName.value = element.originalname
                        ins(gCard, gTagName)

                        gBtnMin.addEventListener('click', insertImageInEditor, false)
                        gBtnMin.dataset.src = element.thumbnail
                        gBtnMed.addEventListener('click', insertImageInEditor, false)
                        gBtnMed.dataset.src = element.medium
                        gBtnOriginal.addEventListener('click', insertImageInEditor, false)
                        gBtnOriginal.dataset.src = element.uri
                    })
                    gCont.style.display = 'block'
                })
            })
        }


        var test = document.getElementById('add-thumbnail');
        test.addEventListener('click', function() {
            getImageItems(1, items)
        });
    }

    w.thumbnail()
})(window)