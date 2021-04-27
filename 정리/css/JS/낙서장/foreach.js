




function printAll(...args) {
  for (const arg of args) {
      console.log(arg);
  }

  args.forEach((arg) => console.log(arg));
}
printAll('dream','coding','dum');
