
import React from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Icon from '@/components/ui/icon';

export interface PlantCardProps {
  name: string;
  image: string;
  category: string;
  difficulty: 'Легко' | 'Средне' | 'Сложно';
  sunlight: 'Полное солнце' | 'Полутень' | 'Тень';
  watering: 'Часто' | 'Умеренно' | 'Редко';
}

const PlantCard: React.FC<PlantCardProps> = ({
  name,
  image,
  category,
  difficulty,
  sunlight,
  watering
}) => {
  return (
    <Card className="plant-card overflow-hidden border border-primary-100">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover"
        />
        <Badge className="absolute top-3 right-3 bg-primary-300">
          {category}
        </Badge>
      </div>
      
      <CardContent className="pt-4">
        <h3 className="text-lg font-bold mb-2">{name}</h3>
        
        <div className="grid grid-cols-3 gap-2 text-sm mt-3">
          <div className="flex flex-col items-center">
            <div className="flex items-center mb-1">
              <Icon name="Gauge" className="h-4 w-4 text-primary-400 mr-1" />
              <span className="text-xs">Сложность</span>
            </div>
            <span className="text-xs font-medium">{difficulty}</span>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="flex items-center mb-1">
              <Icon name="Sun" className="h-4 w-4 text-primary-400 mr-1" />
              <span className="text-xs">Свет</span>
            </div>
            <span className="text-xs font-medium">{sunlight}</span>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="flex items-center mb-1">
              <Icon name="Droplets" className="h-4 w-4 text-primary-400 mr-1" />
              <span className="text-xs">Полив</span>
            </div>
            <span className="text-xs font-medium">{watering}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-0 flex justify-end">
        <div className="text-primary-400 text-sm font-medium flex items-center cursor-pointer hover:text-primary-500 transition-colors">
          Подробнее
          <Icon name="ChevronRight" className="ml-1 h-4 w-4" />
        </div>
      </CardFooter>
    </Card>
  );
};

export default PlantCard;
