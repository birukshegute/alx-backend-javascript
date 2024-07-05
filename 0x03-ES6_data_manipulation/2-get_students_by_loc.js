export default function getStudentsByLocation(array, city){
  if (array instanceof Array && city instanceof String) {
    array.filter((items) => items.firstName);
    array.filter((city) => city.location );
    return array; 
  }
}