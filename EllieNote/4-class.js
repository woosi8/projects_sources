'use strict'
// class person{
//     name;   // field
//     age;
//     speak(); // method 
// }

// class: template
// object: instance of a class

// 1. Literals and properties ////////////////////////////////////////
class Person {
    // constructor for object
    constructor(name, age) {
        //1. fields
        this.name = name
        this.age = age
    }
    //2. methods
    speak() {
        console.log(`${this.name} hello!`)
    }
}

const ellie = new Person('ellie', 20)
console.log(ellie.name)
console.log(ellie.age)
ellie.speak()

// 2. Getter and setters for Preventing silly errors ////////////////////////////////////////
// incapsulation 
class User {
    constructor(firstName, lastName, age) {
        this.firstName = firstName
        this.lastName = lastName
        this.age = age // (get age return) = (set age call)
    }
    // return
    get age() {
        return this._age 
    }
    // set value
    set age(value) {
        // if (value < 0) {
        //     throw Error('age can not be negative')
        // }
        this._age = value < 0 ? 0 : value
    }
}

const user1 = new User('Steve', 'job', -1) //Silly things
console.log(user1.age)

// 3. Fields (public, private) ////////////////////////////////////////
class Experiment {
    publicField = 2
    // this isn't accessible from outside
    #privateField = 0
}
const experiment = new Experiment()
console.log(experiment.publicField)
console.log(experiment.privateField)

// 4.Static 
// static is in Class
class Article {
    static publisher = 'Dream Coding'
    constructor(articleNumber) {
        this.articleNumber = articleNumber
    }
    static printPublisher() {
        console.log(Article.publisher)
    }
}

const article1 = new Article(1)
const article2 = new Article(2)
console.log(article1.publisher)
console.log(Article.publisher) 

// 5. Inheritance ////////////////////////////////////////

class Shape {
    constructor(width, height, color) {
        this.width = width
        this.height = height
        this.color = color
    }

    draw() {
        console.log(`drawing ${this.color} color of`)
    }

    getArea() {
        return this.width * this.height
    }
}

class Triangle extends Shape {
    // draw :inherited from parent
    draw() {
        super.draw()
        console.log(`gimbam`)
    }
    getArea() { 
        return (this.width * this.height) / 2
    }
}

const rectangle = new Rectangle(20, 20, 'blue')
rectangle.draw()
console.log(rectangle.getArea())

const triangle = new Triangle(20, 20, 'red')
triangle.draw()
console.log(triangle.getArea())

// 6. Class checking : instanceOf ////////////////////////////////////////
console.log(rectangle instanceof Rectangle) t
console.log(triangle instanceof Rectangle) f
console.log(triangle instanceof Triangle) t
console.log(triangle instanceof Shape) t
console.log(triangle instanceof Object) t

