const mongoose = require("mongoose")
const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@cluster0.2xhk2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster`

mongoose.set('strictQuery',false)
mongoose.connect(url).then(() => {
    console.log("connected to db")

    const personSchema = new mongoose.Schema({
        name: String,
        number: String,
    })

    const Person = mongoose.model('Person', personSchema)

    if (process.argv.length<5) {
        Person.find({}).then(result => {
            result.forEach(person => {
                console.log(person)
            })
            process.exit(1)
        }
    ) } else {
        const name = process.argv[3]
        const number = process.argv[4]
        const person = new Person ({
            name: name,
            number: number
        })

        console.log("defined person ", person)

        person.save().then(result => {
            console.log(`added ${name} number ${number} to phonebook`)
            mongoose.connection.close()
        })
    }
})