var editorStart = function (event) {
    var mX = 0
    var mY = 0

    var editorContentResizableArray = [].slice.call(document.querySelectorAll('.editor-content-resizable'))
    var target = document.getElementById('editor')
    var buttonInsertImage = document.getElementById('editor-button-insert-image')

    var pointMove = document.getElementById('point-move')

    var buttonsArray = [].slice.call(document.querySelectorAll('.editor-button-native-command'))

    var handlerExecCommand = function (event) {
        var command = event.target.dataset.command
        document.execCommand(command);
    }

    buttonInsertImage.addEventListener('click', function (event) {
        var image = 'https://www.w3schools.com/images/w3schoolscom_gray.gif'
        document.execCommand('insertImage', 0, image)
    }, false)

    buttonsArray.forEach(element => {
        element.addEventListener('click', handlerExecCommand, false)
    });

    var handlerContentResizableD = function (event) {
        var target = event.target
        if (event.target.className === 'editor-content-resizable') {
            target.className = 'editor-content-resizable active'

            var original_mouse_x = event.pageX;
            var original_mouse_y = event.pageY;

            var bounding = target.getBoundingClientRect();
            //console.log(bounding)

            pointMove.style.display = 'block'
            pointMove.style.top = (bounding.y + bounding.height) + 'px'
            pointMove.style.left = (bounding.x + bounding.width) + 'px'

        } else if (event.target.className === 'editor-content-resizable active') {
            target.className = 'editor-content-resizable'
            pointMove.style.display = 'none'
        } else {
            var eAct = document.querySelector('.editor-content-resizable.active')
            //console.log(eAct)
            if (eAct) {
                eAct.className = 'editor-content-resizable'
                pointMove.style.display = 'none'
            }
        }
    }

    var handlerContentResizableU = function (event) {

        if (event.target.className === 'editor-content-resizable') {

            var target = event.target
            target.style.border = ''
            //console.log(target)
        }
    }

    var handlerContentResizableM = function (event) {
        if (event.target.id === 'point-move') {
            event.preventDefault()
            var buttonsArray = [].slice.call(document.querySelectorAll('.editor-content-resizable.active'))[0]
            var original_mouse_x = event.pageX;
            var original_mouse_y = event.pageY;
            console.log(original_mouse_x, original_mouse_y, buttonsArray)
        }
    }

    document.addEventListener('click', handlerContentResizableD, false)
    // document.addEventListener('click', handlerContentResizableU, false)
    document.addEventListener('mousemove', handlerContentResizableM, false)


    editorContentResizableArray.forEach(element => {
        element.onload = function () {
            var h = element.height
            element.height = h
            var w = element.width
            element.width = w
        }
    });
};

(function () {
    document.addEventListener("DOMContentLoaded", editorStart);
})()
