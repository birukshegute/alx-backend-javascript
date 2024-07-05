export default function getStudentsByLocation(array, city){
  if (city instanceof String) {
    return array.filter((city) => array.location === city );
  }
}