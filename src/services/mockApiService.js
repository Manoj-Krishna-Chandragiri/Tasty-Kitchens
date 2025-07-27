// Mock API service for development when external APIs have CORS issues
export const mockApiService = {
  // Mock login API
  login: async (username, password) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Valid credentials - Fixed login issue and added Manoj user
    const validCredentials = [
      { username: 'rahul', password: 'rahul@2021' },
      { username: 'henry', password: 'henry_the_developer' },
      { username: 'manoj', password: 'Manoj@123' },
    ];
    
    const isValid = validCredentials.some(
      cred => cred.username === username && cred.password === password
    );
    
    if (isValid) {
      return {
        ok: true,
        data: {
          jwt_token: 'mock_jwt_token_' + username + '_' + Date.now(),
        },
      };
    } else {
      return {
        ok: false,
        data: {
          error_msg: 'Invalid username or password',
        },
      };
    }
  },

  // Mock offers API
  getOffers: async () => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return {
      ok: true,
      data: {
        offers: [
          {
            id: 1,
            image_url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=300&fit=crop&crop=center',
          },
          {
            id: 2,
            image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=600&h=300&fit=crop&crop=center',
          },
          {
            id: 3,
            image_url: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=600&h=300&fit=crop&crop=center',
          },
        ],
      },
    };
  },

  // Mock restaurants API
  getRestaurants: async (offset = 0, limit = 9, sortBy = 'Lowest') => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const allRestaurants = [
      {
        id: '2200',
        name: 'Paradise Restaurant',
        cuisine: 'Indian, Hyderabadi Biryani',
        image_url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop&crop=center',
        user_rating: {
          rating: 4.7,
          total_reviews: 2456,
        },
      },
      {
        id: '2201',
        name: 'Biryani House',
        cuisine: 'Indian, Biryani, Mughlai',
        image_url: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop&crop=center',
        user_rating: {
          rating: 4.5,
          total_reviews: 1834,
        },
      },
      {
        id: '2202',
        name: 'Punjabi Dhaba',
        cuisine: 'North Indian, Punjabi',
        image_url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop&crop=center',
        user_rating: {
          rating: 4.4,
          total_reviews: 1245,
        },
      },
      {
        id: '2203',
        name: 'South Indian Express',
        cuisine: 'South Indian, Traditional',
        image_url: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&h=300&fit=crop&crop=center',
        user_rating: {
          rating: 4.6,
          total_reviews: 987,
        },
      },
      {
        id: '2204',
        name: 'Domino\'s Pizza',
        cuisine: 'Italian, Pizza, Fast Food',
        image_url: 'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=400&h=300&fit=crop&crop=center',
        user_rating: {
          rating: 4.2,
          total_reviews: 1567,
        },
      },
      {
        id: '2205',
        name: 'KFC',
        cuisine: 'American, Fried Chicken',
        image_url: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop&crop=center',
        user_rating: {
          rating: 4.1,
          total_reviews: 1890,
        },
      },
      {
        id: '2206',
        name: 'McDonald\'s',
        cuisine: 'American, Burgers, Fast Food',
        image_url: 'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=400&h=300&fit=crop&crop=center',
        user_rating: {
          rating: 4.3,
          total_reviews: 2134,
        },
      },
      {
        id: '2207',
        name: 'Burger King',
        cuisine: 'American, Burgers',
        image_url: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop&crop=center',
        user_rating: {
          rating: 4.0,
          total_reviews: 1456,
        },
      },
      {
        id: '2208',
        name: 'Taco Bell',
        cuisine: 'Mexican, Fast Food',
        image_url: 'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?w=400&h=300&fit=crop&crop=center',
        user_rating: {
          rating: 3.9,
          total_reviews: 876,
        },
      },
      {
        id: '2209',
        name: 'Haldiram\'s',
        cuisine: 'Indian, Sweets, Snacks',
        image_url: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop&crop=center',
        user_rating: {
          rating: 4.3,
          total_reviews: 1234,
        },
      },
      {
        id: '2210',
        name: 'Barbeque Nation',
        cuisine: 'Indian, Barbeque, Buffet',
        image_url: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=400&h=300&fit=crop&crop=center',
        user_rating: {
          rating: 4.4,
          total_reviews: 945,
        },
      },
      {
        id: '2211',
        name: 'Subway',
        cuisine: 'American, Sandwiches, Healthy',
        image_url: 'https://images.unsplash.com/photo-1539252554453-80ab65ce3586?w=400&h=300&fit=crop&crop=center',
        user_rating: {
          rating: 4.1,
          total_reviews: 1167,
        },
      },
      {
        id: '2212',
        name: 'Andhra Spice Kitchen',
        cuisine: 'Andhra Pradesh, South Indian, Spicy',
        image_url: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&h=300&fit=crop&crop=center',
        user_rating: {
          rating: 4.6,
          total_reviews: 1892,
        },
      },
      {
        id: '2213',
        name: 'Tamil Traditional Mess',
        cuisine: 'Tamil Nadu, South Indian, Traditional',
        image_url: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&h=300&fit=crop&crop=center',
        user_rating: {
          rating: 4.5,
          total_reviews: 1456,
        },
      },
    ];

    // Sort restaurants based on sortBy parameter
    const sortedRestaurants = [...allRestaurants].sort((a, b) => {
      switch (sortBy) {
        case 'Highest':
          return b.user_rating.rating - a.user_rating.rating;
        case 'Lowest':
          return a.user_rating.rating - b.user_rating.rating;
        case 'A-Z':
          return a.name.localeCompare(b.name);
        case 'Z-A':
          return b.name.localeCompare(a.name);
        case 'Rating (High to Low)':
          return b.user_rating.rating - a.user_rating.rating;
        case 'Rating (Low to High)':
          return a.user_rating.rating - b.user_rating.rating;
        case 'Most Reviews':
          return b.user_rating.total_reviews - a.user_rating.total_reviews;
        case 'Least Reviews':
          return a.user_rating.total_reviews - b.user_rating.total_reviews;
        default:
          return a.user_rating.rating - b.user_rating.rating;
      }
    });

    // Apply pagination
    const restaurants = sortedRestaurants.slice(offset, offset + limit);
    
    return {
      ok: true,
      data: {
        restaurants,
        total: allRestaurants.length,
      },
    };
  },

  // Mock restaurant details API
  getRestaurantDetails: async (restaurantId) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const restaurantDetails = {
      '2200': {
        id: '2200',
        name: 'Paradise Restaurant',
        cuisine: 'Indian, Hyderabadi Biryani',
        image_url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop&crop=center',
        location: 'Secunderabad, Hyderabad',
        rating: 4.7,
        reviews_count: 2456,
        food_items: [
          {
            id: 'f1',
            name: 'Hyderabadi Chicken Biryani',
            cost: 399.99,
            image_url: 'https://images.unsplash.com/photo-1563379091339-03246963d25f?w=400&h=300&fit=crop&crop=center',
            rating: 4.8,
          },
          {
            id: 'f2',
            name: 'Mutton Biryani',
            cost: 459.99,
            image_url: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&h=300&fit=crop&crop=center',
            rating: 4.7,
          },
          {
            id: 'f3',
            name: 'Chicken 65',
            cost: 299.99,
            image_url: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&h=300&fit=crop&crop=center',
            rating: 4.5,
          },
          {
            id: 'f4',
            name: 'Haleem',
            cost: 199.99,
            image_url: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop&crop=center',
            rating: 4.6,
          },
          {
            id: 'f5',
            name: 'Kebab Platter',
            cost: 549.99,
            image_url: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=400&h=300&fit=crop&crop=center',
            rating: 4.4,
          },
        ],
      },
      '2201': {
        id: '2201',
        name: 'Biryani House',
        cuisine: 'Indian, Biryani, Mughlai',
        image_url: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop&crop=center',
        location: 'Old City, Hyderabad',
        rating: 4.5,
        reviews_count: 1834,
        food_items: [
          {
            id: 'f6',
            name: 'Special Chicken Biryani',
            cost: 349.99,
            image_url: 'https://healux.in/wp-content/uploads/2020/11/ChickenBiryani.jpg',
            rating: 4.6,
          },
          {
            id: 'f7',
            name: 'Veg Biryani',
            cost: 249.99,
            image_url: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop&crop=center',
            rating: 4.3,
          },
          {
            id: 'f8',
            name: 'Butter Chicken',
            cost: 329.99,
            image_url: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=400&h=300&fit=crop&crop=center',
            rating: 4.5,
          },
          {
            id: 'f9',
            name: 'Tandoori Chicken',
            cost: 399.99,
            image_url: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&h=300&fit=crop&crop=center',
            rating: 4.4,
          },
        ],
      },
      '2202': {
        id: '2202',
        name: 'Punjabi Dhaba',
        cuisine: 'North Indian, Punjabi',
        image_url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop&crop=center',
        location: 'Punjagutta, Hyderabad',
        rating: 4.4,
        reviews_count: 1245,
        food_items: [
          {
            id: 'f10',
            name: 'Dal Makhani',
            cost: 199.99,
            image_url: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop&crop=center',
            rating: 4.5,
          },
          {
            id: 'f11',
            name: 'Paneer Butter Masala',
            cost: 249.99,
            image_url: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop&crop=center',
            rating: 4.3,
          },
          {
            id: 'f12',
            name: 'Roti with Curry',
            cost: 159.99,
            image_url: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop&crop=center',
            rating: 4.2,
          },
          {
            id: 'f13',
            name: 'Chole Bhature',
            cost: 179.99,
            image_url: 'https://www.yumcurry.com/wp-content/uploads/2021/08/chole-bhature.jpg',
            rating: 4.4,
          },
        ],
      },
      '2203': {
        id: '2203',
        name: 'South Indian Express',
        cuisine: 'South Indian, Traditional',
        image_url: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&h=300&fit=crop&crop=center',
        location: 'Kondapur, Hyderabad',
        rating: 4.6,
        reviews_count: 987,
        food_items: [
          {
            id: 'f14',
            name: 'Masala Dosa',
            cost: 99.99,
            image_url: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&h=300&fit=crop&crop=center',
            rating: 4.5,
          },
          {
            id: 'f15',
            name: 'Idli Sambar',
            cost: 79.99,
            image_url: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&h=300&fit=crop&crop=center',
            rating: 4.4,
          },
          {
            id: 'f16',
            name: 'Uttapam',
            cost: 119.99,
            image_url: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&h=300&fit=crop&crop=center',
            rating: 4.3,
          },
          {
            id: 'f17',
            name: 'Vada',
            cost: 59.99,
            image_url: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&h=300&fit=crop&crop=center',
            rating: 4.2,
          },
          {
            id: 'f18',
            name: 'Filter Coffee',
            cost: 39.99,
            image_url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop&crop=center',
            rating: 4.6,
          },
        ],
      },
      '2204': {
        id: '2204',
        name: 'Domino\'s Pizza',
        cuisine: 'Italian, Pizza, Fast Food',
        image_url: 'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=400&h=300&fit=crop&crop=center',
        location: 'Gachibowli, Hyderabad',
        rating: 4.2,
        reviews_count: 1567,
        food_items: [
          {
            id: 'f19',
            name: 'Margherita Pizza',
            cost: 299.99,
            image_url: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop&crop=center',
            rating: 4.3,
          },
          {
            id: 'f20',
            name: 'Pepperoni Pizza',
            cost: 399.99,
            image_url: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=300&fit=crop&crop=center',
            rating: 4.4,
          },
          {
            id: 'f21',
            name: 'Chicken Supreme',
            cost: 459.99,
            image_url: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop&crop=center',
            rating: 4.2,
          },
          {
            id: 'f22',
            name: 'Garlic Bread',
            cost: 149.99,
            image_url: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=400&h=300&fit=crop&crop=center',
            rating: 4.1,
          },
        ],
      },
      '2205': {
        id: '2205',
        name: 'KFC',
        cuisine: 'American, Fried Chicken',
        image_url: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop&crop=center',
        location: 'Banjara Hills, Hyderabad',
        rating: 4.1,
        reviews_count: 1890,
        food_items: [
          {
            id: 'f23',
            name: 'Original Recipe Chicken (8 pcs)',
            cost: 449.99,
            image_url: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=400&h=300&fit=crop&crop=center',
            rating: 4.3,
          },
          {
            id: 'f24',
            name: 'Hot & Crispy Chicken (6 pcs)',
            cost: 399.99,
            image_url: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop&crop=center',
            rating: 4.2,
          },
          {
            id: 'f25',
            name: 'Zinger Burger',
            cost: 189.99,
            image_url: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop&crop=center',
            rating: 4.4,
          },
          {
            id: 'f26',
            name: 'Chicken Popcorn Large',
            cost: 249.99,
            image_url: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=400&h=300&fit=crop&crop=center',
            rating: 4.1,
          },
          {
            id: 'f83',
            name: 'KFC Bucket (12 pcs)',
            cost: 649.99,
            image_url: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop&crop=center',
            rating: 4.5,
          },
          {
            id: 'f84',
            name: 'Colonel\'s Burger',
            cost: 169.99,
            image_url: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400&h=300&fit=crop&crop=center',
            rating: 4.0,
          },
          {
            id: 'f85',
            name: 'Chicken Wings (6 pcs)',
            cost: 279.99,
            image_url: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop&crop=center',
            rating: 4.3,
          },
          {
            id: 'f86',
            name: 'Coleslaw Regular',
            cost: 89.99,
            image_url: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop&crop=center',
            rating: 3.9,
          },
          {
            id: 'f87',
            name: 'French Fries Large',
            cost: 119.99,
            image_url: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&h=300&fit=crop&crop=center',
            rating: 4.0,
          },
          {
            id: 'f88',
            name: 'Krushems Oreo',
            cost: 149.99,
            image_url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&crop=center',
            rating: 4.2,
          },
        ],
      },
      '2206': {
        id: '2206',
        name: 'McDonald\'s',
        cuisine: 'American, Burgers, Fast Food',
        image_url: 'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=400&h=300&fit=crop&crop=center',
        location: 'Banjara Hills, Hyderabad',
        rating: 4.3,
        reviews_count: 2134,
        food_items: [
          {
            id: 'f27',
            name: 'Big Mac',
            cost: 249.99,
            image_url: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=400&h=300&fit=crop&crop=center',
            rating: 4.4,
          },
          {
            id: 'f28',
            name: 'Quarter Pounder',
            cost: 279.99,
            image_url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop&crop=center',
            rating: 4.3,
          },
          {
            id: 'f29',
            name: 'Chicken McNuggets',
            cost: 189.99,
            image_url: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=400&h=300&fit=crop&crop=center',
            rating: 4.2,
          },
          {
            id: 'f30',
            name: 'McFlurry Oreo',
            cost: 129.99,
            image_url: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop&crop=center',
            rating: 4.5,
          },
          {
            id: 'f31',
            name: 'French Fries Large',
            cost: 99.99,
            image_url: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&h=300&fit=crop&crop=center',
            rating: 4.1,
          },
          {
            id: 'f32',
            name: 'Apple Pie',
            cost: 59.99,
            image_url: 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=400&h=300&fit=crop&crop=center',
            rating: 4.0,
          },
        ],
      },
      '2207': {
        id: '2207',
        name: 'Burger King',
        cuisine: 'American, Burgers',
        image_url: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop&crop=center',
        location: 'Hitec City, Hyderabad',
        rating: 4.0,
        reviews_count: 1456,
        food_items: [
          {
            id: 'f33',
            name: 'Whopper',
            cost: 269.99,
            image_url: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400&h=300&fit=crop&crop=center',
            rating: 4.3,
          },
          {
            id: 'f34',
            name: 'Chicken Royale',
            cost: 229.99,
            image_url: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop&crop=center',
            rating: 4.1,
          },
          {
            id: 'f35',
            name: 'Crispy Chicken',
            cost: 199.99,
            image_url: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop&crop=center',
            rating: 4.0,
          },
          {
            id: 'f36',
            name: 'Onion Rings',
            cost: 119.99,
            image_url: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&h=300&fit=crop&crop=center',
            rating: 3.9,
          },
          {
            id: 'f37',
            name: 'Chocolate Thick Shake',
            cost: 149.99,
            image_url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&crop=center',
            rating: 4.2,
          },
        ],
      },
      '2208': {
        id: '2208',
        name: 'Taco Bell',
        cuisine: 'Mexican, Fast Food',
        image_url: 'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?w=400&h=300&fit=crop&crop=center',
        location: 'Jubilee Hills, Hyderabad',
        rating: 3.9,
        reviews_count: 876,
        food_items: [
          {
            id: 'f38',
            name: 'Crunchy Taco Supreme',
            cost: 149.99,
            image_url: 'https://images.unsplash.com/photo-1613514785940-daed07799d9b?w=400&h=300&fit=crop&crop=center',
            rating: 4.1,
          },
          {
            id: 'f39',
            name: 'Burrito Bowl',
            cost: 219.99,
            image_url: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&h=300&fit=crop&crop=center',
            rating: 4.0,
          },
          {
            id: 'f40',
            name: 'Quesadilla Chicken',
            cost: 189.99,
            image_url: 'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?w=400&h=300&fit=crop&crop=center',
            rating: 3.9,
          },
          {
            id: 'f41',
            name: 'Nachos Supreme',
            cost: 169.99,
            image_url: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=400&h=300&fit=crop&crop=center',
            rating: 3.8,
          },
          {
            id: 'f42',
            name: 'Mexican Rice Bowl',
            cost: 199.99,
            image_url: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&h=300&fit=crop&crop=center',
            rating: 4.0,
          },
        ],
      },
      '2209': {
        id: '2209',
        name: 'Haldiram\'s',
        cuisine: 'Indian, Sweets, Snacks',
        image_url: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop&crop=center',
        location: 'Ameerpet, Hyderabad',
        rating: 4.3,
        reviews_count: 1234,
        food_items: [
          {
            id: 'f43',
            name: 'Rasgulla (6 pcs)',
            cost: 149.99,
            image_url: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&h=300&fit=crop&crop=center',
            rating: 4.5,
          },
          {
            id: 'f44',
            name: 'Gulab Jamun (4 pcs)',
            cost: 129.99,
            image_url: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&h=300&fit=crop&crop=center',
            rating: 4.6,
          },
          {
            id: 'f45',
            name: 'Samosa Chaat',
            cost: 89.99,
            image_url: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop&crop=center',
            rating: 4.3,
          },
          {
            id: 'f46',
            name: 'Aloo Bhujia',
            cost: 79.99,
            image_url: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop&crop=center',
            rating: 4.2,
          },
          {
            id: 'f47',
            name: 'Kaju Katli',
            cost: 399.99,
            image_url: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&h=300&fit=crop&crop=center',
            rating: 4.7,
          },
          {
            id: 'f48',
            name: 'Pani Puri (8 pcs)',
            cost: 69.99,
            image_url: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&h=300&fit=crop&crop=center',
            rating: 4.4,
          },
        ],
      },
      '2210': {
        id: '2210',
        name: 'Barbeque Nation',
        cuisine: 'Indian, Barbeque, Buffet',
        image_url: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=400&h=300&fit=crop&crop=center',
        location: 'Kukatpally, Hyderabad',
        rating: 4.4,
        reviews_count: 945,
        food_items: [
          {
            id: 'f49',
            name: 'BBQ Chicken Tikka',
            cost: 349.99,
            image_url: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&h=300&fit=crop&crop=center',
            rating: 4.5,
          },
          {
            id: 'f50',
            name: 'Grilled Fish',
            cost: 399.99,
            image_url: 'https://images.unsplash.com/photo-1544943910-4c1dc44aab44?w=400&h=300&fit=crop&crop=center',
            rating: 4.3,
          },
          {
            id: 'f51',
            name: 'Mutton Seekh Kebab',
            cost: 429.99,
            image_url: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=400&h=300&fit=crop&crop=center',
            rating: 4.6,
          },
          {
            id: 'f52',
            name: 'Paneer Tikka',
            cost: 279.99,
            image_url: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&h=300&fit=crop&crop=center',
            rating: 4.2,
          },
          {
            id: 'f53',
            name: 'BBQ Prawns',
            cost: 459.99,
            image_url: 'https://tse1.mm.bing.net/th/id/OIP.Cqw7YqXoVsQcIzi3CFlSfQHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
            rating: 4.4,
          },
          {
            id: 'f54',
            name: 'Grilled Corn',
            cost: 149.99,
            image_url: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=400&h=300&fit=crop&crop=center',
            rating: 4.1,
          },
        ],
      },
      '2211': {
        id: '2211',
        name: 'Subway',
        cuisine: 'American, Sandwiches, Healthy',
        image_url: 'https://images.unsplash.com/photo-1539252554453-80ab65ce3586?w=400&h=300&fit=crop&crop=center',
        location: 'Hitec City, Hyderabad',
        rating: 4.1,
        reviews_count: 1167,
        food_items: [
          {
            id: 'f55',
            name: 'Italian BMT',
            cost: 249.99,
            image_url: 'https://images.unsplash.com/photo-1539252554453-80ab65ce3586?w=400&h=300&fit=crop&crop=center',
            rating: 4.2,
          },
          {
            id: 'f56',
            name: 'Chicken Teriyaki',
            cost: 269.99,
            image_url: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?w=400&h=300&fit=crop&crop=center',
            rating: 4.3,
          },
          {
            id: 'f57',
            name: 'Veggie Delite',
            cost: 179.99,
            image_url: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop&crop=center',
            rating: 4.0,
          },
          {
            id: 'f58',
            name: 'Tuna Sandwich',
            cost: 229.99,
            image_url: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=400&h=300&fit=crop&crop=center',
            rating: 4.1,
          },
          {
            id: 'f59',
            name: 'Cookies (3 pcs)',
            cost: 99.99,
            image_url: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400&h=300&fit=crop&crop=center',
            rating: 4.4,
          },
          {
            id: 'f60',
            name: 'Fresh Salad Bowl',
            cost: 199.99,
            image_url: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop&crop=center',
            rating: 4.2,
          },
        ],
      },
      '2212': {
        id: '2212',
        name: 'Andhra Spice Kitchen',
        cuisine: 'Andhra Pradesh, South Indian, Spicy',
        image_url: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&h=300&fit=crop&crop=center',
        location: 'Madhapur, Hyderabad',
        rating: 4.6,
        reviews_count: 1892,
        food_items: [
          {
            id: 'f61',
            name: 'Andhra Chicken Biryani',
            cost: 449.99,
            image_url: 'https://images.unsplash.com/photo-1563379091339-03246963d25f?w=400&h=300&fit=crop&crop=center',
            rating: 4.8,
          },
          {
            id: 'f62',
            name: 'Gongura Mutton',
            cost: 599.99,
            image_url: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=400&h=300&fit=crop&crop=center',
            rating: 4.7,
          },
          {
            id: 'f63',
            name: 'Kodi Koora (Chicken Curry)',
            cost: 379.99,
            image_url: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&h=300&fit=crop&crop=center',
            rating: 4.6,
          },
          {
            id: 'f64',
            name: 'Pulihora (Tamarind Rice)',
            cost: 149.99,
            image_url: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&h=300&fit=crop&crop=center',
            rating: 4.4,
          },
          {
            id: 'f65',
            name: 'Pesarattu with Upma',
            cost: 129.99,
            image_url: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&h=300&fit=crop&crop=center',
            rating: 4.5,
          },
          {
            id: 'f66',
            name: 'Andhra Fish Curry',
            cost: 429.99,
            image_url: 'https://images.unsplash.com/photo-1544943910-4c1dc44aab44?w=400&h=300&fit=crop&crop=center',
            rating: 4.6,
          },
          {
            id: 'f67',
            name: 'Gutti Vankaya (Stuffed Brinjal)',
            cost: 299.99,
            image_url: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop&crop=center',
            rating: 4.3,
          },
          {
            id: 'f68',
            name: 'Rayalaseema Ragi Sangati',
            cost: 179.99,
            image_url: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop&crop=center',
            rating: 4.2,
          },
          {
            id: 'f69',
            name: 'Andhra Pickle Platter',
            cost: 99.99,
            image_url: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop&crop=center',
            rating: 4.4,
          },
          {
            id: 'f70',
            name: 'Bobbatlu (Sweet)',
            cost: 69.99,
            image_url: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&h=300&fit=crop&crop=center',
            rating: 4.5,
          },
        ],
      },
      '2213': {
        id: '2213',
        name: 'Tamil Traditional Mess',
        cuisine: 'Tamil Nadu, South Indian, Traditional',
        image_url: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&h=300&fit=crop&crop=center',
        location: 'Miyapur, Hyderabad',
        rating: 4.5,
        reviews_count: 1456,
        food_items: [
          {
            id: 'f71',
            name: 'Chettinad Chicken',
            cost: 419.99,
            image_url: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&h=300&fit=crop&crop=center',
            rating: 4.7,
          },
          {
            id: 'f72',
            name: 'Tamil Nadu Meals (Full)',
            cost: 199.99,
            image_url: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&h=300&fit=crop&crop=center',
            rating: 4.6,
          },
          {
            id: 'f73',
            name: 'Kothu Parotta',
            cost: 189.99,
            image_url: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop&crop=center',
            rating: 4.5,
          },
          {
            id: 'f74',
            name: 'Sambar Rice',
            cost: 129.99,
            image_url: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&h=300&fit=crop&crop=center',
            rating: 4.4,
          },
          {
            id: 'f75',
            name: 'Pongal with Sambar',
            cost: 99.99,
            image_url: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&h=300&fit=crop&crop=center',
            rating: 4.3,
          },
          {
            id: 'f76',
            name: 'Rasam with Rice',
            cost: 109.99,
            image_url: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop&crop=center',
            rating: 4.2,
          },
          {
            id: 'f77',
            name: 'Mor Kuzhambu',
            cost: 149.99,
            image_url: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop&crop=center',
            rating: 4.3,
          },
          {
            id: 'f78',
            name: 'Adhirasam (Sweet)',
            cost: 79.99,
            image_url: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&h=300&fit=crop&crop=center',
            rating: 4.4,
          },
          {
            id: 'f79',
            name: 'Murukku Packet',
            cost: 59.99,
            image_url: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop&crop=center',
            rating: 4.1,
          },
          {
            id: 'f80',
            name: 'Payasam (Kheer)',
            cost: 89.99,
            image_url: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&h=300&fit=crop&crop=center',
            rating: 4.5,
          },
          {
            id: 'f81',
            name: 'Banana Leaf Meals',
            cost: 249.99,
            image_url: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&h=300&fit=crop&crop=center',
            rating: 4.6,
          },
          {
            id: 'f82',
            name: 'Tamil Filter Coffee',
            cost: 49.99,
            image_url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop&crop=center',
            rating: 4.7,
          },
        ],
      },
    };

    const restaurant = restaurantDetails[restaurantId];
    
    if (restaurant) {
      return {
        ok: true,
        data: restaurant,
      };
    } else {
      return {
        ok: false,
        data: {
          error_msg: 'Restaurant not found',
        },
      };
    }
  },
};

// Flag to determine whether to use mock API (for development)
export const shouldUseMockAPI = true;