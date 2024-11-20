const { MongoClient, ServerApiVersion } = require("mongodb");

const uri =
  "mongodb+srv://SathyjaseelanKeyithan:keyithanb2002.12@cluster0.nslu2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect to the MongoDB cluster
    await client.connect();

    // Ping the cluster to verify connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    // Select the database
    const db = client.db("testDB");

    // Define collections and sample data
    const collections = [
      {
        name: "users",
        data: { name: "John Doe", email: "johndoe@example.com", age: 30 },
      },
      {
        name: "orders",
        data: {
          orderId: "ORD12345",
          user: "John Doe",
          items: ["Laptop", "Mouse"],
          total: 1500,
        },
      },
      {
        name: "payments",
        data: {
          paymentId: "PAY45678",
          user: "John Doe",
          amount: 1500,
          method: "Credit Card",
        },
      },
    ];

    // Loop through collections to insert documents and retrieve data
    for (const collection of collections) {
      const col = db.collection(collection.name);

      // Insert sample document
      const result = await col.insertOne(collection.data);
      console.log(`Document inserted into ${collection.name} with _id: ${result.insertedId}`);

      // Retrieve all documents in the collection
      const documents = await col.find({}).toArray();
      console.log(`Documents in ${collection.name}:`, JSON.stringify(documents, null, 2));
    }
  } catch (error) {
    console.error("Error connecting to MongoDB or performing operations:", error);
  } finally {
    // Close the connection
    await client.close();
    console.log("Connection closed.");
  }
}

run().catch(console.dir);
