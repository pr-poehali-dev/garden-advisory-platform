
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import PlantCard from '@/components/PlantCard';
import SeasonalTips from '@/components/SeasonalTips';
import { Button } from "@/components/ui/button";
import Icon from '@/components/ui/icon';

const Index = () => {
  // Данные для карточек растений
  const popularPlants = [
    {
      name: "Помидор 'Черри'",
      image: "https://images.unsplash.com/photo-1582284540020-8acbe03f4924?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      category: "Овощи",
      difficulty: "Средне" as const,
      sunlight: "Полное солнце" as const,
      watering: "Умеренно" as const
    },
    {
      name: "Розмарин",
      image: "https://images.unsplash.com/photo-1515586000433-45406d8e6662?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      category: "Травы",
      difficulty: "Легко" as const,
      sunlight: "Полное солнце" as const,
      watering: "Редко" as const
    },
    {
      name: "Роза 'Эден'",
      image: "https://images.unsplash.com/photo-1559563362-c667ba5f5480?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      category: "Цветы",
      difficulty: "Сложно" as const,
      sunlight: "Полное солнце" as const,
      watering: "Умеренно" as const
    },
    {
      name: "Базилик",
      image: "https://images.unsplash.com/photo-1618375531912-867984bdfd87?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      category: "Травы",
      difficulty: "Легко" as const,
      sunlight: "Полное солнце" as const,
      watering: "Часто" as const
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      
      <main>
        {/* Популярные растения */}
        <section className="py-16 container mx-auto px-4">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-bold text-primary-500 mb-2">Популярные растения</h2>
              <p className="text-gray-600">Самые популярные растения среди наших садоводов</p>
            </div>
            <Button variant="outline" className="border-primary-300 text-primary-400">
              Все растения <Icon name="ArrowRight" className="ml-2 h-4 w-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularPlants.map((plant, index) => (
              <PlantCard key={index} {...plant} />
            ))}
          </div>
        </section>
        
        {/* Сезонные советы */}
        <section className="py-12 container mx-auto px-4">
          <SeasonalTips />
        </section>
        
        {/* CTA секция */}
        <section className="py-16 bg-primary-200/40">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-primary-500 mb-4">Присоединяйтесь к сообществу</h2>
            <p className="text-gray-600 max-w-xl mx-auto mb-8">
              Делитесь своим опытом, задавайте вопросы и учитесь у опытных садоводов со всей страны.
            </p>
            <div className="flex justify-center gap-4">
              <Button size="lg" className="bg-primary-400 hover:bg-primary-500">
                <Icon name="UserPlus" className="mr-2 h-5 w-5" />
                Регистрация
              </Button>
              <Button size="lg" variant="outline" className="border-primary-400 text-primary-400">
                <Icon name="Info" className="mr-2 h-5 w-5" />
                Узнать больше
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="bg-primary-500 text-white py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Icon name="Flower2" className="h-6 w-6" />
                <span className="font-playfair text-xl font-bold">ЗеленыйСад</span>
              </div>
              <p className="text-sm opacity-80">
                Ваш надежный помощник в садоводстве и огородничестве с 2025 года.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Разделы</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:underline">Растения</a></li>
                <li><a href="#" className="hover:underline">Советы</a></li>
                <li><a href="#" className="hover:underline">Маркет</a></li>
                <li><a href="#" className="hover:underline">Сообщество</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Полезное</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:underline">Календарь посадок</a></li>
                <li><a href="#" className="hover:underline">Борьба с вредителями</a></li>
                <li><a href="#" className="hover:underline">Каталог растений</a></li>
                <li><a href="#" className="hover:underline">Часто задаваемые вопросы</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Контакты</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center"><Icon name="Mail" className="h-4 w-4 mr-2" /> info@zelenysad.ru</li>
                <li className="flex items-center"><Icon name="Phone" className="h-4 w-4 mr-2" /> +7 (900) 123-45-67</li>
                <li className="flex items-center"><Icon name="MapPin" className="h-4 w-4 mr-2" /> Москва, ул. Садовая, 15</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-10 pt-6 border-t border-primary-400 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-sm opacity-80 mb-4 sm:mb-0">© 2025 ЗеленыйСад. Все права защищены.</p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-primary-100"><Icon name="Facebook" className="h-5 w-5" /></a>
              <a href="#" className="hover:text-primary-100"><Icon name="Instagram" className="h-5 w-5" /></a>
              <a href="#" className="hover:text-primary-100"><Icon name="Youtube" className="h-5 w-5" /></a>
              <a href="#" className="hover:text-primary-100"><Icon name="Telegram" className="h-5 w-5" /></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
