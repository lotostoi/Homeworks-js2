let productApi = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json';


// // ES5
// var xhr = new XMLHttpRequest();

//   xhr.open('GET', productApi, true);
  
//   xhr.onreadystatechange = () => {
//     if (xhr.readyState !== 4) return;
  
//     if(xhr.status !== 200) {
//       console.log(`Error! ${xhr.status} ${xhr.statusText}`);
//     } else {
//       console.log(`Ok ${xhr.responseText}`);
//     }
//   };
//   console.log(xhr.send());



/**
 * Функция делает вызов на сервер
 * @param {string} url 
 */
function makeGETRequest(url) {
  return new Promise((resolve, reject) => {
    let xhr;
    if (window.XMLHttpRequest) {
      xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) { 
      xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xhr.open('GET', url, true);

    xhr.onreadystatechange = function () {
      if (xhr.readyState !== 4) return;

      if(xhr.readyState === 4) {
        resolve(xhr.responseText);
      }
      
      if(xhr.status !== 200) {
        reject('Error!');
      }
    };
    
    xhr.send();
  }); 
}

makeGETRequest(productApi)
  .then((data) => {
    let productObject = JSON.parse(data);
    console.log(productObject);
  })
  .catch((error) => {
    console.log(error);
  });