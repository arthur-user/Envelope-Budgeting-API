module.exports = {
  newid(data) {
    const newRecord = data[data.length - 1];
    const newid = newRecord.id + 1;
    if (newid === NaN || newid < 0 || newid === undefined) {
      console.log("Incorrect input");
    }
    return newid;
  },

  //helper function #2:

  /*using parseInt built-in function to analyze a string and return an integer
  with default radix 10*/

  findById(data, itemId) {
    const record = data.find((item) => item.id === parseInt(itemId));
    if (!record) {
      console.log("No such item in the database");
    }
    return record;
  },

  //helper function #3
  /*using built in findIndex() to find the item index and built-in splice() 
  method to delete data from the database*/
  deleteById(data, itemId) {
    let index = data.findIndex(function (item) {
      return item.id === parseInt(itemId);
    });
    if (index == -1) {
      console.log("Invalid index");
    }
    data.splice(index, 1);
    return data;
  },
};
