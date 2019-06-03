(function() {

    var page = 1
    var items = 14

    var galeryContainer = document.getElementById('galery')

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

    // Implement and register module
    var Counter = function(quill, options) {
        this.quill = quill;
        this.options = options;
        var container = document.querySelector(options.container);
        var _this = this;
        quill.on('text-change', function() {
            var length = _this.calculate();
            container.innerHTML = length + ' ' + options.unit + 's';
        });
    };

    Counter.prototype.calculate = function() {
        var text = this.quill.getText();
        if (this.options.unit === 'word') {
            return text.split(/\s+/).length;
        } else {
            return text.length;
        }
    };

    Quill.register('modules/counter', Counter);

    // var Test = function(a, b) {
    //     debugger
    // }

    // Quill.register('modules/test', Test);
    // TOOLBAR
    var toolbarOptions = {
        container: [
            ['bold', 'italic', 'underline', 'strike'], // toggled buttons
            ['blockquote', 'code-block'],

            [{ 'header': 1 }, { 'header': 2 }], // custom button values
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'script': 'sub' }, { 'script': 'super' }], // superscript/subscript
            [{ 'indent': '-1' }, { 'indent': '+1' }], // outdent/indent
            [{ 'direction': 'rtl' }], // text direction

            [{ 'size': ['small', false, 'large', 'huge'] }], // custom dropdown
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

            [{ 'color': [] }, { 'background': [] }], // dropdown with defaults from theme
            [{ 'font': [] }],
            [{ 'align': [] }],

            ['clean'], // remove formatting button
            ['test']
        ],
        handlers: {
            'test': () => { console.log('customControl was clicked') }
        }
    };

    var quill = new Quill('#editor', {
        theme: 'snow',
        modules: {
            counter: {
                container: '#counter',
                unit: 'word'
            },
            toolbar: toolbarOptions,
            imageResize: {
                displaySize: true,
                modules: ['Resize', 'DisplaySize', 'Toolbar']
            }
        },
        theme: 'snow'
    });

    var test = document.querySelector('.ql-test');
    test.addEventListener('click', function() {
        getImageItems(1, items)
    });

    var insertImageInEditor = function(event) {
        event.preventDefault();
        var sel = quill.getSelection(true);
        quill.insertEmbed(sel.index, 'image', event.target.dataset.src);
        galeryContainer.querySelector('.galery-container').style.display = "none";

        // const nodelist = document.querySelectorAll('.ql-editor img');
        // const nodelistToArray = Array.prototype.slice.call(nodelist);
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
                    ins(gCard, gBtnMed)
                    ins(gCard, gBtnOriginal)

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

    //save form
    document.getElementById('form-save').addEventListener('submit', function(event) {
        event.preventDefault();

        var h = quill.container.children[0].innerHTML;
        document.getElementById('target-editor').value = h;
        document.getElementById('form-save').submit();
    });
})()
/*
var range = quill.getSelection();
if (range) {
    var col = quill.getFormat(range.index, 0).color
    if (!col) col = 'black'
    quill.insertText(range.index, 'VIII')
    quill.formatText(range.index, 4, { 'color': 'blue', 'font': 'Monospace', 'italic': true, 'bold': true })
    quill.insertText(range.index + 4, ' ')
    quill.formatText(range.index + 4, 1, { 'color': col })
}
*/