import { supabase } from "../pages/SupabaseClient";

export async function addToCart(user_id, product_id) {
  console.log("Attempting to add to cart...");  // debug

  const { data: existing, error: findError } = await supabase
    .from("cart_items")
    .select("*")
    .eq("user_id", user_id)
    .eq("product_id", product_id)
    .maybeSingle();

  if (findError) {
    console.error("Find error:", findError);
    return;
  }

  if (existing) {
    // Update quantity
    const { data, error } = await supabase
      .from("cart_items")
      .update({ quantity: existing.quantity + 1 })
      .eq("cart_item_id", existing.cart_item_id)
      .select();

    if (error) console.error(error);
    console.log("Updated quantity:", data);
    return data;
  }

  // Insert new cart row
  const { data, error } = await supabase
    .from("cart_items")
    .insert([
      { user_id, product_id, quantity: 1 }
    ])
    .select();

  if (error) console.error(error);
  console.log("Inserted new cart item:", data);
  return data;
}



// import { supabase } from "../pages/SupabaseClient";

// // Fetch all cart items for a user
// export async function fetchCartItems(user_id) {
//   const { data, error } = await supabase
//     .from("cart_items")
//     .select(`
//       *,
//       products(*)
//     `)
//     .eq("user_id", user_id);

//   if (error) {
//     console.error("Fetch cart items error:", error);
//     return [];
//   }

//   return data;
// }

// // Remove item from cart
// export async function removeFromCart(cart_item_id) {
//   const { data, error } = await supabase
//     .from("cart_items")
//     .delete()
//     .eq("cart_item_id", cart_item_id);

//   if (error) console.error("Remove cart item error:", error);
//   return data;
// }

// // Update quantity
// export async function updateCartItem(cart_item_id, quantity) {
//   const { data, error } = await supabase
//     .from("cart_items")
//     .update({ quantity })
//     .eq("cart_item_id", cart_item_id);

//   if (error) console.error("Update cart quantity error:", error);
//   return data;
// }
