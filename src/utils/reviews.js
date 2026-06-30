// Stubs for fetching external reviews/events. Replace API_KEY and IDs and
// implement server-side proxy if you need to keep keys secret.

export async function fetchGoogleReviews(placeId, apiKey){
  // Google Places API: Place Details with reviews requires a server-side key.
  // Example endpoint: https://maps.googleapis.com/maps/api/place/details/json?place_id=PLACE_ID&key=API_KEY&fields=review
  if(!apiKey) throw new Error('Google API key required');
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${apiKey}&fields=reviews,rating,name`;
  const res = await fetch(url);
  const data = await res.json();
  return data.result?.reviews || [];
}

export async function fetchFacebookEvents(pageId, accessToken){
  // Facebook Graph API: /{page-id}/events?access_token=...
  if(!accessToken) throw new Error('Facebook access token required');
  const url = `https://graph.facebook.com/v17.0/${pageId}/events?access_token=${accessToken}`;
  const res = await fetch(url);
  const data = await res.json();
  return data.data || [];
}
