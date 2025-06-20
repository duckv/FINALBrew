import { useEffect, useState } from "react";
import { Star } from "lucide-react";

interface Review {
  id: string;
  author_name: string;
  rating: number;
  text: string;
  time: number;
  relative_time_description: string;
}

const GoogleReviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [averageRating, setAverageRating] = useState(0);

  // Mock reviews data (replace with actual Google Places API integration)
  const mockReviews: Review[] = [
    {
      id: "1",
      author_name: "Sarah Johnson",
      rating: 5,
      text: "Amazing pastries and coffee! The croissants are buttery perfection and the espresso is consistently excellent. The staff is always friendly and the atmosphere is cozy.",
      time: Date.now() - 86400000,
      relative_time_description: "a day ago",
    },
    {
      id: "2",
      author_name: "Mike Chen",
      rating: 5,
      text: "Best bakery in Berkeley Heights! Their sourdough bread is incredible and the morning pastries are always fresh. Great place for breakfast meetings too.",
      time: Date.now() - 172800000,
      relative_time_description: "2 days ago",
    },
    {
      id: "3",
      author_name: "Emily Rodriguez",
      rating: 4,
      text: "Love the artisan breads here. The staff is knowledgeable about ingredients which is great for my dietary restrictions. Coffee is excellent too!",
      time: Date.now() - 432000000,
      relative_time_description: "5 days ago",
    },
    {
      id: "4",
      author_name: "David Thompson",
      rating: 5,
      text: "Fantastic local gem! The almond croissants are to die for and the atmosphere is perfect for working or catching up with friends. Highly recommend!",
      time: Date.now() - 604800000,
      relative_time_description: "a week ago",
    },
  ];

  useEffect(() => {
    // Simulate API call delay
    setTimeout(() => {
      setReviews(mockReviews);
      const avgRating =
        mockReviews.reduce((sum, review) => sum + review.rating, 0) /
        mockReviews.length;
      setAverageRating(avgRating);
      setLoading(false);
    }, 1000);
  }, []);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded mb-4"></div>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="flex space-x-2">
                  {[...Array(5)].map((_, j) => (
                    <div key={j} className="h-4 w-4 bg-gray-200 rounded"></div>
                  ))}
                </div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-heading text-2xl font-bold text-gray-900">
          Customer Reviews
        </h3>
        <div className="flex items-center space-x-2">
          <div className="flex">{renderStars(Math.round(averageRating))}</div>
          <span className="text-sm text-gray-600">
            {averageRating.toFixed(1)} ({reviews.length} reviews)
          </span>
        </div>
      </div>

      <div className="space-y-6">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="border-b border-gray-100 pb-6 last:border-b-0 last:pb-0"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="font-semibold text-gray-900">
                  {review.author_name}
                </h4>
                <div className="flex items-center space-x-2 mt-1">
                  <div className="flex">{renderStars(review.rating)}</div>
                  <span className="text-xs text-gray-500">
                    {review.relative_time_description}
                  </span>
                </div>
              </div>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">
              {review.text}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200 text-center">
        <p className="text-xs text-gray-500">
          Reviews automatically updated from Google
        </p>
      </div>
    </div>
  );
};

export default GoogleReviews;
