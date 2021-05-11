import {realm} from './realmConnection';

function writeData (){
    realm.write(() => {
        realm.create('Books' , {
          id : 0,
          name : 'عاشقان هفت دریا',
          categoryAge : 2,
          categorySubject : 0,
          explanationOfTheBook : 'این کتاب داستانی ست افاسنه ای از مردمی که عاشق بودند',
          writer : 'Jozeph',
          isLike : 0,
          pages : 80,
          imagePath : "https://murmuring-lake-55008.herokuapp.com/images/bookCover1.jpg",
          pdfPath : "https://murmuring-lake-55008.herokuapp.com/pdfs/pdf1.pdf",
          isReading : 0,
        })
      })
      realm.write(() => {
        realm.create('Books' , {
          id : 1,
          name : 'داستان راستان',
          categoryAge : 2,
          categorySubject : 1,
          explanationOfTheBook : 'این داستانی ست افسانه ای',
          writer : 'دهخدا',
          isLike : 0,
          pages : 800,
          imagePath : "https://murmuring-lake-55008.herokuapp.com/images/bookCover2.jpg",
          pdfPath : "https://murmuring-lake-55008.herokuapp.com/pdfs/pdf2.pdf",
          isReading : 0,
        })
      })
      realm.write(() => {
        realm.create('Books' , {
          id : 2,
          name : 'دور دنیا در 8 ساعت',
          categoryAge : 2,
          categorySubject : 2,
          explanationOfTheBook : 'رتبه ی اول بشوید',
          writer : 'خیلی سبز',
          isLike : 0,
          pages : 700,
          imagePath : "https://murmuring-lake-55008.herokuapp.com/images/bookCover3.jpg",
          pdfPath : "https://murmuring-lake-55008.herokuapp.com/pdfs/pdf3.pdf",
          isReading : 0,
        })
      })
      realm.write(() => {
        realm.create('Books' , {
          id : 3,
          name : 'ماشا و میشا',
          categoryAge : 1,
          categorySubject : 1,
          explanationOfTheBook : 'داستان های ماشا و میشا رو از دست ندید',
          writer : 'دیزنی',
          isLike : 0,
          pages : 20,
          imagePath : "https://murmuring-lake-55008.herokuapp.com/images/bookCover4.jpg",
          pdfPath : "https://murmuring-lake-55008.herokuapp.com/pdfs/pdf4.pdf",
          isReading : 0,
        })
      })
      realm.write(() => {
        realm.create('Books' , {
          id : 4,
          name : 'تام و جری',
          categoryAge : 0,
          categorySubject : 1,
          explanationOfTheBook : 'ماجراهای گربه و موش',
          writer : 'دیزنی',
          isLike : 0,
          pages : 10,
          imagePath : "https://murmuring-lake-55008.herokuapp.com/images/bookCover5.jpg",
          pdfPath : "https://murmuring-lake-55008.herokuapp.com/pdfs/pdf5.pdf",
          isReading : 0,
        })
      })
}

module.exports.writeData = writeData;