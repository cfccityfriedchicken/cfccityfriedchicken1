
import { MenuItem } from './types';

export const menuData: MenuItem[] = [
  // Burgers & Sandwiches
  {
    id: 101,
    name: "Cheese Burger",
    description: "Juicy chicken patty topped with a slice of melted cheese and fresh veggies.",
    price: 350,
    category: "Burgers & Sandwiches",
    imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80",
    isSpicy: false
  },
  {
    id: 102,
    name: "Zinger Burger",
    description: "Crispy fried chicken fillet with lettuce and signature mayo in a sesame bun.",
    price: 350,
    category: "Burgers & Sandwiches",
    imageUrl: "https://images.unsplash.com/photo-1619250907572-56550598f555?w=800&q=80",
    isSpicy: true
  },
  {
    id: 103,
    name: "Chicken Patty Burger",
    description: "Classic chicken patty burger served with ketchup and mayo.",
    price: 280,
    category: "Burgers & Sandwiches",
    imageUrl: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=800&q=80",
    isSpicy: false
  },
  {
    id: 104,
    name: "Zinger Tower Burger",
    description: "Double the crunch with a zinger fillet and an extra hash brown patty.",
    price: 450,
    category: "Burgers & Sandwiches",
    imageUrl: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=800&q=80",
    isSpicy: true
  },
  {
    id: 105,
    name: "Student Burger",
    description: "Budget-friendly delicious burger perfect for a quick snack.",
    price: 170,
    category: "Burgers & Sandwiches",
    imageUrl: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&q=80",
    isSpicy: false
  },
  {
    id: 106,
    name: "Grill Burger",
    description: "Smoky grilled chicken patty with special BBQ sauce.",
    price: 350,
    category: "Burgers & Sandwiches",
    imageUrl: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=800&q=80",
    isSpicy: true
  },
  {
    id: 107,
    name: "Cheese Patty Burger",
    description: "Thick patty oozing with cheese for the ultimate cheesy experience.",
    price: 450,
    category: "Burgers & Sandwiches",
    imageUrl: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&q=80",
    isSpicy: false
  },
  {
    id: 108,
    name: "Crispy Burger",
    description: "Extra crispy coating on a tender chicken fillet.",
    price: 350,
    category: "Burgers & Sandwiches",
    imageUrl: "https://images.unsplash.com/photo-1610440042657-612c34d95e9f?w=800&q=80",
    isSpicy: true
  },
  {
    id: 109,
    name: "Grill Sandwich",
    description: "Toasted sandwich filled with grilled chicken chunks and veggies.",
    price: 450,
    category: "Burgers & Sandwiches",
    imageUrl: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800&q=80",
    isSpicy: false
  },
  {
    id: 110,
    name: "Special Pizza Sandwich",
    description: "The best of both worlds: Sandwich filled with pizza toppings and cheese.",
    price: 550,
    category: "Burgers & Sandwiches",
    imageUrl: "https://images.unsplash.com/photo-1559466273-d95e72debaf8?w=800&q=80",
    isSpicy: true
  },
  {
    id: 111,
    name: "Zinger Sandwich",
    description: "Crispy zinger fillet inside a club sandwich setup.",
    price: 450,
    category: "Burgers & Sandwiches",
    imageUrl: "https://images.unsplash.com/photo-1481070414801-51fd732d7184?w=800&q=80",
    isSpicy: true
  },
  {
    id: 112,
    name: "Club Sandwich",
    description: "Traditional club sandwich with egg, chicken, and mayo.",
    price: 200,
    category: "Burgers & Sandwiches",
    imageUrl: "https://images.unsplash.com/photo-1567234669003-dce7a7a88821?w=800&q=80",
    isSpicy: false
  },

  // Pizza
  {
    id: 10,
    name: "Chicken Fajita",
    description: "Spicy fajita chicken, capsicum, onions, and cheese on a crispy crust.",
    price: 600,
    category: "Pizza",
    imageUrl: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=800&q=80",
    isSpicy: true
  },
  {
    id: 11,
    name: "Tikka B.B.Q.",
    description: "Classic desi flavor with tikka chunks, onions, and loads of mozzarella.",
    price: 600,
    category: "Pizza",
    imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80",
    isSpicy: true
  },
  {
    id: 12,
    name: "Chicken Supreme",
    description: "Loaded with chicken, sausages, mushrooms, olives, and peppers.",
    price: 600,
    category: "Pizza",
    imageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80",
    isSpicy: false
  },
  {
    id: 13,
    name: "Hot & Spicy",
    description: "A fiery combination of hot chicken chunks, jalapenos, and chili flakes.",
    price: 600,
    category: "Pizza",
    imageUrl: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=800&q=80",
    isSpicy: true
  },
  {
    id: 14,
    name: "Vegetable Delight",
    description: "Fresh tomatoes, mushrooms, onions, capsicum, and black olives.",
    price: 600,
    category: "Pizza",
    imageUrl: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&q=80",
    isSpicy: false
  },

  // Royal Premium Flavors Pizza
  {
    id: 201,
    name: "Malai Boti Pizza",
    description: "Creamy malai boti pieces with special white sauce, onions and mozzarella cheese.",
    price: 600,
    category: "Royal Premium Flavors Pizza",
    imageUrl: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=800&q=80",
    isSpicy: false
  },
  {
    id: 202,
    name: "Behari Kabab Pizza",
    description: "Special Behari kabab chunks with traditional spices and lots of cheese.",
    price: 600,
    category: "Royal Premium Flavors Pizza",
    imageUrl: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=800&q=80",
    isSpicy: true
  },
  {
    id: 203,
    name: "CFC Special",
    description: "Our chef's special combination of chicken, sausages, veggies and secret sauce.",
    price: 600,
    category: "Royal Premium Flavors Pizza",
    imageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80",
    isSpicy: true
  },

  // Kabab Stuffer
  {
    id: 301,
    name: "Kabab Stuffer",
    description: "Signature crust stuffed with seekh kabab, cheese, and veggies.",
    price: 1050,
    category: "Kabab Stuffer",
    imageUrl: "https://images.unsplash.com/photo-1603189989999-4b1c9c8568b3?w=800&q=80",
    isSpicy: true
  },
  {
    id: 302,
    name: "Cheese Stuffer",
    description: "Overflowing with liquid cheese and herbs for the ultimate cheese lover.",
    price: 1050,
    category: "Kabab Stuffer",
    imageUrl: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&q=80",
    isSpicy: false
  },
  {
    id: 303,
    name: "King Stuffer",
    description: "The king of stuffers with double meat, double cheese, and veggies.",
    price: 1050,
    category: "Kabab Stuffer",
    imageUrl: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=800&q=80",
    isSpicy: true
  },
  {
    id: 304,
    name: "Royal Crust Pizza",
    description: "Royal flavors with a specialized crust stuffed with goodness.",
    price: 1050,
    category: "Kabab Stuffer",
    imageUrl: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=800&q=80",
    isSpicy: true
  },
  {
    id: 305,
    name: "Diamond Crust Pizza",
    description: "Premium diamond crust loaded with toppings to the edge.",
    price: 1050,
    category: "Kabab Stuffer",
    imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80",
    isSpicy: true
  },

  // Pasta
  {
    id: 401,
    name: "CFC Special Pasta",
    description: "Our signature pasta tossed in a secret special sauce with chicken and veggies.",
    price: 400,
    category: "Pasta",
    imageUrl: "https://images.unsplash.com/photo-1626844131082-256783844137?w=800&q=80",
    isSpicy: true
  },
  {
    id: 402,
    name: "Creamy Pasta",
    description: "Rich and creamy white sauce pasta with tender chicken chunks.",
    price: 450,
    category: "Pasta",
    imageUrl: "https://images.unsplash.com/photo-1645112411341-6c4fd023882c?w=800&q=80",
    isSpicy: false
  },
  {
    id: 403,
    name: "Crunchy Pasta",
    description: "Baked pasta topped with a crispy, crunchy layer of cheese and chicken.",
    price: 450,
    category: "Pasta",
    imageUrl: "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=800&q=80",
    isSpicy: true
  },

  // Starters, Fried & Rolls
  {
    id: 501,
    name: "Chicken Hot Short (10 pcs)",
    description: "Bite-sized spicy popcorn chicken pieces.",
    price: 320,
    category: "Starters, Fried & Rolls",
    imageUrl: "https://images.unsplash.com/photo-1626082927389-d318477be432?w=800&q=80",
    isSpicy: true
  },
  {
    id: 502,
    name: "Oven Baked Wings (5 pcs)",
    description: "Juicy wings baked to perfection for a healthier option.",
    price: 300,
    category: "Starters, Fried & Rolls",
    imageUrl: "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?w=800&q=80",
    isSpicy: false
  },
  {
    id: 503,
    name: "Chicken Hot Wings (5 pcs)",
    description: "Crispy fried wings tossed in hot and spicy sauce.",
    price: 300,
    category: "Starters, Fried & Rolls",
    imageUrl: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=800&q=80",
    isSpicy: true
  },
  {
    id: 504,
    name: "Nuggets (5 pcs)",
    description: "Golden crispy chicken nuggets, perfect for snacking.",
    price: 300,
    category: "Starters, Fried & Rolls",
    imageUrl: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&q=80",
    isSpicy: false
  },
  {
    id: 505,
    name: "Peri Peri Wings (5 pcs)",
    description: "Grilled wings glazed with special Peri Peri sauce.",
    price: 300,
    category: "Starters, Fried & Rolls",
    imageUrl: "https://images.unsplash.com/photo-1520072959219-c595dc3f3a2a?w=800&q=80",
    isSpicy: true
  },
  {
    id: 506,
    name: "Crispy Legs (3 pcs)",
    description: "Crunchy fried chicken drumsticks.",
    price: 400,
    category: "Starters, Fried & Rolls",
    imageUrl: "https://images.unsplash.com/photo-1513639776629-9269d052130d?w=800&q=80",
    isSpicy: false
  },
  {
    id: 507,
    name: "Cheesy Sticks (4 pcs)",
    description: "Mozzarella sticks fried to golden perfection.",
    price: 400,
    category: "Starters, Fried & Rolls",
    imageUrl: "https://images.unsplash.com/photo-1531749668029-2db88e4276c7?w=800&q=80",
    isSpicy: false
  },
  {
    id: 508,
    name: "French Fries",
    description: "Classic salted crispy fries.",
    price: 300,
    category: "Starters, Fried & Rolls",
    imageUrl: "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=800&q=80",
    isSpicy: false
  },
  {
    id: 509,
    name: "Mayo Fries Special",
    description: "Crispy fries topped with our signature mayo sauce.",
    price: 300,
    category: "Starters, Fried & Rolls",
    imageUrl: "https://images.unsplash.com/photo-1585109649139-3668018951a7?w=800&q=80",
    isSpicy: false
  },
  {
    id: 510,
    name: "Loaded Pizza Fries",
    description: "Fries topped with cheese, chicken chunks, and pizza sauce.",
    price: 300,
    category: "Starters, Fried & Rolls",
    imageUrl: "https://images.unsplash.com/photo-1585109649139-3668018951a7?w=800&q=80",
    isSpicy: true
  },
  // New Starters & Rolls Items
  {
    id: 511,
    name: "Zinger Shawarma",
    description: "Crispy zinger chicken chunks wrapped in pita bread with sauces.",
    price: 300,
    category: "Starters, Fried & Rolls",
    imageUrl: "https://images.unsplash.com/photo-1633321769407-5360d7fd56ae?w=800&q=80",
    isSpicy: true
  },
  {
    id: 512,
    name: "Zinger Paratha Roll",
    description: "Crispy zinger chicken rolled in a crispy paratha with mayo and chutney.",
    price: 380,
    category: "Starters, Fried & Rolls",
    imageUrl: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=800&q=80",
    isSpicy: true
  },
  {
    id: 513,
    name: "Paratha Roll",
    description: "Classic chicken paratha roll with onions and chutney.",
    price: 280,
    category: "Starters, Fried & Rolls",
    imageUrl: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=800&q=80",
    isSpicy: false
  },
  {
    id: 514,
    name: "Kabab Paratha Roll",
    description: "Seekh kabab rolled in paratha with spicy chutney.",
    price: 350,
    category: "Starters, Fried & Rolls",
    imageUrl: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&q=80",
    isSpicy: true
  },
  {
    id: 515,
    name: "Chicken Shawarma",
    description: "Classic middle-eastern style chicken shawarma.",
    price: 200,
    category: "Starters, Fried & Rolls",
    imageUrl: "https://images.unsplash.com/photo-1529006557810-27448b22ce5e?w=800&q=80",
    isSpicy: false
  },
  {
    id: 516,
    name: "Malai Boti Shawarma",
    description: "Creamy malai boti chunks wrapped in soft pita.",
    price: 250,
    category: "Starters, Fried & Rolls",
    imageUrl: "https://images.unsplash.com/photo-1561651881-d66143808660?w=800&q=80",
    isSpicy: false
  },
  {
    id: 517,
    name: "Kabab Shawarma",
    description: "Spicy seekh kabab wrapped in fresh pita bread.",
    price: 250,
    category: "Starters, Fried & Rolls",
    imageUrl: "https://images.unsplash.com/photo-1585238342024-78d387f4a707?w=800&q=80",
    isSpicy: true
  },

  // Ice Cream
  {
    id: 60,
    name: "Kulfa Ice Cream",
    description: "Traditional Kulfa flavor, creamy and rich.",
    price: 120,
    category: "Ice Cream",
    imageUrl: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=800&q=80",
    isSpicy: false
  },
  {
    id: 61,
    name: "Mango Ice Cream",
    description: "Refreshing taste of real mangoes in every scoop.",
    price: 120,
    category: "Ice Cream",
    imageUrl: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&q=80",
    isSpicy: false
  },
  {
    id: 62,
    name: "Pista Ice Cream",
    description: "Nutty pistachio flavor loaded with crushed pistas.",
    price: 120,
    category: "Ice Cream",
    imageUrl: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&q=80",
    isSpicy: false
  },
  {
    id: 63,
    name: "Chocolate Ice Cream",
    description: "Decadent dark chocolate creamy scoops.",
    price: 120,
    category: "Ice Cream",
    imageUrl: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&q=80",
    isSpicy: false
  },
  {
    id: 64,
    name: "Strawberry Ice Cream",
    description: "Sweet and tangy strawberry delight.",
    price: 120,
    category: "Ice Cream",
    imageUrl: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800&q=80",
    isSpicy: false
  },

  // Deals
  {
    id: 701,
    name: "Deal 01",
    description: "1 Medium Pizza, 5 Nuggets, 1 Full Fries, 1 Liter Drink",
    price: 1600,
    category: "Deals",
    imageUrl: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=800&q=80",
    isSpicy: false
  },
  {
    id: 702,
    name: "Deal 02",
    description: "1 Large Pizza, 10 Hot Wings, 1 Full Fries, 1 x 1.5 Liter Drink",
    price: 2200,
    category: "Deals",
    imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80",
    isSpicy: true
  },
  {
    id: 703,
    name: "Deal 03",
    description: "1 Medium Pizza, 2 Zinger Burgers, 1 Full Fries, 1 Liter Drink",
    price: 1800,
    category: "Deals",
    imageUrl: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=800&q=80",
    isSpicy: true
  },
  {
    id: 704,
    name: "Deal 04",
    description: "2 Large Pizzas, 1 x 1.5 Liter Drink",
    price: 2800,
    category: "Deals",
    imageUrl: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=800&q=80",
    isSpicy: false
  },
  {
    id: 705,
    name: "Deal 05",
    description: "1 Large Pizza, 1 F2 Pasta, 1 x 1.5 Liter Drink",
    price: 2100,
    category: "Deals",
    imageUrl: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=800&q=80",
    isSpicy: false
  },
  {
    id: 706,
    name: "Deal 06",
    description: "1 Large Pizza, 5 Zinger Burgers, 1 x 1.5 Liter Drink",
    price: 3100,
    category: "Deals",
    imageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80",
    isSpicy: true
  },
  {
    id: 707,
    name: "Deal 07",
    description: "5 Zinger Burgers, 1 x 1.5 Liter Drink",
    price: 1700,
    category: "Deals",
    imageUrl: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=800&q=80",
    isSpicy: true
  },
  {
    id: 708,
    name: "Deal 08",
    description: "1 Zinger Burger, 1 Fries, 1 x 500ml Drink",
    price: 450,
    category: "Deals",
    imageUrl: "https://images.unsplash.com/photo-1594007773226-75666ec2d021?w=800&q=80",
    isSpicy: true
  },
  {
    id: 709,
    name: "Deal 09",
    description: "3 Zinger Burgers, 10 Pc Hot Wings, 1 x 1.5 Liter Drink",
    price: 1700,
    category: "Deals",
    imageUrl: "https://images.unsplash.com/photo-1626082927389-d318477be432?w=800&q=80",
    isSpicy: true
  },
  {
    id: 710,
    name: "Deal 10",
    description: "1 Tikka B.B.Q XL Pizza, 1 Loaded Pizza Fries, 1 x 1.5 Liter Drink",
    price: 2100,
    category: "Deals",
    imageUrl: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&q=80",
    isSpicy: true
  },
  {
    id: 711,
    name: "Deal 11",
    description: "5 Chicken Shawarma, 5 Student Burgers, 1 x 2.25 Liter Drink",
    price: 1950,
    category: "Deals",
    imageUrl: "https://images.unsplash.com/photo-1561651881-d66143808660?w=800&q=80",
    isSpicy: false
  },
  {
    id: 712,
    name: "Deal 12",
    description: "4 Small Pizzas, 1 x 2.25 Liter Drink",
    price: 2500,
    category: "Deals",
    imageUrl: "https://images.unsplash.com/photo-1571407970349-bc1671709de5?w=800&q=80",
    isSpicy: false
  }
];
