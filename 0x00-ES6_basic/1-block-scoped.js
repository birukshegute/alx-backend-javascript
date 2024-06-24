export default function taskBlock(trueOrFalse) {
  const task = false;
  const task2 = true;

  if (trueOrFalse) {
    const task = true; // No use because of const
    const task2 = false; // No use because of const
  }

  return [task, task2];
}