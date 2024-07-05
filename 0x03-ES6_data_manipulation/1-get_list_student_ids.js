export default function getListStudentIds(array) {
  if (array instanceof Array) {
    return array.map((items) => items.id);
  }
  return [];
}
