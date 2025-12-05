const Blockfrost = require("@blockfrost/blockfrost-js");

const API = new Blockfrost.BlockFrostAPI({
  projectId: "previewJrDEBYjt0DZBYHVjdpX2ANB8eKuV7NWo", // Your preview API key
  network: "preview"
});

async function runExample() {
  try {
    console.log("Testing Blockfrost API connection...");
    
    const health = await API.health();
    console.log("✅ Health check:", health);
    
    const networkInfo = await API.network();
    console.log("✅ Network info:", networkInfo);
    
    const latestBlock = await API.blocksLatest();
    console.log("✅ Latest block:", latestBlock.height);
    
    const latestEpoch = await API.epochsLatest();
    console.log("✅ Latest epoch:", latestEpoch.epoch);
    
    // Test with a known preview testnet address
    const testAddress = "addr_test1qpw0djgj0x59ngrjvqthn7enhvruxnsavsw5th63la3mjel3tkc974sr23jmlzgq5zda4gtv8k9cy38756r9y3qgmkqqjz6aa7";
    
    try {
      const address = await API.addresses(testAddress);
      console.log("✅ Address query successful:", address);
    } catch (addrError) {
      console.log("ℹ️ Address not found (normal for new addresses):", addrError.status_code);
    }
    
    console.log("\n🎉 Blockfrost API is working correctly!");
    
  } catch (err) {
    console.error("❌ Error:", err);
    
    if (err.status_code === 403) {
      console.log("🔑 API Key issue - check your BLOCKFROST_PROJECT_ID");
    } else if (err.status_code === 404) {
      console.log("🌐 Network mismatch - ensure you're using preview network");
    }
  }
}

runExample();