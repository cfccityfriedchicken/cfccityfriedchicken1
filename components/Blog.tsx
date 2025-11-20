
import React, { useState } from 'react';
import { Calendar, User, ArrowRight, ArrowLeft, Clock } from 'lucide-react';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  imageUrl: string;
  category: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "The Secret Behind Our Extra Crispy Zinger",
    excerpt: "Ever wondered what makes our Zinger Burger so irresistibly crunchy? We're spilling (some of) the beans on our secret breading technique.",
    content: `
      <p class="mb-4">At City Fried Chicken, we believe that the perfect Zinger Burger is a work of art. It starts with the chicken itself—we use only fresh, never frozen, whole muscle chicken fillets. No processed meat here!</p>
      <p class="mb-4"><strong>The Marinade:</strong> Our chicken is marinated for at least 12 hours in a special blend of spices. This ensures that the flavor penetrates deep into the meat, keeping it juicy and tender while it cooks.</p>
      <p class="mb-4"><strong>The Crunch:</strong> The real magic happens in the breading. We use a double-dip technique that creates those signature flakes you love. Fried at a precise temperature, the result is a golden-brown crust that stays crispy from the first bite to the last.</p>
      <p>Come taste the difference today at our New Lahore branch!</p>
    `,
    author: "Chef CFC",
    date: "Oct 12, 2023",
    readTime: "3 min read",
    imageUrl: "https://images.unsplash.com/photo-1619250907572-56550598f555?w=800&q=80",
    category: "Food Secrets"
  },
  {
    id: 2,
    title: "Why Pizza is the Ultimate Comfort Food",
    excerpt: "From cheesy pulls to spicy toppings, find out why pizza remains the number one choice for family gatherings and late-night cravings.",
    content: `
      <p class="mb-4">There is no problem in the world that a slice of pizza cannot solve. Okay, maybe that's an exaggeration, but it certainly helps!</p>
      <p class="mb-4"><strong>Science of Cheese:</strong> Did you know that cheese contains casein, which releases happy chemicals in your brain? That's why that first bite of our Royal Premium Pizza feels like a warm hug.</p>
      <p class="mb-4"><strong>Versatility:</strong> Whether you are a meat lover or a veggie enthusiast, pizza adapts to you. At CFC, we offer everything from the fiery 'Hot & Spicy' to the rich and creamy 'Malai Boti Pizza'.</p>
      <p>Order a large pizza today and turn your ordinary evening into a party.</p>
    `,
    author: "Sarah Khan",
    date: "Sep 28, 2023",
    readTime: "4 min read",
    imageUrl: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&q=80",
    category: "Lifestyle"
  },
  {
    id: 3,
    title: "Grand Opening: Introducing Our New Family Hall",
    excerpt: "We are excited to announce the opening of our newly renovated family dining hall. Experience fine fast food dining like never before.",
    content: `
      <p class="mb-4">We have heard your requests for more seating space, and we have delivered! We are thrilled to open the doors to our brand-new Family Hall at the Ada New Lahore branch.</p>
      <p class="mb-4"><strong>The Ambiance:</strong> Designed with comfort in mind, our new hall features cozy booth seating, warm lighting, and a dedicated play area for kids. It's the perfect spot for birthday parties and family dinners.</p>
      <p class="mb-4"><strong>Table Service:</strong> Enjoy our new table service feature. Just scan the QR code at your table, place your order, and let us bring the food to you while you relax.</p>
      <p>Visit us this weekend and get a complimentary ice cream scoop with every family deal!</p>
    `,
    author: "CFC Management",
    date: "Nov 05, 2023",
    readTime: "2 min read",
    imageUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80",
    category: "News & Events"
  }
];

export const Blog: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const handleReadMore = (post: BlogPost) => {
    setSelectedPost(post);
    // Slight delay to allow render, then scroll to top of section
    setTimeout(() => {
        document.getElementById('blog')?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  const handleBack = () => {
    setSelectedPost(null);
    setTimeout(() => {
        document.getElementById('blog')?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  return (
    <section id="blog" className="py-20 bg-gray-50 scroll-mt-16">
      <div className="container mx-auto px-4">
        
        {selectedPost ? (
          // SINGLE POST VIEW
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden animate-in slide-in-from-right duration-300">
            <div className="relative h-64 sm:h-96">
              <img 
                src={selectedPost.imageUrl} 
                alt={selectedPost.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <button 
                onClick={handleBack}
                className="absolute top-6 left-6 bg-white/90 hover:bg-white text-gray-900 px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg transition-all hover:scale-105"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Blog
              </button>
            </div>
            
            <div className="p-8 sm:p-12">
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
                <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full font-semibold">{selectedPost.category}</span>
                <div className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {selectedPost.date}</div>
                <div className="flex items-center gap-1"><User className="w-4 h-4" /> {selectedPost.author}</div>
                <div className="flex items-center gap-1"><Clock className="w-4 h-4" /> {selectedPost.readTime}</div>
              </div>
              
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-8 leading-tight">{selectedPost.title}</h2>
              
              <div 
                className="prose prose-lg max-w-none text-gray-600 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: selectedPost.content }} 
              />

              <div className="mt-12 pt-8 border-t border-gray-100">
                <h4 className="font-bold text-gray-900 mb-4">Share this post</h4>
                <div className="flex gap-4">
                    <button className="bg-[#1877F2] text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition">Facebook</button>
                    <button className="bg-[#1DA1F2] text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition">Twitter</button>
                    <button className="bg-[#25D366] text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition">WhatsApp</button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // LIST VIEW
          <>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Latest News & Flavor <span className="text-red-600">Stories</span></h2>
              <p className="text-gray-500 max-w-xl mx-auto">Discover the stories behind our food, meet our chefs, and get the latest updates from CFC.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <article 
                    key={post.id} 
                    className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col h-full group"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img 
                      src={post.imageUrl} 
                      alt={post.title} 
                      className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500 ease-out"
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg text-xs font-bold text-red-600 shadow-sm">
                        {post.category}
                    </div>
                  </div>
                  
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-500 text-sm line-clamp-3 mb-6 flex-1">
                      {post.excerpt}
                    </p>
                    
                    <button 
                      onClick={() => handleReadMore(post)}
                      className="inline-flex items-center gap-2 text-red-600 font-bold text-sm hover:gap-3 transition-all group-hover:text-red-700"
                    >
                      Read Article <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};
