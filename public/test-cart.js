// Test script for cart functionality
// Run this in the browser console to test the cart

function testCartFunctionality() {
  console.log('🧪 Starting cart functionality test...');
  
  // Check if cartManager is available
  if (!window.cartManager) {
    console.error('❌ CartManager not found on window object');
    return;
  }
  
  console.log('✅ CartManager found');
  
  // Test 1: Add products to cart
  console.log('\n🧪 Test 1: Adding products to cart');
  
  // Clear cart first
  window.cartManager.clearCart();
  console.log('Cart cleared');
  
  // Add first product
  const product1 = {
    id: 'hidrolavadora-k2',
    name: 'Hidrolavadora K2',
    model: 'K2 Full Control',
    price: 549900,
    image: '/images/products/image.png'
  };
  
  window.cartManager.addProduct(product1);
  console.log('Added product 1:', product1.name);
  
  // Add second product
  const product2 = {
    id: 'hidrolavadora-k3',
    name: 'Hidrolavadora K3',
    model: 'K3 Full Control',
    price: 699900,
    image: '/images/products/image2.png'
  };
  
  window.cartManager.addProduct(product2);
  console.log('Added product 2:', product2.name);
  
  // Small delay to ensure state is updated
  setTimeout(() => {
    // Check cart state
    const state = window.cartManager.getState();
    console.log('Cart state after adding products:', state);
    
    // Test 2: Remove first product
    console.log('\n🧪 Test 2: Removing first product');
    console.log('Removing product with ID:', product1.id);
    
    window.cartManager.removeProduct(product1.id);
    
    // Small delay to ensure state is updated
    setTimeout(() => {
      // Check cart state after removal
      const stateAfterRemoval = window.cartManager.getState();
      console.log('Cart state after removing first product:', stateAfterRemoval);
      
      // Verify first product was removed
      if (stateAfterRemoval.items.length === 1 && stateAfterRemoval.items[0].id === product2.id) {
        console.log('✅ Test 2 PASSED: First product was removed correctly');
      } else {
        console.error('❌ Test 2 FAILED: First product was not removed correctly');
      }
      
      // Test 3: Remove second product
      console.log('\n🧪 Test 3: Removing second product');
      console.log('Removing product with ID:', product2.id);
      
      window.cartManager.removeProduct(product2.id);
      
      // Small delay to ensure state is updated
      setTimeout(() => {
        // Check cart state after removal
        const stateAfterSecondRemoval = window.cartManager.getState();
        console.log('Cart state after removing second product:', stateAfterSecondRemoval);
        
        // Verify second product was removed
        if (stateAfterSecondRemoval.items.length === 0) {
          console.log('✅ Test 3 PASSED: Second product was removed correctly');
        } else {
          console.error('❌ Test 3 FAILED: Second product was not removed correctly');
        }
        
        // Test 4: Test quantity updates
        console.log('\n🧪 Test 4: Testing quantity updates');
        
        // Add product again
        window.cartManager.addProduct(product1);
        console.log('Added product again for quantity test');
        
        // Small delay to ensure state is updated
        setTimeout(() => {
          // Update quantity
          window.cartManager.updateQuantity(product1.id, 3);
          
          // Small delay to ensure state is updated
          setTimeout(() => {
            const stateAfterQuantityUpdate = window.cartManager.getState();
            console.log('Cart state after quantity update:', stateAfterQuantityUpdate);
            
            if (stateAfterQuantityUpdate.items.length === 1 && stateAfterQuantityUpdate.items[0].quantity === 3) {
              console.log('✅ Test 4 PASSED: Quantity updated correctly');
            } else {
              console.error('❌ Test 4 FAILED: Quantity was not updated correctly');
            }
            
            // Test 5: Remove product with quantity > 1
            console.log('\n🧪 Test 5: Removing product with quantity > 1');
            console.log('Removing product with ID:', product1.id);
            
            window.cartManager.removeProduct(product1.id);
            
            // Small delay to ensure state is updated
            setTimeout(() => {
              // Check cart state after removal
              const stateAfterFinalRemoval = window.cartManager.getState();
              console.log('Cart state after final removal:', stateAfterFinalRemoval);
              
              if (stateAfterFinalRemoval.items.length === 0) {
                console.log('✅ Test 5 PASSED: Product with quantity > 1 was removed correctly');
              } else {
                console.error('❌ Test 5 FAILED: Product with quantity > 1 was not removed correctly');
              }
              
              console.log('\n🎉 Cart functionality test completed!');
            }, 50);
          }, 50);
        }, 50);
      }, 50);
    }, 50);
  }, 50);
}

// Test UI functionality
function testCartUI() {
  console.log('🧪 Starting cart UI test...');
  
  // Check if cartManager is available
  if (!window.cartManager) {
    console.error('❌ CartManager not found on window object');
    return;
  }
  
  // Clear cart first
  window.cartManager.clearCart();
  
  // Add a product
  const product1 = {
    id: 'hidrolavadora-k2',
    name: 'Hidrolavadora K2',
    model: 'K2 Full Control',
    price: 549900,
    image: '/images/products/image.png'
  };
  
  window.cartManager.addProduct(product1);
  
  setTimeout(() => {
    // Open cart
    window.cartManager.openCart();
    
    setTimeout(() => {
      // Check if cart modal is open
      const modal = document.getElementById('cart-modal');
      if (modal && modal.classList.contains('open')) {
        console.log('✅ Cart modal opened successfully');
        
        // Check if product is visible
        const itemElement = document.querySelector(`[data-id="${product1.id}"]`);
        if (itemElement) {
          console.log('✅ Product is visible in cart');
          
          // Find and click the remove button
          const removeBtn = itemElement.querySelector('.remove-btn');
          if (removeBtn) {
            console.log('🧪 Clicking remove button...');
            removeBtn.click();
            
            // Wait for removal
            setTimeout(() => {
              // Check if empty state is shown
              const emptyState = document.getElementById('cart-empty');
              if (emptyState && emptyState.style.display !== 'none') {
                console.log('✅ Empty cart state is shown correctly');
              } else {
                console.error('❌ Empty cart state is not shown');
              }
              
              // Check if product is removed
              const itemElementAfter = document.querySelector(`[data-id="${product1.id}"]`);
              if (!itemElementAfter) {
                console.log('✅ Product was removed from UI');
              } else {
                console.error('❌ Product is still visible in UI');
              }
              
              console.log('\n🎉 Cart UI test completed!');
            }, 500);
          } else {
            console.error('❌ Remove button not found');
          }
        } else {
          console.error('❌ Product not found in cart');
        }
      } else {
        console.error('❌ Cart modal did not open');
      }
    }, 500);
  }, 500);
}

// Make the test functions available globally
window.testCartFunctionality = testCartFunctionality;
window.testCartUI = testCartUI;

console.log('🧪 Test script loaded. Run testCartFunctionality() to test cart logic or testCartUI() to test cart UI.');