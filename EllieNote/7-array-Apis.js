// 1. join : make a string out of an array
{
  const fruits = ["apple", "banana", "orange"];
  const result = fruits.join(", and ");
}

// 2. split : make a array out of a string
{
  const fruits = "apple,banna,kiwi,cheery";
  const result = fruits.split(","); // need ,(comma). bcz if it dosen't have ,(comma), it comes out just 1 array
}

// 3 make this array look like this: [5,4,3,2,1]
{
  const array = [1, 2, 3, 4, 5];
  const result = array.reverse();
  // reverse change original array
  // console.log(array);
}

// 4 make new array without the first two elements
{
  const array = [1, 2, 3, 4, 5];
  // const result = array.splice(0, 2); // it doesn't make new array
  const result2 = array.(2, 5); // from 2 to before 5 , it dosen't effect initial array
}

// Class questions ////////////////////////////////////////

class Student {
  constructor(name, age, enrolled, score) {
    this.name = name;
    this.age = age;
    this.enrolled = enrolled;
    this.score = score;
  }
}

const students = [
  new Student("A", 29, true, 45),
  new Student("B", 28, false, 80),
  new Student("C", 30, true, 90),
  new Student("D", 40, false, 66),
  new Student("E", 18, true, 88),
];

// 5 find a student with the score 90
// callback function has to return boolean
// when it finds one , it will return and stop
{
  const result = students.find((student, index) => student.score === 90);
}

// 6 make an array of enrolled students
{
  const result = students.filter((student) => student.enrolled);
}

// 7 make an array containing only the students' scores
// result should be : [45,80,90,66,88]
// The map method calls the callbackfn function one time for each element in the array.
{
  const result = students.map((student) => student.score);
}

// 8 check if there is a student with the score lower than 50
{
  const result = students.some((student) => student.score < 50); // Determines whether the specified callback function returns true for any element of an array.
  const result2 = !students.every((student) => student.score >= 50); // Determines whether all the members of an array satisfy the specified test.
}

// 9 compute student's average score - reduce
{
  // prev is cumulative value (get return value).
  // curr is current value.
  const result = students.reduce((prev, curr) => {
    return prev + curr.score;
  }, 0); //start from index0
  // example
  // 0 1
  // 1 2
  // 3 3
  console.log(result / students.length);
}

// 10 make a string containing all the scores
// map - return array
{
  const result = students
    .map((student) => student.score)
    .filter((score) => score >= 80)
    .sort((a, b) => a - b)
    .join();
  //   80,90,66,88
}

// 11 sort
{
  const result = students
    .map((student) => student.score)
    // .sort((a, b) => a - b) ascending order
    .sort((a, b) => b - a) // descending order
    .join();
}
