// Order management service
export const orderService = {
  // Place a new order
  placeOrder: async (orderData) => {
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API delay
    
    const orderId = 'ORD' + Date.now();
    const order = {
      id: orderId,
      userId: orderData.userId || localStorage.getItem('username') || 'guest',
      restaurantId: orderData.restaurantId,
      restaurantName: orderData.restaurantName,
      items: orderData.items,
      totalAmount: orderData.totalAmount,
      totalPrice: orderData.totalAmount, // For profile stats
      orderDate: new Date().toISOString(),
      status: 'Confirmed',
      deliveryAddress: orderData.deliveryAddress || 'Default Address',
      estimatedDeliveryTime: '30-40 mins',
    };

    // Get existing orders from localStorage (use 'orders' for consistency)
    const existingOrders = JSON.parse(localStorage.getItem('orders')) || [];
    
    // Add new order
    existingOrders.push(order);
    
    // Save to localStorage
    localStorage.setItem('orders', JSON.stringify(existingOrders));
    
    return {
      ok: true,
      data: {
        orderId,
        message: 'Order placed successfully!',
        order,
      },
    };
  },

  // Get orders for a specific user
  getUserOrders: async (userId) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const allOrders = JSON.parse(localStorage.getItem('orders')) || [];
    const userOrders = allOrders.filter(order => order.userId === userId);
    
    return {
      ok: true,
      data: {
        orders: userOrders.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate)),
      },
    };
  },

  // Get order details by ID
  getOrderDetails: async (orderId) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const allOrders = JSON.parse(localStorage.getItem('orders')) || [];
    const order = allOrders.find(order => order.id === orderId);
    
    if (order) {
      return {
        ok: true,
        data: order,
      };
    } else {
      return {
        ok: false,
        data: { error_msg: 'Order not found' },
      };
    }
  },

  // Update order status (for admin/restaurant)
  updateOrderStatus: async (orderId, newStatus) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const allOrders = JSON.parse(localStorage.getItem('userOrders')) || [];
    const orderIndex = allOrders.findIndex(order => order.id === orderId);
    
    if (orderIndex !== -1) {
      allOrders[orderIndex].status = newStatus;
      localStorage.setItem('userOrders', JSON.stringify(allOrders));
      
      return {
        ok: true,
        data: {
          message: 'Order status updated successfully',
          order: allOrders[orderIndex],
        },
      };
    } else {
      return {
        ok: false,
        data: { error_msg: 'Order not found' },
      };
    }
  },
};

// User service for managing user data
export const userService = {
  // Get current user ID from localStorage (consistent with Profile component)
  getCurrentUserId: () => {
    return localStorage.getItem('username') || null;
  },

  // Get user profile information
  getUserProfile: async (userId) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const userProfiles = {
      'rahul': {
        id: 'rahul',
        name: 'Rahul Kumar',
        email: 'rahul@example.com',
        phone: '+91 9876543210',
        address: 'Gachibowli, Hyderabad, Telangana',
      },
      'henry': {
        id: 'henry',
        name: 'Henry Williams',
        email: 'henry@example.com',
        phone: '+91 8765432109',
        address: 'Madhapur, Hyderabad, Telangana',
      },
      'manoj': {
        id: 'manoj',
        name: 'Manoj Kumar',
        email: 'manoj@example.com',
        phone: '+91 7654321098',
        address: 'Jubilee Hills, Hyderabad, Telangana',
      },
    };

    const profile = userProfiles[userId];
    
    if (profile) {
      return {
        ok: true,
        data: profile,
      };
    } else {
      return {
        ok: false,
        data: { error_msg: 'User not found' },
      };
    }
  },
};
