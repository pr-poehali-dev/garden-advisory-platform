
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Icon from '@/components/ui/icon';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Tip {
  title: string;
  content: string;
  icon: string;
}

interface SeasonTips {
  [key: string]: Tip[];
}

const seasonalTips: SeasonTips = {
  spring: [
    {
      title: "Подготовка грядок",
      content: "Очистите грядки от сорняков и внесите компост для обогащения почвы перед посадкой.",
      icon: "Shovel"
    },
    {
      title: "Посев холодостойких культур",
      content: "Посейте морковь, горох, редис и листовой салат, как только почва оттает.",
      icon: "Seedling"
    },
    {
      title: "Обрезка кустарников",
      content: "Ранняя весна — идеальное время для обрезки большинства декоративных кустарников.",
      icon: "Scissors"
    }
  ],
  summer: [
    {
      title: "Регулярный полив",
      content: "В жаркие месяцы поливайте глубоко и редко, а не часто и понемногу.",
      icon: "Droplets"
    },
    {
      title: "Защита от вредителей",
      content: "Регулярно осматривайте растения на наличие вредителей и применяйте нужные меры.",
      icon: "Bug"
    },
    {
      title: "Мульчирование",
      content: "Нанесите слой мульчи для сохранения влаги и предотвращения роста сорняков.",
      icon: "Layers"
    }
  ],
  autumn: [
    {
      title: "Сбор урожая",
      content: "Вовремя собирайте созревшие овощи и фрукты, чтобы они не перезрели.",
      icon: "Apple"
    },
    {
      title: "Посадка луковичных",
      content: "Посадите тюльпаны, нарциссы и другие весенние луковичные.",
      icon: "Flower"
    },
    {
      title: "Уборка листьев",
      content: "Уберите опавшие листья с газона, чтобы избежать появления грибка.",
      icon: "Wind"
    }
  ],
  winter: [
    {
      title: "Планирование сада",
      content: "Используйте зимние месяцы для планирования весенних посадок и заказа семян.",
      icon: "CalendarDays"
    },
    {
      title: "Уход за инструментами",
      content: "Почистите, заточите и смажьте садовые инструменты перед хранением.",
      icon: "Wrench"
    },
    {
      title: "Защита растений",
      content: "Укройте чувствительные к морозу растения материалом для защиты.",
      icon: "ThermometerSnowflake"
    }
  ]
};

const SeasonalTips: React.FC = () => {
  const getCurrentSeason = (): string => {
    const month = new Date().getMonth();
    if (month >= 2 && month <= 4) return "spring";
    if (month >= 5 && month <= 7) return "summer";
    if (month >= 8 && month <= 10) return "autumn";
    return "winter";
  };

  return (
    <div className="bg-primary-100/30 p-6 rounded-lg">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-primary-500 mb-2">Сезонные советы</h2>
        <p className="text-gray-600">Актуальные рекомендации для вашего сада</p>
      </div>

      <Tabs defaultValue={getCurrentSeason()}>
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

        {Object.entries(seasonalTips).map(([season, tips]) => (
          <TabsContent key={season} value={season} className="mt-0">
            <div className="grid md:grid-cols-3 gap-4">
              {tips.map((tip, index) => (
                <Card key={index} className="border-primary-200">
                  <CardHeader className="pb-2">
                    <div className="flex items-center">
                      <div className="bg-primary-300/20 p-2 rounded-md mr-3">
                        <Icon name={tip.icon} className="h-5 w-5 text-primary-400" />
                      </div>
                      <CardTitle className="text-base">{tip.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">{tip.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default SeasonalTips;
