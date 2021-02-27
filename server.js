const express    = require('express');
const bodyParser = require('body-parser');
const mysql      = require('mysql');
const app        = express();


//Koneksi ke mysql database
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'db_nodejs'
});

//connect ke database
conn.connect((err) =>{
  if(err) throw err;
  console.log('Koneksi berhasil');
});

app.use(bodyParser.json());
app.listen(4000, () => console.log('Server berjalan di port 4000'));
app.use(express.static('public'));

//Baca Semua Data
app.get('/read',(req, res) => {

  let sql = "SELECT * FROM tbl_barang";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.json(results);
  });
});

//Baca Data Berdasarkan NIS
app.get('/readbycode/:code', async (req, res) =>{
	const code = req.params.code;
	console.log(code);

	let sql = "SELECT * FROM tbl_barang Where code = "+ code +"";
  	let query = conn.query(sql, (err, results) => {
    	if(err) throw err;
    	res.json(results);
  	});
});

//route untuk insert data
app.post('/api', (req, res) => {
	let action = req.body.action;
	let data = {code: req.body.code, nama: req.body.nama, tipe: req.body.tipe, jumlah: req.body.jumlah};
	let sql;

	if(action === 'Simpan'){
		sql = "INSERT INTO tbl_barang SET ?";	
	}else{
		sql = `UPDATE tbl_barang SET nama='`+req.body.nama+`', 
		        tipe='`+req.body.tipe+`', jumlah='`+ req.body.jumlah +`' 
		        WHERE code='`+req.body.code+`';`
	}
	
	console.log(sql);
	let query = conn.query(sql, data,(err, results) => {
	   if(err) throw err;
	   res.json(results);
	   console.log(results);
	});
});

//Baca Data Berdasarkan NIS
app.get('/hapus/:code', async (req, res) =>{
	const code = req.params.code;
	console.log(code);

	let sql = `DELETE FROM tbl_barang Where code = '`+ code +`';`
  	let query = conn.query(sql, (err, results) => {
    	if(err) throw err;
    	res.json(results);
  	});
});
