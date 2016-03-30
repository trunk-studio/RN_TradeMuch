import {
  RECEIVED_TAKE_PHOTO,
} from '../actions/TakePhotoActions';

export function takePhoto(state = {}, action) {
  switch (action.type) {
    case RECEIVED_TAKE_PHOTO:
      return {
        ...state,
        photoSource: action.data.photoSource,
        photoInfo: action.data.photoInfo,
      };
    default:
      return state;
  }
}
