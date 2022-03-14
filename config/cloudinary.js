const xinSoDT = (HamGoiLaiSauKhiTimRa) => {
    let soDT
    console.log('Goi dien cho thang ban: cho tao xin so thang nam')
    console.log('Thang ban dang tim so thang nam')
    setTimeout(() => {
        soDT = 123456
        console.log('Day roi. Da tim duoc so thang Nam.')
        HamGoiLaiSauKhiTimRa(soDT, goiChoNam)
    }, 1000);
}
const sacPin = (soDT,HamGoiLaiSauKhiSacPin)=>{
    console.log('Doi ti. sac pin da.')
    setTimeout(() => {
        console.log('Sac pin xong. bat dau goi cho Nam.')
        HamGoiLaiSauKhiSacPin(soDT)
    }, 2000);
}
const goiChoNam = (soDT)=> console.log(`Dang noi chuyen voi nam sau khi goi vao so ${soDT}`)

xinSoDT(sacPin);