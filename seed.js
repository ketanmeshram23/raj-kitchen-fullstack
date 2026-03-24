/**
 * Seed script — populates MongoDB with the existing Raj Kitchen menu data
 * Run with: node seed.js
 */

require('dotenv').config();
const mongoose = require('mongoose');
const Category = require('./models/Category');
const Dish = require('./models/Dish');

const EXISTING_MENU = {
 'STARTERS': [
        { name: 'Hara Bhara Kabab', price: 410, priceDisplay: '₹ 410', name_mr: 'हरा भरा कबाब', suggestions: { 20: '3 Kg', 40: '5 kg', 50: '6 kg' }, isStarter: true },
        { name: 'Manchurian 65', price: 410, priceDisplay: '₹ 410', name_mr: 'मंचुरियन 65', suggestions: { 20: '3 Kg', 40: '5 kg', 50: '6 kg' }, isStarter: true },
        { name: 'Crispy Veg', price: 410, priceDisplay: '₹ 410', name_mr: 'क्रिस्पी व्हेज', suggestions: { 20: '3 Kg', 40: '5 kg', 50: '6 kg' }, isStarter: true },
        { name: 'Veg Manchow Soup', price: 310, priceDisplay: '₹ 310', name_mr: 'व्हेज मंचाउ सूप', suggestions: { 20: '3 Kg', 40: '5 kg', 50: '6 kg' }, isStarter: true },
        { name: 'Hot & Sour Soup', price: 310, priceDisplay: '₹ 310', name_mr: 'हॉट & साव सूप', suggestions: { 20: '3 Kg', 40: '5 kg', 50: '6 kg' }, isStarter: true }
    ],
    'ROTI / BREAD': [
        { name: 'Telachi Mothi Poli', price: 150, priceDisplay: '₹ 150', name_mr: 'तेलाची मोठी पोळी', suggestions: { 20: '3 Kg', 40: '5 kg', 50: '6 kg' } },
        { name: 'Fulka Roti', price: 160, priceDisplay: '₹ 160', name_mr: 'फुलका रोटी', suggestions: { 20: '3 Kg', 40: '5 kg', 50: '6 kg' } },
        { name: 'Ajwain Puri', price: 180, priceDisplay: '₹ 180', name_mr: 'अजवाइन पुरी', suggestions: { 20: '3 Kg', 40: '5 kg', 50: '6 kg' } },
        { name: 'Jawari Bhakri', price: 190, priceDisplay: '₹ 190', name_mr: 'ज्वारी भाकर', suggestions: { 20: '4 Kg', 40: '6 kg', 50: '7 kg' } }
    ],
    'RICE': [
        { name: 'Sadha Rice', price: 110, priceDisplay: '₹ 110', name_mr: 'साधा राईस', suggestions: { 20: '4 Kg', 40: '6 kg', 50: '7 kg' } },
        { name: 'Jeera Rice', price: 120, priceDisplay: '₹ 120', name_mr: 'जिरा राईस', suggestions: { 20: '4 Kg', 40: '6 kg', 50: '7 kg' } },
        { name: 'Garlic Rice', price: 130, priceDisplay: '₹ 130', name_mr: 'गार्लिक राईस', suggestions: { 20: '4 Kg', 40: '6 kg', 50: '7 kg' } },
        { name: 'Veg Pulav', price: 160, priceDisplay: '₹ 160', name_mr: 'व्हेज पुलाव', suggestions: { 20: '4 Kg', 40: '6 kg', 50: '7 kg' } },
        { name: 'Tawa Pulav', price: 260, priceDisplay: '₹ 260', name_mr: 'तवा पुलाव', suggestions: { 20: '4 Kg', 40: '6 kg', 50: '7 kg' } },
        { name: 'Veg Biryani', price: 270, priceDisplay: '₹ 270', name_mr: ' व्हेज बिर्याणी', suggestions: { 20: '4 Kg', 40: '6 kg', 50: '7 kg' } },
        { name: 'Masala Bhat', price: 170, priceDisplay: '₹ 170', name_mr: 'मसाला भात', suggestions: { 20: '4 Kg', 40: '6 kg', 50: '7 kg' } },
        { name: 'Moong Dal Khichdi', price: 160, priceDisplay: '₹ 160', name_mr: 'मूंग दाल खिचडी', suggestions: { 20: '4 Kg', 40: '6 kg', 50: '7 kg' } },
        { name: 'Toor Dal Khichdi', price: 180, priceDisplay: '₹ 180', name_mr: 'तुवर दाल खिचडी', suggestions: { 20: '4 Kg', 40: '6 kg', 50: '7 kg' } }
    ],
    'DAL': [
        { name: 'Sadhi Dal', price: 160, priceDisplay: '₹ 160', name_mr: 'साधी दाल', suggestions: { 20: '3 Kg', 40: '5 kg', 50: '6 kg' } },
        { name: 'Jeera Dal', price: 160, priceDisplay: '₹ 160', name_mr: 'जिरा दाल', suggestions: { 20: '3 Kg', 40: '5 kg', 50: '6 kg' } },
        { name: 'Dal Tadka', price: 160, priceDisplay: '₹ 160', name_mr: 'दाल तडका', suggestions: { 20: '3 Kg', 40: '5 kg', 50: '6 kg' } },
        { name: 'Dal Palak', price: 170, priceDisplay: '₹ 170', name_mr: 'दाल पालक', suggestions: { 20: '3 Kg', 40: '5 kg', 50: '6 kg' } }
    ],
    'VEG SABJI': [
        { name: 'Mix Veg Kolhapuri', price: 170, priceDisplay: '₹ 170', name_mr: 'मिक्स व्हेज कोल्हापुरी', suggestions: { 20: '3 Kg', 40: '5 kg', 50: '6 kg' } },
        { name: 'Bhendi Masala', price: 210, priceDisplay: '₹ 210', name_mr: 'भेंडी मसाला', suggestions: { 20: '3 Kg', 40: '5 kg', 50: '6 kg' } },
        { name: 'Fanus Curry (Seasonal)', price: 210, priceDisplay: '₹ 210', name_mr: 'फणस करी (ऋतुनुसार)', suggestions: { 20: '3 Kg', 40: '5 kg', 50: '6 kg' } },
        { name: 'Methi Matar Malai', price: 310, priceDisplay: '₹ 310', name_mr: 'मेथी मटर मलाई', suggestions: { 20: '3 Kg', 40: '5 kg', 50: '6 kg' } },
        { name: 'Veg Kofta Curry', price: 300, priceDisplay: '₹ 300', name_mr: 'व्हेज कोफता करी', suggestions: { 20: '3 Kg', 40: '5 kg', 50: '6 kg' } },
        { name: 'Malai Kofta', price: 310, priceDisplay: '₹ 310', name_mr: 'मलाई कोफता', suggestions: { 20: '3 Kg', 40: '5 kg', 50: '6 kg' } },
        { name: 'Chole Masala', price: 170, priceDisplay: '₹ 170', name_mr: 'छोले मसाला', suggestions: { 20: '3 Kg', 40: '5 kg', 50: '6 kg' } },
        { name: 'Aloo Chole', price: 170, priceDisplay: '₹ 170', name_mr: 'आलू छोले', suggestions: { 20: '3 Kg', 40: '5 kg', 50: '6 kg' } },
        { name: 'Dal Kanda', price: 190, priceDisplay: '₹ 190', name_mr: 'दाल कांडा', suggestions: { 20: '3 Kg', 40: '5 kg', 50: '6 kg' } },
        { name: 'Aloo Baingan', price: 160, priceDisplay: '₹ 160', name_mr: 'आलू बैंगन', suggestions: { 20: '3 Kg', 40: '5 kg', 50: '6 kg' } },
        { name: 'Baingan Masala', price: 160, priceDisplay: '₹ 160', name_mr: 'बैंगन मसाला', suggestions: { 20: '3 Kg', 40: '5 kg', 50: '6 kg' } },
        { name: 'Dum Aloo', price: 160, priceDisplay: '₹ 160', name_mr: 'दम आलू', suggestions: { 20: '3 Kg', 40: '5 kg', 50: '6 kg' } },
        { name: 'Aloo Gobi Matar', price: 160, priceDisplay: '₹ 160', name_mr: 'आलू गोभी मटर', suggestions: { 20: '3 Kg', 40: '5 kg', 50: '6 kg' } },
        { name: 'Veg Anda Curry', price: 190, priceDisplay: '₹ 190', name_mr: 'व्हेज अंडा करी', suggestions: { 20: '3 Kg', 40: '5 kg', 50: '6 kg' } },
        { name: 'Veg Keema Kasturi', price: 310, priceDisplay: '₹ 310', name_mr: 'व्हेज खीमा कस्तूरी', suggestions: { 20: '3 Kg', 40: '5 kg', 50: '6 kg' } },
        { name: 'Veg Keema Kaleji', price: 320, priceDisplay: '₹ 320', name_mr: 'व्हेज खीमा कलेजी', suggestions: { 20: '3 Kg', 40: '5 kg', 50: '6 kg' } },
        { name: 'Patwadi Rassa', price: 190, priceDisplay: '₹ 190', name_mr: 'पटवडी रस्सा', suggestions: { 20: '3 Kg', 40: '5 kg', 50: '6 kg' } },
        { name: 'Baingan Bharta', price: 190, priceDisplay: '₹ 190', name_mr: 'बैंगन भर्ता', suggestions: { 20: '3 Kg', 40: '5 kg', 50: '6 kg' } },
        { name: 'Zunka', price: 210, priceDisplay: '₹ 210', name_mr: 'जुनका', suggestions: { 20: '3 Kg', 40: '5 kg', 50: '6 kg' } }
    ],
    'PANEER SPECIAL': [
        { name: 'Paneer Butter Masala', price: 330, priceDisplay: '₹ 330', name_mr: 'पनीर बटर मसाला', suggestions: { 20: '3 Kg', 40: '5 kg', 50: '6 kg' } },
        { name: 'Matar Paneer', price: 330, priceDisplay: '₹ 330', name_mr: 'मटर पनीर', suggestions: { 20: '3 Kg', 40: '5 kg', 50: '6 kg' } },
        { name: 'Kadhai Paneer', price: 330, priceDisplay: '₹ 330', name_mr: 'कढाई पनीर', suggestions: { 20: '3 Kg', 40: '5 kg', 50: '6 kg' } },
        { name: 'Palak Paneer', price: 330, priceDisplay: '₹ 330', name_mr: 'पालक पनीर', suggestions: { 20: '3 Kg', 40: '5 kg', 50: '6 kg' } },
        { name: 'Lachha Paneer', price: 330, priceDisplay: '₹ 330', name_mr: 'लच्छा पनीर', suggestions: { 20: '3 Kg', 40: '5 kg', 50: '6 kg' } },
        { name: 'Paneer Kolhapuri', price: 400, priceDisplay: '₹ 400', name_mr: 'पनीर कोल्हापुरी', suggestions: { 20: '3 Kg', 40: '5 kg', 50: '6 kg' } }
    ],
    'NON-VEG SABJI': [
        { name: 'Mutton Saoji', price: 650, priceDisplay: '₹ 650', name_mr: 'मटण सावजी', suggestions: { 20: '8 Kg', 40: '15 kg', 50: '20 kg' } },
        { name: 'Mutton Masala', price: 700, priceDisplay: '₹ 700', name_mr: 'मटण मसाला', suggestions: { 20: '8 Kg', 40: '15 kg', 50: '20 kg' } },
        { name: 'Bhuna Mutton', price: 700, priceDisplay: '₹ 700', name_mr: 'भूना मटण', suggestions: { 20: '8 Kg', 40: '15 kg', 50: '20 kg' } },
        { name: 'Saoji Khur', price: 1000, priceDisplay: '₹ 1000', name_mr: 'सावजी खूर', suggestions: { 20: '8 Kg', 40: '15 kg', 50: '20 kg' } },
        { name: 'Keema Kaleji', price: 700, priceDisplay: '₹ 700', name_mr: 'खीमा कलेजी', suggestions: { 20: '8 Kg', 40: '15 kg', 50: '20 kg' } },
        { name: 'Chicken Saoji', price: 450, priceDisplay: '₹ 450', name_mr: 'चिकन सावजी', suggestions: { 20: '8 Kg', 40: '15 kg', 50: '20 kg' } },
        { name: 'Chicken Masala', price: 500, priceDisplay: '₹ 500', name_mr: 'चिकन मसाला', suggestions: { 20: '8 Kg', 40: '15 kg', 50: '20 kg' } },
        { name: 'Butter Chicken', price: 500, priceDisplay: '₹ 500', name_mr: 'बटर चिकन', suggestions: { 20: '8 Kg', 40: '15 kg', 50: '20 kg' } },
        { name: 'Chicken Tikka Masala', price: 500, priceDisplay: '₹ 500', name_mr: 'चिकन टिक्का मसाला', suggestions: { 20: '8 Kg', 40: '15 kg', 50: '20 kg' } },
        { name: 'Anda Curry', price: 200, priceDisplay: '₹ 200', name_mr: 'अंडा करी', suggestions: { 20: '8 Kg', 40: '15 kg', 50: '20 kg' } },
        { name: 'Anda Masala', price: 250, priceDisplay: '₹ 250', name_mr: 'अंडा मसाला', suggestions: { 20: '8 Kg', 40: '15 kg', 50: '20 kg' } }
    ],
       'CHINESE': [
        { name: 'Veg Noodles', price: 270, priceDisplay: '₹ 270', name_mr: 'व्हेज नूडल्स', suggestions: { 20: '3 Kg', 40: '5 kg', 50: '7 kg' } },
        { name: 'Veg Manchurian', price: 270, priceDisplay: '₹ 270', name_mr: 'व्हेज मंचुरियन', suggestions: { 20: '4 Kg', 40: '6 kg', 50: '8 kg' } }
        
    ],
    'SNACKS': [
        { name: 'Moong Pakoda', price: 190, priceDisplay: '₹ 190', name_mr: 'मूंग पकोडा', suggestions: { 20: '1 Kg', 40: '3 kg', 50: '4 kg' } },
        { name: 'Kande Bhaje', price: 170, priceDisplay: '₹ 170', name_mr: 'कांदे भाजे', suggestions: { 20: '1 Kg', 40: '3 kg', 50: '4 kg' } },
        { name: 'Mirchi Bhaje', price: 180, priceDisplay: '₹ 180', name_mr: 'मिरची भाजे', suggestions: { 20: '1 Kg', 40: '3 kg', 50: '4 kg' } },
        { name: 'Dahi Vada', price: 230, priceDisplay: '₹ 230', name_mr: 'दही वडा', suggestions: { 20: '3 Kg', 40: '5 kg', 50: '6 kg' } },
        { name: 'Aloo Bonda', price: 260, priceDisplay: '₹ 260', name_mr: 'आलू बोंडा', suggestions: { 20: '3 Kg', 40: '5 kg', 50: '6 kg' } },
        { name: 'Veg Cutlet', price: 270, priceDisplay: '₹ 270', name_mr: 'कटलेट', suggestions: { 20: '3 Kg', 40: '5 kg', 50: '6 kg' } },
        { name: 'Sambar Vadi', price: 300, priceDisplay: '₹ 300', name_mr: 'संभार वडी', suggestions: { 20: '3 Kg', 40: '5 kg', 50: '6 kg' } },
        { name: 'Fryums Papad', price: 170, priceDisplay: '₹ 170', name_mr: 'फ्राईम्स पापड', suggestions: { 20: '1 Kg', 40: '2 kg', 50: '4 kg' } }
    ],
    'CURD': [ 
        { name: 'Maharashtrian Kadhi', price: 110, priceDisplay: '₹ 110',name_mr: 'महाराष्ट्रीयन कढी', suggestions: { 20: '3 Kg', 40: '5 kg', 50: '6 kg' } },
        { name: 'Mattha', price: 130, priceDisplay: '₹ 130',name_mr: 'मठ्ठा', suggestions: { 20: '3 Kg', 40: '5 kg', 50: '6 kg' } },
        { name: 'Boondi Raita', price: 160, priceDisplay: '₹ 160',name_mr: 'बूंदी रायता', suggestions: { 20: '4 Kg', 40: '6 kg', 50: '8 kg' } }
    ],
    'SWEETS': [
        { name: 'Gulab Jamun', price: 8, priceDisplay: '₹ 8 / piece',name_mr: 'गुलाब जामून', suggestions: { 20: '20 Pcs', 40: '40 Pcs', 50: '50 Pcs' } },
        { name: 'Cham Cham', price: 8, priceDisplay: '₹ 8 / piece',name_mr: 'चम चम', suggestions: { 20: '20 Pcs', 40: '40 Pcs', 50: '50 Pcs' } },
        { name: 'Rasgulla', price: 8, priceDisplay: '₹ 8 / piece',name_mr: 'रसगुल्ला', suggestions: { 20: '20 Pcs', 40: '40 Pcs', 50: '50 Pcs' } },
        { name: 'Moong Dal Halwa', price: 360, priceDisplay: '₹ 360',name_mr: 'मूंग दाल हलवा', suggestions: { 20: '3 Kg', 40: '5 kg', 50: '6 kg' } },
        { name: 'Shrikhand', price: 260, priceDisplay: '₹ 260',name_mr: 'श्रीखंड', suggestions: { 20: '2 Kg', 40: '4 kg', 50: '5 kg' } },
        { name: 'Kheer', price: 260, priceDisplay: '₹ 260',name_mr: 'खीर', suggestions: { 20: '2 Kg', 40: '3 kg', 50: '5 kg' } },
        { name: 'Motichur Ladoo', price: 360, priceDisplay: '₹ 360',name_mr: 'मोतीचूर लाडू', suggestions: { 20: '2 Kg', 40: '3 kg', 50: '5 kg' } },
        { name: 'Besan Barfi', price: 280, priceDisplay: '₹ 280',name_mr: 'बेसन बर्फी', suggestions: { 20: '2 Kg', 40: '3 kg', 50: '5 kg' } },
        { name: 'Puran Poli', price: 240, priceDisplay: '₹ 240',name_mr: 'पूरण पोळी', suggestions: { 20: '3 Kg', 40: '5 kg', 50: '6 kg' } },
        { name: 'Khova Poli', price: 340, priceDisplay: '₹ 340',name_mr: 'खोवा पोळी', suggestions: { 20: '3 Kg', 40: '5 kg', 50: '6 kg' } }
    ],
    'SALADS & CHUTNEYS': [
        { name: 'Koshimbir', price: 160, priceDisplay: '₹ 160',name_mr: 'कोशिंबीर', suggestions: { 20: '3 Kg', 40: '5 kg', 50: '6 kg' } },
        { name: 'Green Salad', price: 180, priceDisplay: '₹ 180',name_mr: 'ग्रीन सलाद', suggestions: { 20: '3 Kg', 40: '5 kg', 50: '6 kg' } },
        { name: 'Dal Chutney', price: 120, priceDisplay: '₹ 120',name_mr: 'दाल चटणी', suggestions: { 20: '3 Kg', 40: '5 kg', 50: '6 kg' } },
        { name: 'Thecha', price: 310, priceDisplay: '₹ 310',name_mr: 'ठेचा', suggestions: { 20: '3 Kg', 40: '5 kg', 50: '6 kg' } }
    ]
};

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Category.deleteMany({});
    await Dish.deleteMany({});
    console.log('🗑️  Cleared existing data');

    let categoryOrder = 0;
    for (const [categoryName, dishes] of Object.entries(EXISTING_MENU)) {
      // Create category
      const category = await Category.create({
        name: categoryName,
        order: categoryOrder++,
      });
      console.log(`📁 Created category: ${categoryName}`);

      // Create dishes in this category
      let dishOrder = 0;
      for (const dish of dishes) {
        await Dish.create({
          name: dish.name,
          name_mr: dish.name_mr,
          price: dish.price,
          category_id: category._id,
          suggestions: dish.suggestions || { 20: '3 Kg', 40: '5 kg', 50: '6 kg' },
          order: dishOrder++,
        });
      }
      console.log(`  ✅ Added ${dishes.length} dishes`);
    }

    console.log('\n🎉 Database seeded successfully!');
    console.log('🚀 You can now start the server with: npm start');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error.message);
    process.exit(1);
  }
}

seed();
