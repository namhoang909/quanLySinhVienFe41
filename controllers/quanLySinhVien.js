// tạo object chứa thông tin request về API từ Back-end(lưu ý các thông phải chính xác với back-end cùng cấp)
var objectAjax = {
    url: 'http://svcy.myclass.vn/api/SinhVien/LayDanhSachSinhVien',
    method: 'GET',
    responseType: 'json',
}
// dùng thư viên axios gửi thông tin yêu cầu back-end trả dữ liệu
var promise = axios(objectAjax);

var loadDanhSachSinhVien = function(){
    promise.then(function(res){
        var noiDungTable = '';
        for(var i = 0; i < res.data.length; i++){
            var sinhVien = res.data[i];
            noiDungTable +=`
            <tr>
                <td>${sinhVien.MaSV}</td>
                <td>${sinhVien.HoTen}</td>
                <td>${sinhVien.Email}</td>
                <td>${sinhVien.SoDT}</td>
                <td>${sinhVien.DiemToan}</td>
                <td>${sinhVien.DiemLy}</td>
                <td>${sinhVien.DiemHoa}</td>
                <td>
                    <button class="btn btn-danger" onclick="xoaSinhVien('${sinhVien.MaSV}')">Xoá</button>
                    <button class="btn btn-primary" onclick="chinhSua('${sinhVien.MaSV}')">Sửa</button>
                </td>
            </tr>
            `
        }
        document.getElementById('tblSinhVien').innerHTML = noiDungTable;
        console.log(res.data);
    }).catch(function(error) {
        console.log(error);
    })
}

var chinhSua = function (MaSV) { //recheck source code again
    
    axios({
        url: `http://svcy.myclass.vn/api/SinhVien/LayThongTinSinhVien/${MaSV}`,
        method: 'get',
    }).then(function(res){
        const sinhVien = res.data;
        console.log(res)
        document.getElementById('MaSV').value = sinhVien.MaSV; //document.getElementById('MaSV').value = res.data.MaSV;
        document.getElementById('HoTen').value = sinhVien.HoTen;
        document.getElementById('Email').value = sinhVien.Email;
        document.getElementById('SoDT').value = sinhVien.SoDT;
        document.getElementById('DiemToan').value = sinhVien.DiemToan;
        document.getElementById('DiemLy').value = sinhVien.DiemLy;
        document.getElementById('DiemHoa').value = sinhVien.DiemHoa;
    }).catch(function(err){
        console.log(err.response.data);
    })
}
loadDanhSachSinhVien();

/*-_____--------Chức năng thêm sinh viên */

document.getElementById('btnThemSinhVien').onclick = function () {
    var sv = new sinhVien();
    sv.MaSV = document.getElementById('MaSV').value;
    sv.HoTen = document.getElementById('HoTen').value;
    sv.Email = document.getElementById('Email').value;
    sv.SoDT = document.getElementById('SoDT').value;
    sv.DiemToan = document.getElementById('DiemToan').value;
    sv.DiemLy = document.getElementById('DiemLy').value;
    sv.DiemHoa = document.getElementById('DiemHoa').value;
    var obAxios ={
        url: `http://svcy.myclass.vn/api/SinhVien/ThemSinhVien`,
        method: 'POST',
        data: sv,
    }
    axios(obAxios).then(function(res){
        console.log(res);
        loadDanhSachSinhVien();
    }).catch(function(err){
        console.log(err.response.data);
        loadDanhSachSinhVien();
    })
}
var xoaSinhVien = function (MaSV) {
    var obAjaxXoaSinhVien = {
        url: `http://svcy.myclass.vn/api/SinhVien/XoaSinhVien/${MaSV}`,
        method: 'DELETE',
    }
    axios(obAjaxXoaSinhVien).then(function(res){
        console.log(res);
        loadDanhSachSinhVien();
    }).catch(function(err){
        console.log(res);
        loadDanhSachSinhVien();
    })
}

document.getElementById('btnCapNhatSinhVien').onclick = function (){
    var sv = new sinhVien();
    sv.MaSV = document.getElementById('MaSV').value;
    sv.HoTen = document.getElementById('HoTen').value;
    sv.Email = document.getElementById('Email').value;
    sv.SoDT = document.getElementById('SoDT').value;
    sv.DiemToan = document.getElementById('DiemToan').value;
    sv.DiemLy = document.getElementById('DiemLy').value;
    sv.DiemHoa = document.getElementById('DiemHoa').value;

    console.log(sv);
    // gọi API cập nhật dữ liệu back-end Cung cấp
    axios({
        url: 'http://svcy.myclass.vn/api/SinhVien/CapNhatThongTinSinhVien',
        method: 'PUT',
        data: sv,
    }).then(function(res){
        console.log(res.data);
        loadDanhSachSinhVien();
    }).catch(function(err){
        console.log(err.response.data);
    })
}

//bbbbb