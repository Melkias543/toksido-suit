import { Product } from "../models/products.model.js";
import { Review } from "../models/review.model.js";




const SuitStatusController={

createSuitReview: async (req, res) => {
  try {
    // console.log("Body check:", req.body ,"and",req.params); 
     const {id}= req.params;
       const suit_id = id;
    
    const user_id = req.user.id; // Extracted from your JWT auth middleware  req.user
const { rating } = req.body;
    // 1. Validation
    if (!suit_id || !rating) {
      return res.status(400).json({ message: "Suit ID and rating are required." });
    }

    if(!user_id){
      return res.status(400).json({ message: "User not identified." });

    }
    // 2. Upsert the review (Update if exists, Create if not)
    // This respects the unique index: { user_id, suit_id }
    const review = await Review.findOneAndUpdate(
      { user_id, suit_id },
      { rating },
      { returnDocument: 'after',
        upsert: true, runValidators: true }
    );

    // 3. Calculate New Stats for the Suit
    // We fetch all reviews for this specific suit
    const stats = await Review.aggregate([
      { $match: { suit_id: review.suit_id } },
      {
        $group: {
          _id: '$suit_id',
          averageRating: { $avg: '$rating' },
          numberOfReviews: { $sum: 1 }
        }
      }
    ]);

    // 4. Update the Product document with the calculated stats
    // This makes displaying "Rating: 4.8 (120 reviews)" instant on the frontend
    if (stats.length > 0) {
      await Product.findByIdAndUpdate(suit_id, {
        ratingStats: {
          average: stats[0].averageRating.toFixed(1),
          total: stats[0].numberOfReviews
        }
      });
    }

    res.status(201).json({
      success: true,
      message: "Review saved and product stats updated.",
      data: review
    });

  } catch (error) {
    console.error("Review Controller Error:", error);
    res.status(500).json({ message: "Server error while processing review." });
  }
},



//  getSuitReviews: async (req, res) => {
//   try {
//     const { suitId } = req.params;

//     const reviews = await Review.find({ suit_id: suitId })
//       .populate('user_id', 'name image') // Only get public user info
//       .sort({ createdAt: -1 });

//     res.status(200).json(reviews);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching reviews." });
//   }
// }
}


export default SuitStatusController;


