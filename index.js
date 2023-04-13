const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
	res.send("Node Running on Server");
});

const users = [
	{ id: 1, name: "Doe", email: "doi@example.com" },
	{ id: 2, name: "Doe1", email: "doi1@example.com" },
	{ id: 3, name: "Doe2", email: "doi2@example.com" },
];
// app.get("/users", (req, res) => {
// 	if (req.query.name) {
// 		const search = req.query.name;
// 		const filtered = users.filter(
// 			(usr) => usr.name.toLocaleLowerCase().indexOf(search) > 0
// 		);
// 		res.send(filtered);
// 	} else {
// 		res.send(users);
// 	}
// });

// app.post("/users", (req, res) => {
// 	const user = req.body;
// 	user.id = users.length + 1;
// 	users.push(user);
// 	console.log(user);
// 	res.send(user);
// });

// MongoDB Cluster Status
//==========================================================
// Cluster name
//ProgrammingHeroCluster
// User Data History
//==========================================================
// User Name: dbUser1
// Password: fExsluvHCcqNONNy
//==========================================================
const uri = "mongodb://localhost:27017";
// const uri =
// 	"mongodb+srv://dbUser1:fExsluvHCcqNONNy@programmingherocluster.fdfar9q.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	serverApi: ServerApiVersion.v1,
});
// client.connect((err) => {
// 	const collection = client.db("simpleNode").collection("users");
// 	// perform actions on the collection object
// 	console.log("database connection");
// 	client.close();
// });
async function run() {
	try {
		const userCollection = client.db("simpleNode").collection("users");
		// const user = {
		// 	name: "Md. Rased Molla",
		// 	email: "rasedprogrammer@gmail.com",
		// };
		// const result = await userCollection.insertOne(user);
		// console.log(result);

		app.get("/users", async (req, res) => {
			const cursor = userCollection.find({});
			const users = await cursor.toArray();
			res.send(users);
		});

		app.post("/users", async (req, res) => {
			const user = req.body;
			// user.id = users.length + 1;
			// users.push(user);
			// console.log(user);
			const result = await userCollection.insertOne(user);
			console.log(result);
			user._id = result.insertedId;
			res.send(user);
		});
	} finally {
	}
}
run().catch((err) => console.log(err));

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
