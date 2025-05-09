
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Icon from '@/components/ui/icon';

interface PlantingPeriod {
  start: number; // Месяц начала (1-12)
  end: number; // Месяц окончания (1-12)
}

interface PlantInfo {
  name: string;
  type: string;
  icon: string;
  seedIndoors?: PlantingPeriod;
  seedOutdoors?: PlantingPeriod;
  transplant?: PlantingPeriod;
  harvest?: PlantingPeriod;
  description: string;
}

const PlantingCalendar: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState('central');
  const [selectedType, setSelectedType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Данные о растениях и периодах их посадки
  const plants: PlantInfo[] = [
    {
      name: 'Томаты',
      type: 'vegetables',
      icon: 'Cherry',
      seedIndoors: { start: 3, end: 4 },
      transplant: { start: 5, end: 6 },
      harvest: { start: 7, end: 9 },
      description: 'Теплолюбивая культура. Рассаду высаживают в возрасте 55-60 дней после появления всходов.'
    },
    {
      name: 'Огурцы',
      type: 'vegetables',
      icon: 'Vegetable',
      seedIndoors: { start: 4, end: 5 },
      seedOutdoors: { start: 5, end: 6 },
      harvest: { start: 6, end: 9 },
      description: 'Можно выращивать как через рассаду, так и прямым посевом в грунт.'
    },
    {
      name: 'Морковь',
      type: 'vegetables',
      icon: 'Carrot',
      seedOutdoors: { start: 4, end: 5 },
      harvest: { start: 7, end: 10 },
      description: 'Холодостойкая культура, семена высевают в открытый грунт ранней весной.'
    },
    {
      name: 'Клубника',
      type: 'berries',
      icon: 'Apple',
      transplant: { start: 8, end: 9 },
      harvest: { start: 6, end: 8 },
      description: 'Лучшее время для посадки - конец лета или ранняя осень. Весенняя посадка также возможна.'
    },
    {
      name: 'Картофель',
      type: 'vegetables',
      icon: 'Cpu',
      seedOutdoors: { start: 4, end: 5 },
      harvest: { start: 7, end: 9 },
      description: 'Клубни высаживают, когда почва прогреется до 8-10 градусов.'
    },
    {
      name: 'Чеснок',
      type: 'herbs',
      icon: 'Cherry',
      seedOutdoors: { start: 9, end: 10 },
      harvest: { start: 7, end: 8 },
      description: 'Озимый чеснок высаживают осенью, яровой - ранней весной.'
    },
    {
      name: 'Лук',
      type: 'vegetables',
      icon: 'CircleDashed',
      seedOutdoors: { start: 4, end: 5 },
      harvest: { start: 8, end: 9 },
      description: 'Лук-севок высаживают, когда почва прогреется до 10-12 градусов.'
    },
    {
      name: 'Базилик',
      type: 'herbs',
      icon: 'Leaf',
      seedIndoors: { start: 3, end: 4 },
      transplant: { start: 5, end: 6 },
      harvest: { start: 6, end: 9 },
      description: 'Теплолюбивое растение, не переносит заморозков.'
    },
    {
      name: 'Тюльпаны',
      type: 'flowers',
      icon: 'Flower',
      seedOutdoors: { start: 9, end: 10 },
      harvest: { start: 5, end: 6 },
      description: 'Луковицы высаживают осенью на глубину, равную трем высотам луковицы.'
    },
    {
      name: 'Розы',
      type: 'flowers',
      icon: 'Flower2',
      transplant: { start: 4, end: 5 },
      harvest: { start: 6, end: 9 },
      description: 'Саженцы высаживают весной после окончания заморозков или осенью до наступления холодов.'
    },
    {
      name: 'Укроп',
      type: 'herbs',
      icon: 'Sprout',
      seedOutdoors: { start: 4, end: 8 },
      harvest: { start: 6, end: 9 },
      description: 'Холодостойкое растение, можно сеять с ранней весны до середины лета.'
    },
    {
      name: 'Капуста',
      type: 'vegetables',
      icon: 'Sprout',
      seedIndoors: { start: 3, end: 4 },
      transplant: { start: 5, end: 6 },
      harvest: { start: 7, end: 10 },
      description: 'Рассаду высаживают в возрасте 45-50 дней после появления всходов.'
    }
  ];

  // Регионы с корректировкой сроков
  const regions = [
    { id: 'north', name: 'Северный', adjustment: 2 }, // сдвиг на 2 недели позже
    { id: 'central', name: 'Центральный', adjustment: 0 }, // без сдвига
    { id: 'south', name: 'Южный', adjustment: -2 } // сдвиг на 2 недели раньше
  ];

  // Типы растений
  const plantTypes = [
    { id: 'all', name: 'Все растения' },
    { id: 'vegetables', name: 'Овощи' },
    { id: 'berries', name: 'Ягоды' },
    { id: 'herbs', name: 'Травы' },
    { id: 'flowers', name: 'Цветы' }
  ];

  // Названия месяцев
  const months = [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
  ];

  // Текущий месяц
  const currentMonth = new Date().getMonth() + 1; // 1-12

  // Функция для фильтрации растений
  const filteredPlants = plants.filter(plant => {
    // Фильтр по типу
    const matchesType = selectedType === 'all' || plant.type === selectedType;
    
    // Фильтр по поиску
    const matchesSearch = plant.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesType && matchesSearch;
  });

  // Функция для проверки, подходит ли месяц для определенного периода
  const isMonthInPeriod = (month: number, period?: PlantingPeriod, adjustment: number = 0): boolean => {
    if (!period) return false;
    
    // Применяем корректировку в зависимости от региона
    const adjustedStart = adjustMonth(period.start, adjustment);
    const adjustedEnd = adjustMonth(period.end, adjustment);
    
    // Если начало меньше или равно концу, проверяем обычным способом
    if (adjustedStart <= adjustedEnd) {
      return month >= adjustedStart && month <= adjustedEnd;
    } else {
      // Для периодов, переходящих через конец года (например, ноябрь-февраль)
      return month >= adjustedStart || month <= adjustedEnd;
    }
  };

  // Функция для корректировки месяца с учетом сдвига по региону
  const adjustMonth = (month: number, adjustment: number): number => {
    // Преобразуем сдвиг из недель в месяцы (приблизительно)
    const monthAdjustment = Math.round(adjustment / 4);
    let result = month + monthAdjustment;
    
    // Учитываем переход через границы года
    if (result > 12) return result - 12;
    if (result < 1) return result + 12;
    return result;
  };

  // Получаем корректировку для выбранного региона
  const regionAdjustment = regions.find(r => r.id === selectedRegion)?.adjustment || 0;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-primary-500 mb-2">Календарь посадки растений</h1>
        <p className="text-gray-600 mb-6">Планируйте посадки с учетом оптимальных сроков для вашего региона</p>
        
        {/* Фильтры и поиск */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div>
            <label className="text-sm font-medium mb-1 block">Регион</label>
            <Select value={selectedRegion} onValueChange={setSelectedRegion}>
              <SelectTrigger>
                <SelectValue placeholder="Выберите регион" />
              </SelectTrigger>
              <SelectContent>
                {regions.map(region => (
                  <SelectItem key={region.id} value={region.id}>{region.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="text-sm font-medium mb-1 block">Тип растений</label>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger>
                <SelectValue placeholder="Все растения" />
              </SelectTrigger>
              <SelectContent>
                {plantTypes.map(type => (
                  <SelectItem key={type.id} value={type.id}>{type.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="text-sm font-medium mb-1 block">Поиск</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Название растения..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 rounded-md border border-input px-3 py-2 text-sm"
              />
              <Icon 
                name="Search" 
                className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" 
              />
            </div>
          </div>
        </div>
        
        {/* Пояснение к обозначениям */}
        <div className="bg-primary-100/30 p-4 rounded-lg mb-8">
          <h3 className="font-bold mb-2">Обозначения:</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-blue-400 rounded-sm mr-2"></div>
              <span className="text-sm">Посев в помещении</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-green-400 rounded-sm mr-2"></div>
              <span className="text-sm">Посев в открытый грунт</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-orange-400 rounded-sm mr-2"></div>
              <span className="text-sm">Пересадка рассады</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-red-400 rounded-sm mr-2"></div>
              <span className="text-sm">Сбор урожая</span>
            </div>
          </div>
          <div className="mt-2 text-sm text-gray-600">
            <Icon name="Info" className="inline-block h-4 w-4 mr-1" />
            Сроки указаны для {regions.find(r => r.id === selectedRegion)?.name.toLowerCase()} региона и могут отличаться в зависимости от погодных условий.
          </div>
        </div>
        
        {/* Календарь */}
        <div className="overflow-x-auto mb-6">
          <table className="min-w-full border border-primary-200 rounded-lg">
            <thead>
              <tr className="bg-primary-100/50">
                <th className="py-3 px-4 text-left font-medium text-primary-500 w-[200px]">Растение</th>
                {months.map((month, index) => (
                  <th 
                    key={month} 
                    className={`py-3 px-2 text-center font-medium text-primary-500 ${
                      currentMonth === index + 1 ? 'bg-primary-200/40' : ''
                    }`}
                  >
                    {month.substring(0, 3)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredPlants.length === 0 ? (
                <tr>
                  <td colSpan={13} className="py-6 text-center text-gray-500">
                    Растения не найдены. Попробуйте изменить параметры поиска.
                  </td>
                </tr>
              ) : (
                filteredPlants.map((plant, plantIndex) => (
                  <React.Fragment key={plant.name}>
                    <tr className={plantIndex % 2 === 0 ? 'bg-white' : 'bg-primary-50/30'}>
                      <td className="py-3 px-4 border-b border-primary-100">
                        <div className="flex items-center">
                          <div className="bg-primary-100 p-1 rounded-full mr-2">
                            <Icon name={plant.icon} className="h-5 w-5 text-primary-400" />
                          </div>
                          <div>
                            <div className="font-medium">{plant.name}</div>
                            <div className="text-xs text-gray-500">
                              {plantTypes.find(t => t.id === plant.type)?.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                        <td 
                          key={month} 
                          className={`border-b border-primary-100 relative ${
                            currentMonth === month ? 'bg-primary-100/20' : ''
                          }`}
                        >
                          <div className="h-10 grid grid-cols-1 gap-1">
                            {isMonthInPeriod(month, plant.seedIndoors, regionAdjustment) && (
                              <div className="bg-blue-400 h-2 rounded-sm mx-1"></div>
                            )}
                            {isMonthInPeriod(month, plant.seedOutdoors, regionAdjustment) && (
                              <div className="bg-green-400 h-2 rounded-sm mx-1"></div>
                            )}
                            {isMonthInPeriod(month, plant.transplant, regionAdjustment) && (
                              <div className="bg-orange-400 h-2 rounded-sm mx-1"></div>
                            )}
                            {isMonthInPeriod(month, plant.harvest, regionAdjustment) && (
                              <div className="bg-red-400 h-2 rounded-sm mx-1"></div>
                            )}
                          </div>
                        </td>
                      ))}
                    </tr>
                  </React.Fragment>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Подробная информация о растениях */}
        <h2 className="text-2xl font-bold text-primary-500 mt-10 mb-4">Рекомендации по посадке</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlants.map(plant => (
            <Card key={plant.name} className="border-primary-100">
              <CardHeader className="pb-3">
                <div className="flex justify-between">
                  <div className="flex items-center">
                    <div className="bg-primary-100 p-2 rounded-full mr-3">
                      <Icon name={plant.icon} className="h-5 w-5 text-primary-400" />
                    </div>
                    <CardTitle className="text-lg">{plant.name}</CardTitle>
                  </div>
                  <Badge variant="outline" className="bg-primary-100/50">
                    {plantTypes.find(t => t.id === plant.type)?.name}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">{plant.description}</p>
                
                <div className="space-y-3">
                  {plant.seedIndoors && (
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-blue-400 rounded-sm mr-3"></div>
                      <span className="text-sm">
                        Посев на рассаду: {months[adjustMonth(plant.seedIndoors.start, regionAdjustment) - 1]} - {months[adjustMonth(plant.seedIndoors.end, regionAdjustment) - 1]}
                      </span>
                    </div>
                  )}
                  
                  {plant.seedOutdoors && (
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-green-400 rounded-sm mr-3"></div>
                      <span className="text-sm">
                        Посев в грунт: {months[adjustMonth(plant.seedOutdoors.start, regionAdjustment) - 1]} - {months[adjustMonth(plant.seedOutdoors.end, regionAdjustment) - 1]}
                      </span>
                    </div>
                  )}
                  
                  {plant.transplant && (
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-orange-400 rounded-sm mr-3"></div>
                      <span className="text-sm">
                        Высадка рассады: {months[adjustMonth(plant.transplant.start, regionAdjustment) - 1]} - {months[adjustMonth(plant.transplant.end, regionAdjustment) - 1]}
                      </span>
                    </div>
                  )}
                  
                  {plant.harvest && (
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-red-400 rounded-sm mr-3"></div>
                      <span className="text-sm">
                        Сбор урожая: {months[adjustMonth(plant.harvest.start, regionAdjustment) - 1]} - {months[adjustMonth(plant.harvest.end, regionAdjustment) - 1]}
                      </span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Сезонные советы */}
        <div className="mt-12 bg-primary-100/30 p-6 rounded-lg">
          <h2 className="text-2xl font-bold text-primary-500 mb-4">Сезонные советы по посадке</h2>
          
          <Tabs defaultValue={getSeasonFromMonth(currentMonth)}>
            <TabsList className="grid grid-cols-4 mb-6">
              <TabsTrigger value="spring" className="data-[state=active]:bg-primary-200 data-[state=active]:text-primary-500">
                <Icon name="Leaf" className="mr-2 h-4 w-4" />
                Весна
              </TabsTrigger>
              <TabsTrigger value="summer" className="data-[state=active]:bg-primary-200 data-[state=active]:text-primary-500">
                <Icon name="Sun" className="mr-2 h-4 w-4" />
                Лето
              </TabsTrigger>
              <TabsTrigger value="autumn" className="data-[state=active]:bg-primary-200 data-[state=active]:text-primary-500">
                <Icon name="Apple" className="mr-2 h-4 w-4" />
                Осень
              </TabsTrigger>
              <TabsTrigger value="winter" className="data-[state=active]:bg-primary-200 data-[state=active]:text-primary-500">
                <Icon name="Snowflake" className="mr-2 h-4 w-4" />
                Зима
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="spring">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold text-lg mb-3">Что сажать весной:</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <Icon name="CheckCircle2" className="h-4 w-4 text-green-500 mr-2" />
                      <span>Холодостойкие культуры: морковь, редис, салат, горох</span>
                    </li>
                    <li className="flex items-center">
                      <Icon name="CheckCircle2" className="h-4 w-4 text-green-500 mr-2" />
                      <span>На рассаду: томаты, перец, баклажаны, капуста</span>
                    </li>
                    <li className="flex items-center">
                      <Icon name="CheckCircle2" className="h-4 w-4 text-green-500 mr-2" />
                      <span>Зелень: укроп, петрушка, лук на перо</span>
                    </li>
                    <li className="flex items-center">
                      <Icon name="CheckCircle2" className="h-4 w-4 text-green-500 mr-2" />
                      <span>Картофель (в апреле-мае в зависимости от региона)</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-3">Рекомендации:</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Icon name="LightbulbIcon" className="h-4 w-4 text-primary-400 mr-2 mt-0.5" />
                      <span>Подготовьте почву, внесите компост и перегной</span>
                    </li>
                    <li className="flex items-start">
                      <Icon name="LightbulbIcon" className="h-4 w-4 text-primary-400 mr-2 mt-0.5" />
                      <span>Проверьте семена на всхожесть перед посадкой</span>
                    </li>
                    <li className="flex items-start">
                      <Icon name="LightbulbIcon" className="h-4 w-4 text-primary-400 mr-2 mt-0.5" />
                      <span>Установите временные укрытия для защиты от весенних заморозков</span>
                    </li>
                    <li className="flex items-start">
                      <Icon name="LightbulbIcon" className="h-4 w-4 text-primary-400 mr-2 mt-0.5" />
                      <span>Следите за погодой и будьте готовы защитить растения от возвратных заморозков</span>
                    </li>
                  </ul>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="summer">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold text-lg mb-3">Что сажать летом:</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <Icon name="CheckCircle2" className="h-4 w-4 text-green-500 mr-2" />
                      <span>Теплолюбивые культуры: огурцы, кабачки, тыквы</span>
                    </li>
                    <li className="flex items-center">
                      <Icon name="CheckCircle2" className="h-4 w-4 text-green-500 mr-2" />
                      <span>Повторные посевы: редис, укроп, салат, руккола</span>
                    </li>
                    <li className="flex items-center">
                      <Icon name="CheckCircle2" className="h-4 w-4 text-green-500 mr-2" />
                      <span>Для осеннего урожая: редька, дайкон, репа</span>
                    </li>
                    <li className="flex items-center">
                      <Icon name="CheckCircle2" className="h-4 w-4 text-green-500 mr-2" />
                      <span>Цветочные многолетники и двулетники для цветения в следующем году</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-3">Рекомендации:</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Icon name="LightbulbIcon" className="h-4 w-4 text-primary-400 mr-2 mt-0.5" />
                      <span>Обеспечьте регулярный полив растений в жаркую погоду</span>
                    </li>
                    <li className="flex items-start">
                      <Icon name="LightbulbIcon" className="h-4 w-4 text-primary-400 mr-2 mt-0.5" />
                      <span>Используйте мульчирование для сохранения влаги и защиты от сорняков</span>
                    </li>
                    <li className="flex items-start">
                      <Icon name="LightbulbIcon" className="h-4 w-4 text-primary-400 mr-2 mt-0.5" />
                      <span>Регулярно проверяйте растения на наличие вредителей и болезней</span>
                    </li>
                    <li className="flex items-start">
                      <Icon name="LightbulbIcon" className="h-4 w-4 text-primary-400 mr-2 mt-0.5" />
                      <span>Затеняйте новые посадки в самые жаркие часы дня</span>
                    </li>
                  </ul>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="autumn">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold text-lg mb-3">Что сажать осенью:</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <Icon name="CheckCircle2" className="h-4 w-4 text-green-500 mr-2" />
                      <span>Озимые культуры: чеснок, лук-севок</span>
                    </li>
                    <li className="flex items-center">
                      <Icon name="CheckCircle2" className="h-4 w-4 text-green-500 mr-2" />
                      <span>Луковичные цветы: тюльпаны, нарциссы, крокусы</span>
                    </li>
                    <li className="flex items-center">
                      <Icon name="CheckCircle2" className="h-4 w-4 text-green-500 mr-2" />
                      <span>Земляника и клубника (в начале осени)</span>
                    </li>
                    <li className="flex items-center">
                      <Icon name="CheckCircle2" className="h-4 w-4 text-green-500 mr-2" />
                      <span>Плодовые деревья и кустарники</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-3">Рекомендации:</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Icon name="LightbulbIcon" className="h-4 w-4 text-primary-400 mr-2 mt-0.5" />
                      <span>Подготовьте грядки для весенних посадок, внесите компост</span>
                    </li>
                    <li className="flex items-start">
                      <Icon name="LightbulbIcon" className="h-4 w-4 text-primary-400 mr-2 mt-0.5" />
                      <span>Высаживайте луковичные до наступления устойчивых заморозков</span>
                    </li>
                    <li className="flex items-start">
                      <Icon name="LightbulbIcon" className="h-4 w-4 text-primary-400 mr-2 mt-0.5" />
                      <span>Посаженные осенью деревья и кустарники хорошо мульчируйте</span>
                    </li>
                    <li className="flex items-start">
                      <Icon name="LightbulbIcon" className="h-4 w-4 text-primary-400 mr-2 mt-0.5" />
                      <span>Посейте сидераты на пустующих грядках для улучшения почвы</span>
                    </li>
                  </ul>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="winter">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold text-lg mb-3">Что сажать зимой:</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <Icon name="CheckCircle2" className="h-4 w-4 text-green-500 mr-2" />
                      <span>На подоконнике: зелень, микрозелень</span>
                    </li>
                    <li className="flex items-center">
                      <Icon name="CheckCircle2" className="h-4 w-4 text-green-500 mr-2" />
                      <span>В закрытом грунте: ранняя рассада перца и баклажанов (в конце зимы)</span>
                    </li>
                    <li className="flex items-center">
                      <Icon name="CheckCircle2" className="h-4 w-4 text-green-500 mr-2" />
                      <span>Стратификация семян многолетников для весеннего посева</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-3">Рекомендации:</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Icon name="LightbulbIcon" className="h-4 w-4 text-primary-400 mr-2 mt-0.5" />
                      <span>Планируйте посадки на следующий сезон, заказывайте семена</span>
                    </li>
                    <li className="flex items-start">
                      <Icon name="LightbulbIcon" className="h-4 w-4 text-primary-400 mr-2 mt-0.5" />
                      <span>Проверьте и подготовьте садовый инвентарь</span>
                    </li>
                    <li className="flex items-start">
                      <Icon name="LightbulbIcon" className="h-4 w-4 text-primary-400 mr-2 mt-0.5" />
                      <span>Контролируйте состояние зимующих растений под снегом</span>
                    </li>
                    <li className="flex items-start">
                      <Icon name="LightbulbIcon" className="h-4 w-4 text-primary-400 mr-2 mt-0.5" />
                      <span>Приготовьте землю для рассады</span>
                    </li>
                  </ul>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

// Вспомогательная функция для определения сезона по месяцу
function getSeasonFromMonth(month: number): string {
  if (month >= 3 && month <= 5) return "spring";
  if (month >= 6 && month <= 8) return "summer";
  if (month >= 9 && month <= 11) return "autumn";
  return "winter";
}

export default PlantingCalendar;
