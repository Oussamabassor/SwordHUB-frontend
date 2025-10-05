// Format and open WhatsApp chat with order details
export const openWhatsAppOrder = (product, selectedSize) => {
  const vendorNumber = "+212675643119"; // Replace with your actual WhatsApp number
  const message = formatOrderMessage(product, selectedSize);
  const whatsappUrl = `https://wa.me/${vendorNumber}?text=${encodeURIComponent(
    message
  )}`;
  window.open(whatsappUrl, "_blank");
};

const formatOrderMessage = (product, selectedSize) => {
  return `Hello! I would like to order:
🎽 Product: ${product.name}
📏 Size: ${selectedSize}
💰 Price: $${product.price}
🏷️ Category: ${product.category}
${product.material ? `🧵 Material: ${product.material}` : ""}
${product.fit ? `👕 Fit: ${product.fit}` : ""}

Please confirm the availability and provide payment details. Thank you!`;
};
