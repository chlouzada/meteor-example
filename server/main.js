import { Meteor } from 'meteor/meteor';
import { TasksCollection } from '/imports/api/collections/TasksCollection';
import { Accounts } from 'meteor/accounts-base';

const SEED_USERNAME = 'chlzd';
const SEED_PASSWORD = '123456';

Meteor.startup(() => {
  if (!Accounts.findUserByUsername(SEED_USERNAME)) {
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    });
  }

  // If the Task collection is empty, add some data.
  if (TasksCollection.find().count() === 0) {
    [
      'First Task',
      'Second Task',
      'Third Task',
      'Fourth Task',
      'Fifth Task',
      'Sixth Task',
      'Seventh Task'
    ].forEach(insertTask)
  }
});
