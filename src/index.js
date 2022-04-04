const express = require('express')
const app = express()
const port = process.env.PORT || 3000

const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/basic-node-project')

const countryRouter = require('./routers/country.js')
const stateRouter = require('./routers/state.js')
const cityRouter = require('./routers/city.js')
const userRouter = require('./routers/user.js')

app.use(express.json())
app.use('/countries',countryRouter)
app.use('/state', stateRouter)
app.use('/city', cityRouter)
app.use('/user', userRouter)

app.listen(port, () => {
    console.log('Server is up on ' + port)
})


