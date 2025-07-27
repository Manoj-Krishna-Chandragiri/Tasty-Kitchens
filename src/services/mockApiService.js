// Mock API service for development when external APIs have CORS issues
export const mockApiService = {
  // Mock login API
  login: async (username, password) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Valid credentials - Fixed login issue and added Manoj user
    const validCredentials = [
      {username: 'rahul', password: 'rahul@2021'},
      {username: 'henry', password: 'henry_the_developer'},
      {username: 'manoj', password: 'Manoj@123'},
    ]

    const isValid = validCredentials.some(
      cred => cred.username === username && cred.password === password,
    )

    if (isValid) {
      return {
        ok: true,
        data: {
          jwt_token: 'mock_jwt_token_' + username + '_' + Date.now(),
        },
      }
    } else {
      return {
        ok: false,
        data: {
          error_msg: 'Invalid username or password',
        },
      }
    }
  },

  // Mock offers API
  getOffers: async () => {
    await new Promise(resolve => setTimeout(resolve, 800))

    return {
      ok: true,
      data: {
        offers: [
          {
            id: 1,
            image_url:
              'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=300&fit=crop&crop=center',
          },
          {
            id: 2,
            image_url:
              'https://meals-by-manoj-backend.onrender.com/images/food_12.png',
          },
          {
            id: 3,
            image_url:
              'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=600&h=300&fit=crop&crop=center',
          },
        ],
      },
    }
  },

  // Mock restaurants API
  getRestaurants: async (offset = 0, limit = 9, sortBy = 'Lowest') => {
    await new Promise(resolve => setTimeout(resolve, 1000))

    const allRestaurants = [
      {
        id: '2200',
        name: 'Paradise Restaurant',
        cuisine: 'Indian, Hyderabadi Biryani',
        image_url:
          'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop&crop=center',
        user_rating: {
          rating: 4.7,
          total_reviews: 2456,
        },
      },
      {
        id: '2201',
        name: 'Biryani House',
        cuisine: 'Indian, Biryani, Mughlai',
        image_url:
          'https://b.zmtcdn.com/data/pictures/7/20905207/8b454e8e102c27d05fde08a717ff5b19.jpeg?fit=around|960:500&crop=960:500;*,*',
        user_rating: {
          rating: 4.5,
          total_reviews: 1834,
        },
      },
      {
        id: '2202',
        name: 'Punjabi Dhaba',
        cuisine: 'North Indian, Punjabi',
        image_url:
          'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop&crop=center',
        user_rating: {
          rating: 4.4,
          total_reviews: 1245,
        },
      },
      {
        id: '2203',
        name: 'South Indian Express',
        cuisine: 'South Indian, Traditional',
        image_url:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUKfrk_M3TYMKDE8nePyR6KQFTRkUNljRcOQ&s',
        user_rating: {
          rating: 4.6,
          total_reviews: 987,
        },
      },
      {
        id: '2204',
        name: "Domino's Pizza",
        cuisine: 'Italian, Pizza, Fast Food',
        image_url:
          'https://content.jdmagicbox.com/v2/comp/hyderabad/d2/040pxx40.xx40.000806941663.u1d2/catalogue/domino-s-pizza-sarojini-devi-road-hyderabad-pizza-outlets-498dvkg.jpg',
        user_rating: {
          rating: 4.2,
          total_reviews: 1567,
        },
      },
      {
        id: '2205',
        name: 'KFC',
        cuisine: 'American, Fried Chicken',
        image_url:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqihAPqxJDmZtz-5efUx9MADE0chOJvaYfog&s',
        user_rating: {
          rating: 4.1,
          total_reviews: 1890,
        },
      },
      {
        id: '2206',
        name: "McDonald's",
        cuisine: 'American, Burgers, Fast Food',
        image_url:
          'https://content.jdmagicbox.com/v2/comp/hyderabad/h6/040pxx40.xx40.220422203335.y8h6/catalogue/mcdonald-s-rajendra-nagar-hyderabad-fast-food-lkwi905wlw.jpg',
        user_rating: {
          rating: 4.3,
          total_reviews: 2134,
        },
      },
      {
        id: '2207',
        name: 'Burger King',
        cuisine: 'American, Burgers',
        image_url:
          'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/09/b0/47/7b/burger-king.jpg?w=900&h=500&s=1',
        user_rating: {
          rating: 4.0,
          total_reviews: 1456,
        },
      },
      {
        id: '2208',
        name: 'Taco Bell',
        cuisine: 'Mexican, Fast Food',
        image_url:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9u5dRpeJJqb2bW_FrIjdHkV8fhATOmTh0JA&s',
        user_rating: {
          rating: 3.9,
          total_reviews: 876,
        },
      },
      {
        id: '2209',
        name: "Haldiram's",
        cuisine: 'Indian, Sweets, Snacks',
        image_url:
          'https://content.jdmagicbox.com/v2/comp/hyderabad/r5/040pxx40.xx40.220327203250.z4r5/catalogue/haldiram-s-silpa-gram-craft-village-hyderabad-namkeen-retailers-nPLsEkT5sY.jpg',
        user_rating: {
          rating: 4.3,
          total_reviews: 1234,
        },
      },
      {
        id: '2210',
        name: 'Barbeque Nation',
        cuisine: 'Indian, Barbeque, Buffet',
        image_url:
          'https://www.barbequenation.com/_next/image?url=%2Fimages%2Fservice1.jpg&w=1200&q=75',
        user_rating: {
          rating: 4.4,
          total_reviews: 945,
        },
      },
      {
        id: '2211',
        name: 'Subway',
        cuisine: 'American, Sandwiches, Healthy',
        image_url:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSM9_exaCA5rfZrP_goz0hb7JRTOiiSNM1CBA&s',
        user_rating: {
          rating: 4.1,
          total_reviews: 1167,
        },
      },
      {
        id: '2212',
        name: 'Andhra Spice Kitchen',
        cuisine: 'Andhra Pradesh, South Indian, Spicy',
        image_url:
          'https://b.zmtcdn.com/data/pictures/4/20605574/8a393906611dd7d0002fa6b70a3a52be_featured_v2.jpg',
        user_rating: {
          rating: 4.6,
          total_reviews: 1892,
        },
      },
      {
        id: '2213',
        name: 'Tamil Traditional Mess',
        cuisine: 'Tamil Nadu, South Indian, Traditional',
        image_url:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQl4RPyH1B9buCZbciwfxK_KFr3kel18xJvNHALGO0KoEPJlv8SCdmVkO80JHe013FdtgM&usqp=CAU',
        user_rating: {
          rating: 4.5,
          total_reviews: 1456,
        },
      },
    ]

    // Sort restaurants based on sortBy parameter
    const sortedRestaurants = [...allRestaurants].sort((a, b) => {
      switch (sortBy) {
        case 'Highest':
          return b.user_rating.rating - a.user_rating.rating
        case 'Lowest':
          return a.user_rating.rating - b.user_rating.rating
        case 'A-Z':
          return a.name.localeCompare(b.name)
        case 'Z-A':
          return b.name.localeCompare(a.name)
        case 'Rating (High to Low)':
          return b.user_rating.rating - a.user_rating.rating
        case 'Rating (Low to High)':
          return a.user_rating.rating - b.user_rating.rating
        case 'Most Reviews':
          return b.user_rating.total_reviews - a.user_rating.total_reviews
        case 'Least Reviews':
          return a.user_rating.total_reviews - b.user_rating.total_reviews
        default:
          return a.user_rating.rating - b.user_rating.rating
      }
    })

    // Apply pagination
    const restaurants = sortedRestaurants.slice(offset, offset + limit)

    return {
      ok: true,
      data: {
        restaurants,
        total: allRestaurants.length,
      },
    }
  },

  // Mock restaurant details API
  getRestaurantDetails: async restaurantId => {
    await new Promise(resolve => setTimeout(resolve, 800))

    const restaurantDetails = {
      '2200': {
        id: '2200',
        name: 'Paradise Restaurant',
        cuisine: 'Indian, Hyderabadi Biryani',
        image_url:
          'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop&crop=center',
        location: 'Secunderabad, Hyderabad',
        rating: 4.7,
        reviews_count: 2456,
        food_items: [
          {
            id: 'f1',
            name: 'Hyderabadi Chicken Biryani',
            cost: 399.99,
            image_url:
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoIycguxFgTpIN3L00tYQhJ2WkypXj5w_QkQ&s',
            rating: 4.8,
          },
          {
            id: 'f2',
            name: 'Mutton Biryani',
            cost: 459.99,
            image_url:
              'https://www.cubesnjuliennes.com/wp-content/uploads/2021/03/Best-Mutton-Biryani-Recipe.jpg',
            rating: 4.7,
          },
          {
            id: 'f3',
            name: 'Chicken 65',
            cost: 299.99,
            image_url:
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQidJ5h36bf8-PsFa4KSjeiwHJeM1WDKIF7MA&s',
            rating: 4.5,
          },
          {
            id: 'f4',
            name: 'Haleem',
            cost: 199.99,
            image_url:
              'https://www.chefkunalkapur.com/wp-content/uploads/2022/04/hyderabadi-haleem-1300x867.jpg?v=1650248653',
            rating: 4.6,
          },
          {
            id: 'f5',
            name: 'Kebab Platter',
            cost: 549.99,
            image_url:
              'https://www.shutterstock.com/image-photo/assorted-mix-grills-chicken-tikka-600w-2290851499.jpg',
            rating: 4.4,
          },
        ],
      },
      '2201': {
        id: '2201',
        name: 'Biryani House',
        cuisine: 'Indian, Biryani, Mughlai',
        image_url:
          'https://b.zmtcdn.com/data/pictures/7/20905207/8b454e8e102c27d05fde08a717ff5b19.jpeg?fit=around|960:500&crop=960:500;*,*',
        location: 'Old City, Hyderabad',
        rating: 4.5,
        reviews_count: 1834,
        food_items: [
          {
            id: 'f6',
            name: 'Special Chicken Biryani',
            cost: 349.99,
            image_url:
              'https://healux.in/wp-content/uploads/2020/11/ChickenBiryani.jpg',
            rating: 4.6,
          },
          {
            id: 'f7',
            name: 'Veg Biryani',
            cost: 249.99,
            image_url:
              'https://madhurasrecipe.com/wp-content/uploads/2023/03/Veg-Biryani-2.jpg',
            rating: 4.3,
          },
          {
            id: 'f8',
            name: 'Butter Chicken',
            cost: 329.99,
            image_url:
              'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=400&h=300&fit=crop&crop=center',
            rating: 4.5,
          },
          {
            id: 'f9',
            name: 'Tandoori Chicken',
            cost: 399.99,
            image_url:
              'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&h=300&fit=crop&crop=center',
            rating: 4.4,
          },
        ],
      },
      '2202': {
        id: '2202',
        name: 'Punjabi Dhaba',
        cuisine: 'North Indian, Punjabi',
        image_url:
          'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop&crop=center',
        location: 'Punjagutta, Hyderabad',
        rating: 4.4,
        reviews_count: 1245,
        food_items: [
          {
            id: 'f10',
            name: 'Dal Makhani',
            cost: 199.99,
            image_url:
              'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop&crop=center',
            rating: 4.5,
          },
          {
            id: 'f11',
            name: 'Paneer Butter Masala',
            cost: 249.99,
            image_url:
              'https://cdn.zeptonow.com/production///tr:w-600,ar-100-100,pr-true,f-auto,q-80/web/recipes/paneer-butter-masala.png',
            rating: 4.3,
          },
          {
            id: 'f12',
            name: 'Roti with Curry',
            cost: 159.99,
            image_url:
              'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop&crop=center',
            rating: 4.2,
          },
          {
            id: 'f13',
            name: 'Chole Bhature',
            cost: 179.99,
            image_url:
              'https://www.yumcurry.com/wp-content/uploads/2021/08/chole-bhature.jpg',
            rating: 4.4,
          },
        ],
      },
      '2203': {
        id: '2203',
        name: 'South Indian Express',
        cuisine: 'South Indian, Traditional',
        image_url:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUKfrk_M3TYMKDE8nePyR6KQFTRkUNljRcOQ&s',
        location: 'Kondapur, Hyderabad',
        rating: 4.6,
        reviews_count: 987,
        food_items: [
          {
            id: 'f14',
            name: 'Masala Dosa',
            cost: 99.99,
            image_url:
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTXFOwNRJLmXDAQnoBFcEiBnCMC3gWXT-wSQ&s',
            rating: 4.5,
          },
          {
            id: 'f15',
            name: 'Idli Sambar',
            cost: 79.99,
            image_url:
              'https://shwetainthekitchen.com/wp-content/uploads/2022/01/Idli-Sambar.jpg',
            rating: 4.4,
          },
          {
            id: 'f16',
            name: 'Uttapam',
            cost: 119.99,
            image_url:
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5ki8o6GETlaoyqdgCZnM_G4M1fFj0DuRsgQ&s',
            rating: 4.3,
          },
          {
            id: 'f17',
            name: 'Vada',
            cost: 59.99,
            image_url:
              'https://bonmasala.com/wp-content/uploads/2022/12/medu-vada-recipe.webp',
            rating: 4.2,
          },
          {
            id: 'f18',
            name: 'Filter Coffee',
            cost: 39.99,
            image_url:
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjU_KMunwNJoA7dydl8NU24jOfspcy4byRkw&s',
            rating: 4.6,
          },
        ],
      },
      '2204': {
        id: '2204',
        name: "Domino's Pizza",
        cuisine: 'Italian, Pizza, Fast Food',
        image_url:
          'https://content.jdmagicbox.com/v2/comp/hyderabad/d2/040pxx40.xx40.000806941663.u1d2/catalogue/domino-s-pizza-sarojini-devi-road-hyderabad-pizza-outlets-498dvkg.jpg',
        location: 'Gachibowli, Hyderabad',
        rating: 4.2,
        reviews_count: 1567,
        food_items: [
          {
            id: 'f19',
            name: 'Margherita Pizza',
            cost: 299.99,
            image_url:
              'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop&crop=center',
            rating: 4.3,
          },
          {
            id: 'f20',
            name: 'Pepperoni Pizza',
            cost: 399.99,
            image_url:
              'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=300&fit=crop&crop=center',
            rating: 4.4,
          },
          {
            id: 'f21',
            name: 'Chicken Supreme',
            cost: 459.99,
            image_url:
              'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop&crop=center',
            rating: 4.2,
          },
          {
            id: 'f22',
            name: 'Garlic Bread',
            cost: 149.99,
            image_url:
              'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=400&h=300&fit=crop&crop=center',
            rating: 4.1,
          },
        ],
      },
      '2205': {
        id: '2205',
        name: 'KFC',
        cuisine: 'American, Fried Chicken',
        image_url:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqihAPqxJDmZtz-5efUx9MADE0chOJvaYfog&s',
        location: 'Banjara Hills, Hyderabad',
        rating: 4.1,
        reviews_count: 1890,
        food_items: [
          {
            id: 'f23',
            name: 'Original Recipe Chicken (8 pcs)',
            cost: 449.99,
            image_url:
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTa1kV06RPJIO-MyNJNi-ZfsbE_EwgbdhwIgw&s',
            rating: 4.3,
          },
          {
            id: 'f24',
            name: 'Hot & Crispy Chicken (6 pcs)',
            cost: 399.99,
            image_url:
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqK5PwIDBFgCBYAIY6v3eSiGDGumGr2iOSHw&s',
            rating: 4.2,
          },
          {
            id: 'f25',
            name: 'Zinger Burger',
            cost: 189.99,
            image_url:
              'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop&crop=center',
            rating: 4.4,
          },
          {
            id: 'f26',
            name: 'Chicken Popcorn Large',
            cost: 249.99,
            image_url:
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKe6Zj8y5P9yb3et7rcL_XVsVjeR7FOigtDg&s',
            rating: 4.1,
          },
          {
            id: 'f83',
            name: 'KFC Bucket (12 pcs)',
            cost: 649.99,
            image_url:
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWHwRaLrcHt4kwRCk5l5bH1NbkXe_Hckecig&s',
            rating: 4.5,
          },
          {
            id: 'f84',
            name: "Colonel's Burger",
            cost: 169.99,
            image_url:
              'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400&h=300&fit=crop&crop=center',
            rating: 4.0,
          },
          {
            id: 'f85',
            name: 'Chicken Wings (6 pcs)',
            cost: 279.99,
            image_url:
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNayBM1TrLaBHV4OrACJTwq9VOfPkTanHIPg&s',
            rating: 4.3,
          },
          {
            id: 'f86',
            name: 'Coleslaw Regular',
            cost: 89.99,
            image_url:
              'https://qph.cf2.quoracdn.net/main-qimg-d617742ea38a65c1dc13ec43b4d9ec62-lq',
            rating: 3.9,
          },
          {
            id: 'f87',
            name: 'French Fries Large',
            cost: 119.99,
            image_url: 'https://kfc.ee/wp-content/uploads/2021/10/Fries_L.png',
            rating: 4.0,
          },
          {
            id: 'f88',
            name: 'Krushems Oreo',
            cost: 149.99,
            image_url:
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqASh08ZIoIRejg8zpUcJJ-R4OckTAI75o4w&s',
            rating: 4.2,
          },
        ],
      },
      '2206': {
        id: '2206',
        name: "McDonald's",
        cuisine: 'American, Burgers, Fast Food',
        image_url:
          'https://content.jdmagicbox.com/v2/comp/hyderabad/h6/040pxx40.xx40.220422203335.y8h6/catalogue/mcdonald-s-rajendra-nagar-hyderabad-fast-food-lkwi905wlw.jpg',
        location: 'Banjara Hills, Hyderabad',
        rating: 4.3,
        reviews_count: 2134,
        food_items: [
          {
            id: 'f27',
            name: 'Big Mac',
            cost: 249.99,
            image_url:
              'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=400&h=300&fit=crop&crop=center',
            rating: 4.4,
          },
          {
            id: 'f28',
            name: 'Quarter Pounder',
            cost: 279.99,
            image_url:
              'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop&crop=center',
            rating: 4.3,
          },
          {
            id: 'f29',
            name: 'Chicken McNuggets',
            cost: 189.99,
            image_url:
              'https://images.unsplash.com/photo-1562967914-608f82629710?w=400&h=300&fit=crop&crop=center',
            rating: 4.2,
          },
          {
            id: 'f30',
            name: 'McFlurry Oreo',
            cost: 129.99,
            image_url:
              'https://mcdonalds.co.nz/sites/mcdonalds.co.nz/files/product-OREO%20Cookies%C2%AE%20Chocolate%20McFlurry%C2%AE-desktop_0.png',
            rating: 4.5,
          },
          {
            id: 'f31',
            name: 'French Fries Large',
            cost: 99.99,
            image_url:
              'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&h=300&fit=crop&crop=center',
            rating: 4.1,
          },
          {
            id: 'f32',
            name: 'Apple Pie',
            cost: 59.99,
            image_url:
              'https://www.emmymade.com/wp-content/uploads/2021/11/Tiktok_McD_apple_pie-scaled.jpeg',
            rating: 4.0,
          },
        ],
      },
      '2207': {
        id: '2207',
        name: 'Burger King',
        cuisine: 'American, Burgers',
        image_url:
          'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/09/b0/47/7b/burger-king.jpg?w=900&h=500&s=1',
        location: 'Hitec City, Hyderabad',
        rating: 4.0,
        reviews_count: 1456,
        food_items: [
          {
            id: 'f33',
            name: 'Whopper',
            cost: 269.99,
            image_url:
              'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400&h=300&fit=crop&crop=center',
            rating: 4.3,
          },
          {
            id: 'f34',
            name: 'Chicken Royale',
            cost: 229.99,
            image_url:
              'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop&crop=center',
            rating: 4.1,
          },
          {
            id: 'f35',
            name: 'Crispy Chicken',
            cost: 199.99,
            image_url:
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXIC2KEYs6YvIqLApS4xCMDI4Rxc5jHK2C5A&s',
            rating: 4.0,
          },
          {
            id: 'f36',
            name: 'Onion Rings',
            cost: 119.99,
            image_url: 'https://i.ytimg.com/vi/Zid2OXw_z_Y/maxresdefault.jpg',
            rating: 3.9,
          },
          {
            id: 'f37',
            name: 'Chocolate Thick Shake',
            cost: 149.99,
            image_url:
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpMptQYyBCr_IrRjrHHPXFg9ZnIeb-xI3SOA&s',
            rating: 4.2,
          },
        ],
      },
      '2208': {
        id: '2208',
        name: 'Taco Bell',
        cuisine: 'Mexican, Fast Food',
        image_url:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9u5dRpeJJqb2bW_FrIjdHkV8fhATOmTh0JA&s',
        location: 'Jubilee Hills, Hyderabad',
        rating: 3.9,
        reviews_count: 876,
        food_items: [
          {
            id: 'f38',
            name: 'Crunchy Taco Supreme',
            cost: 149.99,
            image_url:
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS64iimPLmdw3CDtLhncTeEaGIpUsnx7ww-2w&s',
            rating: 4.1,
          },
          {
            id: 'f39',
            name: 'Burrito Bowl',
            cost: 219.99,
            image_url:
              'https://thecozycook.com/wp-content/uploads/2024/08/Burrito-Bowls-F.jpg',
            rating: 4.0,
          },
          {
            id: 'f40',
            name: 'Quesadilla Chicken',
            cost: 189.99,
            image_url:
              'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?w=400&h=300&fit=crop&crop=center',
            rating: 3.9,
          },
          {
            id: 'f41',
            name: 'Nachos Supreme',
            cost: 169.99,
            image_url:
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFFWK7fOpSNxO12en30gJgR04fVTr4wDBRVw&s',
            rating: 3.8,
          },
          {
            id: 'f42',
            name: 'Mexican Rice Bowl',
            cost: 199.99,
            image_url:
              'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&h=300&fit=crop&crop=center',
            rating: 4.0,
          },
        ],
      },
      '2209': {
        id: '2209',
        name: "Haldiram's",
        cuisine: 'Indian, Sweets, Snacks',
        image_url:
          'https://content.jdmagicbox.com/v2/comp/hyderabad/r5/040pxx40.xx40.220327203250.z4r5/catalogue/haldiram-s-silpa-gram-craft-village-hyderabad-namkeen-retailers-nPLsEkT5sY.jpg',
        location: 'Ameerpet, Hyderabad',
        rating: 4.3,
        reviews_count: 1234,
        food_items: [
          {
            id: 'f43',
            name: 'Rasgulla (6 pcs)',
            cost: 149.99,
            image_url:
              'https://www.ketraj.com/wp-content/uploads/2024/07/a19bb09692310dfd41e49a96c424b3a6-150.jpeg',
            rating: 4.5,
          },
          {
            id: 'f44',
            name: 'Gulab Jamun (4 pcs)',
            cost: 129.99,
            image_url:
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRD5KYcR79wTcJv7U6nYzIGNIU5iEBK0AoPkQ&s',
            rating: 4.6,
          },
          {
            id: 'f45',
            name: 'Samosa Chaat',
            cost: 89.99,
            image_url:
              'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop&crop=center',
            rating: 4.3,
          },
          {
            id: 'f46',
            name: 'Aloo Bhujia',
            cost: 79.99,
            image_url:
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmRIJwIFbRZe-TIZ-GJr7XcSeQIsSyqkVyvg&s',
            rating: 4.2,
          },
          {
            id: 'f47',
            name: 'Kaju Katli',
            cost: 399.99,
            image_url:
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBKhAhtrZJ-79ZzdSZ_9XTor2S-Tcrsb7H7A&s',
            rating: 4.7,
          },
          {
            id: 'f48',
            name: 'Pani Puri (8 pcs)',
            cost: 69.99,
            image_url:
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMq31XXVuC5i2dy0v69fu42rViRCi6KtiI-w&s',
            rating: 4.4,
          },
        ],
      },
      '2210': {
        id: '2210',
        name: 'Barbeque Nation',
        cuisine: 'Indian, Barbeque, Buffet',
        image_url:
          'https://www.barbequenation.com/_next/image?url=%2Fimages%2Fservice1.jpg&w=1200&q=75',
        location: 'Kukatpally, Hyderabad',
        rating: 4.4,
        reviews_count: 945,
        food_items: [
          {
            id: 'f49',
            name: 'BBQ Chicken Tikka',
            cost: 349.99,
            image_url:
              'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&h=300&fit=crop&crop=center',
            rating: 4.5,
          },
          {
            id: 'f50',
            name: 'Grilled Fish',
            cost: 399.99,
            image_url:
              'https://www.masalakorb.com/wp-content/uploads/2016/08/Grilled-Fish-Indian-Recipe-V5.jpg',
            rating: 4.3,
          },
          {
            id: 'f51',
            name: 'Mutton Seekh Kebab',
            cost: 429.99,
            image_url:
              'https://c.ndtvimg.com/2020-01/a39okhfk_620_625x300_21_January_20.jpg',
            rating: 4.6,
          },
          {
            id: 'f52',
            name: 'Paneer Tikka',
            cost: 279.99,
            image_url:
              'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&h=300&fit=crop&crop=center',
            rating: 4.2,
          },
          {
            id: 'f53',
            name: 'BBQ Prawns',
            cost: 459.99,
            image_url:
              'https://tse1.mm.bing.net/th/id/OIP.Cqw7YqXoVsQcIzi3CFlSfQHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
            rating: 4.4,
          },
          {
            id: 'f54',
            name: 'Grilled Corn',
            cost: 149.99,
            image_url:
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNHEnj9kH2sY1epcnbdcrtdlzzVyFSi7Nm6g&s',
            rating: 4.1,
          },
        ],
      },
      '2211': {
        id: '2211',
        name: 'Subway',
        cuisine: 'American, Sandwiches, Healthy',
        image_url:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSM9_exaCA5rfZrP_goz0hb7JRTOiiSNM1CBA&s',
        location: 'Hitec City, Hyderabad',
        rating: 4.1,
        reviews_count: 1167,
        food_items: [
          {
            id: 'f55',
            name: 'Italian BMT',
            cost: 249.99,
            image_url:
              'https://images.unsplash.com/photo-1539252554453-80ab65ce3586?w=400&h=300&fit=crop&crop=center',
            rating: 4.2,
          },
          {
            id: 'f56',
            name: 'Chicken Teriyaki',
            cost: 269.99,
            image_url:
              'https://images.unsplash.com/photo-1509722747041-616f39b57569?w=400&h=300&fit=crop&crop=center',
            rating: 4.3,
          },
          {
            id: 'f57',
            name: 'Veggie Delite',
            cost: 179.99,
            image_url:
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6SpWCpUC2olaNzwrgCkPa4LKlqbYeu9OR-Q&s',
            rating: 4.0,
          },
          {
            id: 'f58',
            name: 'Tuna Sandwich',
            cost: 229.99,
            image_url:
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYCBTazZm9dBjs8hL8o0Di-AOzz2hBWNEHbA&s',
            rating: 4.1,
          },
          {
            id: 'f59',
            name: 'Cookies (3 pcs)',
            cost: 99.99,
            image_url:
              'https://subway-eg.com/en/product/cookies-3-pieces/Cookies',
            rating: 4.4,
          },
          {
            id: 'f60',
            name: 'Fresh Salad Bowl',
            cost: 199.99,
            image_url:
              'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop&crop=center',
            rating: 4.2,
          },
        ],
      },
      '2212': {
        id: '2212',
        name: 'Andhra Spice Kitchen',
        cuisine: 'Andhra Pradesh, South Indian, Spicy',
        image_url:
          'https://b.zmtcdn.com/data/pictures/4/20605574/8a393906611dd7d0002fa6b70a3a52be_featured_v2.jpg',
        location: 'Madhapur, Hyderabad',
        rating: 4.6,
        reviews_count: 1892,
        food_items: [
          {
            id: 'f61',
            name: 'Andhra Chicken Biryani',
            cost: 449.99,
            image_url:
              'https://cdn.uengage.io/uploads/23764/image-7855-1728124535.jpg',
            rating: 4.8,
          },
          {
            id: 'f62',
            name: 'Gongura Mutton',
            cost: 599.99,
            image_url:
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQU-Nd6tMY81XUQtbTbyWD_GWg5dPUWa58v4Q&s',
            rating: 4.7,
          },
          {
            id: 'f63',
            name: 'Kodi Koora (Chicken Curry)',
            cost: 379.99,
            image_url: 'https://www.lekhafoods.com/media/1051197/kodi-kura.jpg',
            rating: 4.6,
          },
          {
            id: 'f64',
            name: 'Pulihora (Tamarind Rice)',
            cost: 149.99,
            image_url:
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNIFMgEXeQZGQiU5pJaL2OA373AtfTzsoltw&s',
            rating: 4.4,
          },
          {
            id: 'f65',
            name: 'Pesarattu with Upma',
            cost: 129.99,
            image_url:
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqM2xcl67avtJcgNfCTA6se7YnrmP3uVw7wQ&s',
            rating: 4.5,
          },
          {
            id: 'f66',
            name: 'Andhra Fish Curry',
            cost: 429.99,
            image_url:
              'https://vismaifood.com/storage/app/uploads/public/c0d/434/20d/thumb__700_0_0_0_auto.jpg',
            rating: 4.6,
          },
          {
            id: 'f67',
            name: 'Gutti Vankaya (Stuffed Brinjal)',
            cost: 299.99,
            image_url:
              'https://www.foodieplatter.com/wp-content/uploads/11.1.jpg',
            rating: 4.3,
          },
          {
            id: 'f68',
            name: 'Rayalaseema Ragi Sangati',
            cost: 179.99,
            image_url:
              'https://www.cooking4allseasons.com/wp-content/uploads/2007/06/Ragi-Sangati.jpg',
            rating: 4.2,
          },
          {
            id: 'f69',
            name: 'Andhra Pickle Platter',
            cost: 99.99,
            image_url:
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUzJHK5gwtwzZhzCLw3LeKRvEBtk_ca3hg-w&s',
            rating: 4.4,
          },
          {
            id: 'f70',
            name: 'Bobbatlu (Sweet)',
            cost: 69.99,
            image_url:
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJ6GI1i9od7nbFCNzatkYSNPlAHtVDAVqoZg&s',
            rating: 4.5,
          },
        ],
      },
      '2213': {
        id: '2213',
        name: 'Tamil Traditional Mess',
        cuisine: 'Tamil Nadu, South Indian, Traditional',
        image_url:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQl4RPyH1B9buCZbciwfxK_KFr3kel18xJvNHALGO0KoEPJlv8SCdmVkO80JHe013FdtgM&usqp=CAU',
        location: 'Miyapur, Hyderabad',
        rating: 4.5,
        reviews_count: 1456,
        food_items: [
          {
            id: 'f71',
            name: 'Chettinad Chicken',
            cost: 419.99,
            image_url:
              'https://www.whiskaffair.com/wp-content/uploads/2020/09/Chicken-Chettinad-Curry-2-3.jpg',
            rating: 4.7,
          },
          {
            id: 'f72',
            name: 'Tamil Nadu Meals (Full)',
            cost: 199.99,
            image_url:
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcdpnrIZRkAwZu-27yeGBi9W-OS3CDakv45A&s',
            rating: 4.6,
          },
          {
            id: 'f73',
            name: 'Kothu Parotta',
            cost: 189.99,
            image_url:
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQydMFVVLy0m6bflmWbYY4EAlM4Ac4mKoYj1g&s',
            rating: 4.5,
          },
          {
            id: 'f74',
            name: 'Sambar Rice',
            cost: 129.99,
            image_url:
              'https://rakskitchen.net/wp-content/uploads/2011/03/sambar-sadam_thumb4-403x375.jpg',
            rating: 4.4,
          },
          {
            id: 'f75',
            name: 'Pongal with Sambar',
            cost: 99.99,
            image_url:
              'https://i.ytimg.com/vi/vAHXzDXHmLc/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBwzAtOoz1c4R2076I0L9lsh4Zs_Q',
            rating: 4.3,
          },
          {
            id: 'f76',
            name: 'Rasam with Rice',
            cost: 109.99,
            image_url:
              'https://moonrice.net/wp-content/uploads/2021/01/MilaguJeeraTomatoRasam.jpg',
            rating: 4.2,
          },
          {
            id: 'f77',
            name: 'Mor Kuzhambu',
            cost: 149.99,
            image_url:
              'https://rakskitchen.net/wp-content/uploads/2016/03/Mor-kuzhambu.jpg',
            rating: 4.3,
          },
          {
            id: 'f78',
            name: 'Adhirasam (Sweet)',
            cost: 79.99,
            image_url:
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSre6wPsWbrZ_nYAeImJ1ao7Frp5gpAuwfwUA&s',
            rating: 4.4,
          },
          {
            id: 'f79',
            name: 'Murukku Packet',
            cost: 59.99,
            image_url:
              'https://www.indianhealthyrecipes.com/wp-content/uploads/2021/10/murukku-recipe.jpg',
            rating: 4.1,
          },
          {
            id: 'f80',
            name: 'Payasam (Kheer)',
            cost: 89.99,
            image_url:
              'https://www.indianhealthyrecipes.com/wp-content/uploads/2021/07/semiya-payasam-vermicelli-payasam-500x500.jpg',
            rating: 4.5,
          },
          {
            id: 'f81',
            name: 'Banana Leaf Meals',
            cost: 249.99,
            image_url:
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9bsBTb_hgwhFHmPDOBRejTv81pTS26Rj4dg&s',
            rating: 4.6,
          },
          {
            id: 'f82',
            name: 'Tamil Filter Coffee',
            cost: 49.99,
            image_url:
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjU_KMunwNJoA7dydl8NU24jOfspcy4byRkw&s',
            rating: 4.7,
          },
        ],
      },
    }

    const restaurant = restaurantDetails[restaurantId]

    if (restaurant) {
      return {
        ok: true,
        data: restaurant,
      }
    } else {
      return {
        ok: false,
        data: {
          error_msg: 'Restaurant not found',
        },
      }
    }
  },
}

// Flag to determine whether to use mock API (for development)
export const shouldUseMockAPI = true
