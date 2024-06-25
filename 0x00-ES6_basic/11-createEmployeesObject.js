export default function createEmployeesObject(departmentName, employees) {
    const customIterable = {
    [Symbol.iterator]() {
        let counter = 0;
        return {
            next() {
                if (counter < 5) {
                counter++;
                return { done: false, value: counter };
                } else {
                return { done: true, value: undefined };
                }
            }
        }
    }    
}
}