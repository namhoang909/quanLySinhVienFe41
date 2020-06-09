var objectAjax = {
    url:'../data/DanhSachNguoiDung.json', //dường dẫn đến file chứa dữ liệu hoặc api backend
    method: 'GET', //giao thức backend cung cấp ứng với api
    respondType: 'JSON',//định dạng dữ liệu trả về từ server
}

// dùng thư viên để đọc file hoặc api từ backend
var promise = axios(objectAjax);

promise.then(function(res){
    var noiDungTable = '';
    for(var i = 0; i < res.data.length; i++){
        var nguoiDung = res.data[i];
        noiDungTable +=`
        <tr>
            <td>${nguoiDung.TaiKhoan}</td>
            <td>${nguoiDung.Email}</td>
            <td>${nguoiDung.HoTen}</td>
            <td>${nguoiDung.MatKhau}</td>
            <td>${nguoiDung.SoDT}</td>
        </tr>
        `
    }
    document.getElementById('tblNguoiDung').innerHTML = noiDungTable;
    console.log(res.data);
}).catch(function(error){
    // hàm xử lí khi request thất bại
    console.log(error)
});
// http://svcy.myclass.vn/swagger/ui/index
