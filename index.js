//1. Nhap vao mot thu vien express
const express = require('express')
//2. Tao ra 1 ung dung Web co bien la app

const app = express()
const mysql = require('mysql2')
app.use(express.json())

//3. Tao ra 1 bien port 
const port = 3000
const connection = mysql.createConnection({
    host: 'localhost', 
    user: 'root',
    password: '04082004',
    database: 'Phim'

})
connection.connect()

//4. Tao ra mot API phuong thuc GET co dia chi la: http://localhost:3000/
app.get('/', (request, response) => {
    response.send("xin chao")
})
app.get('/films', (request, response) => {
    connection.query("SELECT * FROM BANG_PHIM", (err, data) => {
        if (err) {
            response.send("Co loi!")
        } else {
            response.send(data)
        }
    })
})

app.post('/films', (request, response) => {
    connection.query("INSERT INTO BANG_PHIM (`ID_PHIM`, `TEN_PHIM`, `THE_LOAI`, `DANH_MUC`, `NGAY_SAN_XUAT`, `GIA_PHIM`) VALUES (?, ?, ?, ?, ?, ?)", [
        request.body.ID_PHIM, request.body.TEN_PHIM, request.body.THE_LOAI, request.body.DANH_MUC, request.body.NGAY_SAN_XUAT, request.body.GIA_PHIM
    ], (err) => {
        if (err) {
            response.send(err)
        } else {
            response.send("Them thanh cong")
        }
    } )
})




//5. Mo cong cho phep server chay tren cong da tao
app.listen(port, () => {
    console.log("Server API dang chay o cong 3000");
})
