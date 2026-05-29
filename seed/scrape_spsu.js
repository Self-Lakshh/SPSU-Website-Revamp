// Node.js native fetch will be used

async function scrape() {
  console.log('Fetching spsu.ac.in homepage...');
  try {
    const res = await fetch('https://www.spsu.ac.in/');
    const html = await res.text();
    
    // 1. Find all image URLs
    const imgRegex = /<img[^>]+src=["']([^"']+)["']/g;
    const images = [];
    let match;
    while ((match = imgRegex.exec(html)) !== null) {
      images.push(match[1]);
    }

    // 2. Find all stylesheet URLs
    const cssRegex = /<link[^>]+href=["']([^"']+\.css[^"']*)["']/g;
    const cssFiles = [];
    while ((match = cssRegex.exec(html)) !== null) {
      cssFiles.push(match[1]);
    }

    // 3. Find logo references
    const logoImgs = images.filter(img => img.toLowerCase().includes('logo'));
    const banners = images.filter(img => img.toLowerCase().includes('banner') || img.toLowerCase().includes('slider') || img.toLowerCase().includes('slide'));

    console.log('\n=== LOGO IMAGES ===');
    console.log(logoImgs.slice(0, 10));

    console.log('\n=== BANNERS / SLIDERS ===');
    console.log(banners.slice(0, 10));

    console.log('\n=== UNIQUE STYLESHEETS ===');
    console.log([...new Set(cssFiles)].slice(0, 10));

    console.log('\n=== ALL IMAGES (SAMPLE) ===');
    console.log([...new Set(images)].slice(0, 30));

  } catch (error) {
    console.error('Failed to scrape:', error);
  }
}

scrape();
