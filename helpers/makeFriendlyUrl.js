module.exports = (uri) => {
    let u = uri;

    let uArr = u.split('-');
    let uFinal = uArr.reverse()[0];

    uArr[0] = (parseInt(uArr) || 0) + 1
    let final = uArr.reverse().join('-');
    console.log('-1---------------------')
    console.log(uFinal)
    console.log('-2---------------------')
    console.log(final)
    return final;
}