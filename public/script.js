
getData();
async function getData(){
	const response = await fetch('/read');
	const json = await response.json();
	console.log(json);
	showData(json);
}

const btnSave = document.getElementById('btn_save');
btnSave.addEventListener('click', async event => {

	const action = btnSave.textContent;

	const code    = document.getElementById('code').value;
	const nama   = document.getElementById('nama').value;
	const tipe = document.getElementById('tipe').value;
	const jumlah   = document.getElementById('jumlah').value;

	let data = {
		code : code,
		nama : nama,
		tipe : tipe,
		jumlah : jumlah,
		action : action
	}

	const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	};
	const response = await fetch('/api', options);
	const json = await response.json();
	console.log(json);
	
	getData();

	$('#exampleModal').modal('hide');

	if(action === 'Simpan'){
		$.alert('Data Berhasil ditambah!');
	}else{
		$.alert('Data Berhasil dirubah!');
	}
});

function showData(json){
	let tr = '';
	$('#databody').html('');
	let no;
	for (let i = 0; i < json.length; i++) {
		no = i + 1;
		tr = $('<tr/>');
		tr.append("<td>" + no + "</td>");
		tr.append("<td>" + json[i].code + "</td>");
		tr.append("<td>" + json[i].nama + "</td>");
		tr.append("<td>" + json[i].tipe + "</td>");
		tr.append("<td>" + json[i].jumlah + "</td>");
		tr.append(`
			<td>
				<button type="button" class="badge badge-primary badge-pill btnEdit" data-code="`+ json[i].code +`">
					Edit
				</button>
				<button type="button" class="badge badge-danger badge-pill btnHapus" data-code="`+ json[i].code +`">
					Hapus
				</button>
			</td>`
		);
		$('#databody').append(tr);
	}

	//Jquery Selector
	$(function(){
		$('.btnTambahData').on('click', function(){
			document.getElementById('code').readOnly = false;
			document.getElementById('code').value = '';
			document.getElementById('nama').value = '';
			document.getElementById('tipe').value = '';
			document.getElementById('jumlah').value = '';

	        $('#exampleModalLabel').html('Tambah Data Barang');
	        $('.modal-footer button[id=btn_save]').html('Simpan');
	    });

		$('.btnEdit').on('click', async function(){
		    let code = $(this).data('code');
		    console.log(code);


		    const url = `readbycode/code`;
			const response = await fetch(url);
			const json = await response.json();
			console.log(json[0].code);

			document.getElementById('code').readOnly = true;
			document.getElementById('code').value = json[0].code;
			document.getElementById('nama').value = json[0].nama;
			document.getElementById('tipe').value = json[0].tipe;
			document.getElementById('jumlah').value = json[0].jumlah;

		    $('#exampleModalLabel').html('Ubah Data Barang');
        	$('.modal-footer button[id=btn_save]').html('Ubah Data');
		    $('#exampleModal').modal('show');
		});

		$('.btnHapus').on('click', async function(){
			let code = $(this).data('code');

			$.confirm({
			    title: 'Hapus Data Barang',
			    content: 'Apakah Anda Yakin...???',
			    buttons: {
			        ya: {
			        	text: 'YA',
			            btnClass: 'btn-blue',
			            action: async function(){
			                const url = `hapus/${code}`;
							const response = await fetch(url);
							const json = await response.json();
			            	$.alert('Data Berhasil dihapus!');
			            	getData();
			            }
			        },
			        tidak: function () {
			            
			        }
			    }
			});
		});
	})
}