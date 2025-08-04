// Simple test script to verify API functionality
const axios = require("axios");

const API_URL = "https://trendify-backend-ehwe.onrender.com/api/v1";

async function testAPI() {
  console.log("Testing API connectivity...\n");

  try {
    console.log("1. Testing products endpoint...");
    const productsResponse = await axios.get(`${API_URL}/products`, {
      timeout: 30000,
    });
    console.log(`✅ Products: ${productsResponse.data.length} items found`);
  } catch (error) {
    console.log(`❌ Products failed: ${error.message}`);
  }

  try {
    console.log("\n2. Testing categories endpoint...");
    const categoriesResponse = await axios.get(`${API_URL}/categories`, {
      timeout: 30000,
    });
    console.log(`✅ Categories: ${categoriesResponse.data.length} items found`);
  } catch (error) {
    console.log(`❌ Categories failed: ${error.message}`);
  }

  console.log("\nAPI test completed.");
}

testAPI();
