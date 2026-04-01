
import { Product } from '../models/product.model.js'
import { Recommendation } from '../models/recommendation.model.js'

// 1. Recommend by last purchased product's category
async function recommendByCategory(userId) {
  const lastOrder = await Order.findOne({ user_id: userId })
    .sort({ createdAt: -1 })
    .populate('orderItems.product_id')

  if (!lastOrder) return []

  const lastProduct = lastOrder.orderItems[0].product_id

  const similarProducts = await Product.find({
    category_id: lastProduct.category_id,
    _id: { $ne: lastProduct._id }
  })

  // Save recommendations in DB
  for (let prod of similarProducts) {
    await Recommendation.updateOne(
      { user_id: userId, product_id: prod._id },
      { $set: { user_id: userId, product_id: prod._id } },
      { upsert: true }
    )
  }

  return similarProducts
}

// 2. Recommend top-rated products
async function recommendTopRated(limit = 5) {
  return Product.find().sort({ rating: -1 }).limit(limit)
}

// 3. Recommend most popular products
async function recommendMostPopular(limit = 5) {
  const popular = await OrderItem.aggregate([
    { $group: { _id: "$product_id", count: { $sum: "$quantity" } } },
    { $sort: { count: -1 } },
    { $limit: limit }
  ])

  return Product.find({ _id: { $in: popular.map(p => p._id) } })
}

// 4. Combine all strategies
export async function getRecommendations(userId) {
  const categoryRecos = await recommendByCategory(userId)
  const topRated = await recommendTopRated()
  const popular = await recommendMostPopular()

  const combined = [...categoryRecos, ...topRated, ...popular]

  // Remove duplicates
  const unique = Array.from(new Set(combined.map(p => p._id.toString())))
    .map(id => combined.find(p => p._id.toString() === id))

  return unique
}