async function main() {
  try {
    const res = await fetch('http://localhost:3001/api/products/sua-tang-cuong-suc-khoe-tang-cuong-mien-dich-ensure-gold-strengthpro-huong-vani-237ml');
    const data = await res.json();
    console.log("NESTJS API IMAGES:");
    console.log(JSON.stringify(data.images, null, 2));
  } catch (err) {
    console.error(err);
  }
}
main();
