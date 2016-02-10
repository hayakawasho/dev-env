var wishlistCommon = {

	conf : {
		access_try_num : 3,
		sync_interval : 300, //データ同期間隔(秒)
		connection_timeout : 3000, //コネクションタイムアウト(ミリ秒)

		api_url : {
			acpf_auth : 'https://www.uniqlo.com/jp/store/ApiGetAccessTokenInfo.do?&format=json',
			acpf_item : 'https://api.fastretailing.com/identity/v1/uq/jp/wishlist/item.json',
			acpf_styling : 'https://api.fastretailing.com/identity/v1/uq/jp/wishlist/styling.json'
		},

		ls_key : {
			acpf_item : 'uq_jp_acpf_wishlist',
			local_item : 'uq_jp_local_wishlist',
			old_item : 'wishlist',
			acpf_sb : 'uq_jp_acpf_sb_wishlist',
			local_sb : 'uq_jp_local_sb_wishlist',
			old_sb : 'sb_wishlist'
		},

		ls : localStorage
	},

	getLocalStorage : function(key){
		try{
			var item_data = this.conf.ls.getItem(key);

			if(!item_data){
				return new Object(new Array());
			}
			return $.parseJSON(item_data);
		}catch(e){
			//alert(e);
		}
	},

	setLocalStorage : function(key, data){
		try{
			this.conf.ls.setItem(key, data);
		}catch(e){
			//console.log(e);
		}
	},

	deleteLocalStorage : function(key){
		try{
			this.conf.ls.setItem(key, new Object(new Array()));
		}catch(e){
			//alert(e);
		}
	},

	checkLocalStorageData : function(key){

		var item_data = JSON.parse(this.conf.ls.getItem(key));

		if(!item_data || typeof(item_data[0]) === 'undefined'){
			return false;
		}

		return true;
	},

	getAcpfItemByIdFromLS : function(search_id){

		var ls_item_data = this.getLocalStorage(this.conf.ls_key.acpf_item);

		var tmp = new Array();
		var line_cnt = 0;

		$.each(ls_item_data, function(i){

			if(ls_item_data[i].data.l1_goods_cd == search_id){
				tmp[line_cnt] = ls_item_data[i];
				line_cnt ++;
			}
		});
		return tmp;

	},


	localStorageDataExists : function(l1_goods_cd, color_cd, size_cd){

		var ls_item_data = this.getLocalStorage(this.conf.ls_key.acpf_item);

		var search_id = l1_goods_cd+'-'+color_cd;
		var is_found = false;

		//for (var i in ls_item_data) {
		$.each(ls_item_data, function(i){
			if(typeof(size_cd) === 'undefined'){

				if(search_id == ls_item_data[i].id){
					is_found = true;
					//return true;
				}
			}else{
				if(l1_goods_cd == ls_item_data[i].data.l1_goods_cd && color_cd == ls_item_data[i].data.color_cd && size_cd == ls_item_data[i].data.size_cd){
					is_found = true;
					//return true;
				}
			}
		});
		//}
		return is_found;
	},

	createItemObject : function(l1_goods_cd, color_cd, size_cd, add_del_flg){

		var key = l1_goods_cd+'-'+color_cd;

		var data = {"id": key,
			"update": Math.floor( new Date().getTime() / 1000 ),
			"data": {
				"l1_goods_cd" : l1_goods_cd,
				"color_cd": color_cd,
				"size_cd": size_cd,
				"client_id" : "uqpc-jp"
			}
		};

		if(add_del_flg == 1 || add_del_flg == 2){
			data.data.add_del_flg = add_del_flg;
		}

		return data;
	},

	setDataToLS : function(acpf_data, type){

		var tmp = new Array();
		var acpf_wishlist_name = this.conf.ls_key.acpf_item;
		var wishlist_name = this.conf.ls_key.old_item;
		if(type == 'sb'){
			var acpf_wishlist_name = this.conf.ls_key.acpf_sb;
			var wishlist_name = this.conf.ls_key.old_sb;
		}

		var ls_data = this.getLocalStorage(acpf_wishlist_name);


		line_cnt = 0;
		//for (var i in acpf_data) {
		$.each(acpf_data, function(i){
			//delete acpf_data[i].data.client_id;
			var is_found = 0;
			//for (var j in ls_data) {
			$.each(ls_data, function(j){
				if(ls_data[j].id == acpf_data[i].id){
					if(ls_data[j].update >= acpf_data[i].update){
						tmp[line_cnt] = acpf_data[i];
						line_cnt ++;
						is_found = 1;
					}
				}
			});
			if(is_found == 0){
				tmp[line_cnt] = acpf_data[i];
				line_cnt ++;
			}
		});

		var id_list = this.createWishlistItem(tmp);

		this.setLocalStorage(acpf_wishlist_name, JSON.stringify(tmp));
		this.setLocalStorage(wishlist_name, JSON.stringify(id_list));

		//バッジ更新
		try{
			if(typeof(badgeMng.update) == 'function'){
				badgeMng.update();
			}
		}catch(e){

		}

		//ACPF更新
		wishlistCommon.getToken(true, 'upload', function(){
			wishlistCommon.syncLSData();
		});

	},


	addonItemToLS : function(l1_goods_cd, color_cd, size_cd){

		try{
			if(typeof(size_cd) === 'undefined'){
				size_cd = '';
			}

			var ls_item = this.getLocalStorage(this.conf.ls_key.acpf_item);
			var add_item = this.createItemObject(l1_goods_cd, color_cd, size_cd);
			var add_item_local = this.createItemObject(l1_goods_cd, color_cd, size_cd, 1);
			var search_id = l1_goods_cd+'-'+color_cd;

			//local_ls処理
			var tmp_local_ls_item = this.createLocalItem(add_item_local, search_id, 1);
			if(!tmp_local_ls_item){
				throw null;
			}

			//acpf_ls処理
			var is_update = 0;
			//for (var i in ls_item) {
			$.each(ls_item, function(i){
				if(search_id == ls_item[i].id){
					ls_item[i] = add_item;
					is_update = 1;
				}
			});

			if(is_update == 0){
				ls_item.push(add_item);
			}

			//旧wishlist処理
			var wishlist_id_list = this.createWishlistItem(ls_item);

			this.setLocalStorage(this.conf.ls_key.acpf_item, JSON.stringify(ls_item));
			this.setLocalStorage(this.conf.ls_key.local_item, JSON.stringify(tmp_local_ls_item));
			this.setLocalStorage(this.conf.ls_key.old_item, JSON.stringify(wishlist_id_list));

			//バッジ更新
			try{
				if(typeof(badgeMng.update) == 'function'){
					badgeMng.update();
				}
			}catch(e){

			}

			//ACPF更新
			wishlistCommon.getToken(true, 'upload', function(){
				wishlistCommon.syncLSData();
			});

			return true;

		}catch(e){
			return false;
			//console.log('add faild');
			//error
		}

	},

	deleteItemFromLS : function(l1_goods_cd, color_cd, size_cd){

		try{

			if(typeof(size_cd) === 'undefined'){
				size_cd = '';
			}

			var ls_item = this.getLocalStorage(this.conf.ls_key.acpf_item);
			var del_item = this.createItemObject(l1_goods_cd, color_cd, size_cd);
			var del_item_local = this.createItemObject(l1_goods_cd, color_cd, size_cd, 2);
			var tmp_ls_item = new Array();
			var search_id = l1_goods_cd+'-'+color_cd;
			var line_cnt = 0;

			//local_ls処理
			var tmp_local_ls_item = this.createLocalItem(del_item_local, search_id, 2);
			if(!tmp_local_ls_item){
				throw null;
			}

			//acpf_ls処理
			//for (var i in ls_item) {
			$.each(ls_item, function(i){

				if(search_id != ls_item[i].id){
					tmp_ls_item[line_cnt] = ls_item[i];
					line_cnt ++;
				}
			});

			//旧wishlist処理
			var wishlist_id_list = this.createWishlistItem(tmp_ls_item);

			this.setLocalStorage(this.conf.ls_key.acpf_item, JSON.stringify(tmp_ls_item));
			this.setLocalStorage(this.conf.ls_key.local_item, JSON.stringify(tmp_local_ls_item));
			this.setLocalStorage(this.conf.ls_key.old_item, JSON.stringify(wishlist_id_list));

			//バッジ更新
			try{
				if(typeof(badgeMng.update) == 'function'){
					badgeMng.update();
				}
			}catch(e){

			}

			//ACPF更新
			wishlistCommon.getToken(true, 'upload', function(){
				wishlistCommon.syncLSData();
			});

			return true;
		}catch(e){
			return false;
			//console.log(e);
			//error
		}

	},

	createLocalItem : function(item, search_id, add_del_flg){


		try{
			//item.data.add_del_flg = add_del_flg;
			var local_ls_item = this.getLocalStorage(this.conf.ls_key.local_item);

			//local_ls処理
			var is_update = 0;
			//for (var i in local_ls_item) {
			$.each(local_ls_item, function(i){
				if(search_id == local_ls_item[i].id){
					local_ls_item[i] = item;
					is_update = 1;
				}
			});
			if(is_update == 0){
				local_ls_item.push(item);
			}

			return local_ls_item;

		}catch(e){
			return false;
		}

	},

	deleteLocalItem : function(search_id){

		try{
			var local_ls_item = this.getLocalStorage(this.conf.ls_key.local_item);
			var tmp = new Array();

			//acpf_ls処理
			line_cnt = 0;
			//for (var i in local_ls_item) {
			$.each(local_ls_item, function(i){
				if(search_id != local_ls_item[i].id){
					tmp[line_cnt] = local_ls_item[i];
					line_cnt ++;
				}
			});
			this.setLocalStorage(this.conf.ls_key.local_item, JSON.stringify(tmp));

		}catch(e){

		}

	},

	createWishlistItem : function(ls_item){

		var tmp = new Array();
		var id;

		//for (var i in ls_item) {
		//if(!i.match(/[^0-9]+/)){
		$.each(ls_item, function(i){

			if(typeof(ls_item[i].data.style_id) != 'undefined'){
				id = ls_item[i].data.style_id;
			}else{
				id = ls_item[i].data.l1_goods_cd;
			}

			if($.inArray(id, tmp) === -1 && typeof(id) !== 'undefined'){
				tmp.push(id);
			}

		});

		return tmp;

	},

	getToken : function(is_async, type, callback, retry_num){


		// ページ遷移時に同期すべきデータが存在しない場合は処理終了
		if(type == 'upload' && !this.checkLocalStorageData(this.conf.ls_key.local_item)){
			return;
		}

		if(typeof(retry_num) == 'undefined'){
			var retry_num = 1;
		}

		var vars = [], hash;
		var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
		for(var i = 0; i < hashes.length; i++){
			hash = hashes[i].split('=');
			vars.push(hash[0]);
			vars[hash[0]] = hash[1];
		}
		if(typeof(vars['token']) !== 'undefined'){
			wishlistCommon.token = vars['token'];

			//console.log(wishlistCommon.token);
			callback();
			return;
		}

		$.ajax({
			async: is_async,
			type: 'GET',
			dataType: 'jsonp',
			url: this.conf.api_url.acpf_auth,
			jsonpCallback: 'jsonpCallback',
			cache: false, // キャッシュさせない
			timeout: this.conf.connection_timeout,
		}).fail(function(xhr, status, error) {

			if(xhr.status === 0) {
				if(wishlistCommon.conf.access_try_num > retry_num){
					retry_num ++;
					wishlistCommon.getToken(is_async, type, callback, retry_num);
				}else{
					wishlistCommon.token = false;
					if (typeof(callback) === "function") {
						callback();
					}
				}

			}else{
				wishlistCommon.token = false;
				if (typeof(callback) === "function") {
					callback();
				}
			}
		}).done(function(data, status, xhr) {
			if('Error' in data ) {
				wishlistCommon.token = "";
			}else if(data.token[0].accessToken){
				wishlistCommon.token = data.token[0].accessToken;
			}
			if (typeof(callback) === "function") {
				callback();
			}

		});
	},

	syncLSData : function(){


		var add_data = new Array();
		var delete_data = new Object();
		var del_id_list = new Array();
		var add_id_list = new Array();

		var delete_line_cnt = 0;
		var add_line_cnt = 0;


		try{

			if(!this.token && !window.XDomainRequest){
				return;
			}

			var local_ls_data = this.getLocalStorage(this.conf.ls_key.local_item);

			if(!local_ls_data){
				return;
			}

			//for (var i in local_ls_data) {
			$.each(local_ls_data, function(i){

				var local_item = local_ls_data[i];
				if(local_item.data.add_del_flg == 2){
					del_id_list.push(local_item.id);
					delete_line_cnt ++;
				}else if(local_item.data.add_del_flg == 1){
					add_data.push(local_ls_data[i]);
					add_id_list.push(local_item.id);
					add_line_cnt ++;
				}
			});

			if(delete_line_cnt > 0){
				this.deleteItemFromACPF(del_id_list, function(){
					//for (var i in del_id_list) {
					$.each(del_id_list, function(i){

						wishlistCommon.deleteLocalItem(del_id_list[i]);
					});
				});
			}
			if(add_line_cnt > 0){
				this.postItemToACPF(add_data, function(){
					//for (var i in add_id_list) {
					$.each(add_id_list, function(i){
						wishlistCommon.deleteLocalItem(add_id_list[i]);
					});
				});
			}

		}catch(e){
			//console.log(e);
		}

	},

	postItemToACPF : function(item_data, callback, retry_num){

		if(!this.token && !window.XDomainRequest){
			if(typeof(callback) === "function") {
				callback();
			}
			return;
		}

		if(typeof(retry_num) == 'undefined'){
			var retry_num = 1;
		}


		var tmp = new Array();

		//for (var i in item_data) {
		$.each(item_data, function(i){

			var id = item_data[i].data.l1_goods_cd + '-' + item_data[i].data.color_cd;
			var insert_obj = {'id' : id,
					'update' : item_data[i].update,
					'data' : {'l1_goods_cd' : item_data[i].data.l1_goods_cd,
					'color_cd' : item_data[i].data.color_cd,
					'size_cd' : item_data[i].data.size_cd,
					'client_id' : 'uqpc-jp'}};
			tmp.push(insert_obj);
		});

		var insert_data = JSON.stringify(tmp);

		if( window.XDomainRequest ){
			$.ajax({
				url: "http://www.uniqlo.com/jp/store/feature/wishlist/item.jsp",
				data: { access_method: "POST", json_data: insert_data },
				type: 'POST',
				dataType: 'json',
				cache: false, // キャッシュさせない
				async: false
			})
			.done( function ( data, status, xhr ) {
				if(data){
					if (typeof(callback) === "function") {
						callback();
					}
				}
			})
			.fail( function ( xhr, status, error ) {
				if(wishlistCommon.conf.access_try_num > retry_num){
					retry_num ++;
					wishlistCommon.postItemToACPF(item_data, callback, retry_num);

				}else{
					//console.log( "can not access ACPF");
				}
			});
		}else{
			$.ajax({
				async: false,
				type: 'POST',
				url: this.conf.api_url.acpf_item + '?accesstoken=' + this.token,
				contentType: 'application/json;charset=utf-8',
				dataType : 'json',
				timeout: this.conf.connection_timeout,
				cache: false, // キャッシュさせない
				data: insert_data,
			}).fail(function(xhr, status, error) {
				if(xhr.status === 0) {
					if(wishlistCommon.conf.access_try_num > retry_num){
						retry_num ++;
						wishlistCommon.postItemToACPF(item_data, callback, retry_num);

					}else{
						//console.log( "can not access ACPF");
					}

				}
			}).done(function(data, status, xhr) {
				if(data){
					if (typeof(callback) === "function") {
						callback();
					}

				}
			});
		};
	},

	deleteItemFromACPF : function(del_id_list, callback, retry_num){

		if(!this.token && !window.XDomainRequest){
			if(typeof(callback) === "function") {
				callback();
			}
			return;
		}

		if(typeof(retry_num) == 'undefined'){
			var retry_num = 1;
		}

		item_key = del_id_list.join();

		if( window.XDomainRequest ){
			$.ajax({
				url: "http://www.uniqlo.com/jp/store/feature/wishlist/item.jsp",
				data: { access_method: "DELETE", id: item_key },
				type: 'POST',
				dataType: 'json',
				cache: false, // キャッシュさせない
				async: false
			})
			.done( function ( data, status, xhr ) {
				if(data){
					if (typeof(callback) === "function") {
						callback();
					}
				}
			})
			.fail( function ( xhr, status, error ) {
					if(wishlistCommon.conf.access_try_num > retry_num){
						retry_num ++;
						wishlistCommon.deleteItemFromACPF(del_id_list, callback, retry_num);

					}else{
						//console.log( "can not access ACPF");
					}
			});
		}else{
			$.ajax({
				async: false,
				//type: 'DELETE',
				//url: this.conf.api_url.acpf_item + '?accesstoken=' + this.token + '&id=' + item_key,
				type: 'POST',
				url: this.conf.api_url.acpf_item + '?accesstoken=' + this.token + '&id=' + item_key + '&method_override=DELETE',
				timeout: this.conf.connection_timeout,
				contentType: 'application/x-www-form-urlencoded;application/json;charset=utf-8',
				cache: false, // キャッシュさせない
				dataType : 'json',
			}).fail(function(xhr, status, error) {
				if(xhr.status === 0) {
					if(wishlistCommon.conf.access_try_num > retry_num){
						retry_num ++;
						wishlistCommon.deleteItemFromACPF(del_id_list, callback, retry_num);

					}else{
						//console.log( "can not access ACPF");
					}

				}
			}).done(function(data, status, xhr) {
				if(data){
					if (typeof(callback) === "function") {
						callback();
					}
				}
			});
		}
	},

	getItemFromACPF : function(callback, retry_num){

		if(typeof(retry_num) == 'undefined'){
			var retry_num = 1;
		}


		if(!this.token && !window.XDomainRequest){
			if(typeof(callback) === "function") {
				callback();
			}
			return;
		}

		if( window.XDomainRequest ){
			$.ajax({
				url: "http://www.uniqlo.com/jp/store/feature/wishlist/item.jsp",
				data: { access_method: "GET", id: "*" },
				type: 'POST',
				dataType: 'json',
				cache: false, // キャッシュさせない
				async: false
			})
			.done( function ( data, status, xhr ) {
				if(data){
					wishlistCommon.setDataToLS(data.data, '');
					if (typeof(callback) === "function") {
						callback();
					}
				}
			})
			.fail( function ( xhr, status, error ) {
				if(wishlistCommon.conf.access_try_num > retry_num){
					retry_num ++;
					wishlistCommon.getItemFromACPF(callback,retry_num);

				}else{
					if(typeof(callback) === "function") {
						callback();
					}
					return;

				}
			});
		}else{
			$.ajax({
				type: 'GET',
				url: this.conf.api_url.acpf_item,
				timeout: this.conf.connection_timeout,
				data: 'accesstoken=' + this.token + '&id=*',
				contentType: 'application/json;charset=utf-8',
				cache: false, // キャッシュさせない
				dataType : 'json'
			}).fail(function(xhr, status, error) {

				if(wishlistCommon.conf.access_try_num > retry_num){
					retry_num ++;
					wishlistCommon.getItemFromACPF(callback,retry_num);

				}else{
	//var tmp = '[{"id":"146253-00","update":1440649696,"data":{"l1_goods_cd":"146253","color_cd":"00","size_cd":""}},{"id":"152963-00","update":1440548673,"data":{"l1_goods_cd":"152963","color_cd":"00","size_cd":""}},{"id":"152823-52","update":1440548362,"data":{"l1_goods_cd":"152823","color_cd":"52","size_cd":""}},{"id":"152683-00","update":1440548361,"data":{"l1_goods_cd":"152683","color_cd":"00","size_cd":""}},{"id":"155853-16","update":1440548112,"data":{"l1_goods_cd":"155853","color_cd":"16","size_cd":""}},{"id":"151339-70","update":1440408167,"data":{"l1_goods_cd":"151339","color_cd":"70","size_cd":""}},{"id":"135071-69","update":1440143880,"data":{"l1_goods_cd":"135071","color_cd":"69","size_cd":""}},{"id":"135067-31","update":1440143880,"data":{"l1_goods_cd":"135067","color_cd":"31","size_cd":""}},{"id":"087099-61","update":1440143880,"data":{"l1_goods_cd":"087099","color_cd":"61","size_cd":""}},{"id":"149905-16","update":1440037632,"data":{"l1_goods_cd":"149905","color_cd":"16","size_cd":""}},{"id":"149906-09","update":1440037611,"data":{"l1_goods_cd":"149906","color_cd":"09","size_cd":""}},{"id":"145370-16","update":1439883650,"data":{"l1_goods_cd":"145370","color_cd":"16","size_cd":""}},{"id":"138706","update":"1437098716","clientid":"test","data":"test"}]';
	//tmp = JSON.parse(tmp);

	//wishlistCommon.setDataToLS(tmp, '');

					if(typeof(callback) === "function") {
						callback();
					}
					return;

				}
			}).done(function(data, status, xhr) {

				if(data){
					wishlistCommon.setDataToLS(data.data, '');
					if (typeof(callback) === "function") {
						callback();
					}
				}
			});
		}
	},

	getStylingFromACPF : function(callback, retry_num){

		if(!this.token && !window.XDomainRequest){
			if(typeof(callback) === "function") {
				callback();
			}
			return;
		}

		if(typeof(retry_num) == 'undefined'){
			var retry_num = 1;
		}


		if( window.XDomainRequest ){
			$.ajax({
				url: "http://www.uniqlo.com/jp/store/feature/wishlist/styling.jsp",
				data: { access_method: "GET", id: "*" },
				type: 'POST',
				dataType: 'json',
				cache: false, // キャッシュさせない
				async: false
			})
			.done( function ( data, status, xhr ) {
				if(data){
					wishlistCommon.setDataToLS(data.data, 'sb');
					if (typeof(callback) === "function") {
						callback();
					}
				}
			})
			.fail( function ( xhr, status, error ) {
				if(wishlistCommon.conf.access_try_num > retry_num){
					retry_num ++;
					wishlistCommon.getStylingFromACPF(callback, retry_num);

				}else{
					if(typeof(callback) === "function") {
						callback();
					}
					return;

				}
			});
		}else{
			$.ajax({
				type: 'GET',
				url: this.conf.api_url.acpf_styling,
				timeout: this.conf.connection_timeout,
				data: 'accesstoken=' + this.token + '&id=*',
				contentType: 'application/json;charset=utf-8',
				cache: false, // キャッシュさせない
				dataType: 'json'
			}).fail(function(xhr, status, error) {
				if(xhr.status === 0) {

				}

				if(wishlistCommon.conf.access_try_num > retry_num){
					retry_num ++;
					wishlistCommon.getStylingFromACPF(callback, retry_num);

				}else{
					if(typeof(callback) === "function") {
						callback();
					}
					return;

				}

			}).done(function(data, status, xhr) {
				if(data){
					wishlistCommon.setDataToLS(data.data, 'sb');
					if (typeof(callback) === "function") {
						callback();
					}
				}
			});
		}
	},

	getGTMActionName : function(){

		var action = 'l3_fav_item';

		var pathname = window.location.pathname;
		if(pathname.indexOf('/search') != -1){
			action = 'search_fav_item';
		}else if(pathname.search(/goods/) != -1){
			action = 'l4_fav_item';
		}

		return action;

	},

	setGTM : function(status){

		if(typeof(dataLayer) === 'undefined'){
			return;
		}

		var action = this.getGTMActionName();

		var event = 'interaction';
		var target = 'ecpc_click';

		dataLayer.push({
			'event': event,
			'target': target,
			'action': action,
			'target-properties': status
		});

		if( !window.XDomainRequest ){
			console.log(dataLayer);
		}
	}
};

