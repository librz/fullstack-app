import express from "express"

const app = express()

app.get("/", (req, res, err) => {
	res.end("You've reached server")
})

const PORT = 2048

app.listen(PORT, () => {
	console.log("app started, listening on port", PORT)
})
