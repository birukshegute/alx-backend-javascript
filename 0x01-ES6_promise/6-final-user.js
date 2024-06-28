import signUpUser from './4-user-promise';
import uploadPhoto from './5-photo-reject';

export default async function handleProfileSignup(firstName, lastName, fileName) {
  const promiseOne = {
    status: 'pending ',
  };
  const promiseTwo = {
    status: 'pending ',
  };

  try {
    const signup = await signUpUser(firstName, lastName);
    promiseOne.status = 'fulfilled';
    promiseOne.value = signup;
  } catch (err) {
    promiseOne.status = 'rejected';
    promiseOne.value = err.toString();
  }

  try {
    const upload = await uploadPhoto(fileName);
    promiseTwo.status = 'fulfilled';
    promiseTwo.value = upload;
  } catch (err) {
    promiseTwo.status = 'rejected';
    promiseTwo.value = err.toString();
  }

  return [promiseOne, promiseTwo];
}
