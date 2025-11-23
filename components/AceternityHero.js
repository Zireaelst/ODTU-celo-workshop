"use client";
import React from "react";
import { motion } from "framer-motion";
import { HeroParallax } from "./hero-parallax";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { 
  Sparkles, 
  Shield, 
  Users, 
  TrendingUp, 
  Heart, 
  Globe,
  Zap,
  Star,
  ArrowRight
} from "lucide-react";

const products = [
  {
    title: "Clean Water Project",
    link: "/campaign/0x1",
    thumbnail: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=500&h=300&fit=crop",
  },
  {
    title: "Education for All",
    link: "/campaign/0x2", 
    thumbnail: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=500&h=300&fit=crop",
  },
  {
    title: "Renewable Energy",
    link: "/campaign/0x3",
    thumbnail: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=500&h=300&fit=crop",
  },
  {
    title: "Medical Aid Fund",
    link: "/campaign/0x4", 
    thumbnail: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500&h=300&fit=crop",
  },
  {
    title: "Forest Conservation",
    link: "/campaign/0x5",
    thumbnail: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500&h=300&fit=crop",
  },
  {
    title: "Tech Innovation Hub",
    link: "/campaign/0x6",
    thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=500&h=300&fit=crop",
  },
  {
    title: "Community Garden",
    link: "/campaign/0x7",
    thumbnail: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500&h=300&fit=crop",
  },
  {
    title: "Animal Rescue",
    link: "/campaign/0x8",
    thumbnail: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=500&h=300&fit=crop",
  },
  {
    title: "Disaster Relief",
    link: "/campaign/0x9",
    thumbnail: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=500&h=300&fit=crop",
  },
  {
    title: "Youth Empowerment",
    link: "/campaign/0x10",
    thumbnail: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&h=300&fit=crop",
  },
  {
    title: "Elderly Care",
    link: "/campaign/0x11", 
    thumbnail: "https://images.unsplash.com/photo-1559628129-86490a6f7dd8?w=500&h=300&fit=crop",
  },
  {
    title: "Climate Action",
    link: "/campaign/0x12",
    thumbnail: "https://images.unsplash.com/photo-1569163139230-de966dbe7afe?w=500&h=300&fit=crop",
  },
  {
    title: "Food Security",
    link: "/campaign/0x13",
    thumbnail: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=500&h=300&fit=crop",
  },
  {
    title: "Digital Literacy", 
    link: "/campaign/0x14",
    thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&h=300&fit=crop",
  },
  {
    title: "Arts & Culture",
    link: "/campaign/0x15",
    thumbnail: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=500&h=300&fit=crop",
  },
];

const features = [
  {
    icon: Shield,
    title: "Blockchain Security", 
    description: "Smart contracts ensure transparent and secure fund management on Celo blockchain"
  },
  {
    icon: Globe,
    title: "Global Impact",
    description: "Connect with causes worldwide and make a difference in communities across the globe"
  },
  {
    icon: Zap,
    title: "Instant Transactions",
    description: "Fast and low-cost transactions powered by Celo's mobile-first blockchain"
  },
  {
    icon: Users,
    title: "Community Driven",
    description: "Built by the community, for the community. Every voice matters in our ecosystem"
  },
  {
    icon: TrendingUp,
    title: "Real-time Tracking",
    description: "Monitor campaign progress and fund utilization with complete transparency"
  },
  {
    icon: Heart,
    title: "Impact Focused",
    description: "Every contribution creates measurable impact in the lives of people worldwide"
  }
];

const stats = [
  { value: "2.5M+", label: "CELO Raised", icon: TrendingUp },
  { value: "15K+", label: "Contributors", icon: Users },
  { value: "500+", label: "Campaigns", icon: Sparkles },
  { value: "98%", label: "Success Rate", icon: Star }
];

export default function AceternityHero() {
  return (
    <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Hero Section with Parallax */}
      <HeroParallax products={products}>
        <div className="mx-auto max-w-7xl px-4 pt-20 pb-10">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <Badge variant="outline" className="text-celo-green border-celo-green/50 mb-4">
                <Sparkles className="w-3 h-3 mr-1" />
                Powered by Celo Blockchain
              </Badge>
              <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-br from-slate-900 via-slate-800 to-slate-600 dark:from-slate-100 dark:via-slate-200 dark:to-slate-400 bg-clip-text text-transparent leading-tight">
                Crowdfunding
              </h1>
              <h2 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-celo-green via-celo-gold to-blue-600 bg-clip-text text-transparent leading-tight">
                Reimagined
              </h2>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto mb-8 leading-relaxed"
            >
              Democratize funding, amplify impact, and build a better world together on the{" "}
              <span className="text-celo-green font-semibold">Celo blockchain</span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
            >
              <Button size="lg" className="bg-celo-green hover:bg-celo-green/90 text-white px-8">
                <Sparkles className="w-5 h-5 mr-2" />
                Start a Campaign
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button variant="outline" size="lg" className="px-8">
                <Globe className="w-5 h-5 mr-2" />
                Explore Projects
              </Button>
            </motion.div>

            {/* Stats Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <stat.icon className="w-6 h-6 text-celo-green mr-2" />
                    <span className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-100">
                      {stat.value}
                    </span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 font-medium">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </HeroParallax>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4">
            <Shield className="w-3 h-3 mr-1" />
            Why Choose CeloImpact
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-6">
            Built for Impact,{" "}
            <span className="bg-gradient-to-r from-celo-green to-blue-600 bg-clip-text text-transparent">
              Powered by Community
            </span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Experience the future of crowdfunding with blockchain transparency, 
            global accessibility, and community-driven innovation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-slate-200 dark:border-slate-800">
                <CardHeader className="pb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-celo-green/20 to-blue-600/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <feature.icon className="w-6 h-6 text-celo-green" />
                  </div>
                  <CardTitle className="text-xl text-slate-900 dark:text-slate-100">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 dark:text-slate-300">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-celo-green to-blue-600 py-20">
        <div className="max-w-4xl mx-auto text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Make an Impact?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of changemakers using CeloImpact to fund projects 
              that matter. Your contribution can change the world.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                size="lg" 
                variant="secondary" 
                className="bg-white text-slate-900 hover:bg-white/90 px-8"
              >
                <Users className="w-5 h-5 mr-2" />
                Browse Campaigns
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-slate-900 px-8"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Start Your Project
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}