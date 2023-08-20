

//300 random products in the productsList
productsList = [
  "Smartwatch", "Coffee Beans", "Bluetooth Speaker", "Leather Wallet", "Gaming Mouse", "Air Fryer", "Yoga Mat", "Portable Charger", "Running Shoes", "Wireless Earbuds", "Face Cream", "Water Bottle", "Laptop Backpack", "Cutting Board", "Fitness Tracker", "Herbal Tea", "DSLR Camera", "Instant Pot", "Sunglasses", "Headphones", "Toothbrush", "Vacuum Cleaner", "Protein Powder", "Indoor Plant", "Perfume", "Keyboard", "Resistance Bands", "Tripod Stand", "Non-Stick Pan", "Grooming Kit", "Car Adapter", "Scented Candle", "Dumbbell Set", "Handbag", "Beard Oil", "Coffee Maker", "Travel Pillow", "Cookware Set", "Bluetooth Printer", "Sleep Mask", "Dress Shirt", "Baby Monitor", "Oil Diffuser", "Power Bank", "Resistance Loop Bands", "Hiking Boots", "Juicer", "FM Transmitte", "Foldable Bicycle", "Shampoo", "Grooming Kit", "Projector", "Chef's Knife", "Travel Backpack", "Massage Gun", "LED Bul", "Food Storage Bags", "Cologne", "Cordless Drill", "Charging Pad", "Instant Camera", "Milk Frother", "Bath Bombs", "Gaming Keyboard", "French Press", "Protein Bars", "Scratching Post", "Jewelry Cleaner", "Electric Scooter", "Toothbrush", "Yoga Block", "Game Controller", "Baby Swing", "Hair Straightener", "VR Headset", "Makeup Brush Set", "Thermostat", "Luggage", "Pull-Up Bands", "Phone Mount", "Camping Tent", "Face Mask", "Flashlight", "Diaper Backpack", "Noise Machine", "Hair Dryer", "Smart Plug", "Athletic Leggings", "Wine Opener", "Security Camera", "Air Cooler", "Leather Jacket", "Travel Adapter", "Paddleboard", "Mattress Topper", "In-Ear Headset", "GPS Navigator", "Dog Food", "Robot Vacuum", "Home Gym", "Digital Watch", "Arabica Coffee Beans", "Wireless Headphones",
  "Leather Belt", "Gaming Keyboard", "Air Purifier", "Yoga Block", "Portable Power Bank", "Trail Running Shoes", "Wireless Bluetooth Earbuds", "Night Cream", "Stainless Steel Tumbler", "Laptop Sleeve", "Wooden Cutting Board", "Activity Tracker", "Chamomile Tea", "Mirrorless Camera", "Slow Cooker", "Aviator Sunglasses", "Noise-Canceling Earphones", "Electric Toothbrush", "Robot Vacuum Cleaner", "Whey Protein Powder", "Ficus Plant", "Citrus Perfume",
  "Mechanical Keyboard", "Stretch Bands", "Professional Tripod", "Ceramic Cookware Set", "Beard Grooming Kit", "Coffee Machine", "Neck Travel Pillow", "Cast Iron Cookware Set", "Portable Bluetooth Speake", "Business Shirt", "Baby Video Monitor", "Essential Oil Diffuser", "Solar Power Bank", "Loop Resistance Bands", "Hiking Shoes", "Cold Press Juicer", "Bluetooth FM Radio Transmitter", "Foldable Mountain Bike", "Tea Tree Shampoo", "Men's Grooming Set", "Mini Projector", "Chef Knife Set", "Waterproof Travel Backpack", "Deep Tissue Massage Gun", "Smart LED Light Bulb", "Reusable Silicone Food Bags",
  "Men's Eau de Toilette", "Cordless Impact Drill", "Wireless Charging Pad", "Instant Film Camera", "Milk Frothing Pitcher", "Bath Fizzies", "Mechanical Gaming Keyboard", "French Press Coffee Make ", "Vegan Protein Bars", "Cat Scratching Tree", "Ultrasonic Jewelry Cleaner", "Electric Kick Scooter", "Electric Toothbrush", "Cork Yoga Bloc", "Gaming Console Controller", "Portable Baby Swing", "Hair Straightening Brush", "Virtual Reality Goggles", "Makeup Brush Cleaner", "Smart Thermostat", "Travel Luggage Set", "Resistance Pull-Up Bands", "Magnetic Phone Holder", "Camping Hock", "Sheet Face Mask", "Rechargeable Flashlight", "Diaper Bag Backpack", "White Noise Machine", "Ionic Hair Dryer",
  "Smart Plug Socket", "High-Waisted Leggings", "Electric Wine Opener", "Wireless Security Camera", "Portable Air Conditioner", "Faux Leather Jacket", "Universal Travel Adapter", "Inflatable Stand-Up Paddle Board", "Memory Foam Mattress Topper", "Bluetooth Earphones", "Car GPS Navigator", "Dog Treats", "Smart Robot Vacuum Cleaner", "Full Home Gym Set"
]


descriptors = [
  "Sampler", "Organic", "Bluetooth", "Leather", "Gaming", "Air", "Eco-Friendly", "Portable", "Running", "Wireless", "Anti-Aging", "Stainless Steel", "Laptop", "Bamboo", "Fitness", "Herbal", "Digital", "Instant", "Fashionable", "Noise-Cancelling", "Electric", "Protein", "Indoor", "Unisex", "Slim", "Resistance", "Smart", "Non-Toxic", "Compact", "Premium", "Scented", "Adjustable", "Multifunctional", "Travel-Friendly", "Cordless", "High-Performance", "Healthy", "Ergonomic", "Foldable", "Natural", "Rechargeable", "Easy-to-Use", "Breathable", "Elegant",
  "Remote Control", "Gourmet", "HD", "Luxury", "Portable", "Professional", "Comfortable", "Versatile", "Waterproof", "Stylish", "Classic", "Versatile", "All-Natural", "Wireless", "Luxurious", "Cleansing", "Soothing", "Affordable", "Anti-Slip", "Modern", "Reliable", "High-Quality", "Practical", "Efficient", "Innovative", "Comfortable", "Fashionable", "Compact", "Organic", "Adjustable", "Portable", "Multifunctional",
  "Ergonomic", "Relaxing", "Essential", "Stylish", "Sustainable", "Durable"
]

// Get a random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Gets a random product
const generateProduct = () =>
  `${getRandomArrItem(productsList)}`;
 

  module.exports  ={generateProduct};
  