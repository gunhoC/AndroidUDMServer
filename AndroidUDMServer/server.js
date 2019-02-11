var express = require('express');
var app = express();
var pg = require('pg');
var date_utils = require('date-utils');
var udm = new pg.Pool({ // DB : udm
	user: 'postgres',
	host: 'www.udmcps.com',
	database: 'AndroidApp',
	password: 'udmt',
	port: '5432',
	application_name: 'udmlab'
});
var newDate = new Date();
var obj = new Object();
var time_h =+" "+ newDate.getHours() + ":" + newDate.getMinutes() + ":" + newDate.getSeconds()

app.listen(4000, function (err, res) {
	console.log("server is running ...")
});

app.get('/test', (req, res) => {
	console.log("/asa")
	res.send(time_h)
});


////\'2018-11%\' 

var time_test = "23:59:59"
app.get('/ing', (req, res) => {
	obj = new Object();
	udm.connect(function (err, client, done) {
		client.query(
			'select tsstart from tbl_oee ' +
'where tsend <= \'2019-01-16 17:00:00 \' and  tsstart > \'2019-01-16 00:00:00\'  ' 

			, function (err, result) {
				done();
				obj.code = "ing";
				obj.data = result.rows;
				res.send(JSON.stringify(obj));
				console.log('/ing');   //test 용
			});
	});

});
//\'' + req.query.brand + '\'

app.get('/line', (req, res) => {
	obj = new Object();
	udm.connect(function (err, client, done) {
		client.query(
			'select slineid, floor(avg(nprocesstime * 100 / noperationtime)) as a, ' +
			'floor(avg(itotalcount * icriteria * 100 / nprocesstime)) as p, floor(avg(iokcount * 100 / itotalcount)) as q ' +
			',floor(avg(iokcount * 100 * icriteria / noperationtime)) as oee ' +
			'from tbl_oee ' +
			' where tsend <= \'2019-01-16 ' + time_test + '\' and tsstart > \'2019-01-16 00:00:00\'' +
			'group by slineid '
			, function (err, result) {
				done();
				obj.code = "line";
				obj.data = result.rows;
				res.send(JSON.stringify(obj));
				console.log('/line');   //test 용
			});
	});          
	
});


//'where carid = \'' + req.query.car + '\''
app.get('/car', (req, res) => {
	obj = new Object();
	udm.connect(function (err, client, done) {
		client.query(
			'select scartype, floor(avg(nprocesstime * 100 / noperationtime)) as a, ' +
			'floor(avg(itotalcount * icriteria * 100 / nprocesstime)) as p, floor(avg(iokcount * 100 / itotalcount)) as q ' +
			',floor(avg(iokcount * 100 * icriteria / noperationtime)) as oee ' +
			'from tbl_oee ' +
			' where tsend <= \'2019-01-16 ' + time_test + '\' and tsstart > \'2019-01-16 00:00:00\'' +
			'group by scartype '  
			, function (err, result) {
				done();
				obj.code = "car";
				obj.data = result.rows;
				res.send(JSON.stringify(obj));
				console.log('/car');   //test 용
			});
	});

});


app.get('/line_homeclick', (req, res) => {
	obj = new Object();
	udm.connect(function (err, client, done) {
		client.query(
			'select tsstart ::text, tsend ::text, floor((nprocesstime * 100 / noperationtime)) as a, ' +
			'floor((itotalcount * icriteria * 100 / nprocesstime)) as p, floor((iokcount * 100 / itotalcount)) as q ' +
			',floor((iokcount * 100 * icriteria / noperationtime)) as oee ' +
			'from tbl_oee ' +
			' where slineid = \'' + req.query.line + '\'' +
			'and tsend <= \'2019-01-16 ' + '23:59:59' + '\' and tsstart > \'2019-01-16 00:00:00\''+
			'order by tsstart '
			, function (err, result) {
				done();
				obj.code = "line_homeclick";
				obj.data = result.rows;
				res.send(JSON.stringify(obj));
				console.log('/line_homeclick');   //test 용
			});
	});

});


app.get('/car_homeclick', (req, res) => {
	obj = new Object();
	udm.connect(function (err, client, done) {
		client.query(
			'select tsstart ::text, tsend ::text, floor((nprocesstime * 100 / noperationtime)) as a, ' +
			'floor((itotalcount * icriteria * 100 / nprocesstime)) as p, floor((iokcount * 100 / itotalcount)) as q ' +
			',floor((iokcount * 100 * icriteria / noperationtime)) as oee ' +
			'from tbl_oee ' +
			' where scartype = \'' + req.query.car + '\'' +
			'and tsend <= \'2019-01-16 ' + time_test + '\' and tsstart > \'2019-01-16 00:00:00\' ' +
			'order by tsstart '
			, function (err, result) {
				done();
				obj.code = "car_homeclick";
				obj.data = result.rows;
				res.send(JSON.stringify(obj));
				console.log('/car_homeclick');   //test 용
			});
	});

});




