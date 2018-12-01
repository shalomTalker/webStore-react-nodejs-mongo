var User = require('../models/User.js')
var Cart = require('../models/Cart.js')
const JWT = require('jsonwebtoken')
const { JWT_SECRET } = require('../configuration/index.js')
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

signToken = user => {
	return JWT.sign({
		iss: 'store',
		sub: user._id,
		lat: new Date().getTime(),
		exp: new Date().setDate(new Date().getDate() + 1)
	}, JWT_SECRET)

}
module.exports = {
	signUp: async (req, res) => {
		console.log(req.value.body)
		const { email, password, firstName, lastName, id, city, street } = req.value.body
		try {

			const existUser = await User.findOne({ email })
			if (existUser) {
				return res.status(403).json({ error: "Email is already exists" })
			}

			const newUser = new User({
				email,
				password,
				firstName,
				lastName,
				id,
				city,
				street
			})
			console.log(newUser)
			await newUser.save()
			console.log('newUser._id', newUser._id)
			const newCart = new Cart({
				user_id: new ObjectId(newUser._id),
				createdAt: new Date(Date.now()),
				products: []
			})
			await newCart.save()

			const token = signToken(newUser)

			res.status(200).json({ token })

		} catch (error) {
			console.log('error', error)
			res.status(404).send({error})

		}
	},
	signIn: async (req, res) => {
		const token = signToken(req.user)
		res.status(200).json({ token })
		console.log("successful")
	},
	home: async (req, res) => {
		res.json({ home: "resource" })
	}

}
// class LoginCtrl {
// 	static signIn(req, res) {
// 		let db = req.app.get('db')
// 		let { email, password } =  req.value.body
// 		User.verify(db, email)
// 		.then(data => {
// 			if (data[0].password === password) {
// 				req.session.loginUserId = data[0]._id
// 				res.setHeader('Content-Type', 'application/json');
// 				res.status(200).send({user:data[0], verified:true})
// 			} else {
// 			}
// 			}).catch(err => {
// 				res.status(404).send(false)
// 			})
// 	}
// 	static signUp(req, res) {
// 		const { email, password } = req.value.body
// 		const newUser = new User({email, password})

// 	}
	// static getAll (req, res) {
	// 	var db = req.app.get('db')
	// 	Playlist.getAll(db)
	// 	.then(data => {
	// 		res.json(data)
	// 	})
	// }
	// static getOne (req, res) {
	// 	var db = req.app.get('db')
	// 	Playlist.getOne(db, req.params.playlistId)
	// 	.then(data => {
	// 		res.json(data)
	// 	})
	// }
	// static addAlbum (req, res) {
	// 	console.log("first fetch", req.body, req.file)
	// 	var db = req.app.get('db')
	// 	if (!fs.existsSync(`../ui/public/docs/${req.body.name}`)) {
	// 		fs.mkdirSync(`../ui/public/docs/${req.body.name}`);
	// 	}
	// 	fs.rename(req.file.path, `../ui/public/docs/${req.body.name}/${req.file.originalname}`, (err) => {
	// 		console.log(err)
	// 	})
	// 	req.body.image = `docs/${ req.body.name }/${req.file.originalname}`
	// 	// req.setHeader('accept', 'multipart/form-data')
	// 	Playlist.addAlbum(db, req.body, res);
	// }
	// static addSongs (req, res) {
	// 	var db = req.app.get('db')
	// 	Playlist.addSongs(db, req.body, req.params.playlistId)
	// 	console.log("second fetch", req.body)
	// 	res.status(201).send('Added');
	// }

	// static replaceAlbum(req, res) {
	// 	console.log("first fetch", req.body, req.file)
	// 	var db = req.app.get('db')
	// 	// if (!fs.existsSync(`../ui/public/docs/${req.body.name}`)) {
	// 	// 	fs.mkdirSync(`../ui/public/docs/${req.body.name}`);
	// 	// }
	// 	fs.rename(req.file.path, `../ui/public/docs/${req.body.name}/${req.file.originalname}`, (err) => {
	// 		console.log(err)
	// 	})
	// 	req.body.image = `docs/${req.body.name}/${req.file.originalname}`
	// 	Playlist.addAlbum(db, req.body, res);
	// }

	// static replace (req, res) {
	// 	var db = req.app.get('db')
	// 	Playlist.replace(db, req.params.playlistId, req.body);
	// 	res.send(204);
	// }
	// static delete (req, res) {
	// 	var db = req.app.get('db')
	// 	console.log(req.params.playlistId);
	// 	Playlist.delete(db, req.params.playlistId);
	// 	res.status(201).send('deleted');
	// }
// }


// module.exports = LoginCtrl