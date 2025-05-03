"use client"

import React from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { Shield, BookOpen, ArrowRight, Heart, ChevronRight, ChurchIcon as Mosque, Calendar, Users, Clock, CheckCircle, Moon } from 'lucide-react'

export const Home: React.FC = () => {
  const navigate = useNavigate()
  
  const handleDonateClick = () => {
    navigate("/donation")
  }

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  return (
    <div className="overflow-hidden">
      {/* Hero Section with Islamic Pattern Background */}
      <section className="relative bg-gradient-to-b from-emerald-600 to-emerald-800 py-24 lg:py-32 overflow-hidden">
        {/* Islamic Pattern Overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("https://images.unsplash.com/photo-1584286595398-a96c206e012d?q=80&w=2000&auto=format")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-2 bg-amber-500 opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-full h-8 bg-emerald-900 opacity-20"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <motion.div 
              className="lg:w-1/2 text-center lg:text-left"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
            >
              <div className="flex justify-center lg:justify-start mb-6">
                <div className="inline-flex items-center gap-3 bg-white/10 px-4 py-2 rounded-full">
                  <Mosque className="h-5 w-5 text-amber-300" />
                  <span className="text-amber-100 font-medium">Supporting Masjids Worldwide</span>
                </div>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Empowering <span className="text-amber-300">Masjids</span> Through Digital Donations
              </h1>
              
              <p className="text-lg text-emerald-50 opacity-90 mb-8 max-w-xl mx-auto lg:mx-0">
                PaySadaka makes it easy to contribute to mosques, Ramadan initiatives, and Islamic charities in your area. 
                Join thousands of donors in making a meaningful difference.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button 
                  onClick={handleDonateClick}
                  className="px-8 py-4 bg-amber-500 hover:bg-amber-600 text-emerald-900 font-bold rounded-full transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                >
                  Start Donating
                  <ArrowRight className="h-5 w-5" />
                </button>
                
                <button 
                  onClick={() => navigate("/about")}
                  className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-medium rounded-full transition-all flex items-center justify-center gap-2 border border-white/30"
                >
                  Learn More
                </button>
              </div>
            </motion.div>
            
            <motion.div 
              className="lg:w-1/2"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-32 h-32 bg-amber-400/20 rounded-full blur-2xl"></div>
                <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-emerald-300/20 rounded-full blur-3xl"></div>
                
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-8 border-white relative z-10">
                  <img 
                    src="/images/mosque1.png" 
                    alt="Beautiful Mosque" 
                    className="w-full h-64 md:h-80 object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/placeholder.svg?height=400&width=600"
                    }}
                  />
                  
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="h-2 w-2 bg-amber-400 rounded-full animate-pulse"></div>
                      <span className="text-white text-sm font-medium">Featured Masjid</span>
                    </div>
                    <h3 className="text-white text-xl font-bold">Al-Noor Masjid</h3>
                    <p className="text-white/80 text-sm">Supporting community services and education</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-6">
              <div className="text-3xl md:text-4xl font-bold text-emerald-600 mb-2">150+</div>
              <p className="text-gray-600">Masjids Supported</p>
            </div>
            <div className="p-6">
              <div className="text-3xl md:text-4xl font-bold text-emerald-600 mb-2">₦25M+</div>
              <p className="text-gray-600">Donations Processed</p>
            </div>
            <div className="p-6">
              <div className="text-3xl md:text-4xl font-bold text-emerald-600 mb-2">5,000+</div>
              <p className="text-gray-600">Active Donors</p>
            </div>
            <div className="p-6">
              <div className="text-3xl md:text-4xl font-bold text-emerald-600 mb-2">98%</div>
              <p className="text-gray-600">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Icons Section with Islamic Design */}
      <section className="py-20 bg-emerald-50 relative overflow-hidden">
        {/* Islamic Pattern Background */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("https://images.unsplash.com/photo-1604076913837-52ab5629fba9?q=80&w=2000&auto=format")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            mixBlendMode: "multiply",
          }}
        ></div>
        
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-emerald-200"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-emerald-800 mb-4">Why Choose PaySadaka</h2>
            <div className="flex items-center justify-center mb-6">
              <div className="h-0.5 w-12 bg-amber-500"></div>
              <div className="h-2 w-2 rounded-full bg-amber-500 mx-2"></div>
              <div className="h-0.5 w-12 bg-amber-500"></div>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our platform is designed with Islamic values at its core, providing a seamless and secure donation experience.
            </p>
          </div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {/* Feature 1 */}
            <motion.div 
              className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-emerald-600 hover:shadow-xl transition-shadow"
              variants={fadeIn}
            >
              <div className="flex justify-center mb-6">
                <div className="bg-emerald-100 p-4 rounded-full">
                  <Shield className="h-8 w-8 text-emerald-600" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-emerald-700 mb-4 text-center">Secure Donations</h3>
              <p className="text-gray-600 text-center">
                Your contributions are processed with bank-level security protocols, ensuring your information remains protected.
              </p>
              <ul className="mt-6 space-y-2">
                <li className="flex items-center text-gray-600 text-sm">
                  <CheckCircle className="h-4 w-4 text-emerald-500 mr-2 flex-shrink-0" />
                  <span>End-to-end encryption</span>
                </li>
                <li className="flex items-center text-gray-600 text-sm">
                  <CheckCircle className="h-4 w-4 text-emerald-500 mr-2 flex-shrink-0" />
                  <span>Verified payment gateways</span>
                </li>
                <li className="flex items-center text-gray-600 text-sm">
                  <CheckCircle className="h-4 w-4 text-emerald-500 mr-2 flex-shrink-0" />
                  <span>Fraud prevention systems</span>
                </li>
              </ul>
            </motion.div>

            {/* Feature 2 */}
            <motion.div 
              className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-emerald-600 hover:shadow-xl transition-shadow"
              variants={fadeIn}
            >
              <div className="flex justify-center mb-6">
                <div className="bg-emerald-100 p-4 rounded-full">
                  <BookOpen className="h-8 w-8 text-emerald-600" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-emerald-700 mb-4 text-center">Transparent Records</h3>
              <p className="text-gray-600 text-center">
                Track all donations with detailed transaction records, ensuring complete transparency in your charitable giving.
              </p>
              <ul className="mt-6 space-y-2">
                <li className="flex items-center text-gray-600 text-sm">
                  <CheckCircle className="h-4 w-4 text-emerald-500 mr-2 flex-shrink-0" />
                  <span>Detailed donation receipts</span>
                </li>
                <li className="flex items-center text-gray-600 text-sm">
                  <CheckCircle className="h-4 w-4 text-emerald-500 mr-2 flex-shrink-0" />
                  <span>Transaction history dashboard</span>
                </li>
                <li className="flex items-center text-gray-600 text-sm">
                  <CheckCircle className="h-4 w-4 text-emerald-500 mr-2 flex-shrink-0" />
                  <span>Impact reporting</span>
                </li>
              </ul>
            </motion.div>

            {/* Feature 3 */}
            <motion.div 
              className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-emerald-600 hover:shadow-xl transition-shadow"
              variants={fadeIn}
            >
              <div className="flex justify-center mb-6">
                <div className="bg-emerald-100 p-4 rounded-full">
                  <Clock className="h-8 w-8 text-emerald-600" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-emerald-700 mb-4 text-center">Seamless Transfers</h3>
              <p className="text-gray-600 text-center">
                Quick and hassle-free transfers directly to the Masjids, with immediate confirmation and tracking.
              </p>
              <ul className="mt-6 space-y-2">
                <li className="flex items-center text-gray-600 text-sm">
                  <CheckCircle className="h-4 w-4 text-emerald-500 mr-2 flex-shrink-0" />
                  <span>Instant processing</span>
                </li>
                <li className="flex items-center text-gray-600 text-sm">
                  <CheckCircle className="h-4 w-4 text-emerald-500 mr-2 flex-shrink-0" />
                  <span>Multiple payment methods</span>
                </li>
                <li className="flex items-center text-gray-600 text-sm">
                  <CheckCircle className="h-4 w-4 text-emerald-500 mr-2 flex-shrink-0" />
                  <span>Automated receipts</span>
                </li>
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Donation Types Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-emerald-800 mb-4">Support What Matters</h2>
            <div className="flex items-center justify-center mb-6">
              <div className="h-0.5 w-12 bg-amber-500"></div>
              <div className="h-2 w-2 rounded-full bg-amber-500 mx-2"></div>
              <div className="h-0.5 w-12 bg-amber-500"></div>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose from various donation types to support causes that are important to you and your community.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Donation Type 1 */}
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="h-48 bg-emerald-600 relative overflow-hidden">
                <img 
                  src="/images/mosque2.png" 
                  alt="Masjid Donation" 
                  className="w-full h-full object-cover opacity-80"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/placeholder.svg?height=200&width=400"
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/90 rounded-full p-4">
                    <Mosque className="h-8 w-8 text-emerald-600" />
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-emerald-700 mb-2">Masjid Donations</h3>
                <p className="text-gray-600 mb-4">
                  Support your local mosque with funds for maintenance, expansion, and community services.
                </p>
                <button 
                  onClick={() => navigate("/donation?type=masjid")}
                  className="flex items-center text-emerald-600 font-medium hover:text-emerald-700 transition-colors"
                >
                  Donate to a Masjid
                  <ChevronRight className="h-5 w-5 ml-1" />
                </button>
              </div>
            </div>
            
            {/* Donation Type 2 */}
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="h-48 bg-emerald-600 relative overflow-hidden">
                <img 
                  src="/images/charity1.png" 
                  alt="Charity Donation" 
                  className="w-full h-full object-cover opacity-80"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/placeholder.svg?height=200&width=400"
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/90 rounded-full p-4">
                    <Heart className="h-8 w-8 text-emerald-600" />
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-emerald-700 mb-2">Charity Donations</h3>
                <p className="text-gray-600 mb-4">
                  Support Islamic charities working on humanitarian aid, education, and community development.
                </p>
                <button 
                  onClick={() => navigate("/donation?type=charity")}
                  className="flex items-center text-emerald-600 font-medium hover:text-emerald-700 transition-colors"
                >
                  Donate to a Charity
                  <ChevronRight className="h-5 w-5 ml-1" />
                </button>
              </div>
            </div>
            
            {/* Donation Type 3 */}
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="h-48 bg-emerald-600 relative overflow-hidden">
                <img 
                  src="/images/mosque3.png" 
                  alt="Ramadan Donation" 
                  className="w-full h-full object-cover opacity-80"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/placeholder.svg?height=200&width=400"
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/90 rounded-full p-4">
                    <Moon className="h-8 w-8 text-emerald-600" />
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-emerald-700 mb-2">Ramadan Initiatives</h3>
                <p className="text-gray-600 mb-4">
                  Support special Ramadan programs including iftar meals, taraweeh prayers, and community events.
                </p>
                <button 
                  onClick={() => navigate("/donation?type=ramadan")}
                  className="flex items-center text-emerald-600 font-medium hover:text-emerald-700 transition-colors"
                >
                  Support Ramadan
                  <ChevronRight className="h-5 w-5 ml-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-emerald-900 text-white relative overflow-hidden">
        {/* Islamic Pattern Background */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("https://images.unsplash.com/photo-1588764815242-a465083d4fee?q=80&w=2000&auto=format")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">What Our Community Says</h2>
            <div className="flex items-center justify-center mb-6">
              <div className="h-0.5 w-12 bg-amber-400"></div>
              <div className="h-2 w-2 rounded-full bg-amber-400 mx-2"></div>
              <div className="h-0.5 w-12 bg-amber-400"></div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
              <div className="mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className="text-amber-400">★</span>
                ))}
              </div>
              <p className="text-emerald-50 italic mb-6">
                "PaySadaka has made it incredibly easy for me to support my local masjid regularly. The transparency and ease of use are unmatched."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 font-bold mr-4">
                  AH
                </div>
                <div>
                  <h4 className="font-medium text-white">Ahmed Hassan</h4>
                  <p className="text-emerald-200 text-sm">Regular Donor</p>
                </div>
              </div>
            </div>
            
            {/* Testimonial 2 */}
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
              <div className="mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className="text-amber-400">★</span>
                ))}
              </div>
              <p className="text-emerald-50 italic mb-6">
                "As a masjid administrator, PaySadaka has revolutionized how we receive donations. The platform is secure and the reporting is excellent."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 font-bold mr-4">
                  MI
                </div>
                <div>
                  <h4 className="font-medium text-white">Muhammad Ibrahim</h4>
                  <p className="text-emerald-200 text-sm">Masjid Administrator</p>
                </div>
              </div>
            </div>
            
            {/* Testimonial 3 */}
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
              <div className="mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className="text-amber-400">★</span>
                ))}
              </div>
              <p className="text-emerald-50 italic mb-6">
                "I love how I can donate to multiple charities and masjids through one platform. The Ramadan campaign feature was especially helpful."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 font-bold mr-4">
                  FY
                </div>
                <div>
                  <h4 className="font-medium text-white">Fatima Yusuf</h4>
                  <p className="text-emerald-200 text-sm">Monthly Contributor</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-emerald-700 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-2 bg-amber-500 opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-full h-2 bg-amber-500 opacity-30"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                Ready to Make a Difference?
              </h2>
              <p className="text-xl text-emerald-50 mb-10 max-w-2xl mx-auto">
                Join thousands of donors supporting their local communities through PaySadaka. Every contribution matters.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={handleDonateClick}
                  className="px-8 py-4 bg-amber-500 hover:bg-amber-600 text-emerald-900 font-bold rounded-full transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                >
                  Start Donating Now
                  <ArrowRight className="h-5 w-5" />
                </button>
                
                <button 
                  onClick={() => navigate("/register")}
                  className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-medium rounded-full transition-all flex items-center justify-center gap-2 border border-white/30"
                >
                  Create an Account
                </button>
              </div>
              
              <div className="mt-10 flex items-center justify-center gap-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-emerald-100 border-2 border-emerald-600 flex items-center justify-center text-xs font-medium text-emerald-700">
                      {i}
                    </div>
                  ))}
                </div>
                <p className="text-emerald-50 text-sm">
                  <span className="font-bold">5,000+</span> people joined in the last month
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Islamic Quote Section */}
      <section className="py-16 bg-emerald-50">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <div className="text-amber-500 text-4xl font-arabic mb-6">"صدقة"</div>
            <p className="text-xl text-gray-700 italic mb-4">
              "The example of those who spend their wealth in the way of Allah is like a seed which grows seven spikes; in each spike is a hundred grains. And Allah multiplies for whom He wills."
            </p>
            <p className="text-emerald-600 font-medium">— Quran 2:261</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
