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

const result = students.find((student) => student.score === 90);
console.log(result);

const enroll = students.filter((student) => student.enrolled === true);
console.log(enroll);

const score = students.map((student) => student.score * 2);
console.log(score);

const lowscore = students.every((student) => student.score <= 50);
console.log(lowscore);

const string = students
  .map((student) => student.score)
  .filter((score) => score >= 50) //위에서 맵핑으로 score로 값을 변환해서 여기서 score로 써줄수있다
  .join();

console.log(string);

const sorting = students
  .map((student) => student.score)
  .sort((a, b) => a - b)
  .join();

console.log(sorting);

///// 단위마다 , 콤마 찍기 (정수,실수)
function toCommaStringF(number) {
  var number_string = number.toString();
  var number_parts = number_string.split(".");
  var regexp = /\B(?=(\d{3})+(?!\d))/g;
  if (number_parts.length > 1) {
    return number_parts[0].replace(regexp, ",") + "." + number_parts[1];
  } else {
    return number_string.replace(regexp, ",");
  }
}

console.log("Test = " + toCommaStringF(123456789));
console.log("Test = " + toCommaStringF(123456789.1234567));

///// 단위마다 , 콤마 찍기 (간단식)
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

console.log(numberWithCommas(0.00001));
