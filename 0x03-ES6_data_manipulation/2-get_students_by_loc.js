export default function getStudentsByLocation(array, city){
  if (array instanceof Array && city instanceof string) {
    array.filter((items) => items.firstName, items.city);
    return array; 
  }
}