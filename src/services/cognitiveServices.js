import base64 from 'base-64';
//import RNFetchBlob from 'react-native-fetch-blob';

const client = {
  apiKey: 'c11489d328804ca797a22451ae944c39',
  endpoint:
    'https://westcentralus.api.cognitive.microsoft.com/vision/v1.0/RecognizeText',
};
export function analyseImageByFile(data) {
  const headers = {
    'Content-type': 'application/octet-stream',
    'Ocp-Apim-Subscription-Key': client.apiKey,
  };
  const body = base64.decode(data);
  let parameters = {
    handwriting: true,
  };

  sendRequest(headers, body, parameters);

  // RNFetchBlob.fetch(
  //   'POST',
  //   client.endpoint + '?handwriting=true',
  //   {
  //     'Content-Type': 'application/octet-stream',
  //     'Ocp-Apim-Subscription-Key': client.apiKey,
  //     // here's the body you're going to send, should be a BASE64 encoded string
  //     // (you can use "base64"(refer to the library 'mathiasbynens/base64') APIs to make one).
  //     // The data will be converted to "byte array"(say, blob) before request sent.
  //   },
  //   RNFetchBlob.wrap(filePath),
  // )
  //   .then(res => {
  //     console.log(res.text());
  //   })
  //   .catch(err => {
  //     // error handling ..
  //   });
}

const sendRequest = (headers, body, parameters) => {
  let isRunning = true;
  //console.log('body', body);

  fetch(client.endpoint + '?handwriting=true', {
    method: 'POST',
    headers,
    body,
  }).then(response => {
    console.log('response1', response);
    const interval = setInterval(() => {
      if (isRunning) {
        fetch(response.header['Operation-Location'], {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key': client.apiKey,
          },
          body,
        }).then(response2 => {
          console.log('response2', response2);
        });
      } else {
        clearInterval(interval);
      }
    }, 500);
  });
};
