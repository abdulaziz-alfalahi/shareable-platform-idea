
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

type Testimonial = {
  quote: string;
  author: string;
  role: string;
  image?: string;
};

const testimonials: Testimonial[] = [
  {
    quote: "The Emirati Employment Gateway helped me identify my strengths and connect with employers who value my skills. I found my dream job within weeks.",
    author: "Fatima Al Marzooqi",
    role: "Software Engineer",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    quote: "As a recent graduate, I was unsure about my career path. The platform's assessment tools and advisor guidance were invaluable in helping me choose the right direction.",
    author: "Ahmed Al Shamsi",
    role: "Recent Graduate",
  },
  {
    quote: "The training programs recommended to me filled crucial gaps in my skill set. I'm now more confident and qualified for advanced positions in my field.",
    author: "Noura Al Kaabi",
    role: "Marketing Professional",
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-16 bg-emirati-sandstone/50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-emirati-oasisGreen">
          Success Stories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="h-full border-emirati-desertGold/30 hover:border-emirati-desertGold transition-all duration-300 hover:shadow-md">
              <CardContent className="p-6 flex flex-col h-full">
                <Quote className="h-8 w-8 text-emirati-oasisGreen mb-4 opacity-50" />
                <p className="text-gray-700 mb-6 flex-grow italic">"{testimonial.quote}"</p>
                <div className="flex items-center mt-auto">
                  {testimonial.image ? (
                    <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.author} 
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="h-12 w-12 rounded-full bg-emirati-desertGold flex items-center justify-center mr-4">
                      <span className="text-white font-bold">
                        {testimonial.author.charAt(0)}
                      </span>
                    </div>
                  )}
                  <div>
                    <h4 className="font-semibold text-emirati-oasisGreen">{testimonial.author}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
