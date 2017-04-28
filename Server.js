var express = require('express'); 
var app = express(); 
var router = express.Router(); 
var bodyParser = require('body-parser');

var contactlist = [{'id':0,'name':'Keerati', 'email' : 'keerati.001@csw.sec2','number': 57001},
					{'id':1,'name':'Jitsin', 'email' : 'jitsin.003@csw.sec2','number': 57003},
					{'id':2,'name':'Warongrat', 'email' : 'warongrat.049@csw.sec2','number': 57049},
					{'id':3,'name':'Nattawat', 'email' : 'nattwat.125@csw.sec2','number': 57125}
			 ]
var contactIndex=4;

app.use(express.static('public'))

router.route('/contactlist')
    .get(function(req, res) {    	
    	res.json(contactlist);
    })


	.post(function(req, res) { 
		var contact = {};
		contact.id =  contactIndex++;
		contact.name = req.body.name
		contact.email = req.body.email
		contact.number = req.body.number
		contactlist.push(contact);
		res.json( {message: 'Contact created!'} )
	}) 

router.route('/contactlist/:contact_id')
	.get (function(req,res) {
    	res.json(contactlist[req.params.contact_id])
    })

	.put (function(req,res) {
		var id = req.params.contact_id
		contactlist[id].name = req.body.name
		contactlist[id].email = req.body.email
		contactlist[id].number = req.body.number
		res.json({ message: 'Contact updated!' });
     })

       .delete (function(req,res) {
	var id = req.params.contact_id
	delete 	contactlist[id]
      	  res.json({ message: 'Contact deleted!' });
    })

router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' }) 
});

app.use('/api', bodyParser.json(), router);
app.use("*",function(req,res){
  res.status(404).send('404 Not found');
});

app.listen(80, function() {
	console.log("Server is running")
});
