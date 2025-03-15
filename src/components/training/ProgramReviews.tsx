
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Star, MessageSquare, ThumbsUp, CalendarDays, User } from "lucide-react";
import { useToast } from "@/hooks/toast";

interface Review {
  id: string;
  programId: string;
  programName: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
}

interface ProgramReviewsProps {
  programId?: string;
  programName?: string;
}

// Mock reviews data
const mockReviews: Review[] = [
  {
    id: "1",
    programId: "p1",
    programName: "Advanced Digital Marketing",
    userName: "Ahmed Al Mansoori",
    rating: 5,
    comment: "This program exceeded my expectations. The instructors were knowledgeable and the content was relevant to the UAE job market. I've already applied several techniques in my current position.",
    date: "2023-10-15",
    helpful: 12
  },
  {
    id: "2",
    programId: "p1",
    programName: "Advanced Digital Marketing",
    userName: "Fatima Al Hashimi",
    rating: 4,
    comment: "Great program with practical insights. I would have appreciated more UAE-specific case studies, but overall the knowledge gained was valuable.",
    date: "2023-09-22",
    helpful: 8
  },
  {
    id: "3",
    programId: "p2",
    programName: "Project Management Fundamentals",
    userName: "Khalid Al Shamsi",
    rating: 5,
    comment: "This course prepared me well for my PMP certification. The instructors shared relevant examples from UAE industries which was very helpful.",
    date: "2023-10-05",
    helpful: 15
  }
];

const ProgramReviews: React.FC<ProgramReviewsProps> = ({ programId, programName }) => {
  const { toast } = useToast();
  const [reviews, setReviews] = useState<Review[]>(mockReviews);
  const [newReview, setNewReview] = useState({ rating: 0, comment: "" });
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  
  // Filter reviews based on programId if provided
  const filteredReviews = programId 
    ? reviews.filter(review => review.programId === programId)
    : reviews;

  const handleRatingClick = (rating: number) => {
    setNewReview(prev => ({ ...prev, rating }));
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewReview(prev => ({ ...prev, comment: e.target.value }));
  };

  const handleSubmitReview = () => {
    if (newReview.rating === 0) {
      toast({
        title: "Rating Required",
        description: "Please select a star rating for your review.",
        variant: "destructive"
      });
      return;
    }

    if (!newReview.comment.trim()) {
      toast({
        title: "Comment Required",
        description: "Please provide feedback in your review.",
        variant: "destructive"
      });
      return;
    }

    // In a real application, this would be a database call
    const newReviewObj: Review = {
      id: `new-${Date.now()}`,
      programId: programId || "p1",
      programName: programName || "Training Program",
      userName: "Current User",
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toISOString().split("T")[0],
      helpful: 0
    };

    setReviews(prev => [newReviewObj, ...prev]);
    setNewReview({ rating: 0, comment: "" });
    setReviewDialogOpen(false);
    
    toast({
      title: "Review Submitted",
      description: "Thank you for sharing your feedback!"
    });
  };

  const handleHelpfulClick = (reviewId: string) => {
    setReviews(prev => 
      prev.map(review => 
        review.id === reviewId 
          ? { ...review, helpful: review.helpful + 1 } 
          : review
      )
    );
    
    toast({
      title: "Feedback Recorded",
      description: "You found this review helpful."
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <MessageSquare className="mr-2 h-5 w-5 text-emirati-oasisGreen" />
          Program Reviews
        </CardTitle>
        <CardDescription>
          Read feedback from Emiratis who have completed these training programs
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-6">
          <div>
            {programName ? (
              <h3 className="font-medium text-lg">{programName}</h3>
            ) : (
              <Tabs defaultValue="all" className="w-[400px]">
                <TabsList>
                  <TabsTrigger value="all">All Programs</TabsTrigger>
                  <TabsTrigger value="digital">Digital Marketing</TabsTrigger>
                  <TabsTrigger value="project">Project Management</TabsTrigger>
                </TabsList>
              </Tabs>
            )}
          </div>
          
          <Dialog open={reviewDialogOpen} onOpenChange={setReviewDialogOpen}>
            <DialogTrigger asChild>
              <Button>Write a Review</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Write a Review</DialogTitle>
                <DialogDescription>
                  Share your experience with this training program to help other Emiratis make informed decisions.
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                <div>
                  <label className="text-sm font-medium">Your Rating</label>
                  <div className="flex gap-1 mt-2">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        type="button"
                        onClick={() => handleRatingClick(rating)}
                        className="text-gray-300 hover:text-emirati-desertGold transition-colors"
                      >
                        <Star 
                          className={`h-6 w-6 ${
                            rating <= newReview.rating 
                              ? "fill-emirati-desertGold text-emirati-desertGold" 
                              : "fill-none"
                          }`} 
                        />
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium">Your Review</label>
                  <Textarea
                    placeholder="Share your experience with this program..."
                    className="mt-2"
                    rows={4}
                    value={newReview.comment}
                    onChange={handleCommentChange}
                  />
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setReviewDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleSubmitReview}>Submit Review</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        
        {filteredReviews.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded-md">
            <p className="text-gray-500">No reviews yet. Be the first to share your experience!</p>
          </div>
        ) : (
          <div className="space-y-5">
            {filteredReviews.map((review) => (
              <div key={review.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${
                            i < review.rating 
                              ? "fill-emirati-desertGold text-emirati-desertGold" 
                              : "text-gray-300"
                          }`} 
                        />
                      ))}
                    </div>
                    
                    <h4 className="font-medium mt-2">{review.programName}</h4>
                  </div>
                  
                  <div className="flex items-center text-gray-500 text-sm">
                    <User className="h-3.5 w-3.5 mr-1" />
                    <span>{review.userName}</span>
                  </div>
                </div>
                
                <p className="text-gray-700 mt-3 text-sm">{review.comment}</p>
                
                <div className="flex justify-between items-center mt-4 pt-2 border-t text-sm text-gray-500">
                  <div className="flex items-center">
                    <CalendarDays className="h-3.5 w-3.5 mr-1" />
                    <span>{review.date}</span>
                  </div>
                  
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-xs"
                    onClick={() => handleHelpfulClick(review.id)}
                  >
                    <ThumbsUp className="h-3.5 w-3.5 mr-1" />
                    Helpful ({review.helpful})
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProgramReviews;
