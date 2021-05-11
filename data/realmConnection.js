import Realm from 'realm';

realm = new Realm ({
  path:'Database.realm',
  schema : [
    {
      name : 'Books',
      primaryKey : 'id' ,
      properties : {
        //9 columns
        id : 'int',
        name : 'string',
        categoryAge : 'int',
        categorySubject : 'int',
        explanationOfTheBook : 'string',
        isLike : 'int',
        pages : 'int',
        writer : 'string',
        imagePath : 'string',
        pdfPath : 'string',
        isReading : 'int',
      }
    }
  ]
})

realm = new Realm({
    path : 'Database.realm',
})

module.exports.realm = realm;