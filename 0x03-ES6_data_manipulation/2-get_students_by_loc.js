export default function getStudentsByLocation(array, city) {
  return array.filter((array) => array.location === city);
}