var wishlistCommonCtrl = {

	init : function () {

		var location_url = location.href;
		var thumb_decl_cnt = 0;

		//INES対応
		$(".wishlist_heart_icon").each(function(i, elem) {

			var icon_pos = "";

			try{
				var l1GoodsCd = $(elem).attr("code").split('-')[0];
				var color_cd = $(elem).attr("code").split('-')[1];

				wishlistCommonCtrl.dispItemLS(l1GoodsCd, color_cd, i, icon_pos);
			}catch(e){
			};

		});

		if((location_url.indexOf('qtext=') != -1 && location_url.indexOf('qbrand=20') != -1) ||
		   (location_url.indexOf('/goods/2') != -1 ) || (location_url.indexOf('/gu/') != -1 )) {
			//GUの検索結果にはハートださない
		}else if( location_url.indexOf('extrasize') != -1 && $("body").find("div.wishlist_heart_icon").length > 0 ){
			//extrasize系 監視対応
		}else{
			$('<div class="wishlist_heart_icon"><a href="javascript: void(0);"></a></div>').appendTo('dl.info');

			$("[class$='thumb'] a").each(function(i, elem) {
				var skipchar = $(elem).attr("href");
				if(skipchar.indexOf('#') != -1){
					thumb_decl_cnt++;
				}else{
				    //alert(i + ': ' + $(elem).children("img").attr("src"));
				    var img_url = $(elem).children("img").attr("src");
				    var icon_pos = $(elem).children("img").attr("pos");

				    if(img_url.indexOf('goods') != -1){
						var l1GoodsCd = $(elem).children("img").attr("src").split('/')[7];
						var color_cd = $(elem).children("img").attr("src").split('/')[9].split('_')[0];
					}else{
						var l1GoodsCd = '';
						var color_cd = '';
					}
					wishlistCommonCtrl.dispItemLS(l1GoodsCd, color_cd, i - thumb_decl_cnt, icon_pos);
				}
			});

			$('.wishlist_heart_icon').live('click', function(e){

				var code = $(this).attr("code");

				if(typeof(code) === 'undefined'){
					return;
				}

				var item_id = code.split("-")[0];
				var color_cd = code.split("-")[1];
				if(typeof($(this).children("a").attr('class')) == 'undefined' || $(this).children("a").attr('class').indexOf('active') == -1){
					wishlistCommon.addonItemToLS(item_id, color_cd);
					$(this).children("a").addClass('active');
					wishlistCommon.setGTM('on');
				}else{
					wishlistCommon.deleteItemFromLS(item_id, color_cd);
					$(this).children("a").removeClass('active');
					wishlistCommon.setGTM('off');
				}

			});

		}

		//extrasize系 監視対応
		if(location_url.indexOf('extrasize') != -1 ){
			setTimeout("wishlistCommonCtrl.init()",1000);
		}

	},

	dispItemLS: function(l1_goods_no, color_cd, num, icon_pos){

		if(!l1_goods_no || !color_cd){
			return;
		}

		//GU対応
		if (l1_goods_no.charAt(0) == "2"){
			$('.wishlist_heart_icon').eq(num).children("a").addClass('gu');
		}else{
			if(wishlistCommon.localStorageDataExists(l1_goods_no, color_cd)){
				$('.wishlist_heart_icon').eq(num).children("a").addClass('active');
			}else{
				$('.wishlist_heart_icon').eq(num).children("a").removeClass('active');
			}
			$('.wishlist_heart_icon').eq(num).attr("code", l1_goods_no+'-'+color_cd);

			//INES対応
			if(icon_pos != 'undefined'){
				$('.wishlist_heart_icon').eq(num).children("a").addClass(icon_pos);
			}

		}
	}

};
