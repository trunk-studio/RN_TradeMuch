
export const REQUEST_TAKE_PHOTO = 'REQUEST_TAKE_PHOTO';
export const RECEIVED_TAKE_PHOTO = 'RECEIVED_TAKE_PHOTO';


function receivedTakePhoto(photoSource, photoInfo) {
  return {
    type: RECEIVED_TAKE_PHOTO,
    data: {
      photoSource,
      photoInfo,
    },
  };
}

export function requestTakePhoto(photoSource, photoInfo) {
  return (dispatch) => {
    dispatch(receivedTakePhoto(photoSource, photoInfo));
  };
}
