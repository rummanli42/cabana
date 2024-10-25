const API_URL = process.env.REACT_APP_API_URL

/* Get Pool Size */
export const getPoolSize = async (address) => {
  try {
    const response = await fetch(
      `${API_URL}/get_contour_info`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({  
          address: address,  
        }),  
      }
    );
    const json = await response.json();
    return json;
  } catch (error) {
    console.log(error);
  }
};