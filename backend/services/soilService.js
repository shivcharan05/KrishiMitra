const fs = require('fs');
const path = require('path');
const axios = require('axios');

/**
 * Service to fetch soil data using Government API or fallback dataset.
 */
exports.getSoilData = async (latitude, longitude, district = "default") => {
  try {
    const apiUrl = process.env.GOV_SOIL_API_URL;
    const apiKey = process.env.GOV_SOIL_API_KEY;

    // 1. Attempt to fetch from external Government API if configured
    if (apiUrl && apiUrl !== "https://api.example.gov/v1/soil") {
      try {
        console.log(`[Soil Service] Fetching data from Gov API for Lat: ${latitude}, Lon: ${longitude}`);
        const response = await axios.get(apiUrl, {
          params: { lat: latitude, lon: longitude },
          headers: { 'Authorization': `Bearer ${apiKey}` }
        });
        
        // Assuming the API returns { data: { pH, Nitrogen, Phosphorous, Potassium } }
        if (response.data && response.data.pH) {
          return response.data;
        }
      } catch (apiError) {
        console.error("[Soil Service] Gov API failed, falling back to local dataset:", apiError.message);
      }
    } else {
      console.log("[Soil Service] No valid Gov API configured. Using local dataset fallback.");
    }

    // 2. Fallback to local dataset lookup
    const dataPath = path.join(__dirname, '../data/district_soil_data.json');
    
    if (fs.existsSync(dataPath)) {
      const rawData = fs.readFileSync(dataPath, 'utf8');
      const datasets = JSON.parse(rawData);
      
      const districtLower = district.toLowerCase();
      let matchedData = datasets.find(d => d.district.toLowerCase() === districtLower);
      
      if (!matchedData) {
        matchedData = datasets.find(d => d.district === "default");
      }
      
      // Simulate network delay for realism
      await new Promise(resolve => setTimeout(resolve, 800));
      
      return {
        pH: matchedData.pH,
        Nitrogen: matchedData.Nitrogen,
        Phosphorous: matchedData.Phosphorous,
        Potassium: matchedData.Potassium,
        source: "local_dataset_fallback"
      };
    }

    // 3. Absolute Fallback if dataset file is missing
    return {
      pH: 6.5,
      Nitrogen: 150,
      Phosphorous: 20,
      Potassium: 120,
      source: "hardcoded_fallback"
    };

  } catch (error) {
    console.error('[Soil Service] Error fetching soil data:', error);
    throw new Error('Failed to fetch soil data');
  }
};
