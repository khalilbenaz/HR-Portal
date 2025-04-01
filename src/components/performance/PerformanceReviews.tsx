
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ExternalLink, Star } from "lucide-react";
import { Review } from "@/lib/types";
import ReviewDetailsModal from "./ReviewDetailsModal";

interface PerformanceReviewsProps {
  reviews: Review[];
  loading: boolean;
}

const PerformanceReviews = ({ reviews, loading }: PerformanceReviewsProps) => {
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openReviewDetails = (review: Review) => {
    setSelectedReview(review);
    setIsModalOpen(true);
  };

  const closeReviewDetails = () => {
    setIsModalOpen(false);
    setSelectedReview(null);
  };

  if (loading) {
    return (
      <div className="h-[300px] flex items-center justify-center">
        <p className="text-muted-foreground">Loading performance reviews...</p>
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="h-[300px] flex flex-col items-center justify-center">
        <p className="text-muted-foreground">No performance reviews found</p>
      </div>
    );
  }

  const renderStars = (score: number) => {
    const stars = [];
    const fullStars = Math.floor(score);
    const hasHalfStar = score % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="h-4 w-4 fill-yellow-400 text-yellow-400" />);
    }
    
    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <Star className="h-4 w-4 text-yellow-400" />
          <div className="absolute top-0 left-0 w-1/2 overflow-hidden">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          </div>
        </div>
      );
    }
    
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="h-4 w-4 text-gray-300" />);
    }
    
    return <div className="flex items-center gap-0.5">{stars}</div>;
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Period</TableHead>
            <TableHead>Manager</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reviews.map((review) => (
            <TableRow key={review.id}>
              <TableCell className="font-medium">{review.period}</TableCell>
              <TableCell>{review.reviewerName}</TableCell>
              <TableCell>
                {review.status === 'COMPLETED' ? (
                  <div className="flex items-center gap-2">
                    {renderStars(review.score)}
                    <span className="text-sm">({review.score})</span>
                  </div>
                ) : (
                  <span className="text-muted-foreground">Pending</span>
                )}
              </TableCell>
              <TableCell>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  review.status === 'COMPLETED' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-amber-100 text-amber-800'
                }`}>
                  {review.status}
                </span>
              </TableCell>
              <TableCell className="text-right">
                {review.status === 'COMPLETED' && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="flex items-center gap-2"
                    onClick={() => openReviewDetails(review)}
                  >
                    <span>View Details</span>
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      <ReviewDetailsModal 
        review={selectedReview} 
        isOpen={isModalOpen} 
        onClose={closeReviewDetails} 
      />
    </div>
  );
};

export default PerformanceReviews;
