export default function getStudentsByLocation(student, city){
    return student.filter((city) => student.location === city );
}