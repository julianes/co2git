


function(doc) {
  emit(null, doc);
}


function(doc) {
     if (doc.Type == "customer") {
       emit(doc._id, {LastName: doc.LastName, FirstName: doc.FirstName, Address: doc.Address});
    }
 }
