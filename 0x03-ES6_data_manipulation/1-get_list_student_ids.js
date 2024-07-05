export default function getListStudentIds(){
  const students = 
    [{ id: 1, firstName: 'Guillaume', location: 'San Francisco' },
    { id: 2, firstName: 'James', location: 'Columbia' },
    { id: 5, firstName: 'Serena', location: 'San Francisco' }]
  return students.map(items => items.id)
}