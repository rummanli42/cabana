import axios from 'axios';  
/* Get Zipcode */
export const getZipcode = async (address) => {
    try {  
        const response = await axios.get(  
          `https://maps.googleapis.com/maps/api/geocode/json`,  
          {  
            params: {  
              address: address,  
              key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,  
            },  
          }  
        );  
        const result = response.data.results[0];  
        if (result) {  
          const component = result.address_components.find(comp =>  
            comp.types.includes('postal_code')  
          );  
          return component ? component.long_name : 'Zip code not found';  
        }  
    } catch (error) {  
    console.error('Error fetching zip code:', error);  
    }  
    return 'Zip code not found'; 
};

/* Get County */  
export const getCounty = async (address) => {  
    try {  
        const response = await axios.get(  
            `https://maps.googleapis.com/maps/api/geocode/json`,  
            {  
                params: {  
                    address: address,  
                    key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,  
                },  
            }  
        );  
        const result = response.data.results[0];  
        if (result) {  
            const component = result.address_components.find(comp =>  
                comp.types.includes('administrative_area_level_2')  
            );  
            return component ? component.long_name : 'County not found';  
        }  
    } catch (error) {  
        console.error('Error fetching county:', error);  
    }  
    return 'County not found';   
};
