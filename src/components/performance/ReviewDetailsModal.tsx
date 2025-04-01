
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Review } from "@/lib/types";
import { Star } from "lucide-react";

interface ReviewDetailsModalProps {
  review: Review | null;
  isOpen: boolean;
  onClose: () => void;
}

const ReviewDetailsModal = ({ review, isOpen, onClose }: ReviewDetailsModalProps) => {
  if (!review) return null;

  const renderStars = (score: number) => {
    const stars = [];
    const fullStars = Math.floor(score);
    const hasHalfStar = score % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="h-5 w-5 fill-yellow-400 text-yellow-400" />);
    }
    
    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <Star className="h-5 w-5 text-yellow-400" />
          <div className="absolute top-0 left-0 w-1/2 overflow-hidden">
            <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
          </div>
        </div>
      );
    }
    
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="h-5 w-5 text-gray-300" />);
    }
    
    return <div className="flex items-center gap-1">{stars}</div>;
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl">Performance Review: {review.period}</DialogTitle>
          <DialogDescription>
            Reviewed by: {review.reviewerName}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="flex items-center gap-2">
            <span className="font-medium">Rating:</span>
            <div className="flex items-center gap-2">
              {renderStars(review.score)}
              <span>({review.score}/5)</span>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-2">Strengths:</h3>
            <p className="text-sm text-muted-foreground bg-muted p-3 rounded-md">
              {review.strengths}
            </p>
          </div>
          
          <div>
            <h3 className="font-medium mb-2">Areas for Improvement:</h3>
            <p className="text-sm text-muted-foreground bg-muted p-3 rounded-md">
              {review.improvements}
            </p>
          </div>
          
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Submission Date: {new Date(review.submissionDate).toLocaleDateString()}</span>
            <span className={`px-2 py-1 text-xs rounded-full ${
              review.status === 'COMPLETED' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-amber-100 text-amber-800'
            }`}>
              {review.status}
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewDetailsModal;
