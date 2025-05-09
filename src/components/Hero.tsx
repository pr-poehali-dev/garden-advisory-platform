
import React from 'react';
import { Button } from "@/components/ui/button";
import Icon from '@/components/ui/icon';

const Hero: React.FC = () => {
  return (
    <div className="relative bg-primary-400 text-white overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -left-10 -top-10 w-40 h-40 rounded-full bg-white"></div>
        <div className="absolute right-20 top-20 w-20 h-20 rounded-full bg-white"></div>
        <div className="absolute right-40 bottom-10 w-30 h-30 rounded-full bg-white"></div>
      </div>
      
      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 md:pr-10 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Превратите свой сад в цветущий рай
            </h1>
            <p className="text-lg mb-8 opacity-90">
              Советы от опытных садоводов, каталог растений и всё необходимое для создания идеального сада.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-white text-primary-500 hover:bg-primary-100">
                <Icon name="Sprout" className="mr-2 h-5 w-5" />
                Начать выращивать
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-primary-300">
                <Icon name="BookOpen" className="mr-2 h-5 w-5" />
                Каталог растений
              </Button>
            </div>
            
            <div className="flex items-center mt-8 space-x-6">
              <div className="flex items-center">
                <Icon name="Users" className="mr-2 h-5 w-5" />
                <span className="text-sm">10K+ садоводов</span>
              </div>
              <div className="flex items-center">
                <Icon name="Flower" className="mr-2 h-5 w-5" />
                <span className="text-sm">500+ растений</span>
              </div>
              <div className="flex items-center">
                <Icon name="BookText" className="mr-2 h-5 w-5" />
                <span className="text-sm">200+ советов</span>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2 relative">
            <div className="relative rounded-lg overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1598902108854-10e335adac99?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80" 
                alt="Сад с растениями" 
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>
            <div className="absolute -bottom-5 -left-5 bg-white p-4 rounded-lg shadow-lg">
              <div className="flex items-center">
                <div className="rounded-full bg-green-100 p-2 mr-3">
                  <Icon name="ThumbsUp" className="h-5 w-5 text-primary-400" />
                </div>
                <div>
                  <p className="text-primary-500 text-sm font-bold">98% успеха</p>
                  <p className="text-gray-500 text-xs">с нашими советами</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
