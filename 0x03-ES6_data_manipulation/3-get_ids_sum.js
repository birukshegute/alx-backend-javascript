export default function getStudentIdsSum(array) {
  return array.reduce((sum, array) => sum + array.id, 0);
}
