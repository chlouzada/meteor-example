import { Meteor } from 'meteor/meteor';
import { TasksCollection } from '/imports/api/collections/TasksCollection';

function insertLink({ title }) {
  TasksCollection.insert({ text: title });
}

Meteor.startup(() => {
  // If the Links collection is empty, add some data.
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