app.get('/date', (req, res) => {
	obj = new Object();
	udm.connect(function (err, client, done) {
		client.query(
			'select slineid ::text, floor(avg(nprocesstime * 100 / noperationtime)) as a, ' +
			'floor(avg(itotalcount * icriteria * 100 / nprocesstime)) as p, floor(avg(iokcount * 100 / itotalcount)) as q ' +
			',floor(avg(iokcount * 100 * icriteria / noperationtime)) as oee ' +
			'from tbl_oee ' +        
			' where tsend ::text like  \''+req.query.date +'%\''+
			'group by slineid '
			, function (err, result) {
				done();
				obj.code = "date";
				obj.data = result.rows;
				res.send(JSON.stringify(obj));
				console.log('/date');   //test 용
			});
	});

});

/* app.get('/line_click', (req, res) => {
	obj = new Object();
	udm.connect(function (err, client, done) {
		client.query( ㅋㅋㅋㅋ
			'select scartype ::text, floor(avg(nprocesstime * 100 / noperationtime)) as a, ' +
			'floor(avg(itotalcount * icriteria * 100 / nprocesstime)) as p, floor(avg(iokcount * 100 / itotalcount)) as q ' +
			',floor(avg(iokcount * 100 * icriteria / noperationtime)) as oee ' +
			'from tbl_oee ' + 
			' where slineid = \'' + req.query.line_name + '\''+
			'group by scartype '
			, function (err, result) {
				done();
				obj.code = "line_click";
				obj.data = result.rows;
				res.send(JSON.stringify(obj));
				console.log('/line_click');   //test 용
			});
	});

});*/


app.get('/sp_car_type', (req, res) => {
	obj = new Object();																
	udm.connect(function (err, client, done) {
		client.query(
			'select distinct scartype from tbl_oee ' +
			' where slineid = \'' + req.query.line_name + '\'' +
			' and tsend ::text like  \'' + req.query.line_date + '%\''
			, function (err, result) {
				done();
				obj.code = "sp_car_type";
				obj.data = result.rows;
				res.send(JSON.stringify(obj));
				console.log('/sp_car_type');   //test 용
			});
	});

});

app.get('/date_chart', (req, res) => {
	obj = new Object();
	udm.connect(function (err, client, done) {
		client.query(
			'select to_char(tsstart,\'DD\') as date ' +
			', floor(avg(iokcount * 100 * icriteria / noperationtime)) as oee ' +
			'from tbl_oee '+
			' where tsend  ::text like  \''+req.query.month + '%\''+
			' and slineid = \''+req.query.chart_line + '\'' +
			'  and scartype = \''+req.query.chart_car + '\'' +
			'group by date order by date '
			
			, function (err, result) {
				done();
				obj.code = "date_chart";
				obj.data = result.rows;
				res.send(JSON.stringify(obj));
				console.log('/date_chart');   //test 용
			});
	});

});

/*
app.get('/date_test', (req, res) => {
	obj = new Object();
	udm.connect(function (err, client, done) {
		client.query(
			'select to_char(tsstart,\'DD\') as date ' +
			', floor(avg(iokcount * 100 * icriteria / noperationtime)) as oee ' +
			'from tbl_oee ' +
			' where tsend  ::TEXT like  \'2018-11%\' ' +
			' and slineid = \'677673DE-1\' ' + 
			'  and scartype = \'RR_AJAR_KEY\' ' +
			'group by date order by date '

			, function (err, result) {
				done();
				obj.code = "date_test";
				obj.data = result.rows;
				res.send(JSON.stringify(obj));
				console.log('/date_test');   //test 용
			});
	});

});
*/

app.get('/Monthlyclick', (req, res) => {
	obj = new Object();
	udm.connect(function (err, client, done) {
		client.query(         
			'select tsstart, tsend, itargetcount, itotalcount, iokcount, ingcount ' +
			'from tbl_oee ' +
			' where tsend ::text like  \'' + req.query.line_month_date + '%\' ' +
			' and slineid = \'' + req.query.line_month_name + '\' ' +
			'  and scartype = \'' + req.query.line_month_car + '\' ' +
			'order by tsstart'

			, function (err, result) {
				done();
				obj.code = "Monthlyclick";
				obj.data = result.rows;
				res.send(JSON.stringify(obj));
				console.log('/Monthlyclick');   //test 용
			});
	});

});

app.get('/month_click_test', (req, res) => {
	obj = new Object();
	udm.connect(function (err, client, done) {
		client.query(
			'select tsstart, tsend, itargetcount, itotalcount, iokcount, ingcount ' +
			'from tbl_oee ' +
			'where tsend :: TEXT like  \'2018-11-15%\' '+
			'and scartype = \'RR_AJAR_KEY\' '+
			'and slineid = \'677673DE-1\' '+
			'order by tsstart '
			, function (err, result) {
				done();
				obj.code = "month_click_test";
				obj.data = result.rows;
				res.send(JSON.stringify(obj));
				console.log('/month_click_test');   //test 용
			});
	});

});

