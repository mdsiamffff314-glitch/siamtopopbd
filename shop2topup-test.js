'use strict';
/**
 * Simulation-only Shop2Topup helper.
 * Does not make network requests and cannot place live orders.
 */
const crypto = require('crypto');

function simulatedCatalog() {
  return { success: true, subcategories: [
    { item_id: 999, name: 'TEST — FF 100 Diamonds', category_name: 'Free Fire', price: '0.99', in_stock: true, product_type: 'topup' }
  ] };
}

function simulatedPlayerValidation(playerId) {
  if (!/^\d{6,24}$/.test(String(playerId || ''))) {
    return { success: false, code: 'PLAYER_NOT_FOUND', message: 'Test UID format rejected' };
  }
  return { success: true, player: { player_id: String(playerId), player_name: 'TEST PLAYER', region: 'TEST' } };
}

function simulatedOrder({ playerId, itemId, quantity = 1 }) {
  if (!/^\d{6,24}$/.test(String(playerId || ''))) throw new Error('Invalid test player ID');
  if (!Number.isInteger(quantity) || quantity < 1 || quantity > 10) throw new Error('Invalid test quantity');
  return { success: true, order: {
    order_id: crypto.randomUUID(), status: 'simulated', player_id: String(playerId),
    player_name: 'TEST PLAYER', subcategory_name: `TEST ITEM ${itemId}`, quantity,
    charged_amount: '0.00', currency: 'TEST', created_at: new Date().toISOString()
  } };
}

module.exports = { simulatedCatalog, simulatedPlayerValidation, simulatedOrder };
