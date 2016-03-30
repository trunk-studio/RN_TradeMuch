
export const REQUEST_SEARCH_POST = 'REQUEST_SEARCH_POST';
export const RECEIVED_SEARCH_POST = 'RECEIVED_SEARCH_POST';


function receivedSearchPost(postList) {
  return {
    type: RECEIVED_SEARCH_POST,
    data: postList.items,
  };
}

export async function requestSearchPost(keyword, distance, location) {
  const paramArray = [];
  if (location) {
    paramArray.push(`lat=${location.lat}`);
    paramArray.push(`lon=${location.lon}`);
  }
  if (distance) {
    paramArray.push(`distance=${distance}`);
  }
  const param = paramArray.join('&');
  const searchApi = `/rest/post/search/${keyword}?${param}`;
  const postList = await fetch(searchApi).then(response => response.json());
  return (dispatch) => {
    dispatch(receivedSearchPost(postList));
  };
}
