'use client';

import { useState } from 'react';
import { useAccount } from 'wagmi';
import { motion } from 'framer-motion';
import { ArrowLeft, Upload, Calendar, Target, DollarSign, Users, FileText, Image as ImageIcon, Sparkles, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import CreateCampaignModal from '../../components/CreateCampaignModal';

const steps = [
  {
    id: 1,
    title: 'Campaign Details',
    description: 'Basic information about your campaign',
    icon: FileText,
    fields: ['title', 'description', 'category']
  },
  {
    id: 2,
    title: 'Funding Goal',
    description: 'Set your funding target and timeline',
    icon: Target,
    fields: ['target', 'deadline']
  },
  {
    id: 3,
    title: 'Media & Story',
    description: 'Add images and detailed story',
    icon: ImageIcon,
    fields: ['images', 'story']
  },
  {
    id: 4,
    title: 'Review & Launch',
    description: 'Review and publish your campaign',
    icon: CheckCircle,
    fields: []
  }
];

const categories = [
  { id: 'technology', name: 'Technology', color: 'bg-blue-500' },
  { id: 'health', name: 'Health & Medical', color: 'bg-red-500' },
  { id: 'education', name: 'Education', color: 'bg-green-500' },
  { id: 'environment', name: 'Environment', color: 'bg-emerald-500' },
  { id: 'community', name: 'Community', color: 'bg-purple-500' },
  { id: 'arts', name: 'Arts & Culture', color: 'bg-pink-500' },
  { id: 'humanitarian', name: 'Humanitarian', color: 'bg-orange-500' },
  { id: 'animals', name: 'Animals', color: 'bg-yellow-500' },
];

export default function CreatePage() {
  const { isConnected } = useAccount();
  const [currentStep, setCurrentStep] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    target: '',
    deadline: '',
    story: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    if (isConnected) {
      setIsModalOpen(true);
    } else {
      alert('Please connect your wallet first');
    }
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md mx-auto"
        >
          <div className="w-24 h-24 bg-gradient-to-br from-celo-green/20 to-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Users className="w-12 h-12 text-celo-green" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Connect Your Wallet
          </h1>
          <p className="text-gray-600 mb-8">
            You need to connect your wallet to create a campaign on the Celo blockchain.
          </p>
          <Link href="/">
            <Button className="bg-celo-green hover:bg-celo-green/90">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Link href="/" className="inline-flex items-center text-celo-green hover:text-celo-green/80 mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Campaigns
          </Link>
          
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="w-6 h-6 text-celo-green mr-2" />
            <Badge variant="outline" className="text-celo-green border-celo-green/50">
              Create Campaign
            </Badge>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Turn Your Vision Into{" "}
            <span className="bg-gradient-to-r from-celo-green to-blue-600 bg-clip-text text-transparent">
              Reality
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Create a crowdfunding campaign and get support from the global Celo community
          </p>
        </motion.div>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0.5 }}
                  animate={{ 
                    scale: currentStep >= step.id ? 1 : 0.8,
                    opacity: currentStep >= step.id ? 1 : 0.5
                  }}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                    currentStep >= step.id 
                      ? 'bg-celo-green text-white' 
                      : 'bg-gray-200 text-gray-400'
                  }`}
                >
                  {currentStep > step.id ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <step.icon className="w-5 h-5" />
                  )}
                </motion.div>
                {index < steps.length - 1 && (
                  <div className={`w-full h-1 ml-4 transition-all ${
                    currentStep > step.id ? 'bg-celo-green' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              {steps[currentStep - 1].title}
            </h2>
            <p className="text-gray-600">
              {steps[currentStep - 1].description}
            </p>
          </div>
        </div>

        {/* Form Content */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              {React.createElement(steps[currentStep - 1].icon, { className: "w-5 h-5 mr-2" })}
              Step {currentStep} of {steps.length}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {currentStep === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Campaign Title *
                  </label>
                  <Input
                    placeholder="Give your campaign a compelling title"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Short Description *
                  </label>
                  <textarea
                    placeholder="Briefly describe what your campaign is about"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    className="w-full min-h-[100px] p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-celo-green focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => handleInputChange('category', category.id)}
                        className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                          formData.category === category.id
                            ? 'border-celo-green bg-celo-green/10 text-celo-green'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded-full ${category.color} mx-auto mb-2`}></div>
                        {category.name}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Funding Goal (CELO) *
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      type="number"
                      placeholder="1000"
                      value={formData.target}
                      onChange={(e) => handleInputChange('target', e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Set a realistic funding goal for your campaign
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Campaign Deadline *
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      type="date"
                      value={formData.deadline}
                      onChange={(e) => handleInputChange('deadline', e.target.value)}
                      className="pl-10"
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Choose when your campaign should end
                  </p>
                </div>
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Campaign Image
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-celo-green transition-colors cursor-pointer">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Click to upload campaign image</p>
                    <p className="text-sm text-gray-400 mt-1">PNG, JPG up to 10MB</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Detailed Story
                  </label>
                  <textarea
                    placeholder="Tell the full story of your campaign. Why is it important? How will the funds be used?"
                    value={formData.story}
                    onChange={(e) => handleInputChange('story', e.target.value)}
                    className="w-full min-h-[200px] p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-celo-green focus:border-transparent"
                  />
                </div>
              </motion.div>
            )}

            {currentStep === 4 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Campaign Summary</h3>
                  <div className="space-y-3">
                    <div><strong>Title:</strong> {formData.title || 'Not specified'}</div>
                    <div><strong>Category:</strong> {categories.find(c => c.id === formData.category)?.name || 'Not selected'}</div>
                    <div><strong>Goal:</strong> {formData.target || '0'} CELO</div>
                    <div><strong>Deadline:</strong> {formData.deadline || 'Not set'}</div>
                    <div><strong>Description:</strong> {formData.description || 'No description'}</div>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-blue-800">
                        <strong>Ready to launch!</strong> Your campaign will be deployed to the Celo blockchain.
                        Once published, you'll be able to share it with potential contributors.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="flex items-center"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>

          <div className="flex space-x-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentStep > index + 1 ? 'bg-celo-green' :
                  currentStep === index + 1 ? 'bg-celo-green' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          {currentStep < steps.length ? (
            <Button
              onClick={nextStep}
              className="bg-celo-green hover:bg-celo-green/90 flex items-center"
            >
              Next
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              className="bg-celo-green hover:bg-celo-green/90 flex items-center"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Launch Campaign
            </Button>
          )}
        </div>
      </div>

      <CreateCampaignModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}