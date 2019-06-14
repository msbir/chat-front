

let userImgs = []
createUsersImages();
function createUsersImages() {
  if(userImgs.length > 1) {
    return userImgs;
  }
    for (var i = 1; i < 67; i++) {
        userImgs.push('static/usersImgs/image-' + i + '.png')
    }
  return userImgs;
}

function fakeIdFromString(input) {
    let fake = 0;
    let tmp;
    let alphabet = ' abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    alphabet = _.toArray(alphabet);
    input = _.toArray(input);

    _.forEach(input, function(value) {
      tmp = _.indexOf(alphabet, value);
      if(tmp >= 0)
        //fake = fake+''+tmp;
        fake = fake + tmp;
    });

    return parseInt(fake*12);
}

function splitBy(photosLength, whatToSplit) {
  if(whatToSplit < photosLength) {
    return parseInt(whatToSplit);
  }

  let res = parseInt(Math.round( _.divide(whatToSplit, photosLength) ));
  if(res == 1) {
    return splitBy(photosLength, whatToSplit / 10);
  }
  return res;
}

let rollPhoto =  function rollPhoto(userId) {

  userId = fakeIdFromString(userId);
  if(userId <= userImgs.length) {
    return userId;
  }

  let photoId = splitBy(userImgs.length, userId);

  while (photoId >= userImgs.length) {
    photoId = splitBy(userImgs.length, photoId);
  }

  return  userImgs[photoId];
}


export default {
    userImgs,
    rollPhoto
};
